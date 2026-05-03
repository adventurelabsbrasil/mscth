# changelog

Todas as mudanças notáveis deste projeto. Baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [0.20.0] — 2026-05-03

### added
- **Transformações neo-Riemann (P, L, R) no Tonnetz** — três botões abaixo da rede tonal aplicam as operações canônicas de Riemann/Lewin/Cohn ao último acorde clicado. **P** (parallel) troca a 3ª, **L** (leading-tone) desliza fundamental ou 5ª por semitom, **R** (relative) faz maior↔menor relativo. Cada operação é uma reflexão geométrica através de uma aresta do triângulo no Tonnetz.
- **Animação de seta na transformação** — ao aplicar P, L ou R, uma seta laranja com a letra da transformação anima do centróide do triângulo de origem ao de destino, com fade de ~1.1s.
- **Estado `nrCurrent`** — captura o último triângulo clicado no Tonnetz (col, row, type, name) e habilita os botões P/L/R. Mostra o nome do acorde atual ao lado dos botões. Reset automático ao re-renderizar o Tonnetz (ex: troca de tônica).
- **Modal `nr`** — explica P/L/R com ciclos hexatônico (P-L) e octatônico (L-R), princípio da parsimônia (voice leading suave), e referências (Riemann, Lewin, Cohn, Tymoczko, Collier, harmonia negativa).
- Refatoração do click handler do Tonnetz: lógica de tocar acorde + label + log foi extraída pra `nrPlayTri(col, row, type)` — uma fonte de verdade consumida tanto pelo clique direto quanto pelas transformações P/L/R.
- Helpers `tonRootChrom(col, row, type)` e `tonTriPts(col, row, type)` — abstraem a matemática de fundamental e vértices dos triângulos do Tonnetz.

### changed
- Polígonos do Tonnetz agora carregam `data-col` e `data-row` para localização programática durante transformações.
- Versão exibida no header: `v0.19` → `v0.20`.

### rationale
O Tonnetz já estava no app como visualização passiva de relações harmônicas — mas a maior parte do interesse teórico em redes tonais é justamente como elas tornam transformações cromáticas <em>geometricamente intuitivas</em>. P, L e R são as três operações fundamentais da teoria neo-Riemann, e cada uma corresponde a uma reflexão através de uma das arestas do triângulo do acorde. Visualizar isso como movimento literal — clicar `C`, depois `L`, e ver a seta animar pra `Em` — transforma o Tonnetz de figura ilustrativa em ferramenta de exploração harmônica.

A escolha de animar com seta + letra (em vez de só fazer o triângulo de destino piscar) torna o tipo de transformação aplicada visualmente legível mesmo pra quem não conhece a teoria — e abre porta pra futuros ciclos automatizados (P-L sequence pra hexatônico, L-R pra octatônico).

## [0.19.0] — 2026-05-02

### added
- **Modal de boas-vindas no primeiro acesso** — overlay automático na primeira visita explicando o que é o `mscth`, como ativar áudio, como interagir, como usar o `?` em cada seção, e como funciona o marcador de progresso. Usa `localStorage.mscth.onboarded.v1` pra mostrar uma única vez.
- **Tour da jornada pedagógica** — bloco com as 10 seções em ordem (tônica → tonnetz) dentro do modal de boas-vindas, com sugestão de fluxo pra iniciantes vs quem já sabe teoria.
- **Botão `?` no header** — ao lado da versão, reabre o modal de boas-vindas a qualquer momento (caso o usuário queira revisitar a introdução).
- Estilos `.welcome-cards`, `.welcome-journey`, `.welcome-cta`, `.meta-intro-btn` — componentes específicos do onboarding, integrados ao sistema de modais existente.

### changed
- Versão exibida no header: `v0.18` → `v0.19`.
- `MODAL_DOCS` ganha entrada `welcome` no topo do objeto, reutilizando o sistema de `openModal/closeModal` existente.

### rationale
A pergunta implícita era: "o que faz uma pessoa que abre o app pela primeira vez entender o que está vendo?" — sem onboarding, o usuário caía direto em 10 seções densas sem contexto. A solução escolhida (modal único de boas-vindas + flag em `localStorage`) preserva o espírito single-file do projeto sem fragmentar em landing page separada. O botão `?` no header garante reentrada quando o usuário quer revisitar a explicação.

