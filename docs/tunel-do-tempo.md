# túnel do tempo

Página `tunel.html` (link na seção 11). Nasceu de uma pergunta: a onda de uma nota, que a gente desenha em 2D, poderia virar uma espiral em 3D?

## a ideia em uma frase

O piano circular da seção 11 (ângulo = nota, raio = oitava) **anda no tempo** e gira devagar. Cada nota que soa deixa um fio no espaço. A música vira um túnel desenhado.

## decisões

| tema | decisão | por quê |
|---|---|---|
| eixo do tempo | horizontal, separado da altura | o mockup "tempo = ângulo" perdia a nota no ângulo; com o tempo num eixo próprio, de frente é o piano circular e de lado é uma partitura |
| espiral | vem do giro da cabeça (voltas por compasso) | uma hélice vista de lado **é** uma senoide; não precisa desenhar a onda por cima |
| ondinha no fio | removida | a frequência já aparece 3 vezes (ângulo, raio, cor); o decaimento foi para espessura e brilho |
| cor | cor da luz da nota (mesma função da seção 11) | física, não convenção: a nota sobe ~40 oitavas e cai na luz visível |
| cor do acorde | fundamental; menor puxa 40% pra cor da 3ª menor, mais escuro e tracejado | maior e menor da mesma fundamental ficam parentes, mas distinguíveis |
| acorde | janela harmônica alinhada ao compasso, casamento de modelo (Pardo & Birmingham) | em música arpejada (Für Elise) quase nunca há duas notas soando juntas |
| tom | Krumhansl-Kessler pela duração, ou escolhido | grau e grafia (B♭, não A♯) dependem do tom |
| melodia/baixo | pela trilha do MIDI (mais aguda / mais grave); sem trilhas, pela altura | mão direita e mão esquerda são o que o arquivo já sabe |
| pedal | virtual e opcional (até o fim do compasso) | o MIDI de Für Elise não tem pedal; sem ele as semicolcheias viram confete |

## o que já existe parecido (busca rápida, 2026-11-23)

- Hélice de altura: Drobisch (1855), Shepard (1964). É a vista 3D da seção 11.
- Spiral Array, Elaine Chew (MIT, 2000): hélices aninhadas de notas, acordes e tons. Harmonia, sem rastro no tempo.
- Helical Keyboard, Herder & Cohen (Aizu, 1996/2002): teclado em hélice 3D animado por MIDI, com polígonos de acorde. É o primo mais próximo.
- Music Animation Machine, Stephen Malinowski (1985–): piano roll 2D colorido pelo círculo das quintas.
- Pôster de visualização MIDI da Univ. de Minnesota: cilindros ao longo de um eixo de tempo. **Não lido** (o site bloqueia download); ler antes de chamar o túnel de inédito.

O que não apareceu junto em nenhum: cor física da nota, cabeça girando e andando no tempo, passado apagando, decaimento como espessura, teia acumulada.

## forma do cone

Três mapeamentos de altura → raio, escolhíveis no ⚙ (com `?`):

| forma | raio | grave ÷ agudo (A0–C8) | serve pra |
|---|---|---|---|
| ouvido | linear no semitom | 4,5× | acompanhar a música (padrão) |
| Kepler | f^−2/3 (seção 13) | ≈ 28× | ligar com as órbitas; corneta suave |
| ar | 1/f (comprimento de onda) | 152× | a escultura física; a melodia some no centro |

A escala padrão é o piano inteiro, para que uma oitava tenha o mesmo tamanho em qualquer música. A comparação foi validada numa imagem com Für Elise antes de codar.

## exportar a escultura

| formato | o que é |
|---|---|
| OBJ | tubos por nota (6 lados), eixo x = tempo (10 unidades/tempo), raio do tubo pelo envelope; anéis fechados nas trocas de acorde; cor por vértice (`v x y z r g b`, lida pelo Blender) |
| PNG / SVG | a teia da música inteira (2048 px / vetor com `mix-blend-mode: screen`) |
| JSON | notas (midi, início, duração, papel, velocidade, cor), acordes (cifra, composição, grau), tom e mapeamento |

A teia é normalizada pelo tamanho da música: um polígono por troca de acorde e fios mais tênues quando há muitas notas; sem isso, uma peça de 150 tempos vira um borrão branco.

## exemplos embutidos

- **Prelúdio em Dó, BWV 846** (Bach), padrão: um acorde arpejado por compasso, a melhor vitrine da harmonia. O detector acerta a progressão conhecida.
- **Für Elise, WoO 59** (Beethoven): arpejos rápidos, modulação para Fá na seção B.
- Exemplo curto C7M–Am–F–G7.

Os MIDIs são do Mutopia Project, marcados como domínio público, embutidos em base64 (`tunel/*.js`).

## tocar ao vivo

