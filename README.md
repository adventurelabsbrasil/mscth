# mscth

**Music theory lab — interactive, single-page, browser-native.**

`mscth` é um laboratório audiovisual de teoria musical. Single-file HTML com Web Audio API, sem build, sem dependências em runtime — abre no navegador e funciona. Pensado como ferramenta de exploração para músicos, estudantes e curiosos: ouvir, ver e manipular conceitos que normalmente só vivem em livros.

**Live:** https://adventurelabsbrasil.github.io/mscth/

---

## escopo

10 seções interativas em **ordem pedagógica** (do concreto ao abstrato), com piano sticky no rodapé:

1. **tônica** — 12 notas cromáticas, transposição completa
2. **série harmônica · timbre** — 16 parciais com cents off, presets (senoide, quadrada, serra, órgão), síntese aditiva clicável e ativável parcial-a-parcial
3. **escala** — visual + áudio, toggle 12-TET ↔ justa entonação 5-limit com cents off, opção de exibir frequências em Hz
4. **modo** — 16 escalas em 5 categorias (gregos, harmônicas, exóticas, simétricas, pentatônicas)
5. **caráter do modo** — nota característica, mood, flavor histórico-cultural
6. **padrões melódicos** — ascendente, descendente, ida-e-volta, terças, quartas, tetracordes, com BPM ajustável (60-160) e visualização da nota atual sincronizada com a escala
7. **campo harmônico** — três tabs:
   - **diatônicos** — acordes do modo, com voicing tríade / tétrade / **quíntade (com 9ª)** e até 5 inversões (visualizadas em torre vertical)
   - **emprestados** — modal interchange (acordes do modo paralelo)
   - **dominantes 2ª** — acordes de preparação (V7/V, V7/vi, etc.)
   - sub-seção **intervalos compostos** — comparativo audível de 2ª↔9ª, 4ª↔11ª, 6ª↔13ª
8. **cadências** — 13 progressões canônicas (V-I, IV-I, ii-V-I, doo-wop, axis, andaluza, rock min...) aplicadas ao modo atual
9. **círculo das quintas** — anel externo (maiores) + anel interno (relativos menores), 2 níveis interativos
10. **tonnetz** — rede tonal de Euler/Riemann, triângulos clicáveis, modo **tríades** ou **tétrades** (com overlay tracejado da 7ª), nome do acorde flutuando ao tocar

Cada seção tem botão `?` que abre modal explicativo com profundidade teórica em pt-br — incluindo referências históricas (Bach, Fourier, Helmholtz, Euler, Riemann, Tymoczko, Wagner, Coltrane, Beatles, Bacharach, Jobim, Stevie Wonder).

**Drawer lateral** (`≡ menu`) duplica todos os controles para mudança rápida sem rolar a tela.

---

## piano interativo (sticky)

Teclado de **3 oitavas** (C4–B6) fixado no rodapé:

- **Cliques** tocam notas com sustentação configurável
- **QWERTY mapeado** em duas oitavas paralelas:
  - `Z X C V B N M ,` = oitava 4 (brancas) · `S D G H J` = pretas
  - `Q W E R T Y U I` = oitava 5 (brancas) · `2 3 5 6 7` = pretas
- **3 modos**: livre · sustain (mantém notas) · snap to mode (só permite notas do modo atual)
- **Identificação de acordes em tempo real** — toque 3+ notas e o sistema identifica `Cmaj7`, `Dm9`, `Bø7`, etc.
- **Display de intervalo** — ao tocar duas notas em sequência, mostra a distância (`5J · 5ª justa · 7 semitons ↑`); distingue 2ª de 9ª, 4ª de 11ª, 6ª de 13ª quando ambas as oitavas são conhecidas
- **Cores semânticas** opcionais (no menu): paleta de **distância tonal** (círculo de quintas) ou **dissonância sensorial** (Plomp-Levelt)

---

## sincronização cross-section

Cada nota ou acorde tocado em qualquer seção se reflete imediatamente em todas as outras:

- Clique numa nota da escala → tecla pisca no piano · pisca no Tonnetz · pisca no círculo
- Clique num acorde do campo harmônico → 3-5 teclas piscam simultaneamente · triângulo do Tonnetz acende · acorde aparece flutuando dentro do triângulo
- Toque acordes no piano → triângulo correspondente acende no Tonnetz · grau aparece destacado no campo harmônico

---

## sistema de progresso

Cada seção tem um botão circular (○ ◔ ◕ ●) ao lado do `?` para auto-marcar nível de entendimento:

- **○** não vi ainda
- **◔** explorei
- **◕** entendi
- **●** domino

Progresso salvo automaticamente via `localStorage`. Barra superior mostra porcentagem global. Não há gamificação compulsória — apenas referência pessoal de auto-avaliação.

---

## stack

- **HTML/CSS/JS** vanilla, single file (~3700 linhas)
- **Web Audio API** — síntese real-time, sem samples
- **Google Fonts** — JetBrains Mono (única dependência externa)
- **SVG** — Tonnetz, círculo de quintas, labels flutuantes
- **localStorage** — persistência de progresso

Sem build step. Sem framework. Sem package.json. Não precisa de servidor — abre `index.html` direto no navegador.

Compatibilidade: macOS Safari/Chrome/Firefox + iOS Safari testados.

---

## rodar localmente

```bash
git clone https://github.com/adventurelabsbrasil/mscth.git
cd mscth
open index.html  # ou xdg-open / start
```