## [0.18.0] — 2026-05-02

### added
- **Display de intervalo distinguindo 2ª de 9ª** — quando ambas as notas tocadas têm MIDI conhecido (ex: piano físico), o cálculo agora considera a oitava real. Tocar `C4` e `D5` mostra `9 · 9ª maior · 14 semitons ↑`, enquanto `C4` e `D4` mostra `2M · 2ª maior · 2 semitons ↑`. Antes, ambos os casos eram identificados igualmente como "2M"
- Função `compoundIntervalDescription(absSemitones)` com vocabulário estendido: 9m, 9M, #9, 10M, 11J, #11, 12J, ♭13, 13M, 14m, 14M, 15 (2 oitavas)
- **Quíntades (acordes com 9ª)** no campo harmônico — terceira opção no toggle de voicing além de tríade e tétrade. Empilha 5 terças sobre cada grau, formando `Cmaj9`, `Dm9`, `G9`, `Em7♭9`, `Bø9`, etc. Inversões expandidas até 4ª (5 inversões disponíveis)
- Lógica de naming para 9ªs em `chordOfDegree`: detecta automaticamente 9M, 9m e #9 conforme o modo, gerando os sufixos cifrados corretos (`maj9`, `9`, `m9`, `7♭9`, `7♯9`, `m(maj9)`, `°9`, `ø9`)
- Padrões adicionais de identificação de acordes no piano físico: `add9`, `m(add9)`, `7♭9`, `7♯9` (acorde do Hendrix), `m9♭5`, `°9`
- **Sub-seção "intervalos compostos"** dentro do campo harmônico — três cards comparativos (2ª↔9ª, 4ª↔11ª, 6ª↔13ª) com botões para ouvir cada lado isoladamente, e botão extra para ouvir o acorde completo (Cadd9, Cm11, C13). Cada card explica a diferença sonora e referências culturais

### changed
- Modal '05' (campo harmônico) ganha seção dedicada explicando 9ª vs 2ª, com referências (Bill Evans, Tom Jobim, Stevie Wonder, Bacharach, Beatles, Police), explicação da escolha cifrada (`add9` vs `sus2`), e ponteiro para a nova sub-seção comparativa
- `renderInversions` suporta até 4ª inversão quando voicing é ninth (5 notas → 5 estados de inversão possíveis)
- Hint do campo harmônico mostra "quíntade (com 9ª)" quando o voicing está ativo
- Estado base do `lastTonalNote` agora carrega MIDI quando disponível, permitindo que o cálculo de intervalo distinga oitavas

### rationale
A pergunta do usuário ("qual diferença entre 2ª e 9ª?") expôs uma limitação real do display de intervalo: ele estava usando `% 12` em todas as situações, ignorando oitavas. A correção é semântica — quando o sistema sabe a altura real (piano físico), respeita; quando só temos pitch class (cliques nas seções), continua mostrando o cálculo modular.

A adição das quíntades responde à demanda implícita: não basta explicar a diferença, é preciso ouvir e tocar com a 9ª de fato. Acordes como `Cmaj9`, `Dm9`, `G9` formam o vocabulário harmônico de jazz, bossa e pop sofisticado — e estavam ausentes do app.

A sub-seção comparativa é puramente pedagógica: três pares de botões A/B onde o usuário pode alternar a mesma nota em registros diferentes e perceber sonoramente o que muda. É a tradução do conceito teórico em experiência auditiva imediata.

## [0.17.0] — 2026-05-02

### added
- **Tétrades no Tonnetz** — toggle no topo da seção 10 alterna entre modo *tríades* (default) e *tétrades (com 7ª)*. Quando ativo:
  - Cada triângulo ganha overlay tracejado conectando o centróide à posição da 7ª no Tonnetz
  - Tríades maiores → 7M (formando `maj7`) com tracejado laranja
  - Tríades menores → 7m (formando `m7`) com tracejado preto
  - Marcador circular pequeno na posição da 7ª
  - Opacidade da linha sinaliza se o acorde está no modo (opaco) ou fora (pálido)
  - Ao clicar nesse modo, o som tocado é a tétrade completa (4 notas), e o nome do acorde inclui o sufixo (`Cmaj7`, `Am7`)
