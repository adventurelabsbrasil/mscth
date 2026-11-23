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

## braço do violão e afinador

- **Braço:** a mesma nota existe em várias casas; a digitação escolhida é a da janela de 4 trastes (mais cordas soltas) que cobre mais notas do que está soando, com notas em cordas ascendentes, penalidade leve pra janela alta e preferência pela janela anterior (não pula à toa). As outras posições aparecem apagadas.
- **Qual forma do acorde:** só dá pra saber pelas notas. Dm aberto (D3 A3 D4 F4), pestana na 5ª (+A4) e forma de E na 10ª (+A4 D5) têm conjuntos diferentes e o app acerta; quando duas formas soam as mesmas alturas (ex.: pestana com a 1ª corda abafada), só o timbre muda e o app fica com a posição mais baixa. Pra isso existe a trava de posição e o modo guitarra MIDI (captador hexafônico, canal 1 = Mi agudo … 6 = Mi grave).
- **Afinador:** autocorrelação normalizada (NSDF, McLeod & Wyvill) na janela de 2048 amostras, atraso de 65 a 1100 Hz, primeiro máximo-chave acima de 90% do maior, interpolação parabólica. Só conta leitura com clareza acima de 0,82. A4 fixo em 440 Hz.

## teclado do computador

46 teclas brancas pela posição física (`e.code`): `1`=A1, `T`=C4, `.`=C8, `/` passa do piano. Caps Lock ligado ou Shift = preta à direita (E e B ficam mudas). No ABNT2 o `\` fica na fileira do A e o `/` ao lado do ponto, então a sequência pula de fileira nesses dois.

## ganchos de teste (no endereço)

`#furelise` ou `#demo` trocam o exemplo (sem nada, abre Bach) · `#t=12.5` pula para o tempo · `#view=viagem|frente|lado` · `#pedal` · `#panel` abre as camadas · `#midi=arquivo.mid` carrega um MIDI servido ao lado (precisa de servidor, não abre em `file://`).

## limites conhecidos

- Só o primeiro andamento do MIDI vale; mudanças de tempo no meio são ignoradas.
- Acordes com 9ª/11ª/13ª saem como a tétrade-base; nota de passagem às vezes vira acorde (`Asus4`, `Am7/C` na seção B de Für Elise).
- Desempenho não medido em máquina fraca; o desenho evita `shadowBlur` por segmento, que era o gargalo.

## ideias estacionadas

- Molas de consonância (zoom): cada fio com uma mola na frequência real, para ver quinta (3:2) e trítono se realinhando ou não.
- Coleção de teias: tocar peças inteiras e salvar o PNG de cada uma, lado a lado.
