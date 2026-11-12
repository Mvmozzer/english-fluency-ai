
(function () {
  'use strict';

  var STORAGE_KEY = 'fluency-app-v1';
  var DAY_MS = 24 * 60 * 60 * 1000;
  var LEVELS = { A1: 'Iniciante', A2: 'Básico', B1: 'Intermediário', B2: 'Avançado', C1: 'Proficiente' };
  var lessons = {
    A1: { id: 'need-more-time', phrase: 'I need a little more time.', meaning: 'Eu preciso de um pouco mais de tempo.', choices: ['Eu preciso de um pouco mais de tempo.', 'Estou esperando há muito tempo.', 'Tenho muito tempo livre.'], word: 'a little more time' },
    A2: { id: 'ran-out-of-time', phrase: 'I ran out of time before the meeting.', meaning: 'Fiquei sem tempo antes da reunião.', choices: ['Cheguei cedo para a reunião.', 'Fiquei sem tempo antes da reunião.', 'A reunião durou pouco tempo.'], word: 'run out of time' },
    B1: { id: 'usually-take-bus', phrase: 'I usually take the bus to work.', meaning: 'Geralmente vou de ônibus para o trabalho.', choices: ['Geralmente vou de ônibus para o trabalho.', 'Às vezes trabalho no ônibus.', 'Preciso pegar o ônibus depois do trabalho.'], word: 'usually' },
    B2: { id: 'put-off-decision', phrase: 'The team put off the decision until Friday.', meaning: 'A equipe adiou a decisão até sexta-feira.', choices: ['A equipe tomou a decisão na sexta-feira.', 'A equipe adiou a decisão até sexta-feira.', 'A equipe discutiu a decisão por uma semana.'], word: 'put off' },
    C1: { id: 'remarkable-composure', phrase: 'She handled the feedback with remarkable composure.', meaning: 'Ela lidou com o feedback com notável serenidade.', choices: ['Ela deu um feedback bastante detalhado.', 'Ela lidou com o feedback com notável serenidade.', 'Ela recebeu a resposta com surpresa.'], word: 'composure' }
  };
  var seedWords = [
    { id: 'borrow', term: 'borrow', meaning: 'pegar emprestado', example: 'Could I borrow your pen?', level: 'A1' },
    { id: 'crowded', term: 'crowded', meaning: 'cheio, lotado', example: 'The train is crowded this morning.', level: 'A2' },
    { id: 'enough', term: 'enough', meaning: 'suficiente', example: 'We have enough time.', level: 'A1' },
    { id: 'figure-out', term: 'figure out', meaning: 'descobrir, entender', example: 'I will figure out the answer.', level: 'B1' },
    { id: 'improve', term: 'improve', meaning: 'melhorar', example: 'Reading can improve your vocabulary.', level: 'A2' },
    { id: 'reliable', term: 'reliable', meaning: 'confiável', example: 'She is a reliable teammate.', level: 'B2' },
    { id: 'run-into', term: 'run into', meaning: 'encontrar por acaso', example: 'I ran into an old friend.', level: 'B1' },
    { id: 'thoughtful', term: 'thoughtful', meaning: 'atencioso, ponderado', example: 'That was a thoughtful message.', level: 'C1' }
  ];

  function makeFreshData() {
    var now = Date.now();
    return {
      profile: null,
      history: [],
      words: seedWords.map(function (word) {
        return Object.assign({}, word, { dueAt: now - 1000, intervalDays: 0, seenCount: 0 });
      })
    };
  }

  function readData() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && Array.isArray(saved.history) && Array.isArray(saved.words)) {
        return { profile: saved.profile || null, history: saved.history, words: saved.words };
      }
    } catch (error) { /* Use a fresh local study space when storage is unavailable. */ }
    return makeFreshData();
  }

  var data = readData();
  var currentView = 'today';
  var currentSession = null;
  var reviewRevealed = false;
  var toastTimer = null;
  var appView = document.getElementById('appView');
  var profileModal = document.getElementById('profileModal');

  function saveData() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
    catch (error) { showToast('Este navegador não conseguiu salvar os dados neste aparelho.'); }
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function todayKey(date) {
    var value = date || new Date();
    return [value.getFullYear(), String(value.getMonth() + 1).padStart(2, '0'), String(value.getDate()).padStart(2, '0')].join('-');
  }

  function dayKeyOffset(offset) {
    var date = new Date();
    date.setDate(date.getDate() + offset);
    return todayKey(date);
  }

  function getLesson() { return lessons[(data.profile && data.profile.level) || 'B1'] || lessons.B1; }
  function profileName() { return (data.profile && data.profile.name) || 'Learner'; }
  function dueWords() {
    var now = Date.now();
    return data.words.filter(function (word) { return !word.dueAt || new Date(word.dueAt).getTime() <= now; });
  }
  function todaySessions() { return data.history.filter(function (entry) { return entry.date === todayKey(); }); }
  function todayMinutes() { return todaySessions().reduce(function (sum, entry) { return sum + (Number(entry.minutes) || 0); }, 0); }
  function totalMinutes() { return data.history.reduce(function (sum, entry) { return sum + (Number(entry.minutes) || 0); }, 0); }
  function activeDays() { return new Set(data.history.map(function (entry) { return entry.date; })); }

  function currentStreak() {
    var days = activeDays();
    var start = days.has(todayKey()) ? 0 : (days.has(dayKeyOffset(-1)) ? -1 : 1);
    if (start === 1) return 0;
    var streak = 0;
    for (var offset = start; days.has(dayKeyOffset(offset)); offset -= 1) streak += 1;
    return streak;
  }

  function initials(name) {
    var parts = String(name || 'L').trim().split(/\s+/).filter(Boolean).slice(0, 2);
    return parts.map(function (part) { return part.charAt(0); }).join('').toUpperCase() || 'L';
  }

  function shortWeekday(date) {
    return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date).replace('.', '').charAt(0).toUpperCase();
  }

  function setActiveNavigation() {
    document.querySelectorAll('[data-view]').forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute('data-view') === currentView);
    });
    var count = document.getElementById('reviewCount');
    if (count) count.textContent = String(dueWords().length);
  }

  function updateHeader() {
    var name = profileName();
    var sideName = document.getElementById('sideName');
    var sideLevel = document.getElementById('sideLevel');
    var sideAvatar = document.getElementById('sideAvatar');
    var avatar = document.getElementById('profileButton');
    var label = document.getElementById('todayLabel');
    if (sideName) sideName.textContent = data.profile ? name : 'Seu espaço';
    if (sideLevel) sideLevel.textContent = data.profile ? (data.profile.level + ' · ' + LEVELS[data.profile.level]) : 'Comece por você';
    if (sideAvatar) sideAvatar.textContent = initials(name);
    if (avatar) avatar.textContent = initials(name);
    if (label) label.textContent = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  }

  function showToast(message) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { toast.hidden = true; }, 3200);
  }

  function openProfile() {
    var form = document.getElementById('profileForm');
    if (data.profile) {
      form.elements.name.value = data.profile.name || '';
      form.elements.level.value = data.profile.level || 'B1';
      form.elements.minutes.value = String(data.profile.minutes || 15);
    } else {
      form.reset();
      form.elements.level.value = 'B1';
      form.elements.minutes.value = '15';
    }
    profileModal.hidden = false;
    document.getElementById('learnerName').focus();
  }

  function closeProfile() {
    if (!data.profile) return;
    profileModal.hidden = true;
  }

  function renderCurrentView() {
    updateHeader();
    setActiveNavigation();
    if (currentView === 'review') renderReview();
    else if (currentView === 'progress') renderProgress();
    else if (currentSession) renderSession();
    else renderToday();
  }

  function renderToday() {
    var name = escapeHtml(profileName());
    var target = Number((data.profile && data.profile.minutes) || 15);
    var minutes = todayMinutes();
    var lesson = getLesson();
    var dates = [];
    for (var i = -6; i <= 0; i += 1) {
      var date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    var weekDots = dates.map(function (date) {
      var key = todayKey(date);
      var done = activeDays().has(key);
      return '<span class="day-dot' + (done ? ' is-done' : '') + (key === todayKey() ? ' is-today' : '') + '"><i>' + (done ? '✓' : '·') + '</i><span>' + shortWeekday(date) + '</span></span>';
    }).join('');
    var due = dueWords().length;
    var reviewCopy = due ? (due + (due === 1 ? ' palavra está' : ' palavras estão') + ' prontas para você lembrar.') : 'Tudo em dia. Suas próximas palavras voltam na hora certa.';
    var phraseCount = new Set(data.history.map(function (entry) { return entry.phrase; }).filter(Boolean)).size;

    appView.innerHTML =
      '<section class="page-heading"><div><div class="eyebrow">SUA ROTINA DE HOJE</div><h1>Um passo a mais, ' + name + '.</h1><p>Pratique lembrar, ouvir e falar inglês no seu ritmo.</p></div><span class="heading-note">Meta diária: ' + target + ' minutos</span></section>' +
      '<section class="dashboard-grid" aria-label="Resumo do dia">' +
        '<article class="hero-card"><div class="hero-top"><span class="hero-badge"><span>✦</span> PRÁTICA PERSONALIZADA · ' + escapeHtml((data.profile && data.profile.level) || 'B1') + '</span><h2>Seu inglês cresce um pouco a cada dia.</h2><p>Uma sessão curta com recuperação ativa, escuta e fala para transformar prática em hábito.</p></div><div class="hero-bottom"><div class="hero-meta"><span>◷ 3 atividades</span><span>↗ ' + escapeHtml(lesson.word) + '</span></div><button class="primary-button" data-action="start-session" type="button">Começar a prática <span aria-hidden="true">→</span></button></div></article>' +
        '<article class="streak-card"><div><span class="card-label">Sua sequência</span><div class="streak-number"><strong>' + currentStreak() + '</strong><span>' + (currentStreak() === 1 ? 'dia' : 'dias') + '</span></div></div><div><div class="streak-spark" aria-hidden="true">✦</div><span class="card-label">Um pouquinho por dia já conta.</span><div class="week-dots" aria-label="Atividade nos últimos sete dias">' + weekDots + '</div></div></article>' +
      '</section>' +
      '<section class="daily-stats" aria-label="Atividade de hoje"><article class="stat-card"><span class="card-label">Tempo praticado</span><strong>' + minutes + ' min</strong><small>Meta: ' + target + ' min por dia</small></article><article class="stat-card"><span class="card-label">Revisões prontas</span><strong>' + due + '</strong><small>Palavras no momento certo</small></article><article class="stat-card"><span class="card-label">Frases praticadas</span><strong>' + phraseCount + '</strong><small>Ao longo dos seus estudos</small></article></section>' +
      '<section class="dashboard-lower"><article class="content-card"><div class="section-title"><h3>Suas palavras de hoje</h3><button class="text-link" data-action="go-review" type="button">Abrir revisão →</button></div><div class="review-preview"><span class="review-glyph" aria-hidden="true">↻</span><div><strong>' + (due ? 'Uma revisão rápida ajuda a fixar.' : 'Sua revisão está em dia.') + '</strong><p>' + escapeHtml(reviewCopy) + '</p></div><button class="secondary-button" data-action="go-review" type="button">Revisar</button></div></article><article class="method-card"><span class="method-icon" aria-hidden="true">✦</span><h3>Prática que fortalece a memória</h3><p>Você tenta lembrar antes de ver a resposta e revisita palavras em intervalos crescentes. A prática diária apoia o aprendizado; fluência depende de consistência e uso real.</p></article></section>';
  }

  function renderChoiceOptions(lesson, stage, selected) {
    return lesson.choices.map(function (choice, index) {
      var classes = 'answer-option';
      if (selected === index) classes += ' is-selected';
      if (selected !== null && index === 1) classes += ' is-correct';
      if (selected === index && index !== 1) classes += ' is-wrong';
      return '<button class="' + classes + '" data-action="select-choice" data-index="' + index + '" type="button" aria-pressed="' + (selected === index) + '"><span class="option-letter">' + String.fromCharCode(65 + index) + '</span><span>' + escapeHtml(choice) + '</span></button>';
    }).join('');
  }

  function renderSession() {
    var lesson = getLesson();
    var session = currentSession;
    var stage = session.step;
    var percent = Math.min(100, Math.round((stage / 3) * 100));
    var header = '<header class="session-header"><div><h1>Prática de hoje</h1><p>' + escapeHtml(profileName()) + ' · ' + escapeHtml((data.profile && data.profile.level) || 'B1') + ' · passo ' + Math.min(stage + 1, 3) + ' de 3</p></div><button class="quiet-button" data-action="leave-session" type="button">Sair da prática</button></header><div class="progress-track" aria-label="Progresso da prática"><span style="width:' + percent + '%"></span></div>';
    if (stage >= 3) {
      appView.innerHTML = '<div class="session-shell">' + header + '<section class="session-panel"><div class="session-finish"><span class="finish-mark" aria-hidden="true">✓</span><h2>Prática concluída!</h2><p>Você lembrou, escutou e falou uma frase. Ela foi adicionada ao seu espaço de revisão para voltar depois.</p><button class="primary-button" data-action="finish-session" type="button">Salvar e voltar ao meu dia <span aria-hidden="true">→</span></button></div></section></div>';
      return;
    }

    var type = ['Lembrar', 'Escutar', 'Falar'][stage];
    var icon = ['↗', '♫', '◉'][stage];
    var content = '';
    if (stage === 0 || stage === 1) {
      var selected = Object.prototype.hasOwnProperty.call(session.choices, stage) ? session.choices[stage] : null;
      var prompt = stage === 0
        ? '<div class="prompt-box"><span class="prompt-label">Qual é o sentido desta frase?</span><strong>' + escapeHtml(lesson.phrase) + '</strong></div>'
        : '<div class="prompt-box"><span class="prompt-label">Ouça a frase e escolha o sentido que entendeu.</span><strong>Qual tradução combina com o que você ouviu?</strong></div><div class="listen-row"><button class="listen-button" data-action="listen-phrase" type="button">♫ Ouvir frase novamente</button></div>';
      var feedback = selected === null ? '' : (selected === 1
        ? '<div class="answer-feedback">Isso mesmo. A frase significa: <strong>' + escapeHtml(lesson.meaning) + '</strong></div>'
        : '<div class="answer-feedback is-wrong">Quase. A melhor resposta é: <strong>' + escapeHtml(lesson.meaning) + '</strong></div>');
      content = '<div class="session-kicker"><i>' + icon + '</i> ' + type + ' o significado</div><h2>' + (stage === 0 ? 'Primeiro, puxe pela memória.' : 'Agora, escute com atenção.') + '</h2><p class="session-instruction">' + (stage === 0 ? 'Leia a frase em inglês e escolha a tradução mais próxima.' : 'Você pode ouvir a frase quantas vezes precisar. O texto em inglês fica escondido neste passo.') + '</p>' + prompt + '<div class="answer-list">' + renderChoiceOptions(lesson, stage, selected) + '</div>' + feedback + '<div class="session-actions"><span class="card-label">' + (stage === 0 ? 'Recuperação ativa' : 'Compreensão auditiva') + '</span><button class="primary-button" data-action="next-step" type="button"' + (selected === null ? ' disabled' : '') + '>Continuar <span aria-hidden="true">→</span></button></div>';
    } else {
      var result = session.speakingResult;
      var recognitionSupported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
      var status = result
        ? '<div class="transcript-box">Transcrição do navegador: “' + escapeHtml(result.transcript) + '”<br>Palavras da frase reconhecidas: ' + result.score + '%</div><div class="answer-feedback">' + (result.score >= 75 ? 'Boa prática! Continue falando em voz alta para ganhar confiança.' : 'Vale repetir devagar e comparar com a frase. Esta atividade não dá uma nota de pronúncia.') + '</div>'
        : '<div class="transcript-box" id="speechStatus">' + (recognitionSupported ? 'A transcrição é fornecida pelo navegador; a avaliação compara palavras, sem nota de pronúncia.' : 'Este navegador não oferece transcrição de fala aqui. Você pode digitar a frase para continuar.') + '</div>';
      content = '<div class="session-kicker"><i>' + icon + '</i> Falar em inglês</div><h2>Leia a frase em voz alta.</h2><p class="session-instruction">O objetivo é praticar a produção da frase. A transcrição ajuda você a comparar as palavras, mas não mede a pronúncia.</p><div class="speaking-card"><span class="eyebrow">SUA FRASE</span><strong>' + escapeHtml(lesson.phrase) + '</strong><small>Fale em inglês, com calma. Você pode tentar mais de uma vez.</small></div><div class="speaking-controls"><button class="listen-button" data-action="start-recognition" type="button">◉ Gravar minha fala</button><button class="secondary-button" data-action="listen-phrase" type="button">♫ Ouvir exemplo</button></div><label class="field-label" for="typedAnswer" style="margin-top:17px">Ou digite o que você falou</label><input id="typedAnswer" type="text" autocomplete="off" placeholder="Digite a frase em inglês"' + (result ? ' value="' + escapeHtml(result.transcript) + '"' : '') + '><div class="session-actions"><button class="quiet-button" data-action="skip-speaking" type="button">Pular esta etapa</button><button class="secondary-button" data-action="check-speaking" type="button">Conferir tentativa</button></div>' + status + '<div class="session-actions"><span class="card-label">Produção oral</span><button class="primary-button" data-action="next-step" type="button"' + (result ? '' : ' disabled') + '>' + (result ? 'Concluir prática' : 'Fale ou digite para continuar') + ' <span aria-hidden="true">→</span></button></div>';
    }
    appView.innerHTML = '<div class="session-shell">' + header + '<section class="session-panel">' + content + '</section></div>';
  }

  function addLessonForReview(lesson) {
    var existing = data.words.find(function (word) { return word.id === lesson.id; });
    if (existing) {
      existing.seenCount = (existing.seenCount || 0) + 1;
      existing.dueAt = new Date(Date.now() + DAY_MS).toISOString();
      existing.intervalDays = Math.max(existing.intervalDays || 0, 1);
      return;
    }
    data.words.push({ id: lesson.id, term: lesson.word, meaning: lesson.meaning, example: lesson.phrase, level: (data.profile && data.profile.level) || 'B1', dueAt: new Date(Date.now() + DAY_MS).toISOString(), intervalDays: 1, seenCount: 1 });
  }

  function finishSession() {
    if (!currentSession) return;
    var lesson = getLesson();
    var elapsed = Math.max(1, Math.round((Date.now() - currentSession.startedAt) / 60000));
    data.history.push({ date: todayKey(), minutes: elapsed, phrase: lesson.phrase });
    addLessonForReview(lesson);
    saveData();
    currentSession = null;
    currentView = 'today';
    renderCurrentView();
    showToast('Prática salva neste aparelho. Até amanhã!');
  }

  function renderReview() {
    var due = dueWords();
    if (!due.length) {
      appView.innerHTML = '<section class="page-heading"><div><div class="eyebrow">REVISÃO ESPAÇADA</div><h1>Você está em dia.</h1><p>As palavras voltam para revisão em intervalos crescentes.</p></div></section><div class="empty-state"><span class="finish-mark" aria-hidden="true">✓</span><h3>Nenhuma revisão para agora</h3><p>Uma pequena sessão hoje já ajuda seu inglês a continuar avançando. Volte quando as próximas palavras aparecerem.</p><button class="primary-button" style="margin-top:18px" data-action="go-today" type="button">Voltar ao meu dia</button></div>';
      return;
    }
    var card = due[0];
    var answer = reviewRevealed ? '<div class="review-answer"><strong>' + escapeHtml(card.meaning) + '</strong><p>' + escapeHtml(card.example || '') + '</p></div><div class="review-ratings"><button class="hard" data-action="rate-card" data-rating="hard" data-card="' + escapeHtml(card.id) + '" type="button">Precisei de ajuda · repetir amanhã</button><button data-action="rate-card" data-rating="easy" data-card="' + escapeHtml(card.id) + '" type="button">Lembrei · ver depois</button></div>' : '<button class="primary-button full-width" data-action="reveal-card" type="button">Ver resposta <span aria-hidden="true">→</span></button>';
    appView.innerHTML = '<section class="page-heading"><div><div class="eyebrow">REVISÃO ESPAÇADA</div><h1>Vamos lembrar juntos.</h1><p>Traga a palavra à memória antes de revelar a tradução.</p></div><span class="heading-note">' + due.length + ' restantes agora</span></section><section class="review-layout"><article class="review-card"><div class="review-word"><div><div class="eyebrow">' + escapeHtml(card.level || 'B1') + ' · TENTE LEMBRAR</div><h2>' + escapeHtml(card.term) + '</h2><p>Como você diria isso em português?</p></div></div>' + answer + '</article><aside class="review-sidebar"><h3>Um intervalo de cada vez</h3><p>Relembrar sem consultar fortalece a memória. Se ficou difícil, a palavra retorna antes; se lembrou, o intervalo aumenta.</p><strong class="review-big">' + due.length + '</strong><p>' + (due.length === 1 ? 'palavra aguardando revisão' : 'palavras aguardando revisão') + '</p></aside></section>';
  }

  function rateCard(id, rating) {
    var card = data.words.find(function (word) { return word.id === id; });
    if (!card) return;
    card.seenCount = (card.seenCount || 0) + 1;
    if (rating === 'easy') {
      card.intervalDays = card.intervalDays ? Math.min(60, Math.round(card.intervalDays * 2)) : 1;
    } else {
      card.intervalDays = 1;
    }
    card.lastReviewed = new Date().toISOString();
    card.dueAt = new Date(Date.now() + card.intervalDays * DAY_MS).toISOString();
    reviewRevealed = false;
    saveData();
    renderCurrentView();
    showToast(rating === 'easy' ? 'Ótimo. Esta palavra volta mais tarde.' : 'Tudo bem. Esta palavra volta amanhã.');
  }

  function renderProgress() {
    var today = todayKey();
    var dayItems = [];
    for (var i = -6; i <= 0; i += 1) {
      var key = dayKeyOffset(i);
      var date = new Date();
      date.setDate(date.getDate() + i);
      var minutes = data.history.filter(function (entry) { return entry.date === key; }).reduce(function (sum, entry) { return sum + (Number(entry.minutes) || 0); }, 0);
      dayItems.push({ key: key, label: shortWeekday(date), minutes: minutes, today: key === today });
    }
    var max = Math.max.apply(null, dayItems.map(function (item) { return item.minutes; }).concat([1]));
    var chart = dayItems.map(function (item) {
      var height = Math.max(item.minutes ? 8 : 2, Math.round((item.minutes / max) * 100));
      return '<div class="chart-day' + (item.today ? ' is-today' : '') + '"><div class="chart-bar-track"><span class="chart-bar" style="height:' + height + '%"></span></div><strong>' + item.minutes + '</strong><span>' + item.label + '</span></div>';
    }).join('');
    var uniquePhrases = new Set(data.history.map(function (entry) { return entry.phrase; }).filter(Boolean)).size;
    var practicedCards = data.words.filter(function (word) { return (word.seenCount || 0) > 0; }).length;
    appView.innerHTML = '<section class="page-heading"><div><div class="eyebrow">SEU CAMINHO</div><h1>Consistência em construção.</h1><p>Veja o tempo de prática e as frases que você revisitou.</p></div></section><section class="progress-grid"><article class="stat-card"><span class="card-label">Sequência atual</span><strong>' + currentStreak() + ' ' + (currentStreak() === 1 ? 'dia' : 'dias') + '</strong><small>dias com prática registrada</small></article><article class="stat-card"><span class="card-label">Tempo total</span><strong>' + totalMinutes() + ' min</strong><small>tempo registrado no aparelho</small></article><article class="stat-card"><span class="card-label">Frases praticadas</span><strong>' + uniquePhrases + '</strong><small>em ' + data.history.length + ' sessões</small></article></section><article class="content-card chart-card"><div class="section-title"><h3>Seus últimos sete dias</h3><span class="card-label">minutos registrados</span></div><div class="chart-bars" aria-label="Minutos praticados por dia">' + chart + '</div><div class="progress-note"><b>✦</b><p>Revisões concluídas em palavras: ' + practicedCards + '. A barra mostra apenas o tempo medido durante as sessões deste aparelho. Manter contato frequente com o idioma é um bom passo; os dados não preveem quando alguém ficará fluente.</p></div></article>';
  }

  function normalizeWords(value) {
    return String(value || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
  }

  function checkSpeaking(transcript) {
    var value = String(transcript || '').trim();
    if (!value) { showToast('Digite a frase ou grave sua fala para conferir.'); return; }
    var expected = new Set(normalizeWords(getLesson().phrase));
    var actual = new Set(normalizeWords(value));
    var matched = 0;
    expected.forEach(function (word) { if (actual.has(word)) matched += 1; });
    var score = expected.size ? Math.round((matched / expected.size) * 100) : 0;
    currentSession.speakingResult = { transcript: value, score: score };
    renderSession();
  }

  function playLessonPhrase() {
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      showToast('A leitura em voz alta não está disponível neste navegador.');
      return;
    }
    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance(getLesson().phrase);
    utterance.lang = 'en-US';
    utterance.rate = 0.88;
    window.speechSynthesis.speak(utterance);
  }

  function startRecognition() {
    var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      showToast('A gravação não está disponível aqui. Você pode digitar sua tentativa.');
      var input = document.getElementById('typedAnswer');
      if (input) input.focus();
      return;
    }
    var recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    var status = document.getElementById('speechStatus');
    if (status) status.textContent = 'O microfone está ativo. Fale a frase em inglês; a transcrição vem do navegador.';
    recognition.onresult = function (event) {
      if (!currentSession) return;
      var transcript = event.results[0][0].transcript;
      checkSpeaking(transcript);
    };
    recognition.onerror = function (event) {
      showToast(event.error === 'not-allowed' ? 'O navegador não autorizou o microfone. Você ainda pode digitar.' : 'Não consegui ouvir desta vez. Tente de novo ou digite a frase.');
    };
    recognition.start();
  }

  function handleAction(button) {
    var action = button.getAttribute('data-action');
    if (action === 'go-review') { currentSession = null; currentView = 'review'; reviewRevealed = false; renderCurrentView(); }
    else if (action === 'go-today') { currentSession = null; currentView = 'today'; renderCurrentView(); }
    else if (action === 'start-session') { currentView = 'today'; reviewRevealed = false; currentSession = { step: 0, choices: {}, startedAt: Date.now(), speakingResult: null }; renderSession(); }
    else if (action === 'select-choice' && currentSession) { currentSession.choices[currentSession.step] = Number(button.getAttribute('data-index')); renderSession(); }
    else if (action === 'next-step' && currentSession) {
      var stage = currentSession.step;
      if ((stage < 2 && !Object.prototype.hasOwnProperty.call(currentSession.choices, stage)) || (stage === 2 && !currentSession.speakingResult)) return;
      currentSession.step += 1;
      renderSession();
    }
    else if (action === 'finish-session') finishSession();
    else if (action === 'leave-session') { currentSession = null; currentView = 'today'; renderCurrentView(); }
    else if (action === 'skip-speaking' && currentSession) { currentSession.speakingResult = { transcript: 'Etapa pulada', score: 0 }; currentSession.step = 3; renderSession(); }
    else if (action === 'listen-phrase') playLessonPhrase();
    else if (action === 'start-recognition') startRecognition();
    else if (action === 'check-speaking') { var input = document.getElementById('typedAnswer'); checkSpeaking(input && input.value); }
    else if (action === 'reveal-card') { reviewRevealed = true; renderReview(); }
    else if (action === 'rate-card') rateCard(button.getAttribute('data-card'), button.getAttribute('data-rating'));
  }

  document.querySelectorAll('[data-view]').forEach(function (button) {
    button.addEventListener('click', function () {
      currentSession = null;
      currentView = button.getAttribute('data-view');
      reviewRevealed = false;
      renderCurrentView();
      window.scrollTo(0, 0);
    });
  });

  document.querySelectorAll('.brand').forEach(function (link) {
    link.addEventListener('click', function (event) { event.preventDefault(); currentSession = null; currentView = 'today'; renderCurrentView(); });
  });

  appView.addEventListener('click', function (event) {
    var button = event.target.closest('[data-action]');
    if (button && !button.disabled) handleAction(button);
  });

  document.getElementById('profileForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    data.profile = {
      name: form.elements.name.value.trim().slice(0, 32) || 'Learner',
      level: form.elements.level.value || 'B1',
      minutes: Number(form.elements.minutes.value) || 15
    };
    saveData();
    profileModal.hidden = true;
    renderCurrentView();
    showToast('Seu plano foi salvo neste aparelho.');
  });

  document.getElementById('profileButton').addEventListener('click', openProfile);
  document.getElementById('settingsButton').addEventListener('click', openProfile);
  document.getElementById('closeProfile').addEventListener('click', closeProfile);
  profileModal.addEventListener('click', function (event) { if (event.target === profileModal) closeProfile(); });
  document.getElementById('resetButton').addEventListener('click', function () {
    if (!window.confirm('Apagar o perfil, o progresso e as revisões salvos neste aparelho?')) return;
    localStorage.removeItem(STORAGE_KEY);
    data = makeFreshData();
    currentSession = null;
    currentView = 'today';
    renderCurrentView();
    openProfile();
  });
  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !profileModal.hidden) closeProfile(); });

  renderCurrentView();
  if (!data.profile) openProfile();
})();