- **Nome do acorde flutuando dentro do triângulo** ao tocar — label SVG com fundo escuro arredondado e borda laranja aparece no centróide do triângulo, com fade-out após 1.2s
- **Display de intervalo entre notas tocadas** — nova linha no painel do piano (`kb-interval`):
  - Mostra distância em semitons + nome (ex: "C → G · **5J** 5ª justa (7 semitons ↑ ou 5 ↓)")
  - Atualizado a cada nota/acorde tocado em qualquer seção (escala, campo, círculo, Tonnetz, piano físico)
  - Janela de 8 segundos: depois disso, considera-se nova primeira nota
  - Mostra direção ascendente curta + descendente complementar (deixa o usuário escolher como interpretar)
- Função `intervalDescription(semitones)` retorna nome longo, abreviação, direção e oitavas extra
- Função `logTonalNote(chrom, name)` mantém estado da última nota e calcula intervalo
- Função `showTonnetzLabel(text, cx, cy)` cria label SVG flutuante temporária no centróide

### changed
- Modal `07` (Tonnetz) expandido com explicação detalhada do overlay de 7ªs e do clique-pra-ver-nome, incluindo nota matemática sobre a limitação do Tonnetz triangular para tétrades (Tymoczko propôs 4D)
- Legenda do Tonnetz ganha segunda linha que aparece apenas no modo tétrades, explicando o overlay
- Camada `seventhLayer` adicionada à hierarquia SVG entre `triLayer` e `nodeLayer`

### rationale
A pergunta do usuário tocou três pontos do mesmo problema: como aumentar a densidade informacional do Tonnetz sem comprometer sua clareza geométrica.

(1) Tétrades no Tonnetz é matematicamente delicado — o Tonnetz original é estritamente para tríades, porque 4 notas não fecham num triângulo. A solução adotada (overlay sobreposto à tríade base) preserva a geometria triangular canônica enquanto adiciona a informação da 7ª como anotação posicional. Geometricamente correto: a 7M cai exatamente em `(+1 quinta, +1 terça maior)` do root; a 7m em `(+2 quintas, −1 terça maior)`.

(2) Nome do acorde dentro do triângulo era um pedido natural — visualmente discreto antes, agora explicito. O fade-out automático evita poluir a visualização permanentemente.

(3) Display de intervalo é a peça pedagógica mais útil — quando o aluno toca duas notas em sequência, ele agora **vê** que de C pra G é uma 5J, ou que de E pra C é uma 6m subindo / 3M descendo. Esse feedback transforma click intuitivo em conhecimento articulado.

## [0.16.0] — 2026-05-02

### added
- Instagram handles nos créditos do rodapé:
  - `@ribasrodrigo91` (autor)
  - `@adventurelabsbrasil` (organização)
- README atualizado com mesma informação

### context
Em paralelo, durante a sessão o usuário compartilhou referências visuais sobre teoria musical — Knight's tour em grid 8×8, grafo de transformações neo-Riemannianas (P-L-R), Tonnetz dobrado em torus topológico, visualizadores interativos de tríades, "Music Theory Tree" circular. Todas reforçam o roadmap já existente, particularmente o passo neo-Riemann + harmonia negativa que continua como candidato natural para próxima versão maior.

## [0.15.0] — 2026-05-02

### added
- **Piano expandido para 3 oitavas** — agora vai de C4 (MIDI 60) até B6 (MIDI 95). Antes eram 2 oitavas (C4-B5)
- Indicador de oitava (subscript `4`, `5`, `6`) ao lado da letra `C` em cada oitava do teclado, ajudando orientação visual
- `pianoEchoMidiList(midiList, durationMs)` — função interna que mapeia MIDI absoluto pra teclas (com fallback se MIDI fora do range)