`🎹 tocar ao vivo` troca a música por um registro vazio que cresce: cada nota entra no ataque com duração crescente até soltar (ou até o pedal soltar). O tempo corre no andamento do controle. O acorde vem das notas seguradas (2+ classes de altura), o tom é redetectado a cada 4 tempos. Entradas: teclado do computador (uma oitava e meia a partir do Dó central, `Z`/`X` oitava, espaço = pedal), Web MIDI (note on/off e CC64) e clique no teclado do piano roll. Cada tecla do computador guarda a nota que tocou, para não prender nota se a oitava mudar com a tecla apertada.

## microfone

Escuta aproximada, no próprio navegador: FFT de 16384 pontos (~0,34 s a 48 kHz), energia de cada nota de C2 a E7, e escolha gulosa da nota mais forte com apoio dos harmônicos. A cada nota escolhida, subtrai só a parte esperada de cada harmônico (pesos 0,6 · 0,4 · 0,32 · 0,25 · 0,2) e o vazamento pras vizinhas: o que sobra é nota de verdade (o E3 numa corda E3 junto com o E2). Pico obrigatório, espera de ~0,25 s depois do ataque, liga com 3 leituras e desliga com 3 faltas. Testado com violão sintético; ainda falta o teste com instrumento real.

## gravar e ouvir em piano

No modo ao vivo, `⏺ gravar trecho` marca o início e `⏹ parar` o fim. Entra tudo o que o modo ao vivo registrou no intervalo (microfone, teclado, MIDI); notas com menos de 70 ms saem (estalo de ataque, leitura solta) e o trecho começa na primeira nota. `▶ ouvir no piano` carrega a gravação como música (seletor: *sua gravação*), no andamento em que foi tocada, e toca em loop com timbre de piano; `⤓ .mid` baixa um MIDI formato 0 (480 tiques por semínima, programa 0). O piano usa amostras do **Salamander Grand Piano** (Alexander Holm, CC-BY 3.0), servidas por `tonejs.github.io/audio/salamander/`: uma a cada 3 semitons de A0 a C8, as do meio por transposição curta. Sem rede, cai num piano sintetizado. O seletor `timbre` vale também pras músicas e pro teclado ao vivo. A gravação vive só na página: recarregou, perdeu (baixe o `.mid`). A qualidade do MIDI depende da escuta do microfone: nota solta sai fiel, acorde batido sai aproximado.

## grau e inversão

A cifra mostra o baixo quando ele não é a fundamental (`C/E`); o grau acompanha no estilo popular, pelo intervalo do baixo a partir da fundamental: 3ª → `/3` (1ª inversão), 5ª → `/5` (2ª), 7ª → `/7` (3ª, só tétrade). Baixo fora do acorde (pedal, baixo trocado) sai pelo intervalo (`C/D` → `I/9`). O baixo é a nota mais grave da janela do acorde; baixo alternado fundamental–quinta dentro do compasso aparece como `/5` na metade do compasso, por isso o exemplo Jingle Bells alterna em oitava. Cifragem clássica (I⁶, I⁶₄, V⁶₅, V⁴₃, V⁴₂) fica como opção futura.

## comparar violão × MIDI

Com o microfone ligado, a gravação guarda também o áudio cru (blocos de 1024 amostras, amostra 0 presa ao tempo do túnel). `⇄ comparar` abre um painel com a onda, os ataques reais (subida de energia de 6 dB em janelas de 10 ms), as notas MIDI e um traço ligando cada ataque à nota que ele virou. Mede atraso mediano e variação; toca o violão, o MIDI ou os dois (violão à esquerda, piano à direita); versões *deslocado pelo atraso médio* e *ancorado no ataque real*, com `usar esta versão`; baixa o `.wav`. Teste com violão sintético (Karplus-Strong, 9 toques): ataques achados com erro de 10 ms; a fundamental entra sempre **281 ms** depois (atraso constante, corrigível); o problema maior são **notas a mais**: cada toque solto vira 5–6 notas (harmônicos agudos lidos como notas), e chegam notas atrasadas (400–700 ms) depois. Falta repetir com violão real.

**Âncora no ataque (feito):** a nota do microfone passa a começar no instante do último ataque (se houve um nos últimos 0,7 s; senão, 3 leituras antes da confirmação), descontando 35 ms do próprio detector de ataque; o fim é antecipado em 80 ms. Mesmo teste: atraso mediano de **281 ms → 20 ms**. Continuam as notas a mais e as que chegam 0,6–0,8 s depois sem ataque nenhum.

**Gravação real (23/11, violão · violão+assobio · violão+voz, análise interna fora do repositório):** harmonia Ré menor ↔ Lá; andamento ~85 bpm estável; 1ª corda 5 cents abaixo. No violão real, harmônico virando nota aguda é raro (1%); o problema é nota que não soa (cerca de metade no trecho só de violão, contra 29% de um controle ao acaso). Assobio: 77% das notas viraram nota no MIDI. Voz: é o que mais confunde o detector. Próximos passos, sem pressa: só escrever nota que persiste e cabe no acorde vigente; modo melodia aguda (assobio); extrator de altura para a voz.

