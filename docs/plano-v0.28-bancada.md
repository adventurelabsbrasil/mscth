# Plano v0.28+ — de apostila a bancada

> Rascunho para revisão do Founder (2026-11-20). Nada aqui está aprovado nem implementado.
> Base: v0.27.0 publicada (`e617f38`). Continua o `plano-v0.26-percepcao-de-valor.md` (Fase 1 ✅, Fase 2A ✅, Fase 2B pendente).
> Origem: 11 pedidos do Founder depois da v0.27 + o que o Claude acha que falta no app.

## A ideia em uma frase

Hoje o mscth é uma apostila que se rola: 12 seções empilhadas e um piano embaixo. A direção proposta é a de uma **bancada**: o piano sempre presente, as seções como telas ou painéis que você escolhe, e tudo o que soa acende o piano.

## Mapa dos pedidos

| # | Pedido do Founder | Onde entra |
|---|---|---|
| 1 | Fonte e layout maiores, ocupando as laterais | v0.28 |
| 2 | Intervalo melódico, além do harmônico | v0.28 |
| 3 | Personalização no menu: cor/espectro, timbre, outros timbres | v0.29 (outros timbres: depende da decisão D5) |
| 4 | Tocar qualquer estudo acende a sequência no piano, na cor do tema | v0.28 |
| 5 | Menu do piano circular mais organizado | v0.28 (é o item 9 do plano anterior) |
| 6 | Intervalos descendentes, além dos ascendentes | v0.28 |
| 7 | Partitura e solfejo | Fase 3 |
| 8 | Importar MIDI com controles de reprodução | Fase 3 |
| 9 | Créditos separados das referências | v0.28 |
| 10 | Seções em páginas, com menu de navegação | v0.29 |
| 11 | Grade: piano + 2 a 4 visões ao mesmo tempo, configurável no menu | v0.30 |

## v0.28 — Acabamento e intervalos (etapa B da Fase 2)

| # | O quê | Esforço |
|---|---|---|
| 28.1 | **Seção 11 enxuta** (pedido 5 = item 9 do plano anterior). De 7 fileiras para 2: vista 2D/3D · luz/rastro. Ordem (cromática/quintas) e direção (grave fora/dentro) viram ícones no canto do desenho; "limpar rastro" vira botão discreto. Corrigir o grid em que uma fileira de 2 botões ocupa 2/5 da largura. | P/M |
| 28.2 | **Intervalos completos na seção 12** (pedidos 2 e 6). Três modos de ouvir: `juntas` (harmônico), `subindo` e `descendo` (melódico). Intervalos descendentes nas abas simples e compostas. A figura de Lissajous não muda (a razão é a mesma); muda o rótulo e o som. | P |
| 28.3 | **O piano mostra tudo o que soa** (pedido 4). Hoje acende em padrões, cadências e no hero. Padronizar com um único `echo(midis, ms)` chamado por toda função que toca: escala, acordes do campo, inversões, intervalos compostos, círculo, Tonnetz, Lissajous e série harmônica (nota mais próxima). Cor = tema escolhido (laranja ou espectro, ver 29.1). | P/M |
| 28.4 | **Créditos e referências separados** (pedido 9). Rodapé em dois blocos: *referências* (teoria, autores, datas) e *créditos* (autor, org, amostras do piano CC-BY, VexFlow). | P |
| 28.5 | **Escala da página** (pedido 1). Largura máxima de 840 para ~1120 px, fonte-base de 14 para 15–16 px, escala tipográfica revisada. Desenhos (círculo, Tonnetz, piano circular) crescem junto. Conferir celular e o console numa linha só. | P/M |
| 28.6 | **Partículas e modo palco** (item 11 do plano anterior). Mantido; se a v0.28 ficar grande, passa para a v0.29. | M |
| 28.7 | **Metrônomo** no tempo do console (clique + acento no 1º tempo, compasso 2/3/4). Barato e abre a frente de ritmo. | P |

**Por que nesta ordem:** são correções do que já existe; nenhuma depende de decisão pendente.

## v0.29 — Navegação e personalização

| # | O quê | Esforço |
|---|---|---|
| 29.1 | **Menu "aparência e som"** (pedido 3). <ul><li>Cor das notas no app inteiro: laranja · espectro (luz) · paleta semântica (distância tonal, dissonância). Hoje estão espalhadas entre o menu e a seção 11.</li><li>Tema claro/escuro.</li><li>Timbre: espelho do console (o console continua sendo o lugar principal).</li><li>"Outros timbres" (Rhodes, órgão, cordas, violão): só depois da decisão D5, porque são mais amostras.</li></ul> | P/M |
| 29.2 | **Seções como telas** (pedido 10). Continua num arquivo só, com endereço `#/cadencias`, `#/tonnetz` etc. Menu lateral com as 12 seções em ordem; voltar/avançar do navegador funciona; o link compartilhado abre direto na seção. A página inicial vira o hero + o índice das seções. O estado musical (tônica, modo, afinação, A4) continua na hash. | M |
| 29.3 | **Créditos, referências e ajuda** viram telas próprias no mesmo menu. | P |