### changed
- **`pianoEchoChord` agora respeita oitavas reais dos intervals** — antes, ao tocar um acorde como A7 (intervals `[9,13,16,19]`), o algoritmo fazia `% 12` em cada nota, criando colisões: A4 + C#4 + E4 + G4 caíam todos na mesma oitava e se sobrepunham. Agora distribui corretamente em A4, C#5, E5, G5 — quatro teclas distintas
- Aplica-se especialmente para tétrades em estado fundamental (que se estendem além de 12 semitons) e dominantes secundárias (que partem de pitch classes mais altos)
- **Mapeamento QWERTY redesenhado** com 2 oitavas no teclado físico:
  - Fileira inferior `Z X C V B N M ,` = oitava 4 brancas; `S D G H J` = pretas da oitava 4
  - Fileira superior `Q W E R T Y U I` = oitava 5 brancas; `2 3 5 6 7` = pretas da oitava 5
  - Antes só uma oitava completa estava mapeada; agora duas em paralelo
- Modal `kb` atualizado com novo layout de atalhos
- Hint inline do piano atualizado: "qwerty: ZXCV (oitava grave) · QWER (aguda) · shift = sustain"
- Adicionada `transition: background 0.05s` nas teclas pra eco mais fluido visualmente

### fixed
- Bug onde notas mais agudas de acordes (ex: A7, B7 como dominantes secundárias) "rebobinavam" pra primeira oitava do piano causando notas que deveriam ser distintas a colidirem na mesma tecla
- O eco de tétrades em estado fundamental agora mostra fundamental + 3M + 5J + 7m em quatro teclas separadas

### rationale
O usuário observou que dominantes secundárias como A7 e B7 estavam aparentemente "pegando notas mais agudas" que deveriam — diagnóstico correto. O algoritmo anterior do `pianoEchoChord` pulverizava tudo em pitch classes (`% 12`), perdendo a oitava real. Com 3 oitavas no piano, agora há espaço pra distribuir cada nota em sua oitava natural sem colisões. Tétrades acima da 4ª oitava (ex: B°7 estendido) caem na oitava 5 ou 6 conforme apropriado.

## [0.14.0] — 2026-05-02

### added
- **Empréstimos modais (modal interchange)** na seção 07 — tab "emprestados ◯" mostra acordes do modo paralelo (mesmo tonic, modo oposto). Em C jônio aparecem `Cm`, `D°`, `E♭`, `Fm`, `Gm`, `A♭`, `B♭` — vocabulário pop/jazz/cinema. Marcador visual: borda inferior magenta sutil
- **Dominantes secundárias (acordes de preparação)** na seção 07 — tab "dominantes 2ª ⇒" mostra V7 apontando para cada grau diatônico (V7/V, V7/vi, etc.). Cada card exibe "→ alvo" indicando para onde resolve. Marcador visual: borda tracejada laranja
- **Visualização de inversões em torre** — clique em qualquer acorde diatônico para ver o empilhamento vertical das notas. Mostra fundamental, terça, quinta, sétima, com baixo destacado em preto e cada intervalo rotulado (1ª, 3M, 5J etc.). A torre se reorganiza ao trocar inversão no menu lateral
- Sub-seção `inversion-stack` com explicação semântica
- Função `chordFromScale(intervals, degreeIdx, voicing)` reutilizável para qualquer escala
- Função `getParallelScale()` retorna escala paralela do modo atual
- Função `getBorrowedChords()` filtra apenas acordes não-diatônicos
- Função `getSecondaryDominants()` gera os V7/X de cada grau não-diminuto
- Modal '05' expandido com seções dedicadas: formação, inversões com torre visual, empréstimos modais com referências culturais (Beatles, Radiohead, Coldplay, Hans Zimmer), dominantes secundárias (Bach, Bacharach, Jobim)

### changed
- **UX da seção 02 (série harmônica)**: parágrafo explicativo curto inline esclarecendo o que é "incluir parciais" e como funciona a síntese aditiva. Coluna renomeada de "incluir" para "+/− timbre". Quadrado de toggle redesenhado: maior (22×22), com transição visual clara (ponto preto cresce do centro), borda mais espessa
- **UX do botão init audio**: copy mais claro ("▶ ativar áudio" em vez de "init audio"), mensagens em português ("clique em 'ativar' para começar", "áudio ativo · pronto pra tocar")
- Classe CSS `.sec-desc` introduzida para textos explicativos curtos inline (entre sec-head e conteúdo)
- Hint do voicing agora aparece corretamente quando trocar de tab (renderChords sincronizado)

