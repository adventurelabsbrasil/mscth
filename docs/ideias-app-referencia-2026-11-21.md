# Colheita: app de teoria musical no iPhone → mscth

> 2026-11-21. Inventário feito pelo Espelhamento do iPhone (navegação só de leitura, um exercício de teste).
> Rascunho para o Founder decidir. Nada aprovado nem implementado. Continua `plano-v0.28-bancada.md`.

## O que o app tem (4 abas)

| Aba | Conteúdo |
|---|---|
| **Tools** | braço de violão · afinador · metrônomo · gravador · leitura rítmica · solfejo · gráfico de afinação (pitch graph) · calculadora de intervalo · ouvir intervalos · calculadora de acorde (notas → nome) · busca de acorde (nome → digitação) · escalas · calculadora de progressão |
| **Exercises** | lista de checkboxes, você monta o treino e aperta *Start*. Grupos: teoria geral, tom/semitom · leitura (rítmica, solfejo, leitura instantânea em clave de sol/fá/dó, claves, figuras e pausas) · acordes (inversões, formação, estrutura de ouvido) · progressão (grau, função, de ouvido) · progressões e cadências de ouvido (por nome e por grau) · intervalos (escrita, harmônico, melódico ↑, melódico ↓) · som de acorde (maior, m, 7M, m7, 6, m6, 7, sus2, sus4, °, ø) |
| **Theory** | ~25 textos: notas, acidentes, tom/semitom, série harmônica, intervalos, **tensões**, **cifras**, formação, inversão, escalas, campo harmônico, círculo de quintas, **tocar de ouvido**, partitura, figuras, **armadura de clave**, **relativos e antirrelativos**, **afinações**, **tipos de dominante**, afinar o instrumento, progressões |

**Como é o exercício (testado: "som de acorde"):** toca um acorde, 4 botões, *Check*, borda verde/vermelha, *Continue*. Sem explicação do erro. As 4 opções eram Abm6/Gm6/Fm6/Am6: mesma qualidade, só muda a fundamental, ou seja, exige ouvido absoluto. É o ponto fraco do app e a oportunidade do mscth.

## O que o mscth já cobre

Teoria (série harmônica, escala, modos, campo, cadências, círculo) com mais profundidade e som. Piano já identifica acorde, intervalo e grau ao tocar (= a "calculadora de acorde/intervalo" do app). Pentagrama com VexFlow. Níveis, progresso e "desafio do dia". Metrônomo já está no plano (28.7).

## Lacunas que viram feature (ordem de valor)

1. **Treino de ouvido "monte seu treino"** (= Fase 3 / D7). Checkboxes por grupo → *começar*. Grupos: intervalo (juntas · subindo · descendo, casa com 28.2), qualidade de acorde, cadência, grau/função no campo. **Diferencial instrutivo:** depois da resposta, o mscth *mostra o porquê*: acende no piano, desenha no Lissajous/Tonnetz, toca a sua resposta e a certa lado a lado, e linka a seção que explica. Pergunta relativa (qualidade, grau), nunca "qual fundamental" sem referência.
2. **Microfone: afinador + cante e confira.** `getUserMedia` + detecção de altura. Cantar o intervalo ou o grau pedido e o piano mostra onde você chegou em cents. Reaproveita o diapasão e a afinação do console. Nada parecido existe no mscth hoje.
3. **Busca de acorde (nome → piano).** Digitar `F#m7(b5)` acende e toca. O inverso do que o piano já faz. Pequeno.
4. **Progressão livre.** Escolher graus (ii–V–I, I–vi–IV–V), tocar, transpor. Estende cadências; prepara a "aula e piano" da v0.30.
5. **Braço de violão** como visão alternativa ao piano (painel da bancada v0.30). Depende de D2 (cifra).
6. **Leitura instantânea** (nota no pentagrama em clave de sol/fá/dó → tocar no piano). Usa o VexFlow que já existe; porta de entrada do solfejo.
7. **Textos de teoria que faltam:** tensões, cifras, relativos/antirrelativos, tipos de dominante, armadura de clave, tocar de ouvido. Entram como `?` das seções existentes, não como seções novas.

Fora: gravador (pouco ganho no navegador) e leitura rítmica completa (fica com D8, ritmo).

## Decisão pendente

- **D9 · encaixe:** o treino de ouvido (item 1) entra antes da v0.29/0.30 ou segue a ordem do plano (Fase 3)? Sugestão: manter v0.28 como está e fazer o treino de ouvido como **v0.29-a**, porque é o que torna o app *dinâmico* e quase todo o motor (tocar, acender, identificar) já existe.
