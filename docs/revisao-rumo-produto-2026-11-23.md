# Revisão de rumo do mscth como produto para professores de música (B2B2C)

Data: 2026-11-23 · Status: insumo para decisão, nenhuma decisão tomada
Legenda: **[F]** fato verificado (arquivo, git, fonte web) · **[I]** inferência

---

## 1. Resumo em 6 linhas

1. O **mscth já é o núcleo**. Tem motor de som, teoria em 14 seções, MIDI/microfone, afinador, braço de violão, parser MIDI com Bach, e funciona no ar (v0.28) [F].
2. O que **falta para virar produto de professor não é áudio**. Faltam conta, turma, papel professor/aluno, tarefa, progresso e relatório. Em nenhum dos labs isso existe [F].
3. **Mercado:** gestão escolar (Emusys, +1.300 escolas) e curso B2C (Cifra Club) estão ocupados. Não aparece um player BR relevante de **ferramenta pedagógica interativa em PT-BR vendida a escola** [F, busca].
4. **Preço:** lá fora vai de US$2–65 por aluno por ano, e Musicca e Practice Space são grátis. Teto repassável no Brasil: **R$6–15 por aluno por mês**, ≈5% de uma mensalidade de R$200–300 [I].
5. **A dor nº 1 do professor é o aluno não praticar em casa** [F, MakeMusic 2026, Trinity, Yamaha]. O túnel encanta em aula, mas quem retém é o ciclo **tarefa → prática → relatório aos pais** [I].
6. **Bioacústica:** não existe projeto bioacústico de verdade. O único traço é `bird_probe.py` (chirp sintético) no PALE [F]. Se havia algo além, não está no ~/Code, no Drive nem no GitHub.

---

## 2. Onde está cada coisa (inventário)

| # | Projeto | Onde | Última atividade | Maturidade | O que serve ao produto |
|---|---|---|---|---|---|
| 1 | **mscth** | `~/Code/__LABS/mscth` · `adventurelabsbrasil/mscth` | 2026-11-23 | Funciona (v0.28) | Base inteira: teoria, console de som, Salamander, identificador de acorde/intervalo, túnel (MIDI, Bach, Krumhansl, Pardo-Birmingham, cifra BR, afinador McLeod, violão 19 casas) |
| 2 | **PALE** | só GitHub `adventurelabsbrasil/PALE` (o `__LABS/exp-001` local está **vazio**) | 2026-10-12 | Protótipo avançado (Python/PyTorch + web) | Contrato de eventos com **confiança confirmed/inferred/uncertain**, camada `didactic.js`, 5 instrumentos Web Audio, `bird_probe` |
| 3 | **exp-002** "escultura musical" | `~/Code/__LABS/exp-002` (**não é git**) | 2026-10-13 | Protótipo | **Detecção de motivos recorrentes**, espectrograma, 12 leituras acústicas. Serve à análise de repertório |
| 4 | **conway-sonic-lab** | `~/Code/__LABS/conway-sonic-lab` | 2026-10-13 | Protótipo | Composição generativa quantizada em escala. Serve de dinâmica de sala ("compor sem saber compor") |
| 5 | **music-learning-game** ("Cosmos Musical") | `~/Code/__PERSONAL/music-learning-game` | 2026-09-26 | Ideia/design | **40 decisões pedagógicas**: descoberta antes do nome, oitava → quinta → quarta, erro vira memória, calibração que não parece prova. É o cérebro pedagógico que falta ao mscth |
| 6 | **musicalart** | `adventure-labs/tools/musicalart` | 2026-03-05 | Brinquedo | Superado pelo mscth [I] |
| 7 | **AudioPhysicsLab.tsx** | `adventure-labs/apps/core/adventure-web/.../AudioPhysicsLab.tsx` | 2026-10-16 | Funciona (site) | FFT, osciloscópio, Lissajous, Chladni, Fourier. Sobrepõe as seções 12 e 14 do mscth |

**Riscos de patrimônio:**
1. O `exp-002` não tem versionamento.
2. Os checkpoints `.pt` e os áudios de referência do PALE sumiram do disco [F/I].
3. O `HANDOFF.md` do mscth está desatualizado (v0.18).
4. A branch `feat/tunel-violao-posicao` não tem PR.

---

## 3. Mercado (síntese)

**Concorrentes-referência:**

| Player | Quem paga | Preço |
|---|---|---|
| MusicFirst | escola | US$6–11 por usuário por ano |
| Auralia/Musition | escola | US$39–65 por aluno por ano |
| Flat Edu | professor | US$99 por ano + US$6 por aluno |
| SmartMusic | escola ou aluno | — |
| Sight Reading Factory | professor | US$45 por ano |
| My Music Staff (gestão) | professor | US$17 por mês |
| Practice Space, Musicca | grátis | — |
| Emusys (BR) | escola | gestão, app do aluno grátis |

O **Yousician encerrou o programa para professores** [F]. Isso é um sinal de que o canal professor é difícil de monetizar.

**Como funciona o B2B2C no Brasil:**
- Sistemas apostilados cobram o material à parte ou embutido na anuidade, por contrato. Exemplos: Positivo ≈ R$1.069 por aluno por ano; ticket médio da Arco ≈ R$794 por aluno por ano [F].
- [I] Em escola livre de música:
  - contrato anual;
  - **cobrança por aluno ativo com piso mínimo**, porque a rotatividade é alta;
  - repasse como "taxa de plataforma de prática";
  - quem decide é o **dono ou coordenador**, e o professor influencia.

**Tamanho do mercado:**
- Não há censo de escolas de música. A contagem exata exige a base de CNPJ, CNAE 8592-9/03 (permite MEI).
- Universo provável: alguns milhares de escolas formais, mais muitos professores MEI [I].
- School of Rock BR tem ≈150 alunos por unidade [F/I].
- Escola média estimada em 50–200 alunos [I].