### rationale
Pedido do usuário para esclarecer "INIT AUDIO" e "INCLUIR" foi tratado em todos os pontos onde o copy era opaco. Empréstimos modais e dominantes secundárias completam o vocabulário harmônico funcional clássico — o aluno agora vê toda a paleta disponível: nativos do modo + emprestados do paralelo + preparações cromáticas. Visualização de torre torna o conceito abstrato de "inversão" geometricamente intuitivo.

## [0.13.0] — 2026-05-02

### added
- **Piano-eco cross-section** — quando você toca uma nota ou acorde em qualquer seção (escala, campo harmônico, círculo, Tonnetz, cadências, padrões, play scale ↑), as teclas correspondentes do piano se acendem com classe `kb-echo` (mais sutil que `active`)
- Função `pianoEcho(pcs, durationMs)` para acendimento individual de notas
- Função `pianoEchoChord(intervals, durationMs)` para acordes com conversão automática de intervalos para pitch classes
- **Toggle de exibição de frequências em Hz** no menu lateral (`≡ menu`) — mostra o valor exato em Hertz de cada nota da escala, calculado pelo temperamento atual (12-TET ou 5-limit). Útil para comparar afinação igual vs justa entonação visualmente, e como referência absoluta de altura

### changed
- Cross-section sync agora é bidirecional: piano → seções (já existia) e seções → piano (novo)
- `renderScale` adaptado para mostrar Hz e cents na mesma linha quando ambos ativos

### rationale
Faltava o feedback visual no piano quando o usuário interagia com outras seções. A página tem agora simetria bidirecional total: você toca uma nota em qualquer lugar, ela aparece em todos os outros lugares (escala, campo, círculo, Tonnetz, série harmônica) e nas teclas do piano. O sistema se mostra como rede de representações da mesma estrutura subjacente.

## [0.12.0] — 2026-05-02

### added
- **Sistema de progresso pessoal** — quatro níveis por seção: `○` (não vi), `◔` (explorei), `◕` (entendi), `●` (domino)
- **Barra de progresso global** sticky no topo, em porcentagem
- **Persistência via localStorage** — progresso preservado entre sessões
- **Botão de reset** com confirmação
- Modal `progress` explicando ordem pedagógica e sistema de níveis
- Cada seção ganha botão circular ao lado do `?` para ciclar entre níveis
- Seções nível ● (domino) ganham faixa lateral laranja como marcador visual

### changed
- **Reordenação pedagógica** das 10 seções — do concreto ao abstrato, do isolado ao integrado:
  1. tônica
  2. série harmônica · timbre (movida do último para o segundo)
  3. escala (era 04)
  4. modo (era 02)
  5. caráter do modo (era 03)
  6. padrões melódicos (era 08)
  7. campo harmônico (era 05)
  8. cadências (era 09)
  9. círculo das quintas (era 06)
  10. tonnetz · rede tonal (era 07)
- Cada `<section>` ganha `data-section-id` para identificação estável independente da ordem visual
- `data-help` mantém referências antigas (01-10) para preservar conteúdo dos modais sem refator
- Lede do header reescrito explicando ordem de aprendizado e níveis

### rationale
A página acumulou 10 seções densas. A ordem antiga era topológica (agrupamento conceitual). A nova é temporal-cognitiva — cada seção é pré-requisito da seguinte. Tônica → série harmônica explica *por que* há notas → escala é sequência de notas → modo é escala com tônica → caráter interpreta o modo → padrões internalizam → campo harmônico empilha terças → cadências sequenciam acordes → círculo de quintas relaciona tonalidades → Tonnetz formaliza geometricamente. O sistema de níveis evita gamificação compulsória (sem badges, sem streak) — apenas auto-avaliação reflexiva.

## [0.11.0] — 2026-05-02

