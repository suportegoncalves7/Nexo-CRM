# NexoCRM, Landing Page

Landing page institucional de página única da Nexo CRM, consultoria de performance
(CRM + Mídia Paga + Email Marketing).

HTML/CSS/JS puro, sem build step, sem dependências. Basta abrir `index.html`
em um servidor local.

## Estrutura

```
index.html          Página inteira (todas as seções)
style.css           Todo o CSS, incluindo @font-face e design tokens em :root
script.js           Menu mobile, dropdown "Serviços"
animations.js       GSAP: entrada do hero, contadores e barras do dashboard,
                    reveal com stagger ao rolar (ScrollTrigger)
assets/fonts/       Montserrat 700/800, Work Sans 400/500/600 (woff2 locais)
assets/img/logo.png Logo NexoCRM
assets/js/          GSAP e ScrollTrigger, baixados localmente (sem CDN)
.claude/launch.json Config do servidor local de preview
```

GSAP é carregado como arquivo local em `assets/js/`, igual às fontes: sem CDN,
sem npm, sem build step. A classe `.reveal` no HTML marca o estado inicial
oculto via CSS (evita flash antes do JS carregar); `animations.js` anima até
o estado visível. Se o GSAP falhar ao carregar ou o usuário preferir menos
movimento (`prefers-reduced-motion`), o conteúdo aparece direto, sem animação.

Seções do `index.html`, na ordem: header, hero, `#abordagem`, `#metodologia`,
manifesto, `#diferenciais`, `#contato`, footer.

A seção de depoimentos foi removida a pedido do cliente (só existiam
placeholders, nunca chegaram depoimentos reais). Se ela voltar no futuro,
usar depoimentos reais desde o início, sem placeholder.

## Como rodar

```bash
npx http-server . -p 4321 -c-1
```

Abrir `file://` direto também funciona, mas o servidor evita cache agressivo
ao editar CSS.

## Regras do cliente (obrigatórias)

Estas vieram de um briefing formal e valem para qualquer texto novo:

1. **Nunca usar travessão (—) em nenhum texto do site.** Para separar ideias na
   mesma frase, usar vírgula, dois pontos ou ponto final. Esta é a regra mais
   fácil de violar sem perceber ao escrever copy nova. Vale inclusive para os
   arquivos de documentação deste repositório, para não induzir ao erro.
2. **Nunca usar o símbolo de estrela (★).**
3. **Teal (`--teal`, #0f766e) é só acento:** logo, ícones pequenos, detalhes.
   Nunca como fundo de seção nem em botão grande.
4. **Navy (`--navy`, #05263a) é a cor dominante escura:** fundos de seção de
   destaque, botões primários, cor de título.
5. **Gold (`--gold`, #c9a227) é destaque pontual:** números importantes, ícones
   de resultado, linha decorativa fina, palavras destacadas em títulos.
6. **Tipografia não muda:** Montserrat para títulos, Work Sans para corpo.

Os tokens ficam em `:root` no topo do `style.css`. Alterar a paleta ali propaga
para o site inteiro.

## Acentos por pilar

Na seção `#abordagem`, cada card tem cor própria via `--pillar-accent`:

| Card | Classe | Acento |
|---|---|---|
| Mídia Paga & Performance | `.pillar-card--media` | gold |
| Email Marketing & Automação | `.pillar-card--email` | navy |
| CRM & Retenção | `.pillar-card--crm` | teal |

## Mockup do dashboard

O painel no hero **não é imagem**, é HTML/CSS (`.dashboard-card`). A versão
original era um PNG com os números chapados, o que impedia editá-los. Foi
reconstruído para que todas as métricas sejam texto editável:

Retenção +24%, ROAS 5.2x, CPA -31%, Taxa de Abertura 58%, LTV +42%.

As barras do gráfico são `<span>` com `height` inline em porcentagem.
São dados ilustrativos, e a legenda abaixo do hero diz isso explicitamente.

## Pendências antes de publicar

- [ ] Links de WhatsApp estão como `https://wa.me/` sem número.
- [ ] Links de redes sociais no footer estão como `#`.
- [ ] Política de privacidade e Termos de uso apontam para `#`.
- [ ] CNPJ e endereço no rodapé (há um `.placeholder-note` marcando o lugar).
- [ ] Confirmar o hex oficial do dourado da marca. O atual (#c9a227) foi
      escolhido para harmonizar, pois a logo só tem teal e navy.

## Responsividade

- Breakpoint do menu mobile: **1100px** (não 960px). O menu ganhou o item
  "Serviços" e o texto mais longo "Nossa metodologia", que estouravam o header
  entre 960px e 1100px.
- O CTA do header existe duas vezes no HTML: `.header-actions` (desktop) e
  `.header-actions-mobile` dentro do `<nav>`. Apenas um fica visível por vez.
  Se ambos aparecerem, a regra `.header-actions-mobile { display: none; }`
  foi quebrada. Era exatamente o bug do "botão duplicado" que o cliente relatou.