Para servir via HTTP (necessário em alguns navegadores estritos com Web Audio):

```bash
python3 -m http.server 8080
# acessar http://localhost:8080
```

---

## deploy

GitHub Pages é o caminho natural. No repo: **Settings → Pages → Source: main, root**. URL fica `https://adventurelabsbrasil.github.io/mscth/`.

Domínio customizado (ex. `mscth.adventurelabs.com.br`) requer adicionar arquivo `CNAME` e configurar DNS.

---

## estrutura de código

Tudo em `index.html`. Os blocos lógicos do JS são organizados em ordem:

- **Dicionários de dados**: `NOTES`, `JUST_RATIOS`, `CATEGORIES`, `MODES`, `CADENCES`, `HARMONIC_PRESETS`, `MODAL_DOCS`, `KB_QWERTY`, `KB_CHORD_PATTERNS`, `INTERVAL_NAMES`, `COMPOUND_NAMES`
- **State**: tonic, modeIdx, categoryId, voicing (triad/seventh/ninth), inversion, fieldType (diatonic/borrowed/secondary), showSevenths, kbMode, levels, etc.
- **Áudio**: Web Audio scheduling, justa entonação, cents off
- **Construtores de acordes**: `chordOfDegree`, `chordFromScale`, `getBorrowedChords`, `getSecondaryDominants`
- **Renderizadores**: `renderTonics`, `renderScale`, `renderChords`, `renderCircle`, `renderTonnetz`, `renderHarmonicTable`, `showInversionStack`, `renderCompoundIntervals`, `buildKeyboard`, etc.
- **Sincronização**: `pianoEcho`, `pianoEchoChord`, `syncCrossSectionHighlights`, `logTonalNote`
- **Progresso**: `loadLevels`, `saveLevels`, `cycleLevel`, `applyLevels`
- **Drawer / Modal**: overlays
- **Event listeners**: handlers de tabs, drawer, ESC, init

Convenção: cada bloco prefixado com `// ============ NOME ============`. `renderAll()` reidempotente, chamado após qualquer mudança de state.

---

## roadmap

Versões entregues — ver [CHANGELOG.md](./CHANGELOG.md).

**Atual: v0.18** — base teórica completa para harmonia ocidental tonal.

Próximos passos candidatos (em ordem aproximada de prioridade):

- **notação musical básica** — clave de sol em SVG mostrando as notas do acorde/escala atual
- **transformações neo-Riemannianas (P, L, R)** animadas no Tonnetz — Wagner, Liszt, Schubert tardio
- **harmonia negativa** — espelhamento de Levy / Jacob Collier sobre o eixo C-G
- **microtonalidade real** — maqamat árabes (bayati, rast, hijaz), ragas indianas (yaman, bhairav), gamelan (slendro, pelog), com 24-TET / shrutis / Pythagorean / 5-limit
- **construtor de acordes interativo** — empilhar intervalos visualmente, ver qualidade emergente
- **tabela comparativa de escalas** — todas as 16 em C lado a lado, semitons marcados
- **acordes estendidos completos** — 11, 13, alterados (7♭9, 7#11, 7alt), drop2/drop3, quartal harmony (McCoy Tyner), místicos de Scriabin
- **eixo temporal** — sequenciador rítmico, polirritmia, clave 3-2/2-3, hemiola
- **dodecafonia** — matriz 12×12 de Schoenberg, 4 operações (P, R, I, RI)
- **integração com Claude API** — geração assistida (vibe → modo + cadência + melodia + análise)
- **mscth-violão** (módulo paralelo) — diapasão 6×24, digitações, repertório clássico aplicado (Tárrega, Sor, Villa-Lobos, Brouwer)

---

## referências teóricas

Bibliografia consultada na construção dos modais explicativos:

- Tymoczko, D. — *A Geometry of Music* (Oxford, 2011) — orbifold, voice leading, Tonnetz topológico
- Cohn, R. — *Audacious Euphony* (Oxford, 2012) — neo-Riemannian theory
- Helmholtz, H. — *On the Sensations of Tone* (1863) — psicoacústica
- Plomp & Levelt — "Tonal Consonance and Critical Bandwidth" (JASA, 1965) — dissonância sensorial
- Fourier, J. — *Théorie analytique de la chaleur* (1822) — síntese aditiva
- Forte, A. — *The Structure of Atonal Music* (Yale, 1973) — set theory
- Levy, E. — *A Theory of Harmony* (SUNY, 1985) — harmonia negativa
- Touma, H. — *The Music of the Arabs* (Amadeus, 1996) — maqamat
- Bhatkhande, V. — *Hindusthani Sangeet Paddhati* (1909-1932) — ragas
- Persichetti, V. — *Twentieth-Century Harmony* (Norton, 1961) — extensões e clusters

---

## licença

MIT — ver [LICENSE](./LICENSE).

---

## créditos

**Rodrigo Ribas** — founder, Adventure Labs
[adventurelabs.com.br](https://adventurelabs.com.br) · [contato@adventurelabs.com.br](mailto:contato@adventurelabs.com.br)
Instagram: [@ribasrodrigo91](https://instagram.com/ribasrodrigo91) · [@adventurelabsbrasil](https://instagram.com/adventurelabsbrasil)

Construído iterativamente com Claude (Anthropic) como pair programmer.

---

*"a música é o esforço que fazemos para tornar a vida menos áspera."* — fernando pessoa