### added
- **Sincronização cross-section** — quando piano toca uma nota, a página inteira acende em laranja:
  - célula da nota na escala (seção 04)
  - acordes cuja fundamental é tocada (seção 05)
  - nodes externos e internos no círculo de quintas (seção 06)
  - nodes no Tonnetz (seção 07)
  - linhas correspondentes na tabela de série harmônica (seção 10)
- **Nodes do Tonnetz clicáveis** — agora tocam a nota isolada (antes só os triângulos eram clicáveis para acordes)
- **Sistema de cores semânticas** com toggle no menu lateral:
  - **off** — paleta minimalista padrão
  - **distância tonal** — gradiente verde→amarelo→magenta baseado em quintas no círculo de quintas
  - **dissonância** — gradiente baseado em Plomp-Levelt (1965), psicoacústica pura
- 8 variáveis CSS de paleta semântica (`--consonant-1`, `--neutral-1`, `--tense-1` etc)
- `data-pc` adicionado a todos os nodes SVG para suportar cross-section highlighting
- `data-tone` em células de escala e campo harmônico
- Modal `kb` expandido cobrindo cores e cross-section sincronization

### changed
- `.t-node` deixa de ser `pointer-events:none` e ganha cursor pointer + hover effect
- `applyColorTints` separado de `applyColorTintsAndRerenderSvgs` para evitar recursão
- `kbStartNote`, `kbStopNote` e `kbClearAll` agora chamam `syncCrossSectionHighlights`
- Animação `kbPulse` 0.6s alternada para indicar notas ativas em outras seções

## [0.10.0] — 2026-05-02

### added
- **Piano interativo sticky** no rodapé — 2 oitavas (C4-B5), teclas brancas e pretas
- **Identificação de acordes em tempo real** — exibe nome (`Cmaj7/E`), inversão, qualidade, e numeral romano se for grau do campo harmônico
- **Mapeamento QWERTY** — `A S D F G H J K` para brancas, `W E T Y U` para pretas, oitava 2 em `Z X C V B N M ,`
- **Três modos de operação**: livre (default), sustain (acumula notas), snap ao modo (só permite notas do modo)
- **Atalhos**: Shift = sustain temporário, ESC = clear, ↑/↓ = transpor oitava
- **Destaques visuais** — teclas da escala marcadas (in-mode), tônica destacada, triângulos do Tonnetz acendem para tríades reconhecidas
- **Toggle de colapso** — botão `▾ piano` permite recolher para liberar espaço
- Modal de ajuda dedicado explicando uso, atalhos, e casos de exemplo

### changed
- Lede do header atualizado mencionando o piano
- `data-root` e `data-type` adicionados aos polígonos do Tonnetz para suportar destaque por acorde detectado
- Tonnetz ganha estilo `.kb-detected` (stroke laranja tracejado) diferenciado de `.playing` (preenchimento sólido)

## [0.9.0] — 2026-05-01

### added
- **Seção 10 · série harmônica + timbre** — 16 parciais clicáveis com nota, frequência, cents off (12-TET) e flag de microtonalidade (parciais 7, 11, 13, 14)
- Síntese aditiva — toggles individuais por parcial + presets (senoide, quadrada, serra, órgão, tudo)
- Player da série em arpejo ascendente
- Modal `?` com explicação completa: Fourier, Helmholtz, parciais 4-5-6 = acorde maior natural, microtonalidade do blues e maqamat
- Footer reorganizado em 3 blocos: categorias, referências, créditos
- Créditos: Rodrigo Ribas, Adventure Labs, contato@adventurelabs.com.br

### changed
- Projeto renomeado de `modos / campos harmônicos` para **`mscth`** com tagline `modos · campos · cadências · timbre`
- Filename `music_theory.html` → `index.html`
- Title `<title>` da página atualizado

## [0.8.0] — sessão anterior

### added
- **Seção 09 · cadências** — 13 progressões canônicas em 4 grupos:
  - clássicas: V-I, IV-I, V-vi, I-V, I-IV-V-I
  - jazz: ii-V-I, I-vi-ii-V (rhythm changes)
  - pop: I-vi-IV-V (doo-wop), I-V-vi-IV (axis), vi-IV-I-V
  - modal: i-iv-v-i, i-♭VII-♭VI-V (andaluza), i-♭VII-♭VI-♭VII (rock min)
