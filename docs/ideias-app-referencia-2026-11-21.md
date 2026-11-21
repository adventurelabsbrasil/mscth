# Colheita: app de teoria musical no iPhone → mscth

> 2026-11-21. Duas passadas pelo Espelhamento do iPhone. Navegação de leitura, três sessões de exercício de teste.
> Rascunho para o Founder decidir. Nada daqui está implementado (a v0.28 veio do plano anterior). Continua `plano-v0.28-bancada.md`.
> Fora da passada: afinador, gráfico de afinação e gravador (pedem o microfone; não mexi em permissão do aparelho).

## O que o app tem

**4 abas:** Tools · Exercises · Theory · Settings.

**Tools (25):** braço de violão · afinador · metrônomo · gravador · leitura rítmica · solfejo · gráfico de afinação · calculadora de intervalo · ouvir intervalos · calculadora de acorde (notas → nome) · busca de acorde (nome → digitação) · escalas · calculadora de progressão · funções harmônicas · substituição de acorde · acordes parecidos (notas em comum) · inversões · progressões e cadências (escolhe progressão + tom + play; nome do acorde abre o dicionário) · círculo das quintas · bateria virtual · piano virtual · pads de piano · player com tom e velocidade (estudar música gravada).

**Exercises (~30 tipos, por checkbox):** teoria geral, tom/semitom · ritmo de ouvido, solfejo de ouvido, leitura instantânea em clave de sol/fá/dó, claves, figuras e pausas · inversões, formação (estrutura e notas), qualidade de ouvido · progressão por grau e por função (escrito), função harmônica de ouvido (por grau e por função) · cadências de ouvido (por nome e por grau) · intervalo escrito (nota, entre notas), intervalo de ouvido (harmônico, melódico ↑, melódico ↓) · som de acorde (maior, m, 7M, m7, 6, m6, 7, sus2, sus4, °, ø).

**Theory (~45 textos):** do básico (notas, acidentes, tom/semitom, série harmônica) até reharmonização. Inclui tensões, cifras, relativos/antirrelativos, afinações, tipos de dominante, modos gregos, empréstimo modal, arpejos, sobreposição de acordes, escalas (relativas, pentatônica, blues, hexatônica, bebop, diminuta, dom-dim), acordes disfarçados, resolução deceptiva, transposição e modulação, cadências, ii–V–I. **Formato: texto corrido com favorito (☆). Os acordes do texto não tocam.**

**Settings:** idioma (pt, en, es, hi) · tema claro/escuro · **pré-contagem** (2 ou 4 tempos, ou automático) · contato. Sem nível de dificuldade.

## Como os exercícios funcionam (testado)

| Tipo | Pergunta | Formato |
|---|---|---|
| Intervalo escrito | "Qual é a 5aum de C♭?" · "Intervalo entre D♭ e E♭?" | 4 botões, grafia correta (G, F𝄪, B♯) |
| Intervalo de ouvido | "Qual intervalo você ouviu?" | 4 botões, botão 🔊 para repetir |
| Ritmo de ouvido | "Que ritmo você ouviu no compasso 12/8?" | contagem antes, 3 compassos escritos para escolher |
| Solfejo de ouvido | "Que solfejo você ouviu em 9/8?" | contagem antes, 2 pautas quase iguais (diferem em 1–2 notas) |
| Leitura instantânea | nota numa pauta com armadura (até 7 ♯/♭) | 4 botões com nome de nota |
| Função de ouvido | "A partir da tônica tocada, que grau você ouviu?" | toca a tônica antes (referência), 4 graus |
| Função escrita | "F♭ é que função na progressão de C♭?" | tônica / subdominante / dominante / submediante |
| Cadência de ouvido | "Que progressão ou cadência você ouviu?" | 3 progressões com nome absoluto que diferem em 1 acorde |
| Som de acorde | "Que acorde você ouviu?" | 4 opções da mesma qualidade, fundamentais diferentes |

**Fluxo:** escolhe os tipos → *Start* → ~20–30 questões misturadas → *Check* pinta verde/vermelho → *Continue* → tela final com **só o percentual** (anel, "33%"). Não há revisão dos erros, nota por categoria, histórico nem repetição do que errou.