**O que o professor precisa, em ordem provável [I]:**
1. Atribuir e verificar prática.
2. Mostrar progresso aos pais.
3. Percepção e teoria com correção automática.
4. Leitura à primeira vista.
5. Planejamento de aula.

---

## 4. A tese que sai do cruzamento [I]

O que o mscth tem é **raro**: túnel, Bach, violão, identificação ao vivo e pedagogia por descoberta. Essa parte funciona como **vitrine e ferramenta de aula**: o professor projeta, o aluno vê a música.

O que o mercado paga é **comum**: tarefa, prática, relatório. Essa parte é o **motor de retenção**.

Produto = **vitrine rara + ciclo comum, em PT-BR com repertório brasileiro**. Sem o ciclo, o mscth vira um "Chrome Music Lab brasileiro": encanta e não cobra. Sem a vitrine, vira mais um Practice Space grátis.

**Onde os outros labs entram:**
1. **music-learning-game:** a progressão pedagógica (a ordem dos exercícios de percepção, o D9).
2. **PALE:** o contrato de confiança ("o app *acha* que você tocou Dó, com 70%"), que deixa honesta a correção automática via microfone.
3. **exp-002:** motivos recorrentes como exercício de análise ("ache o tema de Für Elise").
4. **conway-sonic-lab:** dinâmica de sala para turma infantil.
5. **Bioacústica:** hoje é só ideia. Pode virar módulo de *percepção de timbre e natureza* no futuro, mas **não sustenta decisão de rumo agora**.

**Ligação com o foco ADR-121** (Nexo + Pacote Matrícula 2027): o Nexo já está entrando em escola (Espaço Kids). Se o mscth for vendido como **"módulo de música" dentro da mesma conversa com a escola**, ele é extensão da cunha, não frente nova. Se for vendido a professores avulsos, é frente nova e compete com o ADR-121 até 31/03/2027.

---

## 5. Caminhos possíveis

| Caminho | O que é | Custo até o 1º sinal | Risco |
|---|---|---|---|
| **A. Professor primeiro (freemium)** | Grátis em aula + até 5 alunos. Pro a R$29–49 por mês com tarefas e relatório | Médio: precisa de conta, turma e backend | Canal caro, preço tendendo a zero |
| **B. Escola pequena (por aluno ativo)** | R$6–12 por aluno por mês, piso de R$199–299, contrato anual | Alto: precisa do ciclo completo + venda consultiva | Ciclo de venda; churn por baixo uso do professor |
| **C. Módulo dentro do Nexo** | O mscth entra como "música" no pacote que já vai à escola | Baixo em venda, médio em integração | Depende do Nexo vingar; escola-alvo pode não ser de música |
| **D. Validar antes de construir** | Piloto **manual** com 5–10 professores: o mscth como está + tarefa e relatório via WhatsApp/planilha por 4 semanas | **Muito baixo**: sem código novo | Pode mostrar que o aluno não pratica (bom saber cedo) |

**Recomendação [I]: D agora, com A ou B decidido pelos dados.** É o único caminho que fecha uma frente sem abrir código novo e que não compete com o ADR-121.

---

## 6. Suposições mais arriscadas, na ordem de testar

1. **O professor atribui tarefa toda semana.** Métrica: ≥3 de 4 semanas, em 10 professores.
2. **O aluno pratica fora da aula.** Métrica: ≥1 sessão por semana. Abaixo disso, o produto é só projeção em aula e não sustenta preço por aluno.
3. **Os pais valorizam o relatório.** Teste: relatório manual semanal no WhatsApp para 20 famílias, mais NPS.
4. **A escola embute R$X na mensalidade.** Teste: 15 conversas com donos e **pré-venda com desconto de piloto** (Pix ou carta de intenção, não "achei legal").
5. **Custo de aquisição do professor.** Teste: 3 vídeos curtos com o túnel como gancho, medindo cadastros por R$.

---

## 7. Decisões que o Founder precisa tomar

1. **Público inicial:** professor avulso, escola de música ou escola regular via Nexo?
2. **Relação com o ADR-121:** o mscth entra como módulo do Nexo (extensão) ou como frente própria (exceção ao foco até 31/03/2027)?
3. **Piloto manual (D):** topa recrutar 5–10 professores antes de qualquer backend? Você tem nomes?
4. **Instrumento-âncora:** violão (o túnel já tem braço; é o maior público no Brasil [I]) ou piano (onde está o Bach/Salamander)?
5. **Bioacústica:** parquear como ideia de módulo futuro, ou existe outro projeto que eu não encontrei (outro HD, outra conta, outro nome)?
6. **Patrimônio:**
   - versionar o `exp-002`;
   - re-clonar o PALE;
   - abrir PR da `feat/tunel-violao-posicao`;
   - atualizar o HANDOFF.

---

## 8. Fontes de mercado

MusicFirst pricing · flat.io/edu/pricing · risingsoftware.com/shop/education · makemusic.com/pricing · sightreadingfactory.com/pricing · yousician.com/schools · hellosimply.com/teachers · mymusicstaff.com · musicca.com/schools · b2bstack.com.br/product/emusys · contaazul.com (CNAE 8592-9/03) · bloomberglinea.com.br (School of Rock) · melhorescola.com.br / querobolsa.com.br (material incluso) · craft.co/arco-platform · makemusic.com/blog/why-students-arent-practicing · trinitycollege.com teachers guide · hub.yamaha.com (practice is a skill) · superprof.com.br. A lista completa com URLs está no relatório do agente de mercado desta sessão.