- Cada cadência aplicada dinamicamente ao modo atual
- Modal `?` profundo cobrindo função expressiva de cada cadência

### changed
- Modal '05' (campo harmônico) expandido com formação completa de acordes — 4 tríades por intervalos empilhados (4+3, 3+4, 3+3, 4+4) e 6 tétrades canônicas
- Removido o botão `play cadence` da seção 04 (agora dedicada na seção 09)

## [0.7.0] — sessão anterior

### added
- **Seção 08 · padrões melódicos** — ascendente, descendente, ida-e-volta, terças, quartas, tetracordes
- BPM ajustável (60/90/120/160) + 1 ou 2 oitavas
- Visualização da nota tocando em tempo real (na escala e no display de padrões)
- Modal `?` com referências históricas: Coltrane, melódica menor tradicional vs jazz minor moderna

## [0.6.0] — sessão anterior

### added
- **Drawer lateral** (`≡ menu`) com todos os controles duplicados — tônica, categoria, modo, temperamento, voicing, inversão. Acesso rápido sem rolar a tela
- **Modais explicativos** (botão `?`) em cada seção 01-07, com profundidade teórica em pt-br
- **Círculo das quintas com 2 níveis** — anel externo (12 tons maiores) + anel interno (12 relativos menores), nodes clicáveis
- **Voicing toggle** — tríade (1·3·5) ou tétrade (1·3·5·7)
- **Inversões** — fundamental, 1ª, 2ª, 3ª (com display de slash chord, ex: `Cmaj7/E`)
- ESC fecha modal e drawer

### changed
- Numerais romanos do campo harmônico recalculados com prefix `♭`/`#` baseado em desvio da escala maior
- `chordOfDegree(deg, overrideInv)` aceita parâmetro de inversão para uso em cadências (sempre fundamental)

## [0.5.0] — sessão anterior

### added
- **5 categorias de modos** com 16 escalas totais:
  - gregos (7): jônio, dórico, frígio, lídio, mixolídio, eólio, lócrio
  - harmônicas (4): harmônica menor, frígia dominante, melódica menor, lídio dominante
  - exóticas (2): húngara menor, dupla harmônica
  - simétricas (2): tom inteiro (6n), diminuta H-W (8n)
  - pentatônicas (2): pent. maior, pent. menor
- Toggle de **temperamento**: igual (12-TET) vs justa entonação (5-limit) com cents off por nota
- Cálculo dinâmico de qualidade de acordes — suporta escalas com 5/6/7/8 notas
- Pentatônicas ocultam campo harmônico (sem tríades estáveis)

## [0.4.0] — sessão anterior

### added
- **Tonnetz interativo** (rede tonal de Euler/Riemann) — eixos +5J, +3M, -3m
- Triângulos clicáveis (▲ maiores, ▽ menores)
- Marcação de no-modo, tônica, e nota característica
- Tonnetz mostra acordes fora do modo também (exploração)

## [0.3.0] — sessão anterior

### changed
- Repaginação completa: estética tech/document monoespaçada (JetBrains Mono em tudo)
- Paleta restrita: black, white, accent orange (uso parcimonioso para nota característica)
- Áudio com timing absoluto via `AudioContext.currentTime` (resolveu glitches de iOS)
- Barra `SYS_AUDIO` sticky no topo com estado da Web Audio
- Contraste alto, hierarquia clara

## [0.2.0] — sessão anterior

### added
- Primeira versão funcional: 7 modos gregos, tônica selecionável, escala visual + áudio
- Campo harmônico com numerais romanos
- Círculo das quintas (1 nível)
- Cadência i-iv-v-i

### known issues
- Áudio não tocava em alguns navegadores
- Contraste fraco entre estados ativo/inativo
- Sem ciclo de quartas

## [0.1.0] — sessão inicial

### added
- Esboço inicial usando ferramenta de visualização
- Conceito validado, plano de iteração definido