**Atenção:** 29.2 muda a numeração e a navegação. Se a decisão D3 (ordem das seções) for mudar algo, mudar aqui, de uma vez.

## v0.30 — Bancada em grade

| # | O quê | Esforço |
|---|---|---|
| 30.1 | **Layout em grade** (pedido 11). O piano fica fixo embaixo, mais 1 a 4 painéis escolhidos no menu (ex.: círculo + Tonnetz + campo harmônico). Layouts prontos: `1`, `2 colunas`, `2×2`, `foco + 2`. No celular, um painel por vez, com abas. | G |
| 30.2 | **Dois sentidos de uso**, com o mesmo motor: <ul><li>*tocar e ver*: você toca o piano e os painéis reagem (já existe, por eventos);</li><li>*aula e piano*: você clica numa "aula" (cadência, padrão, progressão) e o piano toca e mostra.</li></ul> | M |
| 30.3 | **Layout salvo** no navegador e no link (`#/bancada?p=circulo,tonnetz`). | P |

**Pré-requisito técnico:** cada seção precisa virar um componente que renderiza em qualquer container (hoje várias funções buscam IDs fixos no DOM). Esse refactor é a maior parte do esforço e deve ser feito na v0.29, junto do 29.2.

**Antes de construir:** uma sessão só de desenho (wireframes de 2–3 layouts, com `/frontend-design`).

## Fase 3 — Ideias grandes (revisada)

| Ideia | O quê | Esforço |
|---|---|---|
| **Importar MIDI** (pedido 8) | Arquivo `.mid` → piano roll com play, pausa, tempo (do console), repetir trecho e scrub. Cada instante acende o piano, o círculo, o Tonnetz e a cifra detectada. Parser pequeno no próprio arquivo ou lib via CDN (decidir). | M/G |
| **Web MIDI** | Teclado de verdade ligado no computador alimenta tudo ao vivo. Mesmo motor do item anterior: só muda a fonte das notas. | M |
| **Partitura e solfejo** (pedido 7) | Em 3 degraus: <ol><li>**leitura**: aparece uma nota na pauta (VexFlow, já carregado), você toca no piano e o app confere;</li><li>**ditado**: o app toca 3–5 notas, você reproduz no piano ou escreve na pauta;</li><li>**solfejo cantado**: microfone + detecção de altura (é a ideia "microfone" do plano anterior).</li></ol>Os degraus 1 e 2 dependem da D2 (dó-ré-mi / dó móvel). | M → G |
| **Treino de ouvido** | Quiz de intervalo (agora com melódico asc/desc), acorde, grau e cadência, com placar. O desafio do dia vira 5 perguntas. | M/G |
| **Ritmo** | Seção nova: compassos, figuras, síncope, clave, padrões brasileiros (samba, baião, bossa), tocados no metrônomo da 28.7. Fecha o tripé melodia · harmonia · ritmo. | M |
| **Escala sobre o acorde** | Para cada acorde do campo/cadência, quais modos e escalas soam por cima (e as notas a evitar). Elo entre a seção 07 e a 04; é o que o aluno de improviso procura. | M |
| **Construtor de progressão** | Montar 4–8 graus, tocar em loop no tempo do console, ver o caminho no Tonnetz, exportar `.mid`. | M/G |
| **Violão** | Desenho do acorde no braço do violão ao lado da cifra. Pesa muito para o público brasileiro. | M |

## Decisões do Founder

Pendentes do plano anterior:

- **D2 · nomenclatura:** C D E ou dó ré mi? Cifra Chediak (`7M`, `º`)? Afeta solfejo, violão e treino de ouvido.
- **D3 · ordem das seções:** série harmônica no bloco de acústica? Seção nova de intervalos? Melhor decidir antes da v0.29 (navegação).
- **D5 · amostras no repo:** copiar o piano (~2 MB) e, se houver, os outros timbres? Afeta o 29.1 e o uso offline.

Novas:

- **D6 · grade (v0.30):** quais 2–3 layouts prontos? Quais painéis podem ficar lado a lado?
- **D7 · Fase 3:** qual vem primeiro? Sugestão: **MIDI (arquivo + Web MIDI)**, porque reaproveita tudo o que existe e é o "uau" para quem toca; depois **treino de ouvido**, que abre o caminho do solfejo.
- **D8 · ritmo:** entra como seção nova (13) ou como camada sobre padrões e cadências?

## Ordem sugerida

1. **v0.28:** acabamento e intervalos. Uma sessão, sem decisões pendentes.
2. **v0.29:** navegação + personalização + refactor dos painéis. Pede D3 e D5.
3. **v0.30:** bancada em grade. Pede D6 e uma sessão de desenho antes.
4. **Fase 3:** na ordem da D7.

Cada etapa vira versão própria, testada no navegador antes de publicar, com OK do Founder para cada push.
