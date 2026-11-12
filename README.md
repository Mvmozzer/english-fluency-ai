# English Fluency AI

Um aplicativo web mobile-first para aprender inglês escrevendo frases. Você recebe uma frase em português, digita sua versão em inglês e confere a correção antes de decidir quando quer rever o cartão.

## Como funciona

1. Escolha seu nome e seu nível de inglês, de A1 a C1.
2. Leia uma frase em português e escreva a tradução completa em inglês.
3. Confira a resposta-modelo e veja se a tentativa corresponde a uma tradução aceita.
4. Marque como **Errei**, **Difícil**, **Lembrei** ou **Fácil**. Esse nível agenda a próxima revisão, no estilo de cartões do Anki.
5. Pratique até dez frases novas por sessão e reveja até vinte cartões vencidos.

O baralho contém **250 frases**, com 50 frases em cada nível CEFR (A1, A2, B1, B2 e C1). Frases que você erra podem voltar no fim da própria sessão; depois, o intervalo cresce conforme sua lembrança.

## Correção e privacidade

A correção acontece no próprio aparelho. Ela ignora maiúsculas, pontuação e espaços extras, aceita contrações comuns e reconhece as alternativas incluídas no baralho. Como não há um modelo de IA no app, uma tradução diferente, mesmo que natural, pode não ser reconhecida automaticamente. Nesse caso, a tela mostra a resposta-modelo para comparação.

Seu perfil e seu progresso ficam salvos no navegador e aparelho usados. Não há conta nem sincronização entre dispositivos. Limpar os dados do navegador também apaga o progresso.

## Testar

Abra [o app publicado](https://mvmozzer.github.io/english-fluency-ai/) no celular ou computador. Defina seu nível, toque em **Começar a escrever**, traduza uma frase e confira a resposta. Use **Revisar** para praticar cartões vencidos e **Progresso** para acompanhar suas sessões.

O app não pede microfone e não tem etapa de leitura em voz alta. A experiência foca em escrever, corrigir e lembrar as frases.

## Arquivos principais

- index.html: estrutura da interface e carregamento do app.
- writing-mode.js: baralho de 250 frases, correção e revisão espaçada.
- styles.css: layout responsivo para celular e computador.
- sw.js: cache da interface para uso offline depois da primeira visita.
- manifest.webmanifest e icon.svg: instalação como app no celular.
