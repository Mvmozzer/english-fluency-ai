# English Fluency AI

Um aplicativo web mobile-first para praticar inglês em pequenas sessões diárias. O projeto usa recuperação ativa, revisão espaçada, escuta e produção oral para apoiar uma rotina consistente de estudo.

## O que já funciona

- Perfil local com nome, nível inicial CEFR (A1–C1) e meta diária.
- Sessão curta com lembrança de significado, compreensão auditiva e fala.
- Frases e vocabulário de exemplo adaptados ao nível escolhido.
- Revisão espaçada com intervalos crescentes e acompanhamento de atividade.
- Leitura em voz alta pelo navegador e entrada falada quando o navegador oferece reconhecimento de voz; também é possível digitar a tentativa.
- Salvamento no armazenamento local do navegador e cache básico para uso offline depois da primeira visita.
- Interface responsiva para celular e computador, sem etapa de compilação.

## Como experimentar

1. Abra a versão publicada em um navegador moderno, de preferência no celular.
2. Defina o perfil, o nível de inglês e a meta diária.
3. Toque em **Começar a prática** e complete os passos de lembrar, escutar e falar.
4. Abra **Revisão** para praticar palavras e **Progresso** para acompanhar as sessões.
5. Para testar a fala, permita o uso do microfone se o navegador pedir; se o reconhecimento de voz não estiver disponível, digite a frase.

O progresso fica salvo neste navegador e aparelho. Não há conta, sincronização entre dispositivos ou servidor. Limpar os dados do navegador apaga esse progresso.

## Publicar uma versão de teste no GitHub Pages

No repositório, abra **Settings → Pages** e escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`. Depois que o GitHub concluir a publicação, ele mostrará o endereço do site nessa mesma tela. O endereço usa HTTPS e pode ser aberto no celular.

O repositório deste projeto está privado. A disponibilidade do Pages para repositórios privados depende do plano do GitHub; sites publicados pelo Pages são públicos, salvo configurações empresariais específicas. Confira a visibilidade antes de ativar a publicação.

## Limites desta versão

Este é um MVP de estudo, sem modelo de IA ou avaliação automática da pronúncia. O reconhecimento de voz depende do navegador, e a comparação de palavras não mede sotaque ou qualidade de pronúncia. A prática de recuperação e os intervalos de revisão são técnicas de aprendizagem usadas no app, mas esta versão não foi validada como garantia de fluência. O desenvolvimento de fluência também depende de prática ampla, consistente e de uso real do idioma.

## Arquivos principais

- `index.html`: estrutura e componentes da interface.
- `styles.css`: layout responsivo.
- `app.js`: perfil, exercícios, revisões e progresso.
- `manifest.webmanifest`: metadados para instalação como app.
- `sw.js`: cache da interface para uso offline.
- `icon.svg`: ícone do aplicativo.
