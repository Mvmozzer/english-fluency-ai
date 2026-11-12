(function () {
  'use strict';

  var LEVELS = { A1: 'Iniciante', A2: 'Básico', B1: 'Intermediário', B2: 'Avançado', C1: 'Proficiente' };
  var ROWS = [
    ["A1","Meu nome é Ana.","My name is Ana."],
    ["A1","Eu moro no Brasil.","I live in Brazil."],
    ["A1","Eu trabalho em casa.","I work at home."],
    ["A1","Eu tenho um irmão e uma irmã.","I have a brother and a sister."],
    ["A1","Esta é minha família.","This is my family."],
    ["A1","Eu gosto de café.","I like coffee."],
    ["A1","Eu não bebo leite.","I don't drink milk.","I do not drink milk."],
    ["A1","Ela está na cozinha.","She is in the kitchen."],
    ["A1","O gato está debaixo da mesa.","The cat is under the table."],
    ["A1","Nós estamos prontos.","We are ready."],
    ["A1","Você está ocupado agora?","Are you busy now?"],
    ["A1","Este é meu livro.","This is my book."],
    ["A1","A chave está na bolsa.","The key is in the bag."],
    ["A1","Eu preciso de ajuda.","I need help."],
    ["A1","Por favor, feche a porta.","Please close the door."],
    ["A1","Eu acordo às sete.","I wake up at seven."],
    ["A1","Ele toma café da manhã cedo.","He has breakfast early."],
    ["A1","Nós vamos à escola a pé.","We walk to school."],
    ["A1","Eu estudo inglês à noite.","I study English at night."],
    ["A1","Hoje está muito quente.","It is very hot today.","It's very hot today."],
    ["A1","Está chovendo agora.","It is raining now.","It's raining now."],
    ["A1","Eu quero um copo de água.","I want a glass of water."],
    ["A1","Quanto custa esta camisa?","How much is this shirt?"],
    ["A1","Posso pagar com cartão?","Can I pay by card?"],
    ["A1","A loja abre às nove.","The store opens at nine."],
    ["A1","Meu ônibus está atrasado.","My bus is late."],
    ["A1","A estação fica perto daqui.","The station is near here."],
    ["A1","Vire à esquerda na próxima rua.","Turn left at the next street."],
    ["A1","Minha amiga mora aqui.","My friend lives here."],
    ["A1","Eu vejo você amanhã.","I will see you tomorrow.","I'll see you tomorrow."],
    ["A1","Este é meu primeiro dia.","This is my first day."],
    ["A1","Ele tem duas crianças.","He has two children."],
    ["A1","Há uma cadeira na sala.","There is a chair in the room.","There's a chair in the room."],
    ["A1","O banheiro fica à direita.","The bathroom is on the right."],
    ["A1","Eu posso falar um pouco de inglês.","I can speak a little English."],
    ["A1","Repita, por favor.","Please say that again."],
    ["A1","Você pode me ajudar?","Can you help me?"],
    ["A1","Eu não entendo essa palavra.","I don't understand this word.","I do not understand this word."],
    ["A1","Como se escreve seu nome?","How do you spell your name?"],
    ["A1","Ela está feliz hoje.","She is happy today.","She's happy today."],

    ["A2","Geralmente almoço ao meio-dia.","I usually have lunch at noon."],
    ["A2","Ela visita os pais todo domingo.","She visits her parents every Sunday."],
    ["A2","Nós estamos esperando o trem.","We are waiting for the train."],
    ["A2","Ele não trabalha às sextas-feiras.","He doesn't work on Fridays.","He does not work on Fridays."],
    ["A2","Você já terminou o relatório?","Have you finished the report yet?"],
    ["A2","Eu fui ao mercado depois do trabalho.","I went to the supermarket after work."],
    ["A2","Ontem nós assistimos a um filme.","We watched a movie yesterday."],
    ["A2","Ela comprou um casaco novo.","She bought a new coat."],
    ["A2","Meu irmão estava dormindo quando liguei.","My brother was sleeping when I called."],
    ["A2","Estava frio, então fiquei em casa.","It was cold, so I stayed home."],
    ["A2","Vamos nos encontrar na frente do cinema.","Let's meet in front of the cinema."],
    ["A2","A farmácia fica entre o banco e o mercado.","The pharmacy is between the bank and the supermarket."],
    ["A2","Eu gostaria de reservar uma mesa para dois.","I would like to book a table for two.","I'd like to book a table for two."],
    ["A2","Pode me trazer o cardápio, por favor?","Could you bring me the menu, please?"],
    ["A2","O voo sai às seis da manhã.","The flight leaves at six in the morning."],
    ["A2","Por que você chegou tão tarde?","Why did you arrive so late?"],
    ["A2","Eu perdi meu cartão ontem.","I lost my card yesterday."],
    ["A2","Nós ainda não decidimos o que fazer.","We haven't decided what to do yet.","We have not decided what to do yet."],
    ["A2","Ele está aprendendo a dirigir.","He is learning to drive."],
    ["A2","Você costuma caminhar antes do café?","Do you usually go for a walk before breakfast?"],
    ["A2","Preciso comprar alguns ingredientes para o jantar.","I need to buy some ingredients for dinner."],
    ["A2","A comida estava deliciosa, mas um pouco salgada.","The food was delicious, but a little salty."],
    ["A2","Ela usa o computador para estudar.","She uses the computer to study."],
    ["A2","Minha casa é menor que a sua.","My house is smaller than yours."],
    ["A2","Este caminho é mais rápido.","This route is faster."],
    ["A2","A viagem levou cerca de três horas.","The trip took about three hours."],
    ["A2","Eles moram no segundo andar.","They live on the second floor."],
    ["A2","Eu estava procurando minhas chaves.","I was looking for my keys."],
    ["A2","A reunião foi cancelada por causa da chuva.","The meeting was canceled because of the rain."],
    ["A2","Se chover amanhã, vamos ficar em casa.","If it rains tomorrow, we will stay home.","If it rains tomorrow, we'll stay home."],
    ["A2","Eu prefiro chá sem açúcar.","I prefer tea without sugar."],
    ["A2","Ela deixou a carteira no táxi.","She left her wallet in the taxi."],
    ["A2","Ele me perguntou o endereço.","He asked me for the address."],
    ["A2","Nossa equipe terminou o projeto a tempo.","Our team finished the project on time."],
    ["A2","Você poderia falar mais devagar?","Could you speak more slowly?"],
    ["A2","Eu tenho que acordar cedo amanhã.","I have to get up early tomorrow."],
    ["A2","As crianças estão brincando no jardim.","The children are playing in the garden."],
    ["A2","Ela nunca esteve em Londres.","She has never been to London."],
    ["A2","Vamos sair depois que a chuva parar.","We will go out after the rain stops."],
    ["A2","Meu computador está funcionando novamente.","My computer is working again."],
    ["A2","Eu já li esse livro duas vezes.","I have already read this book twice."],

    ["B1","Estou tentando economizar dinheiro este mês.","I am trying to save money this month.","I'm trying to save money this month."],
    ["B1","Ela trabalha aqui desde 2022.","She has worked here since 2022."],
    ["B1","Ainda não recebemos uma resposta do cliente.","We haven't received an answer from the client yet."],
    ["B1","Eu teria ligado se tivesse seu número.","I would have called if I had your number."],
    ["B1","Embora estivesse cansado, ele terminou o relatório.","Although he was tired, he finished the report."],
    ["B1","O trem foi cancelado devido ao mau tempo.","The train was canceled because of the bad weather."],
    ["B1","Você se importaria de fechar a janela?","Would you mind closing the window?"],
    ["B1","Nós precisamos descobrir por que o sistema parou.","We need to figure out why the system stopped."],
    ["B1","Ela ficou sem tempo antes da apresentação.","She ran out of time before the presentation."],
    ["B1","Costumo ouvir podcasts enquanto vou para o trabalho.","I usually listen to podcasts on my way to work."],
    ["B1","Ele pediu desculpas por ter chegado atrasado.","He apologized for arriving late."],
    ["B1","Estou ansioso para conhecer sua equipe.","I am looking forward to meeting your team.","I'm looking forward to meeting your team."],
    ["B1","Se você reservar agora, vai pagar menos.","If you book now, you will pay less.","If you book now, you'll pay less."],
    ["B1","A reunião foi adiada para a próxima semana.","The meeting was postponed until next week."],
    ["B1","Ela me contou que havia mudado de emprego.","She told me that she had changed jobs."],
    ["B1","Eu não estou acostumado a trabalhar à noite.","I am not used to working at night.","I'm not used to working at night."],
    ["B1","Eles decidiram seguir em frente com o plano.","They decided to go ahead with the plan."],
    ["B1","Quanto mais você pratica, mais natural fica.","The more you practice, the more natural it feels."],
    ["B1","Recebi seu e-mail, mas ainda não respondi.","I received your email, but I haven't replied yet."],
    ["B1","Nosso voo chegou trinta minutos antes.","Our flight arrived thirty minutes early."],
    ["B1","Ela se ofereceu para ajudar a organizar o evento.","She offered to help organize the event."],
    ["B1","A empresa está procurando um novo gerente.","The company is looking for a new manager."],
    ["B1","Mesmo que chova, o jogo vai acontecer.","Even if it rains, the game will take place."],
    ["B1","Fiquei surpreso ao descobrir que morávamos perto.","I was surprised to find out that we lived nearby."],
    ["B1","Você sabe como chegar ao centro da cidade?","Do you know how to get to the city center?"],
    ["B1","Eu prefiro trabalhar em equipe a trabalhar sozinho.","I prefer working in a team to working alone."],
    ["B1","Ele explicou o problema de uma maneira simples.","He explained the problem in a simple way."],
    ["B1","Já faz três semanas que comecei este curso.","I started this course three weeks ago."],
    ["B1","Não consegui encontrar as informações de que precisava.","I couldn't find the information I needed.","I could not find the information I needed."],
    ["B1","Eles estão considerando mudar para outro bairro.","They are considering moving to another neighborhood."],
    ["B1","Antes de enviar o formulário, confira seus dados.","Before you send the form, check your information."],
    ["B1","O restaurante onde jantamos estava lotado.","The restaurant where we had dinner was crowded."],
    ["B1","Eu deveria ter trazido um casaco.","I should have brought a coat."],
    ["B1","Ela precisa equilibrar o trabalho e a vida pessoal.","She needs to balance work and her personal life."],
    ["B1","A decisão depende de quanto vai custar.","The decision depends on how much it will cost."],
    ["B1","Tentei entrar em contato com você ontem.","I tried to get in touch with you yesterday."],
    ["B1","Ele perguntou se eu poderia participar da entrevista.","He asked if I could take part in the interview."],
    ["B1","Estamos fazendo o possível para resolver o problema.","We are doing our best to solve the problem."],
    ["B1","A notícia se espalhou rapidamente pela cidade.","The news spread quickly through the city."],
    ["B1","Quando cheguei, eles já tinham começado a reunião.","When I arrived, they had already started the meeting."],

    ["B2","A empresa está revendo sua política de trabalho remoto.","The company is reviewing its remote work policy."],
    ["B2","A proposta foi aprovada após uma longa discussão.","The proposal was approved after a lengthy discussion."],
    ["B2","Ela preferiu não comentar os detalhes da negociação.","She chose not to comment on the details of the negotiation."],
    ["B2","A falta de transporte público torna o bairro menos acessível.","The lack of public transportation makes the neighborhood less accessible."],
    ["B2","O relatório destaca a importância de investir em prevenção.","The report highlights the importance of investing in prevention."],
    ["B2","Eu não teria aceitado o convite sem saber quem estaria lá.","I wouldn't have accepted the invitation without knowing who would be there.","I would not have accepted the invitation without knowing who would be there."],
    ["B2","Embora a mudança pareça pequena, ela pode ter grande impacto.","Although the change may seem small, it could have a major impact."],
    ["B2","O gerente pediu que o prazo fosse estendido até sexta-feira.","The manager asked for the deadline to be extended until Friday."],
    ["B2","A equipe encontrou uma maneira de reduzir custos sem comprometer a qualidade.","The team found a way to cut costs without compromising quality."],
    ["B2","Ele assumiu a responsabilidade pelo erro.","He took responsibility for the mistake."],
    ["B2","O projeto foi interrompido por falta de financiamento.","The project was halted because of a lack of funding."],
    ["B2","Os dados sugerem uma melhora gradual nos resultados.","The data suggests a gradual improvement in the results."],
    ["B2","Ela conseguiu convencer os colegas a testar uma abordagem diferente.","She managed to persuade her colleagues to try a different approach."],
    ["B2","A decisão será anunciada assim que a revisão terminar.","The decision will be announced as soon as the review is complete."],
    ["B2","O novo sistema é mais eficiente do que o anterior.","The new system is more efficient than the previous one."],
    ["B2","É improvável que a reunião termine antes das cinco.","The meeting is unlikely to end before five."],
    ["B2","O acordo só entrou em vigor depois de ser assinado pelas duas partes.","The agreement did not take effect until it was signed by both parties."],
    ["B2","A população local foi consultada antes do início das obras.","The local population was consulted before construction began."],
    ["B2","Não há evidências suficientes para apoiar essa conclusão.","There is not enough evidence to support that conclusion.","There isn't enough evidence to support that conclusion."],
    ["B2","A demanda aumentou apesar da elevação dos preços.","Demand increased despite the rise in prices."],
    ["B2","O evento foi organizado em parceria com uma universidade.","The event was organized in partnership with a university."],
    ["B2","A mudança afetará principalmente os funcionários recém-contratados.","The change will mainly affect newly hired employees."],
    ["B2","Ele demonstrou cautela ao compartilhar informações confidenciais.","He showed caution when sharing confidential information."],
    ["B2","O objetivo é tornar o processo mais transparente.","The goal is to make the process more transparent."],
    ["B2","Não devemos ignorar os efeitos de longo prazo.","We should not ignore the long-term effects."],
    ["B2","A decisão levou em conta as necessidades de todos os departamentos.","The decision took the needs of every department into account."],
    ["B2","Ela está se preparando para assumir um papel de liderança.","She is preparing to take on a leadership role."],
    ["B2","O documento deve ser revisado antes de ser publicado.","The document should be reviewed before it is published."],
    ["B2","Seria mais fácil resolver isso se tivéssemos acesso aos dados.","It would be easier to solve this if we had access to the data."],
    ["B2","A equipe manteve a calma diante de uma situação inesperada.","The team remained calm in the face of an unexpected situation."],
    ["B2","O atraso ocorreu porque várias etapas foram concluídas fora de ordem.","The delay occurred because several steps were completed out of order."],
    ["B2","O resultado foi melhor do que qualquer um havia previsto.","The result was better than anyone had predicted."],
    ["B2","Ele levantou uma questão importante sobre a segurança dos dados.","He raised an important question about data security."],
    ["B2","A empresa pretende expandir suas operações para outros mercados.","The company plans to expand its operations into other markets."],
    ["B2","Ela pediu esclarecimentos antes de concordar com a proposta.","She asked for clarification before agreeing to the proposal."],
    ["B2","Mesmo com recursos limitados, o grupo concluiu a pesquisa.","Despite limited resources, the group completed the research."],
    ["B2","A solução precisa funcionar tanto para clientes quanto para funcionários.","The solution needs to work for both customers and employees."],
    ["B2","A nova regra entrará em vigor no início do próximo ano.","The new rule will come into effect at the beginning of next year."],
    ["B2","Os moradores expressaram preocupação com o aumento do tráfego.","Residents expressed concern about the increase in traffic."],
    ["B2","O contrato pode ser renovado se ambas as partes concordarem.","The contract can be renewed if both parties agree."],

    ["C1","A análise questiona a suposição de que o crescimento econômico beneficie todos igualmente.","The analysis challenges the assumption that economic growth benefits everyone equally."],
    ["C1","O comitê adiou a decisão até que pudesse avaliar as consequências a longo prazo.","The committee postponed the decision until it could assess the long-term consequences."],
    ["C1","A pesquisadora ressalvou que os resultados não deveriam ser generalizados.","The researcher cautioned that the results should not be generalized."],
    ["C1","A nova política pretende equilibrar transparência e proteção de dados.","The new policy aims to balance transparency with data protection."],
    ["C1","A falta de consenso não impediu que o grupo chegasse a um acordo.","The lack of consensus did not prevent the group from reaching an agreement."],
    ["C1","O artigo oferece uma visão detalhada de como as prioridades mudaram ao longo do tempo.","The article offers a detailed account of how priorities have shifted over time."],
    ["C1","A medida foi criticada por não levar em conta as necessidades das comunidades rurais.","The measure was criticized for failing to take the needs of rural communities into account."],
    ["C1","Ele explicou o problema com uma clareza que tornou a discussão mais produtiva.","He explained the problem with a clarity that made the discussion more productive."],
    ["C1","As evidências disponíveis são insuficientes para sustentar uma afirmação tão abrangente.","The available evidence is insufficient to support such a sweeping claim."],
    ["C1","A empresa reconheceu que a comunicação poderia ter sido mais cuidadosa.","The company acknowledged that the communication could have been more careful."],
    ["C1","Embora a hipótese seja plausível, ainda precisa ser testada em outros contextos.","Although the hypothesis is plausible, it still needs to be tested in other contexts."],
    ["C1","A equipe identificou obstáculos que haviam passado despercebidos na análise inicial.","The team identified obstacles that had gone unnoticed in the initial analysis."],
    ["C1","A proposta foi reformulada para contemplar as preocupações levantadas durante a consulta.","The proposal was revised to address the concerns raised during the consultation."],
    ["C1","O relatório distingue entre efeitos imediatos e consequências que só surgem com o tempo.","The report distinguishes between immediate effects and consequences that only emerge over time."],
    ["C1","A principal dificuldade não está em coletar dados, mas em interpretá-los corretamente.","The main difficulty lies not in collecting data, but in interpreting it correctly."],
    ["C1","Seria prematuro concluir que a intervenção, por si só, causou a melhora observada.","It would be premature to conclude that the intervention alone caused the observed improvement."],
    ["C1","O diretor enfatizou que a responsabilidade não poderia ser atribuída a um único departamento.","The director emphasized that responsibility could not be attributed to a single department."],
    ["C1","A controvérsia revelou diferenças profundas na forma como as partes definem sucesso.","The controversy revealed deep differences in how the parties define success."],
    ["C1","A estratégia foi concebida para se adaptar a circunstâncias que mudam rapidamente.","The strategy was designed to adapt to rapidly changing circumstances."],
    ["C1","O estudo contribui para um debate que permanece longe de uma resolução definitiva.","The study contributes to a debate that remains far from a definitive resolution."],
    ["C1","Apesar da pressão por resultados, ela se recusou a comprometer a integridade da pesquisa.","Despite pressure to deliver results, she refused to compromise the integrity of the research."],
    ["C1","A iniciativa depende de uma cooperação que raramente é alcançada sem negociações.","The initiative depends on a degree of cooperation that is rarely achieved without negotiation."],
    ["C1","O parecer reconhece as limitações do método, sem desconsiderar sua utilidade.","The assessment acknowledges the method's limitations without dismissing its usefulness."],
    ["C1","A mudança foi apresentada como inevitável, embora alternativas viáveis estivessem disponíveis.","The change was presented as inevitable, although viable alternatives were available."],
    ["C1","O texto é convincente até o ponto em que começa a tratar correlação como causalidade.","The argument is convincing until it begins to treat correlation as causation."],
    ["C1","A decisão aparentemente técnica teve implicações políticas consideráveis.","The seemingly technical decision had considerable political implications."],
    ["C1","O acordo estabelece mecanismos para que as divergências sejam resolvidas de maneira imparcial.","The agreement establishes mechanisms for resolving disagreements impartially."],
    ["C1","Convém perguntar se a economia obtida justifica a complexidade adicional do processo.","It is worth asking whether the savings justify the additional complexity of the process."],
    ["C1","Ela fez uma distinção sutil entre estar disponível e estar efetivamente comprometida.","She drew a subtle distinction between being available and being genuinely committed."],
    ["C1","O argumento perde força quando deixa de considerar evidências contrárias.","The argument loses strength when it fails to consider evidence to the contrary."],
    ["C1","Nenhuma das partes estava disposta a reabrir os termos acordados anteriormente.","Neither party was willing to revisit the terms previously agreed upon."],
    ["C1","A solução só será sustentável se os custos forem distribuídos de forma equitativa.","The solution will only be sustainable if the costs are distributed equitably."],
    ["C1","O pesquisador evitou extrapolar os resultados para além do escopo do estudo.","The researcher avoided extrapolating the results beyond the scope of the study."],
    ["C1","A resposta foi proporcional à gravidade da situação.","The response was proportionate to the seriousness of the situation."],
    ["C1","O documento foi atualizado para refletir o entendimento mais recente sobre o tema.","The document was updated to reflect the latest understanding of the subject."],
    ["C1","A empresa agiu rapidamente, sem esclarecer quais critérios orientaram a decisão.","The company acted quickly without clarifying which criteria informed the decision."],
    ["C1","A aparente simplicidade da medida esconde uma série de desafios de implementação.","The apparent simplicity of the measure conceals a range of implementation challenges."],
    ["C1","O debate deveria incluir as pessoas mais diretamente afetadas pela política.","The debate should include the people most directly affected by the policy."],
    ["C1","O resultado não invalida as descobertas anteriores, mas exige que sejam reinterpretadas.","The result does not invalidate the previous findings, but it does call for them to be reinterpreted."],
    ["C1","Ela questionou a premissa de que eficiência e equidade seriam incompatíveis.","She challenged the premise that efficiency and equity are incompatible."],
    ["C1","A equipe procurou minimizar a interrupção sem sacrificar a segurança.","The team sought to minimize disruption without compromising safety."],
    ["C1","O comunicado foi redigido para evitar ambiguidades em um momento delicado.","The statement was drafted to avoid ambiguity at a delicate moment."],
    ["C1","O sucesso da iniciativa dependerá de sua capacidade de conquistar a confiança do público.","The initiative's success will depend on its ability to earn the public's trust."],
    ["C1","O relatório não esclarece por que algumas regiões foram excluídas da amostra.","The report does not explain why some regions were excluded from the sample."],
    ["C1","Ainda que as medidas sejam necessárias, sua aplicação deve permanecer sujeita a revisão.","Even if the measures are necessary, their implementation should remain subject to review."],
    ["C1","A discussão se concentrou menos no que era possível e mais no que era desejável.","The discussion focused less on what was possible and more on what was desirable."],
    ["C1","Ele apresentou uma avaliação equilibrada, reconhecendo tanto os avanços quanto as falhas.","He offered a balanced assessment, acknowledging both the progress and the shortcomings."],
    ["C1","A questão central é se os benefícios compensam os riscos envolvidos.","The central question is whether the benefits outweigh the risks involved."],
    ["C1","A política entrou em vigor antes que os órgãos responsáveis estivessem preparados.","The policy took effect before the responsible agencies were prepared."],
    ["C1","A autora argumenta que a linguagem usada para descrever o problema influencia as soluções propostas.","The author argues that the language used to describe the problem shapes the proposed solutions."]
    ["A1","Eu tenho um cachorro pequeno.","I have a small dog."],
    ["A1","Nós estamos em casa.","We are at home."],
    ["A1","Ela é minha professora.","She is my teacher."],
    ["A1","Há três maçãs.","There are three apples."],
    ["A1","Eu gosto desta música.","I like this song."],
    ["A1","Minha mãe é médica.","My mother is a doctor."],
    ["A1","As crianças estão no parque.","The children are in the park."],
    ["A1","Abra seu livro, por favor.","Open your book, please."],
    ["A1","Ele é mais alto do que eu.","He is taller than me.","He is taller than I am."],
    ["A1","Azul é minha cor favorita.","Blue is my favorite color."],
    ["A2","Geralmente jantamos às sete.","We usually have dinner at seven."],
    ["A2","Ela vai visitar a tia na próxima semana.","She is going to visit her aunt next week."],
    ["A2","Esqueci de trazer meu guarda-chuva.","I forgot to bring my umbrella."],
    ["A2","Havia muitas pessoas no show.","There were many people at the concert."],
    ["A2","Você já experimentou comida japonesa?","Have you ever tried Japanese food?"],
    ["A2","O ônibus para em frente ao hotel.","The bus stops in front of the hotel."],
    ["A2","Eu estava cozinhando quando o telefone tocou.","I was cooking when the phone rang."],
    ["A2","Eles moram aqui há cinco anos.","They have lived here for five years."],
    ["A2","Apague as luzes antes de sair, por favor.","Please turn off the lights before you leave."],
    ["B1","Se eu tivesse mais tempo livre, aprenderia espanhol.","If I had more free time, I would learn Spanish."],
    ["B1","Ela está trabalhando neste projeto a semana toda.","She has been working on this project all week."],
    ["B1","O pacote deve chegar até sexta-feira.","The package should arrive by Friday."],
    ["B1","Ele estava procurando um lugar tranquilo para estudar.","He was looking for a quiet place to study."],
    ["B1","Eu não percebi que horas eram.","I didn't realize what time it was.","I did not realize what time it was."],
    ["B1","Conseguimos terminar a apresentação a tempo.","We managed to finish the presentation on time."],
    ["B1","O hotel era mais barato do que esperávamos.","The hotel was cheaper than we expected."],
    ["B1","Você pode pegar meu notebook emprestado, desde que o devolva amanhã.","You can borrow my laptop as long as you return it tomorrow."],
    ["B1","Embora o trabalho fosse desafiador, aprendi muito.","Although the job was challenging, I learned a lot."],
    ["B1","Nunca vi um pôr do sol tão bonito.","I have never seen such a beautiful sunset."],
    ["B2","As descobertas devem ser interpretadas com cautela.","The findings should be interpreted with caution."],
    ["B2","A empresa está comprometida em reduzir seu impacto ambiental.","The company is committed to reducing its environmental impact."],
    ["B2","Ela propôs um acordo que ambos os lados poderiam aceitar.","She proposed a compromise that both sides could accept."],
    ["B2","A menos que recebamos novas instruções, seguiremos o plano original.","Unless we receive further instructions, we will follow the original plan."],
    ["B2","A política se aplica a todos os funcionários, independentemente de onde trabalhem.","The policy applies to all employees regardless of where they work."],
    ["B2","Há poucas evidências de que a nova abordagem será eficaz.","There is little evidence that the new approach will be effective."],
    ["B2","As declarações dele foram tiradas de contexto.","His remarks were taken out of context."],
    ["B2","Precisamos garantir que os números sejam consistentes em todo o relatório.","We need to make sure the figures are consistent throughout the report."],
    ["B2","A proposta foi rejeitada por ser considerada cara demais.","The proposal was rejected on the grounds that it was too costly."],
    ["B2","Ela é conhecida por ser minuciosa e justa.","She has a reputation for being thorough and fair."],
  ];
  var BANK = ROWS.map(function (row, index) {
    return { id: row[0].toLowerCase() + '-' + String(index + 1).padStart(3, '0'), level: row[0], prompt: row[1], answer: row[2], alternatives: row.slice(3) };
  });
  var LEGACY_KEY = 'fluency-app-v1';
  var STORAGE_KEY = 'fluency-writing-v1';
  var appView = document.getElementById('appView');
  var modal = document.getElementById('profileModal');
  var legacy = readLegacy();
  var profile = legacy.profile || null;
  var saved = readProgress();
  var progress = saved;
  var view = 'today';
  var session = null;
  var toastTimer = 0;

  function readLegacy() {
    try { return JSON.parse(localStorage.getItem(LEGACY_KEY)) || {}; }
    catch (error) { return {}; }
  }
  function readProgress() {
    try {
      var value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (value && value.cards && Array.isArray(value.history) && Array.isArray(value.sessions)) return value;
    } catch (error) { /* Start with an empty writing deck. */ }
    return { cards: {}, history: [], sessions: [] };
  }
  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
    catch (error) { toast('Não foi possível salvar o progresso neste aparelho.'); }
  }
  function saveProfile(nextProfile) {
    profile = nextProfile;
    legacy = readLegacy();
    legacy.profile = nextProfile;
    if (!Array.isArray(legacy.history)) legacy.history = [];
    if (!Array.isArray(legacy.words)) legacy.words = [];
    try { localStorage.setItem(LEGACY_KEY, JSON.stringify(legacy)); }
    catch (error) { toast('Não foi possível salvar o perfil neste aparelho.'); }
  }
  function safe(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
    });
  }
  function today() {
    var date = new Date();
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  }
  function level() { return profile && profile.level && LEVELS[profile.level] ? profile.level : 'A1'; }
  function name() { return profile && profile.name ? profile.name : 'estudante'; }
  function pool() { return BANK.filter(function (card) { return card.level === level(); }); }
  function dueCards() {
    var now = Date.now();
    return BANK.filter(function (card) {
      var record = progress.cards[card.id];
      return record && record.dueAt && new Date(record.dueAt).getTime() <= now;
    }).sort(function (a, b) { return new Date(progress.cards[a.id].dueAt) - new Date(progress.cards[b.id].dueAt); });
  }
  function newCards() { return pool().filter(function (card) { return !progress.cards[card.id]; }); }
  function learnedCount() {
    return BANK.filter(function (card) { return progress.cards[card.id] && (progress.cards[card.id].intervalDays || 0) >= 3; }).length;
  }
  function totalCorrect() { return progress.history.filter(function (item) { return item.correct; }).length; }
  function setHeader() {
    var sideName = document.getElementById('sideName');
    var sideLevel = document.getElementById('sideLevel');
    var sideAvatar = document.getElementById('sideAvatar');
    var profileButton = document.getElementById('profileButton');
    var label = document.getElementById('todayLabel');
    var initials = String(name()).trim().split(/\s+/).slice(0, 2).map(function (part) { return part.charAt(0); }).join('').toUpperCase();
    if (sideName) sideName.textContent = profile ? name() : 'Seu espaço';
    if (sideLevel) sideLevel.textContent = profile ? (level() + ' · ' + LEVELS[level()]) : 'Comece por você';
    if (sideAvatar) sideAvatar.textContent = initials || 'A';
    if (profileButton) profileButton.textContent = initials || 'A';
    if (label) label.textContent = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  }
  function updateNav() {
    document.querySelectorAll('[data-view]').forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute('data-view') === view);
    });
    var badge = document.getElementById('reviewCount');
    if (badge) badge.textContent = String(dueCards().length);
  }
  function toast(message) {
    var element = document.getElementById('toast');
    if (!element) return;
    element.textContent = message;
    element.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () { element.hidden = true; }, 3000);
  }
  function openProfile() {
    var form = document.getElementById('profileForm');
    form.elements.name.value = profile ? profile.name || '' : '';
    form.elements.level.value = profile ? profile.level || 'A1' : 'A1';
    form.elements.minutes.value = profile ? String(profile.minutes || 15) : '15';
    modal.hidden = false;
    document.getElementById('learnerName').focus();
  }
  function closeProfile() { if (profile) modal.hidden = true; }
  function formatInterval(days) {
    if (days < 1) return '10 minutos';
    if (days === 1) return '1 dia';
    return String(Math.round(days)) + ' dias';
  }
  function renderHome() {
    var due = dueCards().length;
    var fresh = newCards().length;
    var available = pool().length;
    appView.innerHTML =
      '<section class="page-heading"><div><div class="eyebrow">SUA PRÁTICA DE HOJE</div><h1>Vamos escrever, ' + safe(name()) + '.</h1><p>Leia em português, escreva em inglês e veja a correção na hora.</p></div><span class="heading-note">' + safe(level()) + ' · ' + available + ' frases disponíveis</span></section>' +
      '<section class="dashboard-grid" aria-label="Resumo da prática"><article class="hero-card"><div class="hero-top"><span class="hero-badge"><span>✦</span> ESCRITA ATIVA · ' + safe(level()) + '</span><h2>Aprenda lembrando, não só reconhecendo.</h2><p>Primeiro tente traduzir sem ajuda. Depois compare com a resposta e escolha quando quer rever.</p></div><div class="hero-bottom"><div class="hero-meta"><span>↻ ' + due + ' para revisar</span><span>＋ ' + Math.min(fresh, 10) + ' novas nesta sessão</span></div><button class="primary-button" data-action="start-session" type="button">Começar a escrever <span aria-hidden="true">→</span></button></div></article>' +
      '<article class="streak-card"><div><span class="card-label">Seu baralho</span><div class="streak-number"><strong>' + available + '</strong><span>frases</span></div></div><div><div class="streak-spark" aria-hidden="true">✦</div><span class="card-label">' + safe(level()) + ' · ' + safe(LEVELS[level()]) + '</span><div class="week-dots"><span class="day-dot is-done"><i>1</i><span>leia</span></span><span class="day-dot is-done"><i>2</i><span>escreva</span></span><span class="day-dot is-done"><i>3</i><span>revise</span></span></div></div></article></section>' +
      '<section class="daily-stats" aria-label="Seu progresso"><article class="stat-card"><span class="card-label">Prontas para revisar</span><strong>' + due + '</strong><small>Volte às frases no momento certo</small></article><article class="stat-card"><span class="card-label">Frases aprendidas</span><strong>' + learnedCount() + '</strong><small>Com intervalo de três dias ou mais</small></article><article class="stat-card"><span class="card-label">Respostas corretas</span><strong>' + totalCorrect() + '</strong><small>Salvas neste aparelho</small></article></section>' +
      '<section class="dashboard-lower"><article class="content-card"><div class="section-title"><h3>Como funciona</h3></div><div class="review-preview"><span class="review-glyph" aria-hidden="true">✎</span><div><strong>Uma frase de cada vez</strong><p>Traduza, veja a versão-modelo e marque se foi difícil ou fácil. A revisão espaçada agenda as próximas tentativas.</p></div><button class="secondary-button" data-action="go-review" type="button">Revisar</button></div></article><article class="method-card"><span class="method-icon" aria-hidden="true">✦</span><h3>Sem múltipla escolha</h3><p>A resposta só aparece depois que você escreve. Assim você pratica recuperar as palavras da memória antes de conferir.</p></article></section>';
  }
  function renderReview() {
    var due = dueCards();
    var cards = due.slice(0, 5).map(function (card) {
      return '<li><span class="review-glyph" aria-hidden="true">↻</span><span><strong>' + safe(card.prompt) + '</strong><small>' + safe(card.level) + '</small></span></li>';
    }).join('');
    appView.innerHTML = '<section class="page-heading"><div><div class="eyebrow">REVISÃO ESPAÇADA</div><h1>Rever no momento certo.</h1><p>As frases difíceis voltam antes; as fáceis ganham intervalos maiores.</p></div></section>' +
      '<section class="session-panel review-panel"><div class="session-kicker"><i>↻</i> Cartões prontos</div><h2>' + (due.length ? due.length + (due.length === 1 ? ' frase esperando por você.' : ' frases esperando por você.') : 'Sua revisão está em dia.') + '</h2><p class="session-instruction">' + (due.length ? 'Digite a tradução em inglês e confira a correção antes de marcar sua lembrança.' : 'Comece uma prática para aprender frases novas do nível ' + safe(level()) + '.') + '</p>' + (cards ? '<ul class="due-preview">' + cards + '</ul>' : '') + '<div class="session-actions"><button class="primary-button" data-action="start-review" type="button"' + (!due.length ? ' disabled' : '') + '>Começar revisão <span aria-hidden="true">→</span></button><button class="secondary-button" data-action="start-session" type="button">Aprender frases novas</button></div></section>';
  }
  function renderProgress() {
    var seen = Object.keys(progress.cards).length;
    var sessions = progress.sessions.length;
    var due = dueCards().length;
    var learned = learnedCount();
    var history = progress.sessions.slice(-7).reverse().map(function (item) {
      return '<li><span>' + safe(item.date) + '</span><strong>' + item.cards + (item.cards === 1 ? ' frase' : ' frases') + '</strong><small>' + item.minutes + ' min</small></li>';
    }).join('');
    appView.innerHTML = '<section class="page-heading"><div><div class="eyebrow">SEU CAMINHO</div><h1>Progresso que dá para ver.</h1><p>Acompanhe o que já escreveu e o que está pronto para voltar.</p></div></section>' +
      '<section class="daily-stats progress-stats"><article class="stat-card"><span class="card-label">Frases estudadas</span><strong>' + seen + ' / ' + BANK.length + '</strong><small>Em todos os níveis</small></article><article class="stat-card"><span class="card-label">Frases aprendidas</span><strong>' + learned + '</strong><small>Intervalo de três dias ou mais</small></article><article class="stat-card"><span class="card-label">Revisões agora</span><strong>' + due + '</strong><small>Esperando sua próxima tentativa</small></article></section>' +
      '<section class="dashboard-lower"><article class="content-card"><div class="section-title"><h3>Suas últimas sessões</h3><span class="card-label">' + sessions + ' no total</span></div>' + (history ? '<ul class="session-history">' + history + '</ul>' : '<p class="session-instruction">Sua primeira sessão aparecerá aqui depois que você estudar.</p>') + '</article><article class="method-card"><span class="method-icon" aria-hidden="true">✦</span><h3>250 frases em cinco níveis</h3><p>O baralho oferece 50 frases por nível, de A1 a C1. Mude o nível no seu perfil para abrir outro conjunto.</p></article></section>';
  }
  function activeCard() { return session && session.queue[session.index] ? session.queue[session.index] : null; }
  function renderPractice() {
    var card = activeCard();
    if (!card) { finishSession(); return; }
    var checked = session.checked;
    var percent = Math.round((session.index / Math.max(1, session.queue.length)) * 100);
    var answer = checked ? '<div class="answer-feedback ' + (session.correct ? '' : 'is-wrong') + '">' + (session.correct ? '✓ Muito bem: sua resposta corresponde a uma versão aceita.' : 'Vamos corrigir juntos. Compare com a versão-modelo:') + '</div><div class="model-answer"><span class="eyebrow">RESPOSTA EM INGLÊS</span><strong>' + safe(card.answer) + '</strong></div>' + (session.correct ? '' : '<div class="typed-answer"><span class="card-label">Sua tentativa</span><p>' + safe(session.answer) + '</p></div>') + '<p class="correction-note">A correção compara sua frase com as versões cadastradas. Uma tradução natural diferente pode não ser reconhecida automaticamente.</p><div class="grade-title">Como foi lembrar?</div><div class="grade-grid"><button class="grade-button grade-again" data-action="rate" data-grade="again" type="button"><strong>Errei</strong><small>' + formatInterval(0.01) + '</small></button><button class="grade-button" data-action="rate" data-grade="hard" type="button"><strong>Difícil</strong><small>' + formatInterval(1) + '</small></button><button class="grade-button" data-action="rate" data-grade="good" type="button"><strong>Lembrei</strong><small>' + formatInterval(3) + '</small></button><button class="grade-button grade-easy" data-action="rate" data-grade="easy" type="button"><strong>Fácil</strong><small>' + formatInterval(5) + '</small></button></div>' : '<form id="answerForm" class="answer-form"><label class="field-label" for="answerInput">Sua resposta em inglês</label><textarea id="answerInput" name="answer" rows="2" autocomplete="off" autocapitalize="sentences" placeholder="Escreva a frase completa em inglês" required></textarea><div class="session-actions"><button class="quiet-button" data-action="show-hint" type="button">Ver uma dica</button><button class="primary-button" type="submit">Conferir resposta <span aria-hidden="true">→</span></button></div></form>' + (session.hint ? '<div class="hint-box" role="note">' + safe(session.hint) + '</div>' : '');
    appView.innerHTML = '<div class="session-shell"><header class="session-header"><div><h1>Escrita de frases</h1><p>' + safe(card.level) + ' · frase ' + (session.index + 1) + ' de ' + session.queue.length + '</p></div><button class="quiet-button" data-action="leave-session" type="button">Sair da prática</button></header><div class="progress-track" aria-label="Progresso da prática"><span style="width:' + percent + '%"></span></div><section class="session-panel"><div class="session-kicker"><i>✎</i> TRADUZA PARA O INGLÊS <span class="level-pill">' + safe(card.level) + '</span></div><h2>Escreva a frase sem olhar a resposta.</h2><p class="session-instruction">Tente lembrar as palavras e a ordem da frase. Depois confira a correção e escolha seu nível de lembrança.</p><div class="writing-prompt"><span class="prompt-label">FRASE EM PORTUGUÊS</span><strong>' + safe(card.prompt) + '</strong></div>' + answer + '</section></div>';
    if (!checked) {
      var input = document.getElementById('answerInput');
      if (input) input.focus();
    }
  }
  function render() {
    setHeader();
    updateNav();
    if (view === 'practice') renderPractice();
    else if (view === 'review') renderReview();
    else if (view === 'progress') renderProgress();
    else renderHome();
  }
  function normalize(value) {
    var text = String(value || '').toLowerCase().trim();
    var contractions = [
      [/\bcan't\b/g, 'cannot'], [/\bwon't\b/g, 'will not'], [/\bdon't\b/g, 'do not'], [/\bdoesn't\b/g, 'does not'],
      [/\bdidn't\b/g, 'did not'], [/\bisn't\b/g, 'is not'], [/\baren't\b/g, 'are not'], [/\bwasn't\b/g, 'was not'],
      [/\bweren't\b/g, 'were not'], [/\bhaven't\b/g, 'have not'], [/\bhasn't\b/g, 'has not'], [/\bhadn't\b/g, 'had not'],
      [/\bwouldn't\b/g, 'would not'], [/\bcouldn't\b/g, 'could not'], [/\bshouldn't\b/g, 'should not'], [/\bi'm\b/g, 'i am'],
      [/\byou're\b/g, 'you are'], [/\bwe're\b/g, 'we are'], [/\bthey're\b/g, 'they are'], [/\bhe's\b/g, 'he is'], [/\bshe's\b/g, 'she is'],
      [/\bit's\b/g, 'it is'], [/\bi'll\b/g, 'i will'], [/\byou'll\b/g, 'you will'], [/\bwe'll\b/g, 'we will'], [/\bthey'll\b/g, 'they will'],
      [/\bi've\b/g, 'i have'], [/\byou've\b/g, 'you have'], [/\bwe've\b/g, 'we have'], [/\bthey've\b/g, 'they have']
    ];
    contractions.forEach(function (item) { text = text.replace(item[0], item[1]); });
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  function checkAnswer() {
    if (!session || session.checked) return;
    var input = document.getElementById('answerInput');
    var value = input ? input.value.trim() : '';
    if (!value) { if (input) input.focus(); return; }
    var card = activeCard();
    var expected = [card.answer].concat(card.alternatives || []).map(normalize);
    session.answer = value;
    session.correct = expected.indexOf(normalize(value)) >= 0;
    session.checked = true;
    session.hint = '';
    renderPractice();
  }
  function rate(grade) {
    if (!session || !session.checked) return;
    var card = activeCard();
    var now = Date.now();
    var record = progress.cards[card.id] || { intervalDays: 0, seenCount: 0, lapses: 0 };
    var interval;
    if (grade === 'again') { interval = 0.01; record.lapses += 1; }
    else if (grade === 'hard') interval = Math.max(1, (record.intervalDays || 0) * 1.2);
    else if (grade === 'easy') interval = Math.max(5, (record.intervalDays || 0) * 2.5);
    else interval = Math.max(3, (record.intervalDays || 0) * 2);
    record.intervalDays = interval;
    record.dueAt = new Date(now + interval * 24 * 60 * 60 * 1000).toISOString();
    record.seenCount = (record.seenCount || 0) + 1;
    record.lastGrade = grade;
    record.lastCorrect = session.correct;
    progress.cards[card.id] = record;
    progress.history.push({ date: today(), cardId: card.id, correct: session.correct, grade: grade });
    session.answered += 1;
    if (grade === 'again' && !session.requeued.has(card.id)) {
      session.requeued.add(card.id);
      session.queue.push(card);
    }
    saveProgress();
    session.index += 1;
    session.checked = false;
    session.answer = '';
    session.correct = false;
    session.hint = '';
    if (session.index >= session.queue.length) finishSession();
    else renderPractice();
  }
  function startSession(reviewOnly) {
    var due = dueCards();
    var fresh = newCards();
    var queue = reviewOnly ? due.slice(0, 20) : due.slice(0, 20).concat(fresh.slice(0, 10));
    if (!queue.length) {
      view = reviewOnly ? 'review' : 'today';
      render();
      toast(reviewOnly ? 'Sua revisão está em dia.' : 'Você já estudou todas as frases deste nível. Escolha outro nível no perfil.');
      return;
    }
    session = { queue: queue, index: 0, checked: false, answer: '', correct: false, hint: '', startedAt: Date.now(), answered: 0, requeued: new Set() };
    view = 'practice';
    render();
  }
  function finishSession() {
    if (session && session.answered) {
      var minutes = Math.max(1, Math.round((Date.now() - session.startedAt) / 60000));
      progress.sessions.push({ date: today(), minutes: minutes, cards: session.answered });
      saveProgress();
      toast('Prática salva. Suas frases vão voltar no momento certo.');
    }
    session = null;
    view = 'today';
    render();
  }
  function showHint() {
    var card = activeCard();
    if (!card || !session) return;
    var ideas = {
      A1: 'Dica: use a estrutura simples sujeito + verbo + complemento.',
      A2: 'Dica: confira o tempo verbal e as preposições de tempo e lugar.',
      B1: 'Dica: observe a ordem das palavras e o tempo verbal.',
      B2: 'Dica: pense em uma expressão natural, sem traduzir palavra por palavra.',
      C1: 'Dica: procure uma formulação precisa e natural em inglês.'
    };
    session.hint = ideas[card.level];
    renderPractice();
  }
  function init() {
    document.getElementById('profileForm').addEventListener('submit', function (event) {
      event.preventDefault();
      var form = event.currentTarget;
      var selectedLevel = form.elements.level.value || 'A1';
      saveProfile({ name: form.elements.name.value.trim() || 'Learner', level: selectedLevel, minutes: Number(form.elements.minutes.value) || 15 });
      modal.hidden = true;
      render();
      toast('Seu plano de estudo está pronto.');
    });
    document.getElementById('closeProfile').addEventListener('click', closeProfile);
    document.getElementById('settingsButton').addEventListener('click', openProfile);
    document.getElementById('profileButton').addEventListener('click', openProfile);
    document.getElementById('resetButton').addEventListener('click', function () {
      if (!window.confirm('Apagar o perfil e todo o progresso salvo neste aparelho?')) return;
      localStorage.removeItem(LEGACY_KEY);
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    });
    document.querySelectorAll('[data-view]').forEach(function (button) {
      button.addEventListener('click', function () { view = button.getAttribute('data-view'); session = null; render(); });
    });
    document.addEventListener('submit', function (event) {
      if (event.target && event.target.id === 'answerForm') { event.preventDefault(); checkAnswer(); }
    });
    document.addEventListener('keydown', function (event) {
      if (event.target && event.target.id === 'answerInput' && event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); checkAnswer(); }
    });
    document.addEventListener('click', function (event) {
      var button = event.target.closest('[data-action]');
      if (!button) return;
      var action = button.getAttribute('data-action');
      if (action === 'start-session') startSession(false);
      else if (action === 'start-review') startSession(true);
      else if (action === 'go-review') { view = 'review'; session = null; render(); }
      else if (action === 'show-hint') showHint();
      else if (action === 'rate') rate(button.getAttribute('data-grade'));
      else if (action === 'leave-session') { session = null; view = 'today'; render(); }
    });
    render();
    if (!profile) openProfile();
  }
  var style = document.createElement('style');
  style.textContent = '.writing-prompt{display:grid;gap:9px;padding:20px 22px;margin:20px 0 18px;border:1px solid #e8e9df;border-radius:18px;background:#fafbf7}.writing-prompt strong{font-size:1.35rem;line-height:1.55;color:#222b25}.level-pill{margin-left:auto;padding:5px 10px;border-radius:999px;background:#eef4e7;color:#526c45;font-size:.76rem}.answer-form{display:grid;gap:12px}.answer-form textarea{display:block;width:100%;box-sizing:border-box;min-height:92px;padding:15px 16px;border:1px solid #d9ded2;border-radius:14px;background:#fff;color:#202820;font:inherit;font-size:1.05rem;line-height:1.5;resize:vertical}.answer-form textarea:focus{outline:3px solid rgba(94,133,67,.18);border-color:#6c8b55}.model-answer{display:grid;gap:7px;padding:17px 18px;margin:14px 0;border:1px solid #cfe0c4;border-radius:15px;background:#f2f8ed}.model-answer strong{font-size:1.18rem;line-height:1.55}.typed-answer{padding:12px 16px;border-left:3px solid #d9ded2;background:#f8f9f6}.typed-answer p{margin:5px 0 0}.correction-note{font-size:.84rem;color:#737b70}.grade-title{margin:20px 0 10px;font-weight:700}.grade-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px}.grade-button{display:grid;gap:4px;justify-items:center;padding:13px 7px;border:1px solid #dfe4d9;border-radius:13px;background:#fff;color:#283127;cursor:pointer;font:inherit}.grade-button:hover,.grade-button:focus{border-color:#789660;background:#f4f8ef}.grade-button small{font-size:.76rem;color:#697365}.grade-again{border-color:#efd8ca}.grade-easy{border-color:#d2e4cd}.hint-box{margin-top:12px;padding:12px 14px;border-radius:12px;background:#f3f5ec;color:#4c5946}.due-preview,.session-history{list-style:none;padding:0;margin:15px 0}.due-preview li,.session-history li{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #eceee8}.due-preview li>span:nth-child(2){display:grid;gap:4px}.due-preview small{color:#80877c}.session-history li{justify-content:space-between}.session-history small{color:#80877c}.review-panel{margin-top:12px}.session-panel .answer-feedback{margin-top:14px}.session-panel .answer-feedback.is-wrong{color:#8a532f}.session-panel .session-actions{gap:10px}.writing-prompt .prompt-label{font-size:.76rem;letter-spacing:.07em;color:#78816f}.grade-button:focus-visible,.answer-form button:focus-visible{outline:3px solid rgba(94,133,67,.28);outline-offset:2px}@media(max-width:600px){.writing-prompt{padding:17px}.writing-prompt strong{font-size:1.17rem}.grade-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.grade-button{padding:12px 5px}.answer-form textarea{font-size:16px}.session-panel .session-actions{align-items:stretch}}';
  document.head.appendChild(style);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true }); else init();
})();
