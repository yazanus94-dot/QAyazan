# QAyazan — Cypress E2E Test Suite (automationexercise.com)

End-to-end web test automation practice suite built with [Cypress](https://www.cypress.io/)
against [automationexercise.com](https://automationexercise.com/), a public
practice-e-commerce site.

## 🧪 Covered scenarios

| Spec | Flow | Requires login |
|---|---|:--:|
| `e2e/auth/signup.cy.js` | new user registration (account creation, gender selection, address form) | no |
| `e2e/auth/login.cy.js` | valid-credential login | — (is the auth) |
| `e2e/products/product_search.cy.js` | product search: positive + negative cases | no |
| `e2e/products/add_to_cart.cy.js` | product details → add to cart → cart verification | no |
| `e2e/products/add_product_review.cy.js` | login → product review submission | yes |

## 🔐 Credentials — not committed on purpose

The auth-dependent specs read credentials at runtime:

1. `cypress.env.json` (local, gitignored — copy from `cypress.env.json.example`)
2. or `CYPRESS_userEmail` / `CYPRESS_userPassword` (CI / shell overrides)

If neither is present, the auth specs fail fast with an explanatory
message instead of silently misbehaving. Never hardcode accounts in
specs — they end up in git history on public repos.

## 🎯 Locator strategy

- `data-qa` attributes as the primary, stable selector strategy for
  site controls (buttons/inputs that expose them)
- semantic `cy.contains()` for navigation text links
- plain element ids (`#password`, `#search_product`, …) only where the
  site's own markup provides them
- each step asserted on observable state (`url().should('include', …)`,
  `should('be.visible')`) rather than chained blindly

## 🚀 Run it

Prerequisites: Node.js 18+ and npm.

```bash
npm install

# interactive mode (picks a browser in the app window)
npm run cypress:open

# headless single run (all specs)
npm test

# smoke subset (no test account needed)
npm run test:smoke
```

For the full suite, first set up local credentials:

```bash
cp cypress.env.json.example cypress.env.json
# then edit cypress.env.json with your own test account
```

## ⚙️ CI

`.github/workflows/ci.yml` runs the no-login smoke specs
(`product_search.cy.js` + `add_to_cart.cy.js`) headlessly on every push
to `master` via `cypress-io/github-action`, so the pipeline stays green
without repository secrets. The auth specs run locally with
`cypress.env.json`; to run them in CI as well, add `userEmail` /
`userPassword` as repository secrets and point the workflow's spec
argument at all specs.

## 📂 Project structure

```
.
├── cypress.config.js             # baseUrl + projectId
├── cypress/
│   ├── e2e/
│   │   ├── auth/                 # signup + login flows
│   │   └── products/             # search, cart, review flows
│   ├── fixtures/
│   └── support/                  # commands.js, e2e.js
├── .github/workflows/ci.yml      # CI pipeline (smoke run)
├── cypress.env.json.example      # credential template (real file gitignored)
├── package.json
└── README.md
```

## License

MIT — see [LICENSE](LICENSE).
