# handoff · mscth · v0.18.0

Documento de transferência para versionamento no repositório `adventurelabsbrasil/mscth`.

---

## arquivos prontos pra commit

```
mscth/
├── index.html       (1984 linhas, single-file completo)
├── README.md
├── CHANGELOG.md
├── HANDOFF.md       (este arquivo)
└── LICENSE          (sugestão: MIT — adicionar)
```

---

## comandos git — primeira vez

Se o repositório ainda não existe no GitHub, criar primeiro vazio em `https://github.com/adventurelabsbrasil/mscth` (sem README, sem .gitignore — vamos commitar tudo do zero).

```bash
# em uma pasta de trabalho local
mkdir mscth && cd mscth

# colar os 4 arquivos: index.html, README.md, CHANGELOG.md, HANDOFF.md

# inicializar
git init
git branch -M main

# adicionar LICENSE MIT (recomendado)
curl -o LICENSE https://raw.githubusercontent.com/licenses/license-templates/master/templates/mit.txt
# editar [year] e [fullname] no LICENSE

# primeiro commit
git add .
git commit -m "feat: mscth v0.9 — laboratório interativo de teoria musical

- 10 seções: tônica, modo, caráter, escala, campo harmônico,
  círculo das quintas, tonnetz, padrões melódicos, cadências,
  série harmônica + timbre
- 16 escalas em 5 categorias
- Web Audio com justa entonação e temperamento igual
- voicings tríade/tétrade + inversões
- 13 cadências canônicas
- síntese aditiva com 16 parciais
- modais explicativos profundos em pt-br
- drawer lateral com todos os controles

Authored by Rodrigo Ribas · Adventure Labs"

# conectar ao remoto
git remote add origin https://github.com/adventurelabsbrasil/mscth.git
git push -u origin main
```

## comandos git — atualizações futuras

Cada nova versão (v0.10, v1.0, etc.) deve seguir o padrão:

```bash
git add .
git commit -m "feat(seção): descrição curta

- bullets do que mudou
- referências a issues se houver"
git tag v0.10.0
git push origin main --tags
```

Convenção sugerida de commits: [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/) — `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `chore:`.

---

## deploy GitHub Pages

Após o primeiro push:

1. Em `https://github.com/adventurelabsbrasil/mscth/settings/pages`
2. **Source:** Deploy from a branch
3. **Branch:** `main`, folder `/ (root)`
4. **Save**

URL fica disponível em poucos minutos: `https://adventurelabsbrasil.github.io/mscth/`

Para domínio customizado (ex. `mscth.adventurelabs.com.br`):

1. Adicionar arquivo `CNAME` na raiz com o domínio:
   ```
   mscth.adventurelabs.com.br
   ```
2. No DNS do domínio, criar CNAME apontando para `adventurelabsbrasil.github.io`
3. Aguardar propagação e ativar HTTPS nas Settings do Pages

---

## estrutura técnica do `index.html`

### organização do arquivo

| Linhas (aprox.) | Bloco               | Conteúdo                                                                 |
|-----------------|---------------------|--------------------------------------------------------------------------|
| 1-12            | Head                | meta, title, fonts                                                       |
| 13-280          | CSS                 | tokens, layout, todos os componentes                                     |
| 290-460         | HTML body           | audio status, header, seções 01-10, footer                              |
| 467-560         | Drawer + Modal      | overlays                                                                 |
| 565-650         | JS data             | NOTES, JUST_RATIOS, CATEGORIES, MODES, CADENCES, HARMONIC_PRESETS        |
| 650-760         | JS MODAL_DOCS       | textos de cada modal de ajuda                                            |
| 760-820         | State + Audio       | globais, AudioContext, pitchHz, centsOff, playPitch, playChord           |
| 820-1000        | Helpers             | currentMode, modesInCategory, getCurrentScale, modeContainsChrom, etc.   |
| 1000-1100       | chordOfDegree       | construção dinâmica de tríades/tétrades + inversões                      |
| 1100-1450       | Renders             | tonics, cat-tabs, modes, info, scale, chords, tunes, voicings, etc.      |
| 1450-1750       | Cadences + Patterns + Harmonic | renderCadences, generatePattern, renderHarmonicTable, players |
| 1750-final      | Event listeners     | tonics handlers, drawer, modal, ESC, init                                |

### convenções

