# NexoCRM, Landing Page

Landing page institucional da Nexo CRM, consultoria de performance
(CRM + Mídia Paga + Email Marketing).

HTML, CSS e JavaScript puro. Sem build, sem dependências, sem framework.

## Rodando localmente

```bash
npx http-server . -p 4321 -c-1
```

Depois abrir <http://localhost:4321>.

Abrir o `index.html` direto pelo navegador também funciona, mas o servidor
evita cache agressivo enquanto você edita o CSS.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `index.html` | Página inteira, todas as seções |
| `style.css` | Todo o CSS, incluindo fontes e tokens de cor em `:root` |
| `script.js` | Menu mobile, dropdown "Serviços", reveal no scroll |
| `assets/fonts/` | Montserrat e Work Sans em woff2 local |
| `assets/img/` | Logo |
| `CLAUDE.md` | Contexto do projeto e regras do cliente |

## Editando

**Cores** ficam todas em `:root`, no topo do `style.css`. Trocar `--gold`,
`--navy` ou `--teal` ali propaga para o site inteiro.

**Números do dashboard** no hero são texto no `index.html`, dentro de
`.dashboard-card`. Não é imagem, dá para editar direto.

**Regras de texto do cliente:** nunca usar travessão (—) nem estrela (★).
Detalhes completos e demais convenções em [CLAUDE.md](CLAUDE.md).

## Antes de publicar

Links de WhatsApp e redes sociais, CNPJ e páginas legais ainda são
placeholders. A lista completa está em [CLAUDE.md](CLAUDE.md).