## braço do violão e afinador

- **Braço:** a mesma nota existe em várias casas; a digitação escolhida é a da janela de 4 trastes (mais cordas soltas) que cobre mais notas do que está soando, com notas em cordas ascendentes, penalidade leve pra janela alta e preferência pela janela anterior (não pula à toa). As outras posições aparecem apagadas.
- **Qual forma do acorde:** só dá pra saber pelas notas. Dm aberto (D3 A3 D4 F4), pestana na 5ª (+A4) e forma de E na 10ª (+A4 D5) têm conjuntos diferentes e o app acerta; quando duas formas soam as mesmas alturas (ex.: pestana com a 1ª corda abafada), só o timbre muda e o app fica com a posição mais baixa. Pra isso existe a trava de posição e o modo guitarra MIDI (captador hexafônico, canal 1 = Mi agudo … 6 = Mi grave).
- **Afinador:** autocorrelação normalizada (NSDF, McLeod & Wyvill) na janela de 2048 amostras, atraso de 65 a 1100 Hz, primeiro máximo-chave acima de 90% do maior, interpolação parabólica. Só conta leitura com clareza acima de 0,82. A4 fixo em 440 Hz.

## teclado do computador

46 teclas brancas pela posição física (`e.code`): `1`=A1, `T`=C4, `.`=C8, `/` passa do piano. Caps Lock ligado ou Shift = preta à direita (E e B ficam mudas). No ABNT2 o `\` fica na fileira do A e o `/` ao lado do ponto, então a sequência pula de fileira nesses dois.

## constelação

Vista sem eixo do tempo, inspirada nos *Visual Models* de Lucio Arese ([Paganini, Caprice nº 5](https://www.youtube.com/watch?v=VXEVECPo8Uw); [Coltrane, Giant Steps](https://www.youtube.com/watch?v=oRM5O7V6J2Q)). No Giant Steps ele mostra o método: o áudio do sax vira cromagrama (CQT), a PCA reduz a 3 eixos, e essas coordenadas são a posição do ponto. Os números ao lado dos pontos no vídeo do Paganini são essas coordenadas.

| tema | decisão | por quê |
|---|---|---|
| tempo | não é eixo; a peça se acumula no mesmo espaço | é o que separa a constelação do túnel |
| posição *teoria* | hélice de altura (ângulo = nota, altura = oitava) | estável: a mesma escala desenha sempre a mesma figura |
| posição *dados* | cromagrama por nota → PCA 3D sobre a música inteira | a regra do Arese; notas que soam parecido caem perto e cada peça tem seu próprio espaço |
| cromagrama sem áudio | a nota pesa 3×, harmônicos 3 (quinta, 0,35) e 5 (terça, 0,2), mais tudo que soa no ataque e 0,4 da nota anterior da mesma voz; vetor normalizado | imita o que o CQT do áudio veria; a memória da voz dá continuidade, como quadros de áudio |
| PCA | covariância 12×12, 3 autovetores por iteração de potência com deflação; coordenadas em desvios-padrão do 1º eixo | sem biblioteca; os números do rótulo ficam na mesma escala do Arese |
| ao vivo | PCA refeita a cada ~0,7 s, sinal do eixo preso ao anterior, pontos deslizam | sem o deslize a nuvem pularia a cada nota nova |
| linha | melodia pela voz de cima, baixo pela de baixo; notas do acorde só como ponto | com as notas do acorde ligadas vira um borrão |

Limites: o cromagrama vem das notas do MIDI (ou do que o microfone virou nota), não do áudio cru, então timbre e microtom não entram. Os painéis de timbre do Arese (bateria por amplitude × centroide, baixo por tonalidade × centroide × tempo, coluna de microtons do sax) ficam para depois.

## ganchos de teste (no endereço)

`#furelise` ou `#demo` trocam o exemplo (sem nada, abre Bach) · `#t=12.5` pula para o tempo · `#view=viagem|frente|lado|orbita|constelacao` · `#pos=teoria|pca` (posição na constelação) · `#pedal` · `#panel` abre as camadas · `#midi=arquivo.mid` carrega um MIDI servido ao lado (precisa de servidor, não abre em `file://`).

## limites conhecidos

- Só o primeiro andamento do MIDI vale; mudanças de tempo no meio são ignoradas.
- Acordes com 9ª/11ª/13ª saem como a tétrade-base; nota de passagem às vezes vira acorde (`Asus4`, `Am7/C` na seção B de Für Elise).
- Desempenho não medido em máquina fraca; o desenho evita `shadowBlur` por segmento, que era o gargalo.

## ideias estacionadas

- Molas de consonância (zoom): cada fio com uma mola na frequência real, para ver quinta (3:2) e trítono se realinhando ou não.
- Coleção de teias: tocar peças inteiras e salvar o PNG de cada uma, lado a lado.