- Cada bloco lógico prefixado com `// ============ NOME ============`
- Estado global em `let` no topo do bloco State
- Funções de render são idempotentes (chamar 2x não causa side effect)
- `renderAll()` re-renderiza TUDO — chamado após qualquer mudança de estado
- Áudio sempre via `AudioContext.currentTime` (não setTimeout) para timing preciso
- `triangle` oscillator pra notas musicais; `sine` para parciais isolados (síntese aditiva)

### gotchas

- **iOS Safari**: requer interação do usuário antes do primeiro `audioCtx.resume()`. Resolvido com botão `init audio` e fallback em `touchstart`/`mousedown`.
- **Justa entonação 5-limit**: limitada às razões da tabela `JUST_RATIOS`. Ratios alternativas (Pythagorean, just minor 7th 7/4) podem ser adicionadas.
- **Tonnetz overflow**: viewBox 480×360 corta intencionalmente — densidade visual maior que área de exibição. Range de col/row delimitado em `tonInBounds`.
- **Pentatônicas (5 notas)**: campo harmônico desativado, cadências ocultas — sem tríades estáveis empilhando terças.
- **Escalas não-7**: tom inteiro (6) e diminuta H-W (8) usam grids dinâmicos via `el.style.gridTemplateColumns = 'repeat('+N+',1fr)'`.

---

## state shape

```js
// estado global vivo
{
  tonic: 0,                  // 0-11 (índice cromático)
  modeIdx: 0,                // índice em MODES[]
  categoryId: 'gregos',      // id de CATEGORIES
  tuningMode: 'equal',       // 'equal' | 'just'
  voicing: 'triad',          // 'triad' | 'seventh'
  inversion: 0,              // 0..3
  patternId: 'asc',          // 'asc' | 'desc' | 'updown' | 'thirds' | 'fourths' | 'tetracords'
  patternBpm: 90,            // 60 | 90 | 120 | 160
  patternOctaves: 1,         // 1 | 2
  harmonicActive: [false × 17], // index 1..16, default [1] = true
  audioCtx: AudioContext,
  audioState: 'pending'      // 'pending' | 'active' | 'failed'
}
```

---

## roadmap detalhado

### v0.10 candidatos

#### opção a — neo-Riemann + harmonia negativa
- 3 botões P (parallel), L (leading-tone), R (relative) que aplicam transformações ao acorde tônico
- Animação SVG no Tonnetz mostrando o caminho geodésico
- "Negative harmony" toggle — espelha o acorde através do eixo entre 3M e 5J
- Modal explicando: Riemann, Lewin, Cohn, Ernst Levy, Jacob Collier

#### opção b — microtonalidade + maqamat
- Toggle de sistema: 12-TET / 24-TET / 53-TET / Pythagorean / 5-limit
- Adicionar maqamat: bayati, rast, hijaz, saba, kurd, nahawand
- Adicionar ragas: yaman, bhairav, malkauns, bageshri
- Microtonalidade real no áudio (parcial 7 = blue note, parcial 11 = neutral 4th)
- Modal: tradições não-ocidentais, shruti, tarab

#### opção c — eixo temporal
- Sequenciador rítmico com 8 ou 16 steps
- Polirritmia: 2-contra-3, 3-contra-4 visualizados
- Clave 3-2 e 2-3 afro-cubana
- Hemiola animada
- Compassos compostos (6/8, 12/8) e irregulares (5/4, 7/8)

#### opção d — acordes estendidos
- Voicing: tríade / tétrade / 9 / 11 / 13
- Acordes alterados: 7♭9, 7#9 (Hendrix), 7#11, 7alt
- Drop 2, drop 3 voicings
- Quartal harmony (McCoy Tyner)
- Acordes místicos de Scriabin

### v1.0 — bandeira de entrega pública

- Performance: lazy render do Tonnetz (atual: redesenha tudo a cada mudança)
- Acessibilidade: aria-labels completos, keyboard navigation
- i18n: EN paralelo ao pt-BR
- Compartilhamento: URL hash com estado (tônica + modo + voicing)
- Export: gravar áudio do que está sendo tocado
- Documentação técnica em `docs/`

### v2.0 — conectado a IA

- Geração assistida via Claude API: "vibe → modo + cadência + melodia"
- "modo do dia" baseado em horário/clima/humor
- Análise por IA de áudio carregado (qual modo, qual cadência)
- Conexão com a Adventure Labs como martech

---

## referências teóricas

Bibliografia consultada na construção dos modais:

- Tymoczko, D. — *A Geometry of Music* (Oxford, 2011) — orbifold, voice leading
- Cohn, R. — *Audacious Euphony* (Oxford, 2012) — neo-Riemannian theory
- Helmholtz, H. — *On the Sensations of Tone* (1863) — psicoacústica
- Fourier, J. — *Théorie analytique de la chaleur* (1822) — síntese aditiva
- Forte, A. — *The Structure of Atonal Music* (Yale, 1973) — set theory
- Levy, E. — *A Theory of Harmony* (SUNY, 1985) — harmonia negativa
- Touma, H. — *The Music of the Arabs* (Amadeus, 1996) — maqamat
- Bhatkhande, V. — *Hindusthani Sangeet Paddhati* (1909-1932) — ragas

---

## status atual

✅ v0.18 estável e testada
✅ display de intervalo distingue 2ª de 9ª (e 4ª/11ª, 6ª/13ª)
✅ quíntades (acordes com 9ª) no campo harmônico
✅ sub-seção comparativa "intervalos compostos" com áudio A/B
✅ tétrades no Tonnetz com overlay tracejado pra 7ª
✅ nome do acorde flutua dentro do triângulo ao tocar
✅ display de intervalo entre notas (em qualquer seção que produza som)
✅ piano com 3 oitavas (C4-B6) sem colisões em acordes estendidos
✅ QWERTY mapeando 2 oitavas em paralelo (ZXCV grave + QWER agudo)
✅ empréstimos modais e dominantes secundárias implementados
✅ visualização de inversões em torre vertical
✅ UX de "init audio" e "incluir parciais" esclarecida
✅ piano-eco cross-section bidirecional
✅ toggle de frequências em Hz
✅ ordem pedagógica das seções estabelecida
✅ sistema de progresso por níveis com persistência via localStorage
✅ piano interativo com identificação de acordes em tempo real
✅ sincronização cross-section ao tocar piano
✅ sistema de cores semânticas (distância tonal + dissonância)
✅ matemática de cents validada
✅ áudio funcionando em macOS Safari/Chrome/Firefox + iOS Safari
✅ pronto pra commit no GitHub
✅ pronto pra deploy via GitHub Pages

📌 Próximas adições solicitadas pelo usuário (registradas para futuras versões):

### v0.14 candidatas

#### 🎼 Notação musical básica (clave de sol + colcheias)
Renderizar SVG simplificado de partitura ao tocar escala/acorde. Não inclui ritmo, só altura. Estimativa: ~400 linhas. Bibliotecas alternativas (VexFlow, abcjs) adicionam ~200KB — seria o primeiro break do "no dependencies".

#### 🏗 Construtor de acordes (tab dedicada)
Interface visual de empilhar intervalos: 3M+3M=aug, 3m+3M=m, etc. Toggle pra adicionar 7ª, 9ª, 11ª, 13ª. Mostra qualidade resultante e nome em notação cifrada. Estimativa: ~250 linhas.

#### 📊 Tabela comparativa de escalas
Grid lado a lado das 16 escalas em C com semitons marcados. Visualiza o "sistema completo" como matriz. Estimativa: ~150 linhas.

#### 🌍 Maqamat + ragas + microtonalidade real
Adicionar afinações não-12-TET. Maqamat árabes (bayati, rast, hijaz, saba) com microtonalidade real (1/4 tom). Ragas indianas (yaman, bhairav, malkauns) com pakad melódico. Gamelan (slendro, pelog). Requer:
- Toggle de sistema de afinação (12-TET / 24-TET / Pythagorean / 5-limit / shrutis indianos)
- Cents off relativos a cada sistema
- Modal explicando contexto cultural
Estimativa: ~600 linhas, mais a coleção de dados das escalas.

#### 🎹 Múltiplas oitavas no piano
Atualmente 2 oitavas (C4-B5). Expandir pra 4 oitavas (C2-B5) com scroll horizontal em mobile. Estimativa: ~100 linhas.

#### 🔄 Transformações neo-Riemann (P, L, R)
Animadas no Tonnetz com setas de transição. Sequencer de transformações (P-L-P-L = hexatonic cycle). Estimativa: ~400 linhas.

#### ➗ Harmonia negativa
Toggle "espelhar" que reflete o acorde tocado pelo eixo entre 3M e 5J da tônica. Visualização do eixo no Tonnetz. Estimativa: ~200 linhas.

📌 Próxima decisão: qual do roadmap acima priorizar para v0.14?
