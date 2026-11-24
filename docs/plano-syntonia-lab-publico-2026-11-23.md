# Plano: o mscth vira Syntonia, laboratório público de teoria musical

Data: 2026-11-23 · Status: **decisões tomadas pelo Founder** (seção 1); fatias de execução propostas (seção 6), nenhuma iniciada.

Ponto de partida: [`revisao-rumo-produto-2026-11-23.md`](revisao-rumo-produto-2026-11-23.md) e a issue [#17](https://github.com/adventurelabsbrasil/mscth/issues/17).

## 1. Decisões

| # | Tema | Decisão |
|---|---|---|
| 1 | Modelo | **Open core + funil.** O lab (motor, teoria, túnel, conteúdo) é aberto. A camada do professor (conta, turma, tarefa, relatório) fica fechada noutro repo, **só se** o piloto de fev/2027 provar que vale. Função imediata do lab aberto: tráfego orgânico (SEO/GEO) e prova de autoridade para o Nexo (ADR-121). O B2B2C do #17 vira hipótese do piloto, não plano. |
| 2 | Tipo de nome | Nome próprio, de **sistema** (como Tonnetz, Solfège), internacional, com um **descritor fixo** que carrega a busca. A voz é a do manifesto da Adventure: "laboratório de aventuras calculadas". O lúdico mora na experiência; o nome dá seriedade. |
| 3 | Nome | **Syntonia** (grego *syntonos*, "em acordo, afinado"; também na *coma sintônica*). Forma pública: **Syntonia · laboratório de teoria musical** / **Syntonia · music theory lab**. Reservado: **SyntonIA** para uma futura camada de IA. |
| 4 | Endereço canônico | **`adventurelabs.com.br/comunidade/syntonia/`**, por rewrite na Vercel. Repo: `adventurelabsbrasil/syntonia` (renomeado do `mscth`). Sem domínio próprio por enquanto. |
| 5 | Como as páginas são feitas | **Astro**, saída 100% estática. Cada conceito é um Markdown. |
| 6 | Contribuição | **Duas trilhas:** conteúdo em Markdown, para músicos e professores; e motor/widgets em JS puro, para devs (seção 4). |

### Checagem do nome (2026-11-23)

- **Ensemble Syntonia:** quinteto de câmara francês (desde 1999). É o vizinho mais próximo, mas é um grupo de concerto, não um produto de ensino; o descritor "music theory lab" sempre junto resolve a confusão.
- **Outros usos:** `syntonia.com` (site esotérico), um "Grupo Syntonia" no Brasil e repos pequenos no GitHub (0–1 estrela). Nenhum é de ensino de música.
- **Marca:** não há marca "Syntonia" exata nos agregadores dos EUA. Os vizinhos são Syntony (GNSS), Syntonics (RF) e Syntonic Research (gravações). **O INPI não foi consultado**: fazer isso antes de investir na marca.
- **Domínios:** `.com`, `.com.br`, `.io`, `.ai`, `.org`, `.app` e `.dev` estão registrados. Livres: `syntonialab.com` e `syntonia.music` (premium).
- **GitHub:** `adventurelabsbrasil/syntonia` está livre.

## 2. Portão de frente (GUARDRAILS, ADR-059)

É a continuação da frente mscth (#17), reclassificada. **Confirmado pelo Founder em 2026-11-23:**

1. **Classe:** `fundação`. Não move dinheiro em 90 dias; reduz o custo de aquisição do Nexo depois.
2. **Número que muda:** páginas de conceito indexadas e visitas orgânicas por mês em `/comunidade/syntonia/` até 31/03/2027. **A meta fica em aberto**: não há linha de base hoje, então o primeiro passo é medir.
3. **Custo:** `6+` sessões no total. As fatias A a C cabem em `2-5`.
4. **Contra o que ganha:** compete com o tempo do ADR-121 (Nexo + Pacote Matrícula). Por isso vale a regra de **no máximo 1 frente de `fundação` ativa**, e só com uma frente de receita viva.
5. **O que a mata:** se, 60 dias depois de as primeiras páginas de conceito irem ao ar, nenhuma estiver indexada nem receber visita orgânica, a frente volta a ser só o app e o resto é parqueado.

## 3. Arquitetura alvo

```
syntonia/
├── astro.config.mjs        site = https://adventurelabs.com.br, base = /comunidade/syntonia
├── src/
│   ├── content/conceitos/  um .md por conceito (pt-br), frontmatter com título, definição curta, termos, nível
│   ├── layouts/            cabeçalho, navegação, SEO, JSON-LD, hreflang (uma vez só)
│   └── pages/              home, índice de conceitos, [conceito].astro, acervo
├── lib/                    motor em JS puro, ES modules, sem framework
│   ├── theory.js           escalas, chordInfo, chordName, chordDegree, Krumhansl
│   ├── audio.js            console de som, Salamander, Karplus-Strong
│   ├── midi.js             vindo de tunel/midi-parse.js
│   └── pitch.js            McLeod/NSDF do afinador
├── widgets/                componentes interativos (custom elements) que usam lib/
├── public/legado/          index.html e tunel.html atuais, sem mudança, enquanto migram
├── acervo/                 <slug>.mid + index.json (domínio público obrigatório)
├── tests/                  lib/ em node:test + smoke dos widgets em Chrome headless
└── public/llms.txt, robots.txt  (sitemap gerado no build)
```

Princípios:

- **Migrar por partes, sem quebrar nada.** O app e o túnel atuais continuam no ar, intactos, em `/legado/`, enquanto as páginas de conceito nascem ao lado. Cada seção do app só sai do legado quando a página nova faz o mesmo.
- **Texto em HTML, não em canvas.** Cada página de conceito tem um H1 com o termo, uma definição curta no topo ("O modo dórico é…") e um exemplo com áudio. É isso que buscador e IA citam.
- **O motor não conhece o Astro.** `lib/` e `widgets/` são JS puro e testável, que funciona até num HTML solto. O Astro só monta as páginas.

### Ponto técnico a confirmar na fatia B

Com `base = /comunidade/syntonia`, os links do build só funcionam atrás do rewrite. Por isso o GitHub Pages deixa de ser um bom espelho. Há duas saídas:

- **B1 (recomendada):** um projeto Vercel `syntonia` no time da Adventure, construído a partir do repo público. O `adventure-web` faz rewrite para ele. Ganho extra: um **preview por PR**, inclusive para quem contribui. O Pages vira só um redirect para a URL canônica.
- **B2:** manter o Pages, com o build publicado sob a mesma base e acessado só pelo rewrite.

**Decidido (Founder, 2026-11-23): B1.** Isso refina a decisão 4: o Pages deixa de ser espelho e vira redirect.

## 4. Abertura para contribuição

**Trilha de conteúdo (sem código):**

- Criar `src/content/conceitos/<slug>.md` com o frontmatter do contrato. O widget entra por uma tag (ex.: `<syn-escala modo="dorico">`).
- Template de issue "novo conceito" e um exemplo completo para copiar.

**Trilha de dev:**

- Um módulo novo em `lib/` (com teste) ou um widget novo em `widgets/` (custom element com atributos documentados).
- Uma página fora do molde pode ir em `src/pages/` com o layout comum.
- Regra: nada de framework de UI no motor, e todo widget tem que funcionar num HTML solto.

**Acervo:**

- `acervo/<slug>.mid` + entrada em `acervo/index.json`. O PR tem **checklist obrigatório de domínio público** (compositor, ano, fonte da transcrição).
- Nada com direito autoral vigente. Exemplo de recusa já registrado: o tema do Super Mario (Nintendo).

**Arquivos de comunidade:**

- `CONTRIBUTING.md` em pt-BR, com resumo em inglês, e `CODE_OF_CONDUCT.md`.
- `.github/ISSUE_TEMPLATE/` com bug, ideia, novo conceito e nova peça, mais um `PULL_REQUEST_TEMPLATE.md`.
- Labels `good first issue` e `help wanted`. Discussions ativado. `ROADMAP.md` público.
- `CODEOWNERS` com o Founder, branch protection em `main` e Actions de build, teste e link-check.

**Licenças:**

- O código continua MIT.
- O texto das páginas de conceito passa a ser CC-BY-4.0.
- As amostras Salamander são CC-BY 3.0, de Alexander Holm: manter a atribuição visível.
- O acervo é só de domínio público.

## 5. SEO e GEO

- **Por página:** `<title>` e description únicos, canonical em `adventurelabs.com.br/comunidade/syntonia/...`, `og:*` e um og.png gerado.
- **JSON-LD:**
  - `WebApplication` na home;
  - `LearningResource` + `DefinedTerm` nas páginas de conceito;
  - `FAQPage` quando houver perguntas;
  - `MusicComposition` no acervo.
- **Descoberta:** sitemap (integração do Astro), `robots.txt`, e um `llms.txt` com uma linha por conceito. O sitemap do `adventure-web` aponta para o sitemap do Syntonia.
- **Idioma:** começa em pt-BR. A rota `en` e o hreflang entram na fatia G.
- **Repo:**
  - description em pt+en;
  - topics (`music-theory`, `teoria-musical`, `web-audio`, `education`, `open-source`);
  - `homepageUrl` apontando para a URL canônica.
- **No site da Adventure:**
  - seção **"Labs abertos"** em `/comunidade`, com um cartão por lab e o link "contribua no GitHub", pronta para PALE e conway-sonic-lab;
  - a copy de `communityContent` deixa de falar só de "Journal".

## 6. Fatias (uma por PR, nesta ordem)

| Fatia | Entrega | Efeitos externos (OK do Founder, um por vez) |
|---|---|---|
| **A. Comunidade** | CONTRIBUTING, CODE_OF_CONDUCT, templates, CODEOWNERS, licença do conteúdo, atribuição Salamander; `HANDOFF.md` (desatualizado, v0.18) apagado; README apresentando o Syntonia | topics/description do repo, labels, Discussions |
| **B. Esqueleto Astro** | Astro com o legado copiado intacto em `/legado/`, layout com SEO, build e deploy na Vercel (B1) | criar o projeto `syntonia` na Vercel; Pages vira redirect |
| **C. Motor + testes** | `lib/theory.js` extraído por TDD (os 14 casos de acorde do PR #21 viram teste), depois `midi.js`, `audio.js`, `pitch.js`; o legado passa a importar de `lib/` | nenhum |
| **D. Nome + site** | rename do repo `mscth` → `syntonia`; no `adventure-labs`, rewrite em `next.config.ts` + "Labs abertos" em `/comunidade`, validado no preview da Vercel | rename do repo, merge e deploy do site institucional |
| **E. Primeiros conceitos** | 3 páginas, ex.: modo dórico, círculo das quintas, tonnetz; `llms.txt` e sitemap; JSON-LD validado | nenhum além do deploy da fatia B |
| **F. Acervo contribuível** | `acervo/` + `index.json` + checklist de domínio público; os `tunel/*.js` atuais migram | nenhum |
| **G. Inglês** | rota `en`, hreflang | nenhum |

**Na troca de nome (fatia D):**

- O GitHub redireciona o repo, mas **o Pages não redireciona** `/mscth/`.
- Em B1, o Pages antigo pode virar uma página-ponte. Isso exige que exista um repo com o nome `mscth`, e criar esse repo desliga o redirect do repo renomeado.
- **Decidido (Founder, 2026-11-23):** aceitar a quebra do `/mscth/`, porque o tráfego hoje é mínimo e a URL canônica muda de qualquer jeito. A ponte só é montada se houver tráfego medido.

**Em aberto:** o que fazer com o `/laboratorio` atual do site (`AudioPhysicsLab.tsx`), que sobrepõe as seções 12 a 14. Pode ser fundido no Syntonia como conceitos (lissajous, órbitas, chladni) ou só linkado. Decidir na fatia D.

## 7. 🅿️ Estacionado (não faz parte deste plano)

- **SyntonIA:** a camada de IA, só o nome reservado.
- **Domínio `syntonialab.com`:** registrar só se o nome ganhar tração. Antes de investir na marca, fazer a busca no INPI.
- **Acervo:** uma peça original no estilo 8-bit ou a Marcha Turca (Mozart, domínio público).
- **Túnel do tempo:**
  - filtrar notas do MIDI do violão que não soam no áudio;
  - assobio e voz como linhas separadas, com pYIN;
  - cifragem clássica (I⁶, I⁶₄, V⁶₅);
  - bug: o seletor mostra "Bach" quando o MIDI vem de `#midi=`.
- **Issues já abertas:** [#15](https://github.com/adventurelabsbrasil/mscth/issues/15) e [#2](https://github.com/adventurelabsbrasil/mscth/issues/2) seguem como estão; entram nas páginas de conceito quando chegar a vez.

## 8. Privacidade (o repo é público)

Não entram em issue, PR nem página pública:

- nomes ou cidade de professoras do piloto;
- dados do CRM;
- a gravação do Founder e a análise dela.
