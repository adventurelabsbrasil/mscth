# mscth — plano v0.26+ · percepção de valor para músicos

> Consolidado de 5 avaliações independentes (musicista, matemático, físico, professor de música, designer) + referência visual do Founder (vídeo `IMG_9431.MOV`: nuvem de partículas coloridas que nasce de um núcleo branco, abre em anel e se dispersa, em ciclo de "respiração") + pedido do Founder: **um único painel de som perto do piano**, com o piano como referência e o resto do app seguindo esse padrão.
>
> Data: 2026-11-20 · base: v0.25.0 (no ar em https://adventurelabsbrasil.github.io/mscth/)

## Diagnóstico em uma frase

As ideias e a geometria já são de alto nível e originais. O que hoje faria uma profissional desconfiar é **concreto e barato de corrigir**:

- grafia só com sustenidos;
- cadências que tocam acordes diferentes do rótulo;
- som de "brinquedo" por padrão;
- ajuda com numeração trocada;
- meia dúzia de afirmações teóricas e físicas erradas;
- primeira tela com cara de protótipo.

Conferido no código pelo Claude, e procede:
- o `data-help` das seções aponta para títulos com outra numeração;
- `NOTES` só tem sustenidos (l.1118);
- `chordToRoman` compara prefixo de string (Cm em C vira "I");
- não há limitador (8 `connect(destination)`, 0 compressores).

---

## Fase 1 — Credibilidade (fazer ANTES de mandar o link)

| # | O quê | Por quê (quem apontou) | Esforço |
|---|---|---|---|
| 1 | **Grafia enarmônica por grau.** Cada grau ganha a letra seguinte (dó menor = C D E♭ F G A♭ B♭). Vale para escala, acordes, cifra, campo e pentagrama, decidindo pelo modo e não só pela tônica. | Erro nº 1 para musicista e professor. O pentagrama desenha D e D# na mesma escala. | M |
| 2 | **Harmonia correta.** <ul><li>Cadências por função: qualidade fixa por cadência; V maior na andaluza; ♭VII real; esconder ou sinalizar o que não cabe no modo.</li><li>Nomes em PT-BR: perfeita, imperfeita, de engano/interrompida, suspensiva. "Turnaround" = I-vi-ii-V.</li><li>`chordToRoman` por qualidade, unificando ø7/m7♭5.</li><li>Acordes 6 e m6 (C-E-G-A = C6, não Am7/C).</li><li>V7/ii em minúscula.</li><li>4ª aum. × 5ª dim.</li><li>10ª menor × 9ª aum.</li></ul> | Musicista, professor, matemático. | P/M |
| 3 | **Revisão dos textos de ajuda.** <ul><li>Neo-Riemann: L leva C à 5ª do Em; C→A♭ = PL; octatônico = PR.</li><li>Harmonia negativa (eixo entre 3m/3M).</li><li>Parcial 13 (~+41¢ de A♭).</li><li>7º harmônico abaixo da 7m.</li><li>"Qualquer fonte → série harmônica" (falso: sinos, membranas, piano são inarmônicos).</li><li>Plomp-Levelt com senoides.</li><li>Maqam e notas neutras.</li><li>"4:5:6:8 jazz".</li><li>Creep/Rigby.</li><li>Quíntade = 4 terças.</li><li>sus2 ≠ add2.</li><li>Frígio v°.</li><li>Lídio dominante e menor melódica na família certa.</li><li>"16 escalas" (são 17).</li><li>"Luz ≈ 1,97 oitava" (≈ 2,05).</li><li>Tirar a piada Sklodowska.</li></ul> | Todos. | P |
| 4 | **Som profissional.** <ul><li>Bus master com limitador (`DynamicsCompressor`).</li><li>**Piano de cauda como padrão**, pré-carregado ao ativar o áudio.</li><li>Caudas naturais: release de ~1,5 s em vez de cortar.</li><li>Synth com decaimento (não "órgão").</li><li>`cancelAndHoldAtTime` contra cliques.</li><li>Cadências com condução de vozes (baixo em C3, vozes pela menor distância).</li></ul> | Musicista e físico: acordes grandes clipam; cadência em bloco denuncia "app". | P/M |
| 5 | **Lissajous honesto.** <ul><li>A forma se repete a cada **1 batimento** (hoje o app diz q batimentos; erro do Claude, apontado pelo matemático e confirmado pelo físico).</li><li>Fase que sempre fecha a figura.</li><li>Câmera lenta com aviso "×1/N" quando o batimento passa de ~3 Hz.</li><li>Razão calculada pelas frequências reais: a quinta do lobo do modo justo aparece e é explicada, em vez de "3:2 que gira".</li></ul> | Matemático e físico. | P/M |
| 6 | **Numeração e ordem únicas.** Título do `?` = número da seção. A jornada inclui 11 e 12. Uma ordem só no welcome, no `progress`, no README e no modal do teclado. | Musicista e professor: aparece no primeiro clique. | P |

## Fase 2 — Experiência (com a skill `/frontend-design`)

| # | O quê | Esforço |
|---|---|---|
| 7 | **Console de som único no piano.** Uma faixa no lugar das 2 fileiras atuais: `piano ▾ · ♩ 90 (tap) · A4 440 · igual/justa · volume · livre/sustain/snap · transpor · oitava`; no celular vira `⋯`. Todas as seções obedecem: timbre, BPM das cadências, padrões e arpejos, afinação. Saem os seletores duplicados (timbre na seção 11 e no menu, BPM na seção 06, afinação nas seções 03 e 12) e viram um chip só de leitura que abre o console. **Exceção explícita:** série harmônica e Lissajous ficam em senoide, com o selo "senoide · didático". | M |
| 8 | **Primeira tela limpa.** Saem "SYS_AUDIO" e "doc · index.html". Progresso e desafio do dia vão para o menu. Uma frase de proposta no lugar do manual. O CTA principal vira "toque uma nota". Copy toda em PT-BR. **Hero:** piano circular girando, tocando um ii-V-I em piano. **"Modo músico"** (`?pro`): sem níveis, sem banner, sem welcome. | M |
| 9 | **Seção 11 enxuta.** De 7 fileiras para 2 (vista 2D/3D · luz/rastro). Ordem e direção viram ícones no canto do desenho, e "limpar" vira botão discreto. Corrigir o bug de grid: fileira de 2 botões ocupa 2/5 da largura. | P/M |
| 10 | **Acessibilidade de base.** `:focus-visible`, `prefers-reduced-motion` (pausa 3D, Lissajous e partículas), contraste: atalhos do teclado a 1,4:1, laranja em texto pequeno vira `--accent-deep`, legenda da seção 11 e pentagrama no tema escuro. | P |
| 11 | **Partículas (o vídeo).** <ul><li>Cada nota solta partículas na cor da sua luz, saindo da tecla.</li><li>Ataque = núcleo branco; sustentação = anel; soltura = dispersão.</li><li>Acordes somam as cores. O BPM do console faz a "respiração".</li><li>Teto de partículas; discreto no claro, pleno no escuro.</li><li>**Modo palco:** tela cheia só com piano + partículas, para tocar e compor.</li><li>"A nota acende a página": a cor da nota vira o destaque da interface por ~1 s.</li></ul> | M |

## Fase 3 — Ideias "uau" (escolher 1 ou 2)

| Ideia | Para quem brilha | Esforço |
|---|---|---|
| **Web MIDI** — ligar o teclado de verdade e ver cifra, grau, Tonnetz, piano circular e Lissajous ao vivo | musicista | M |
| **Microfone** — cantar ou tocar; espectro medido sobre a série ideal; "o coro afina o Lissajous" (gira desafinado, congela na razão justa) | físico, professor | M/G |
| **Treino de ouvido** — quiz de intervalo, acorde, grau e cadência com placar; ditado curto; desafio do dia vira 5 perguntas | professor | M/G |
| **Construtor de progressão** — montar 4–8 graus, tocar em loop no BPM com condução de vozes, ver o caminho no Tonnetz, exportar `.mid` | musicista, professor | M/G |
| **DFT das notas** — 6 mostradores (diatonicidade, tom-inteiro…); a tonalidade sai sozinha da fase de F₅ | matemático | P/M |
| **Temperamentos históricos** — mesotônico, Werckmeister, Vallotti, comparados no mesmo acorde | musicista erudita, físico | M |
| **Analisador de espectro ao vivo** — ver os harmônicos do que soa (mostra o triângulo só com ímpares e o piano "esticado") | físico | P/M |

## Decisões do Founder

1. **Fase 3:** quais 1–2 ideias? Sugestão: **Web MIDI** (a musicista pluga o teclado dela) + **treino de ouvido**, ou **microfone**, se ela for cantora.
2. **Nomenclatura:** C D E ou dó ré mi? Sugestão: C D E como padrão, com chave para dó-ré-mi. Cifra no padrão brasileiro (Chediak: `7M`, `m7(9)`, `º`)?
3. **Ordem das seções:**
   - a série harmônica sai do 2º lugar e vai para o bloco de acústica, junto com o Lissajous;
   - nova seção curta de **intervalos** entre tônica e escala?
4. **Tema padrão** para o link da amiga: escuro (as partículas e a luz brilham mais)?
5. **Amostras de piano** copiadas para o repo (~2 MB), sem depender do site do Tone.js?

## Ordem de execução sugerida

1. Fase 1 inteira: 6 itens, ~1 sessão. É o mínimo para mandar o link sem risco.
2. Itens 7 + 8 + 10 da Fase 2: console, primeira tela, acessibilidade. É o que muda a primeira impressão.
3. Itens 9 + 11: seção 11 e partículas/palco.
4. Fase 3 escolhida.

Cada etapa vira versão própria (v0.26, v0.27…), testada no navegador antes de publicar, e o Founder dá o OK para cada push.
