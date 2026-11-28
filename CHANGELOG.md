# changelog

Todas as mudanças notáveis deste projeto. Baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [não lançado]

### added
- **Túnel do tempo** (`tunel.html`, link na seção 11) — o piano circular anda no ritmo da música e gira devagar; cada nota deixa um fio no espaço (comprimento = duração, espessura e brilho = o som morrendo, cor = cor da luz da nota) e o que já soou vai apagando. Fio liso, sem ondinha: a espiral já é a senoide vista de lado. Vistas *lado*, *frente* e *viagem* (câmera dentro do túnel), giro, memória, andamento e câmera que segue ou fica parada.
  - **MIDI**: subir ou arrastar um `.mid` (leitor próprio, formatos 0 e 1, sem dependência); melodia e baixo pela trilha, compasso e anacruse do arquivo; bateria ignorada. Exemplo embutido: *Für Elise* (MIDI do Mutopia Project, domínio público).
  - **Acordes**: lidos por janela harmônica (arpejo conta) com casamento de modelo de acorde; cifra brasileira (`C7M`, `Am7(♭5)`, `C/E`), composição (`C E G B`) e grau no tom (`I7M`); tom automático (Krumhansl-Kessler) ou escolhido. Cor do acorde pela fundamental (menor puxa pra cor da 3ª e fica tracejado), pela mistura das notas ou branca.
  - **Camadas** (⚙): cada elemento liga e desliga, predefinições *limpo*/*completo*, pedal virtual (sustenta até o fim do compasso), contorno da melodia, clarão branco no ataque.
  - **Teia da música**: quadro 2D que não apaga — acordes como raios, melodia como espiral de seda, baixo como fio-guia — e vira um quadro abstrato da peça (⤓ png).
  - **Piano roll** de jogo: as notas caem até o teclado, a tecla acende na cor da nota com clarão no ataque.
  - **Exportar a escultura** (⤓): da música inteira, sem precisar tocar até o fim — **OBJ** 3D (cada nota é um tubo em volta do eixo do tempo, raio afinando com o som; anéis fechados nas trocas de acorde; cor por vértice, abre no Blender), teia em **PNG** (2048 px) e **SVG**, **JSON** com notas, acordes, tom e mapeamento, e PNG da vista atual. Escolhe o que entra (melodia, baixo, notas do acorde, anéis), colorido ou branco, fundo preto ou transparente.

### fixed
- **Túnel: fio sem degraus.** Cada nota é uma fita contínua com espessura variando ponto a ponto; o baixo (o fio mais grosso) mostrava blocos, sobretudo na vista viagem.
- **Teia não satura em música longa**: um polígono por troca de acorde (intensidade pela duração) e fios mais tênues quando há muitas notas.
- **Painéis ⚙ e ⤓ por cima do quadro da teia.**

### added (túnel)
- **Vista constelação ✶** (botão de vista, 5ª opção; `#view=constelacao`): sem eixo do tempo, a peça inteira se acumula no mesmo espaço 3D em órbita lenta. Cada nota é um ponto, a linha liga as notas em sequência (melodia pela voz de cima, baixo pela de baixo), os 4 últimos passos ficam grossos na cor da nota, as notas que soam brilham com nome e o que soa junto vira polígono preenchido. O passado apaga sem sumir. Inspirada no *Visual Model* de Lucio Arese (Paganini, Coltrane). Posição escolhida no ⚙ (`#pos=teoria|pca`):
  - **teoria**: hélice de altura (ângulo = nota, altura = oitava). Posição fixa, então a mesma escala desenha sempre a mesma figura.
  - **dados**: cromagrama de cada nota (a nota 3×, harmônicos 3 e 5, o que soa junto, um pouco da nota anterior da mesma voz) → PCA em 3 eixos sobre a música inteira. Rótulo com as coordenadas, legenda com a variação explicada por eixo. Ao vivo a PCA se refaz a cada ~0,7 s, sem trocar o sinal dos eixos, e os pontos deslizam até a posição nova. Trocar teoria ↔ dados também desliza.
- **Piano roll com memória** (tocando música): o que já soou continua descendo abaixo do teclado por 3 tempos, apagando. Ao vivo segue como antes.
- **Braço do violão com previsão** (tocando música): as próximas notas (até 2 tempos) aparecem como anéis que se fecham sobre a casa onde vão soar.
- **Acorde incompleto** (ao vivo): com 3+ notas, aceita o acorde com UMA nota faltando, desde que a fundamental soe, e avisa o que falta — `F A B` → `Bm7(♭5)/F`, `B F A · sem 3ª`. Sus e quinta pura não entram na tolerância. Sem acorde nenhum, o canto mostra `?`, as notas e o trítono, se houver.
- **Joyful a 140 bpm** (padrão do exemplo).
- **Grau com inversão** (estilo popular): o baixo entra no grau pelo intervalo a partir da fundamental — `C/E` → `I/3`, `C/G` → `I/5`, `G7/F` → `V7/7`, `Am/C` → `VIm/3`; baixo fora do acorde também (`C/D` → `I/9`).
- **Exemplo Joyful, Joyful, We Adore Thee** no seletor (melodia Hymn to Joy, Beethoven 1824; letra H. van Dyke 1907; domínio público): arranjo de hino próprio em Sol maior, 100 bpm, acordes sustentados, cadência IV–V7–I.
- **Exemplo Jingle Bells** no seletor (Pierpont, 1857, domínio público; arranjo próprio em 3 trilhas, 160 bpm, baixo alternado em oitava para não virar falsa inversão).
- **Prisma do acorde** (camada ⚙ `forma do acorde em 3D`, ligada por padrão): a forma do acorde esticada pelo tempo em que ele soa, pele translúcida na cor do acorde, torcida pelo giro do túnel, com uma seção a cada tempo; tríade vira prisma triangular, tétrade quadrangular.
- **Microfone ancorado no ataque**: a nota entra no instante do toque, não quando o detector confirma (atraso medido 281 ms → 20 ms); fim da nota 80 ms mais cedo.
- **Comparar violão × MIDI** (`⇄ comparar`, depois de gravar com o microfone): onda do áudio cru, ataques reais, notas MIDI e ligação ataque→nota na mesma linha do tempo; mede atraso e variação; toca original, MIDI ou os dois; versões deslocada e ancorada no ataque; baixa `.wav`.
- **Gravar e ouvir em piano** (modo ao vivo): `⏺ gravar trecho` captura o que você toca no violão (microfone), no teclado ou no MIDI; `▶ ouvir no piano` toca a gravação como MIDI no túnel com piano de verdade (amostras Salamander Grand Piano, CC-BY 3.0; sem rede, piano sintetizado); `⤓ .mid` baixa o arquivo. Estalos com menos de 70 ms saem. Novo seletor `timbre: sintético | piano` para todo o app do túnel.
- **Braço do violão** (aba no quadro do piano roll): afinação padrão, 15 trastes, digitação mais provável (janela de 4 trastes + cordas soltas, perto da pestana), outras posições como círculos vazios, clique toca no modo ao vivo. Mi maior, Dó maior e Sol maior saem nas formas abertas.
- **Piano roll e braço juntos** (liga/desliga independentes), **19 casas**, **trava de posição** (auto ou casa 1–15) e **guitarra MIDI** (1 canal por corda = corda exata). A forma do acorde sai das notas ouvidas: Dm aberto, pestana na 5ª ou forma de E na 10ª.
- **Afinador** (com o microfone): nota, Hz, régua de cents com verde/amarelo/vermelho e gráfico da altura nos últimos 5 s. Detector de uma nota só por autocorrelação (McLeod); voz sintética a +12 cents medida em +11,4.
- **Microfone** (🎤, no modo ao vivo): ouve piano, violão ou voz e desenha no túnel, aproximado. Energia por nota + soma de harmônicos, subtraindo só a parte esperada dos harmônicos (a oitava de cima que sobra é nota de verdade); espera o estalo do ataque passar; notas do microfone ficam mudas no app. Validado com violão sintético: Mi maior de 6 cordas e Dó maior de 5 cordas exatos.
- **Vista órbita** (⟳): a câmera dá a volta completa no sistema, por cima e por baixo do túnel.
- **Tocar ao vivo** (`🎹` no seletor, ou `tunel.html#aovivo`): o usuário toca e o túnel desenha na hora. Teclado do computador (A W S E D F T G Y H U J K, Z/X oitava, espaço = pedal), teclado MIDI de verdade via Web MIDI (força da nota e pedal) ou clique no piano roll. Acorde, grau e tom detectados enquanto toca; a teia se tece junto; o piano roll mostra as notas subindo; o improviso pode ser exportado como escultura.

### changed
- **Teclado do computador com 46 teclas brancas** (app e túnel): `1234567890-=` `qwertyuiop[]\` `asdfghjkl;'` `zxcvbnm,./`, do A1 ao C8, T continua no dó central; **Caps Lock ligado** ou Shift = pretas.
- **Túnel abre com o Prelúdio em Dó de Bach (BWV 846)**: um acorde arpejado por compasso, a progressão inteira aparece no eixo (`C · Dm7/C · G7/B · C · Am/C · D7/C · G/B · C7M/B…`). Für Elise e o exemplo curto continuam no seletor. MIDI do Mutopia Project, domínio público.
- **Entrada pelo topo do app**: `túnel do tempo ↗` ao lado de "como funciona", além do link na seção 11.
- **Forma do cone escolhível** (⚙, com `?` explicando cada uma): *ouvido* (igual a cada semitom, padrão, 4,5×), *Kepler* (r ∝ f^−2/3, a lei da seção 13, ≈ 28×) e *ar* (comprimento de onda: A0 = 12,5 m, C8 = 8 cm, 152×). Escala *piano inteiro* (A0–C8, padrão, para comparar esculturas) ou *ajustar à música*. Vale para túnel, teia e exportações.
- **Túnel mais suave: nada pontiagudo além dos acordes.** Fitas das notas com ponta em meia-lua (também onde são cortadas perto da câmera), contorno da melodia e fios da teia com ponta e junção redondas (inclusive no PNG/SVG exportados), tracejados com ponta redonda, notas e teclas do piano roll arredondadas, tubos do OBJ com ponta em meia-esfera. Os polígonos dos acordes mantêm os cantos vivos.
- **Seção 13 · órbitas — o intervalo como sistema solar.** Cada nota vira um planeta em volta da tônica: frequência = velocidade angular, raio pela 3ª lei de Kepler (r ∝ f^−2/3, a grave por fora). A linha entre os planetas, desenhada ao longo de um ciclo inteiro, forma a *rosa do intervalo*; os pontos marcam as p − q conjunções por ciclo. Razão exata (afinação justa) → rosa parada; temperamento igual → a rosa gira e volta à forma a cada batimento (mesma conta da seção 12, com câmera lenta acima de ~3 Hz). Segunda linha com ressonâncias reais pela razão medida dos períodos: Netuno·Plutão (3:2, quinta), Io·Europa (2:1, oitava), Júpiter·Saturno (≈ 5:2), Vênus·Terra (≈ 13:8, o pentagrama de Vênus; Fibonacci e φ no modal). Modal `?` com Kepler (*Harmonices Mundi*, 1619) e "mi-fá". Tocar 2 notas no piano, juntas ou em sequência, mostra o intervalo tocado.
- **Seção 14 · chladni — o som desenhado na areia.** Placa quadrada idealizada com 7 mil grãos: cada um leva um chute proporcional à vibração local e a areia se junta nas linhas nodais do modo (n,m)±. Aba *placa*: 18 modos pela frequência (f ∝ n² + m²: 1, 2, 4, 5, 8, 9… — inarmônica, sem o 3 e sem a quinta), a nota tocada no piano de baixo cai no modo mais próximo com o desvio em cents e a areia só se organiza em ressonância; `▶ varrer frequência` sobe uma senoide por quase 5 oitavas, parando em cada ressonância (46 s). Aba *intervalo* (didática): a razão p:q escolhe o modo (p,q). Movimento reduzido assenta a areia de uma vez. Modal `?` com Chladni (1787), Sophie Germain (1816) e Kirchhoff (1850). Primeira entrega das partículas adiadas da 28.6.

### fixed
- **Seções 13 e 14 respondem ao clique no piano**: valem as 2 últimas notas tocadas (na placa, a última), no piano de baixo e nos circulares; o botão de intervalo, céu ou modo clicado depois volta a mandar, e `CLEAR`/Esc esquece as notas. Fora de ressonância a placa lista as teclas que desenham.
- **Varredura da Chladni forma as figuras graves**: pausa em cada modo em vez de passar direto; nota tocada ou troca de tônica interrompe.

## [0.28.0] — 2026-11-21

### added
- **Intervalos melódicos e descendentes** (seção 12): três modos de ouvir, `▶ juntas` (harmônico), `▶ subindo ↑` e `▶ descendo ↓` (melódico, no tempo do console). Vale para as abas simples e compostas; no modo descendente a nota de baixo fica abaixo da tônica (C4 → F3) e as abas ganham `↑`/`↓`. A figura não muda (a razão é a mesma); mudam o rótulo, o som e o piano.
- **Metrônomo** no console de som: clique no tempo do `♩`, acento no 1º tempo, compasso 2/4 · 3/4 · 4/4, contador de tempo ao lado. Agendado no relógio do áudio (não atrasa com a página ocupada).
- **Créditos**: amostras do piano (Salamander Grand Piano · Alexander Holm · CC-BY 3.0), VexFlow (MIT) e o código (MIT). Referências ganham Lissajous/Bowditch, Heinichen e Rameau.

### changed
- **Seção 11 enxuta**: de 6 fileiras de botões para 2 (vista · notas por anel / teclas · rastro · luz). Ordem (cromática/quintas) e direção (grave na borda/no centro) viram ícones no canto do desenho; `⌫ rastro` só aparece com o rastro ligado. A fileira de 2 botões não ocupa mais 2/5 da largura.
- **O piano mostra tudo o que soa**: entram a tônica (seção 01), a série harmônica (parcial isolado, timbre e arpejo, na tecla mais próxima) e o lissajous (juntas ou nota a nota).
- **Escala da página**: largura máxima 840 → 1120 px, fonte-base 14 → 15 px, descrições 12,5 → 14 px, rótulos e abas maiores. Círculo e lissajous até 480 px, piano circular até 560 px; Tonnetz limitado a 760 px.
- Versão exibida: `v0.27.0` → `v0.28.0`.

### adiado
- **28.6 partículas e modo palco** passa para a v0.29.

## [0.27.0] — 2026-11-20

### added
- **Console de som** — uma faixa só, logo acima das teclas do piano, vale para a página inteira: `som` (piano · sintético), `♩` tempo 40–220 com `tap`, `A4` 415–466 Hz, afinação `igual`/`justa`, `vol` (ganho antes do limitador, salvo no navegador), modo do teclado (`livre`/`sustain`/`snap`), `tom` (transpor, `=tôn`) e `8ª`. No celular fica fechado em `⋯ console de som`, com o resumo do estado.
- **Chips só de leitura** nas seções 03, 06, 11 e 12 (`afinação igual · 12-TET · mudar no console do piano`): o clique abre o console no controle certo e destaca o grupo.
- **Hero** — piano circular de 3 oitavas girando devagar, nas cores da luz de cada nota. `toque uma nota` liga o som e toca um ii7–V7–I7M no piano (condução de vozes, tempo do console), acendendo as fatias e o piano de baixo; cada fatia toca a sua nota. Botão para pausar o giro.
- **Modo músico** (`?pro` no endereço): sem níveis, sem progresso e sem desafio do dia.
- **A4 no link compartilhado** (`a=442` quando ≠ 440).
- **Selos** `senoide · didático` (seção 02) e `figura em senoide · didático` (seção 12).

### changed
- **Primeira tela**: saem `SYS_AUDIO` e `doc · index.html`; o manual do topo vira uma frase de proposta. Barra do topo em português (`som desligado` / `som ligado`, botão `ligar som`, que some com o som ligado).
- Progresso e desafio do dia saem do topo e vão para o `≡ menu`.
- Boas-vindas não abrem mais sozinhas: ficam em `como funciona` e no `?` do hero.
- Tempo do console comanda padrões (1 nota por tempo), `play scale` (colcheias) e cadências (1 acorde a cada 2 tempos; antes era fixo em 0,95 s).
- A4 deixa de ser fixo: `tonicFreq`, `midiToFreq` e os nomes/cents da série harmônica seguem o diapasão do console.
- Saem os seletores duplicados: timbre (seção 11 e menu), temperamento (seções 03 e 12, menu) e BPM (seção 06).
- Textos de ajuda (boas-vindas, 01, 06, 11, piano, progresso) apontam para o console.
- Versão exibida: `v0.26.0` → `v0.27.0`.

### fixed
- **Acessibilidade**: foco visível (`:focus-visible`) em todos os controles; `prefers-reduced-motion` para o giro do hero, a vista 3D (começa parada), o lissajous (figura parada) e as rolagens suaves.
- Contraste: atalhos do teclado (eram 1,4:1) e oitava das teclas; laranja em texto pequeno passa a `--accent-deep` (info do lissajous, nota de cadência, intervalo detectado, parcial microtonal, nível 2, legenda do pentagrama).
- Legenda da seção 11 usava cores fixas e ficava errada no tema escuro.
- Pentagrama no tema escuro (fundo branco do VexFlow) agora segue o tema.

### rationale
Fase 2, etapa A do plano `docs/plano-v0.26-percepcao-de-valor.md` (itens 7, 8 e 10): o que muda a primeira impressão. Um lugar só para o som, uma primeira tela que toca em vez de explicar, e a base de acessibilidade.

## [0.26.0] — 2026-11-20

### added
- **Grafia por grau** — nos modos de 7 notas cada grau ganha a letra seguinte (dó menor = C D E♭ F G A♭ B♭, nunca D♯), em escala, campo harmônico, emprestados, dominantes secundárias, cadências, cifra detectada, círculo, tonnetz, piano circular e pentagrama. Tônica em tecla preta escolhe ♯/♭ pela grafia com menos acidentes (D♭ maior, C♯ menor); os botões de tônica mostram essa grafia. Pentatônicas, tom inteiro e diminuta seguem a letra do grau da escala-mãe; nelas, 𝄪/♭♭ e E♯/C♭ viram a nota simples. Fora da escala: grafia cromática relativa à tônica (♭2 ♭3 ♯4 ♭6 ♭7).
- **Cadências por função** — 16 cadências com qualidade fixa por acorde e versão maior/menor conforme a 3ª do modo: perfeita, imperfeita (V⁶), plagal, de engano, suspensiva, completa, ii-V-I, turnaround (I-vi-ii-V), doo-wop, axis, pop-alt, menor modal, dórica, mixolídia, andaluza (V maior), rock menor. Acorde fora do modo aparece como empréstimo no card. Tétrade usa a 7ª da função (V7, iim7, Imaj7, iiø7).
- **Condução de vozes** nas cadências: baixo perto de C3 e vozes de cima na inversão mais próxima do acorde anterior.
- **Detecção de acordes**: 6, m6, 7sus4, 6/9, 11, m11, 13, maj13.
- **Lissajous · quinta do lobo** — na afinação justa a razão vem das frequências reais (fração contínua até q ≤ 64): D–A em dó justo aparece como 40:27 (−21,5¢), com a explicação.
- **Bus master com limitador** (DynamicsCompressor, −6 dB, 20:1): acordes grandes no piano não clipam.

### changed
- **Piano de cauda é o timbre padrão**: pré-carrega ao ativar o áudio (sem rede, fica no sintetizado). Escolha manual no menu vence.
- Caudas naturais: piano solta com abafador de ~1,5 s em vez de cortar; synth do teclado decai (não sustenta como órgão); soltar nota usa `cancelAndHoldAtTime` (sem clique).
- `chordToRoman` compara raiz + conjunto de intervalos: Cm/C7/C+ não viram mais "I"; ø7 e m7♭5 são o mesmo acorde (cifra unificada em ø7). Desempate da detecção pelo baixo, raiz no modo e padrão mais comum (não favorece mais C).
- Intervalos pela grafia: 4ª aumentada ≠ 5ª diminuta, 10ª menor ≠ 9ª aumentada; torre de inversão mostra ♯5 no aumentado e ♭♭7 no dim7.
- Dominantes secundárias na caixa do alvo: V7/ii, V7/iv, V7/♭VI.
- **Numeração única**: chave e título de cada `?` = número da seção; jornada do welcome, `progresso`, modal do piano e README com as 12 seções na mesma ordem.
- Versão exibida no header: `v0.25.0` → `v0.26.0`.

### fixed
- **Lissajous**: a forma se repete a cada **1** batimento (o texto dizia q). Desenho `x = sin u`, `y = sin((p/q)u + φ(t))`, que sempre fecha; câmera lenta ×1/N acima de ~3 Hz. Temperado não "acha" mais razão falsa (2^(1/3) ≠ 63:50).
- Numerais romanos do campo apareciam em caixa-alta por CSS (iv virava IV).
- Aba "emprestados" listava também os acordes que já são do modo; V7/ii° aparecia nas dominantes secundárias.
- Textos de ajuda: L leva C à 5ª do Em; C→A♭ = PL; octatônico = PR; eixo da harmonia negativa entre 3m e 3M; parcial 13 ≈ +41¢ de A♭; 7º harmônico abaixo da 7m; nem toda fonte gera série harmônica (sinos, membranas, piano inarmônicos); Plomp-Levelt é sobre senoides; notas neutras do maqam; barbershop 4:5:6:7; Creep = iv menor; quíntade = 4 terças; sus2 ≠ add2; v° no frígio; lídio dominante e menor melódica na família certa; frígia dominante tem uma 2ª aumentada; 17 escalas; diminuta semitom-tom serve ao 7♭9; numerais romanos de Vogler/Weber; McCoy Tyner nas quartas; luz ≈ 2,05 (380–780 nm); piano de baixo tem 3 oitavas; saiu a piada Sklodowska.

### rationale
Fase 1 do plano `docs/plano-v0.26-percepcao-de-valor.md` (credibilidade): corrigir o que faria uma musicista profissional desconfiar do app no primeiro clique — grafia, harmonia, textos, som, a matemática do lissajous e a numeração.

## [0.25.0] — 2026-11-20

### added
- **Seção 11 · vista 3D** — o piano circular vira a *hélice de altura* (Drobisch/Shepard): cada tecla sobe conforme a nota fica mais aguda, uma volta por oitava. Velocidade de giro ajustável (−120…120 °/s; 0 para, negativo inverte), inclinação 0…88° (0° = idêntico ao 2D), arrastar gira, clique toca a tecla visível. Acordes, rastro, quintas e inversão funcionam igual.
- **Seção 11 · ordem · quintas (espiral de quintas)** — notas em volta pelo círculo das quintas: escala maior vira um arco contínuo, trítono no lado oposto, acordes compactos.
- **Seção 12 · lissajous · a forma de um intervalo** — duas notas como oscilações x/y: razão justa fecha a figura, temperamento faz girar no ritmo do batimento (|q·f₂ − p·f₁|). Intervalos simples e compostos (9ª, 10ª, 11ª, ♯11, 12ª, 13ª, 15ª); 2 notas seguradas no piano viram o intervalo exibido.
- **Tema escuro geral** — botão ◐ no topo e "tema" no menu; segue o sistema na 1ª visita e lembra a escolha.
- **Luz · espectro** — cada nota com a cor da sua luz (frequência dobrada até 400–800 THz: A4 × 2⁴⁰ ≈ 484 THz ≈ 620 nm; oitavas = mesma cor). No escuro, brilho e soma aditiva da luz (visual de espectrograma) no 2D, 3D, rastro e lissajous. Faixa "da nota à luz" + teoria (Newton, Castel, Scriabin, cromestesia — e a ressalva de que é analogia matemática).

### changed
- Rastro: memória 15 s / 60 s → **3 s / 5 s** (∞ mantido).
- Versão exibida no header: `v0.24.0` → `v0.25.0`.

### fixed
- Botões de intervalo sem caixa-alta forçada: `3m` (menor) ≠ `3M` (maior).
- Razões justas dos compostos simplificadas (9:4, não 18:8).

### rationale
A seção 11 provou que geometria ensina: a nota é o ângulo, a oitava é o raio. Esta versão empurra a ideia em três direções — a altura como terceira dimensão (3D), a consonância como vizinhança (quintas) e o intervalo como forma (lissajous) — e liga o som à luz pela mesma operação que define a oitava.

## [0.24.0] — 2026-11-19

### added
- **Seção 11 · piano circular** — as 88 teclas (A0 → C8) em anéis concêntricos: cada anel é uma oitava, cada fatia uma nota no mesmo ângulo (tônica no topo), então todas as oitavas de uma nota ficam alinhadas no mesmo raio. Click ou arraste (glissando) toca.
- **Cromático (12 por anel) ou notas do modo** (7 num diatônico, 5 numa pentatônica…) por anel.
- **Inverter** — grave na borda/agudo no centro ou grave no centro/agudo na borda.
- **Ligação do acorde** — notas soando juntas são ligadas (grave → agudo) num polígono, como os acordes do Tonnetz, e o nome do acorde aparece no centro. Cada tipo de acorde tem sempre a mesma forma, só girada.
- **Modo rastro** — teclas ocultas, cada ataque deixa um clique, um ponto que apaga devagar (15 s / 60 s / ∞) e uma linha até a nota anterior: a melodia desenha o próprio caminho.
- **Timbre global · piano de cauda** — no menu (`≡ → som · timbre`) e na seção 11: gravações do Salamander Grand Piano (Alexander Holm, CC-BY 3.0), uma a cada 3 semitons, carregadas sob demanda (~2 MB) e reafinadas respeitando afinação igual/justa. Vale pra notas, escalas, acordes, cadências, padrões, piano de baixo e círculo; série harmônica segue em senoides de propósito.
- **Transpositor** no piano de baixo — ±12 semitons (botões ou ←/→), `= tônica` põe a tônica na tecla T, oitava ±2 (botões ou ↑/↓).

### changed
- **Teclado do computador** — padrão dos pianos virtuais: `1 2 3 … 0 Q … P A … L Z … M` = as 36 teclas brancas do grave ao agudo (C2 → C7, T = C4), por posição física (QWERTY e ABNT2). `shift + tecla` = a preta à direita.
- **Sustain** saiu do shift e foi pra **barra de espaço** (pedal).
- O que é tocado no piano de baixo e nas outras seções também acende no piano circular.
- Versão exibida no header: `v0.23.2` → `v0.24.0`.

### fixed
- `highlightKey` restrito às teclas do piano de baixo (o seletor `[data-midi]` passaria a pegar a fatia do círculo).

### rationale
O piano linear esconde a equivalência de oitava; enrolado em anéis, ela vira geometria — a nota é o ângulo, a oitava é o raio. A partir daí o mesmo desenho serve pra ver acordes (formas que só giram entre tons) e melodias (o rastro). O timbre de piano e o teclado 1 → M aproximam o app de um instrumento de verdade.

## [0.23.2] — 2026-05-03

### added
- **Animação do pentagrama durante o play** — quando o usuário clica `play scale ↑`, cada nota acende em laranja vivo com pulso de escala (1.18×) sincronizado com o áudio (320ms por nota). Inclui a oitava ao final.
- **Animação ao clicar nota individual** — clicar uma célula da escala (ex: `D`) também faz a figura correspondente no pentagrama acender em laranja por 350ms.
- Helper `flashNotationNote(idx, ms)` — captura cor original (fill/stroke) das figuras, sobrescreve com `#e8451e`, aplica `transform: scale(1.18)` por 90ms, e restaura tudo após o tempo dado.
- `_scaleNoteEls` — cache global das referências `g.vf-stavenote` capturadas após cada `factory.draw()` no pentagrama, pra animar sem re-renderizar.

### rationale
Feedback do usuário foi cirúrgico: o pentagrama estático com tônica/característica em laranja já comunicava hierarquia, mas faltava o feedback dinâmico de "qual nota está soando agora". Sem isso, o pentagrama era um diagrama; com isso, vira instrumento — você lê e ouve sincronizados. É o mesmo efeito que a barra de tempo do Spotify mostrando posição da letra: o usuário não precisa pensar onde está, o sistema mostra.

## [0.23.1] — 2026-05-03

### added
- **Tônica em laranja-escuro** (`#c93a16`) e **nota característica em laranja** (`#e8451e`) no pentagrama — coerência visual com o resto do app, onde a tônica recebe o accent-deep e a nota característica recebe o accent regular em todas as outras seções.
- **Legenda do nome da nota** abaixo de cada figura no pentagrama (ex: D, E, F#, B♭) — permite que quem ainda não lê fluentemente notação consiga relacionar posição na pauta com nome da nota. Spelling segue a tonalidade (sharps default, flats em F/Bb/Eb/Ab/Db). Tônica e nota característica recebem label em **bold** + cor.

### changed
- Removida a *time signature* visual (`8/4`, `7/4` etc) do pentagrama — pedagogicamente irrelevante na escala didática e poluía visualmente. Voz interna ainda usa o time pra acomodar N notas.
- Hint do pentagrama atualizado: `escala ascendente · 1 oitava · clave de sol · tônica · nota característica` com legendinha colorida embutida explicando o código de cores.
- Versão exibida no header: `v0.23` → `v0.23.1`.

### rationale
Feedback do usuário foi certeiro em três pontos: (1) "notação simplificada" era redundante — pentagrama JÁ É a notação; (2) faltava o sistema de cores que o resto do app usa pra hierarquizar tônica vs característica vs demais; (3) sem nome da nota como legenda, o pentagrama virava decoração pra quem ainda não lê notação fluente. Os três ajustes transformam o pentagrama de "demonstração técnica" em ferramenta pedagógica integrada com o vocabulário visual do app.

## [0.23.0] — 2026-05-03

### added
- **Notação musical (VexFlow)** — botão "ver pentagrama" na seção Escala renderiza a escala atual em clave de sol como notação tradicional, ascendente em uma oitava. Time signature dinâmica (`N/4` onde N = quantidade de notas, pra acomodar pentatônicas, hexafônicas e octatônicas). Spelling de acidentes via sharps por padrão e flats pra tonalidades F/Bb/Eb/Ab/Db. Estado persistido em `localStorage.mscth.notation` — se ligar uma vez, fica ligado em retornos.
- **Desafio do dia (daily challenge)** — banner discreto abaixo da barra de progresso com uma combinação aleatória *determinística* de tônica + modo + cadência calculada a partir da data UTC do dia. Mesma data = mesmo desafio pra qualquer pessoa que abra o app. Botão "aplicar →" troca o estado pra a configuração sugerida e rola até a seção de cadências. Botão `×` dispensa pelo restante do dia (`localStorage.mscth.daily.dismissed.{seed}`).
- VexFlow 4.2.5 carregado via CDN com `defer`, sem bloquear o paint inicial. Função `renderScaleNotation()` faz polling (250ms) caso o script ainda não tenha terminado de carregar.
- Helper `spellNoteForVF(chrom)` — spelling enharmônico simplificado baseado no contexto da tônica.
- Função `dailyChallenge()` — RNG determinístico (LCG simples) sobre seed = `floor(Date.now() / 86400000)`, gerando 3 índices independentes (tônica, modo, cadência).
- CSS dedicado pra `.notation-toggle`, `.notation-wrap`, `.daily-banner` (com responsivo mobile).

### changed
- `renderAll()` agora chama `renderScaleNotation()` antes do `writeHashFromState()` — pentagrama fica em sync com qualquer mudança de estado.
- Init order: `renderDailyBanner()` roda após o primeiro `renderAll()` e antes do welcome modal.
- Versão exibida no header: `v0.22` → `v0.23`.

### rationale
Educadores e alunos de música têm a notação tradicional como vocabulário primário — sem pentagrama, o app fica útil mas com pegada "tech demo" em vez de "ferramenta pedagógica". A escolha de carregar VexFlow via CDN com `defer` quebra parcialmente o princípio "zero dependências em runtime", mas o trade-off é claro: ~250KB bem cacheados em troca de relevância pedagógica multiplicada pra o público-alvo. Se o usuário não abrir o pentagrama, o custo é praticamente zero (load assíncrono, não bloqueia).

O desafio do dia resolve o problema de retenção: hoje, depois de explorar o app uma ou duas vezes, não há gancho pra voltar. Com um prompt diário determinístico, o usuário tem motivo pra abrir de novo amanhã ("o que vai cair hoje?"). Determinístico significa: um professor pode dizer "abra o `mscth` hoje e me mostre o desafio do dia" sabendo que o aluno verá o mesmo prompt — isso transforma o app em rotina compartilhada.

## [0.22.0] — 2026-05-03

### added
- **URL hash state (deep linking)** — o estado essencial do app (tônica, modo, voicing, inversão, temperamento) agora vive na URL via fragment `#`. Compartilhar `https://adventurelabsbrasil.github.io/mscth/#t=D&m=dorian&v=ninth&i=2&u=just` abre direto em D dórico, voicing de 9ª, 2ª inversão, justa entonação. Antes, todo link abria sempre em C jônio padrão.
- **Botão "copiar link desta configuração"** no rodapé do drawer (`≡ menu`) — copia a URL atual (com hash sincronizado) pro clipboard. Feedback visual `copiado ✓` por 1.6s. Funciona via `navigator.clipboard.writeText` com fallback `execCommand('copy')` pra navegadores antigos.
- **Listener `hashchange`** — se o usuário colar uma nova URL com hash diferente (ou usar voltar/avançar do browser entre estados), o app re-aplica o estado e re-renderiza automaticamente.
- Funções `readHash()`, `applyHashToState()`, `writeHashFromState()` — leem/aplicam/escrevem o estado em `window.location.hash` usando `history.replaceState` (não polui histórico do navegador).

### changed
- `renderAll()` agora chama `writeHashFromState()` no fim — todo update de estado mantém URL sincronizada automaticamente.
- Init order: `applyHashToState()` roda **antes** do primeiro `renderAll()`, pra que o estado vindo da URL seja respeitado já no primeiro paint.
- Versão exibida no header: `v0.21` → `v0.22`.

### rationale
Combina perfeitamente com a feature anterior (Open Graph): o link compartilhado em rede social agora pode abrir direto numa configuração específica + capa rica. "Ouve esse Cmaj9 em lídio: [link]" passa de utopia pra ação de um clique. Educacionalmente, professores e alunos podem trocar links como exemplos auto-suficientes. Pedagogicamente, é a diferença entre apontar pro app e apontar pro <em>conceito</em> dentro do app.

A escolha de hash em vez de query string preserva a experiência de SPA estática (GitHub Pages) sem reload, e mantém compatibilidade total: URLs sem hash continuam funcionando exatamente como antes (C jônio padrão).

## [0.21.0] — 2026-05-03

### added
- **Open Graph + Twitter meta tags** — quando o link do `mscth` for compartilhado em Twitter, WhatsApp, Discord, Slack, Telegram etc., o preview agora mostra título, descrição e imagem dedicada (`og.png` 1200×630). Antes não havia preview, e o link aparecia "vazio" nas redes.
- **`og.png`** — capa de compartilhamento gerada via headless Chrome a partir de `og-source.html`. Identidade visual: preto + cream + accent laranja, com mini-Tonnetz hexagonal no lado direito como assinatura visual do projeto.
- **`favicon.svg`** — ícone vetorial mostrando triângulo de Tonnetz preto-com-laranja sobre fundo escuro.
- **`og-source.html`** — fonte HTML usada pra gerar a capa (versionada no repo pra reproduzibilidade).
- Meta tags adicionais: `description`, `author`, `keywords`, `theme-color`, `canonical`, `og:locale=pt_BR`.

### changed
- Versão exibida no header: `v0.20` → `v0.21`.

### rationale
Com o app já público e tendo passado pelo onboarding modal e pelas transformações neo-Riemann, o gargalo virou distribuição: compartilhar o link em rede social ou messenger não mostrava nada. Open Graph + Twitter Cards é o investimento mais barato e mais alavancado pra resolver isso. A capa visualmente carrega o conceito (Tonnetz como geometria da harmonia) já no preview, antes de o usuário sequer abrir o link.

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
