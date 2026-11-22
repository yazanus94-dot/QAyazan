# QAyazan — Cypress E2E Test Suite (automationexercise.com)

End-to-end web test automation practice suite built with [Cypress](https://www.cypress.io/)
against [automationexercise.com](https://automationexercise.com/), a public
practice-e-commerce site.

## 🧪 Covered scenarios

| Spec | Flow | Requires login |
|---|---|:--:|
| `e2e/auth/signup.cy.js` | new user registration (account creation, gender selection, address form) | no |
| `e2e/auth/login.cy.js` | valid-credential login + negative cases | — (is the auth) |
| `e2e/products/product_search.cy.js` | product search: positive + negative + empty cases | no |
| `e2e/products/add_to_cart.cy.js` | add single/multiple products, remove from cart, verify badge | no |
| `e2e/products/add_product_review.cy.js` | login → product review submission + validation | yes |

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

## 🛠️ Custom Commands & Fixtures

This project uses custom Cypress commands and fixtures for:
- **Reusable actions**: `login()`, `logout()`, `goToProducts()`, `searchProducts()`, `addFirstProductToCart()`, `verifyCartHasItems()`, `registerUser()`, `addProductReview()`
- **Test data management**: `cypress/fixtures/test-data.json` for centralized test data
- **Session caching**: `cy.session()` for login to avoid repeated authentication
- **Helper utilities**: `waitForNetworkIdle()`, `assertNoConsoleErrors()`, `getTestData()`

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

`.github/workflows/ci.yml` runs:
- **Smoke suite** (no-login specs) on every push to `main` and PRs
- **Full matrix** (Chrome, Firefox, Edge) on manual dispatch or schedule
- Artifacts: screenshots, videos, and HTML reports on failure
- Auth specs require `CYPRESS_USER_EMAIL` / `CYPRESS_USER_PASSWORD` secrets

## 📂 Project structure

```
.
├── cypress.config.js             # baseUrl + projectId + retries + video + screenshots
├── cypress/
│   ├── e2e/
│   │   ├── auth/                 # signup + login flows
│   │   └── products/             # search, cart, review flows
│   ├── fixtures/
│   │   └── test-data.json        # centralized test data
│   └── support/
│       ├── commands.js           # custom commands (login, session, fixtures, etc.)
│       └── e2e.js                # global hooks
├── .github/workflows/ci.yml      # CI pipeline (smoke + matrix)
├── cypress.env.json.example      # credential template (real file gitignored)
├── package.json
├── package-lock.json             # locked dependencies for CI caching
└── README.md
```

## 📊 Reporting & Artifacts

- **Screenshots** on failure (auto-captured via `screenshotOnRunFailure: true`)
- **Videos** of full test runs (auto-captured via `video: true`)
- **JUnit/XML reports** available via `cypress-mochawesome-reporter` (optional)

## License

MIT — see [LICENSE](LICENSE).