## Problemas do app (o que o mscth deve fazer melhor)

1. **Pedem ouvido absoluto sem avisar.** Som de acorde dá Abm6/Gm6/Fm6/Am6 e cadência dá nomes absolutos (A, A7, Em7). Sem uma nota de referência, quem tem ouvido relativo só chuta. A exceção boa é a função de ouvido, que toca a tônica antes.
2. **Enarmonia no ouvido.** As opções de ouvido misturam `2aum`, `b6`, `bb7`, `#4`, que soam iguais a `3m`, `5aum`, `6M`, `5dim`. O ouvido não distingue, então a pergunta não é justa.
3. **Duas nomenclaturas na mesma tela.** `7m` e `b7`, `5J` e `#4`, `1J` e `8`. Às vezes o intervalo entre duas notas vira composto sem motivo: A♭ → D♭ é cobrado como `11J`, não `4J`.
4. **Erro sem explicação.** Só a cor da borda. Não toca a sua resposta ao lado da certa nem diz por quê.
5. **Final pobre.** Um percentual e acabou. Não mostra onde você erra.
6. **Teoria muda.** ~45 textos sem som; o ii–V–I é uma lista "Dm7: D F A C".

## Lacunas no mscth que viram feature (ordem de valor)

1. **Treino de ouvido "monte seu treino"** (= Fase 3 / D7), com o que o app não faz:
   - **Referência sempre**: toca a tônica (ou um I–IV–V–I) antes; perguntas relativas (qualidade, grau, intervalo), nunca "qual fundamental".
   - **Opções que o ouvido consegue separar**: só uma grafia por som no modo ouvido; enarmonia fica no modo escrito.
   - **Uma nomenclatura** (resolve com a D2).
   - **Depois da resposta, o porquê**: acende no piano, toca a sua e a certa lado a lado, desenha no Lissajous/Tonnetz/círculo, link para a seção que explica.
   - **Final útil**: acerto por categoria, os erros para reouvir e um botão "treinar só o que errei". Guarda histórico no navegador (já existe `localStorage` de nível e progresso).
   - Tipos, do mais barato ao mais caro: intervalo (juntas/subindo/descendo, já temos o som desde a v0.28) → qualidade de acorde → grau com tônica de referência → cadência por grau (as 16 cadências da seção 08) → função (T/SD/D).
2. **Pré-contagem** (contagem antes de começar) nos padrões, cadências e no treino de ritmo. Encaixa no metrônomo novo do console. Barato.
3. **Teoria que toca**: o mscth já é isso nas 12 seções. Os temas que faltam entram nos `?` das seções existentes, com cada acorde clicável: tensões, cifras, relativos/antirrelativos, tipos de dominante, armadura de clave, acordes disfarçados e resolução deceptiva (cabem em *cadências*), substituição (tritonal, relativos).
4. **Microfone**: afinador + "cante e confira" em cents. Reaproveita diapasão e afinação do console.
5. **Busca de acorde (nome → piano)** e **acordes parecidos** (notas em comum, já é o que o Tonnetz mostra; falta a lista).
6. **Progressão livre**: escolher graus, tocar, transpor. Estende cadências; prepara a "aula e piano" da v0.30.
7. **Braço de violão** como painel da bancada (v0.30): mostrar todas/nenhuma, ♯/♭, intervalos em relação à tônica, afinação editável. Depende da D2.
8. **Leitura instantânea** com armadura, usando o VexFlow que já existe.
9. **Ditado rítmico e melódico** (2–3 opções escritas para o que tocou). Fica com a D8 (ritmo) e a Fase 3 (partitura).

Fora: gravador, bateria virtual, pads e player com tom/velocidade (fogem do foco de teoria).

## Decisões pendentes

- **D9 · encaixe do treino de ouvido:** sugestão de fazer como **v0.29-a**, antes da navegação, porque quase todo o motor (tocar, acender, identificar) já existe e é o que torna o mscth dinâmico.
- **D2 · nomenclatura** sobe de prioridade: o treino precisa de uma grafia só.
