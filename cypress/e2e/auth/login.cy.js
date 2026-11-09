/* Login flow E2E test.
   Credentials come from cypress.env.json (or CYPRESS_* variables) —
   no hardcoded accounts in source. */
describe('User Login', () => {
  it('should login with valid credentials', () => {
    const email = Cypress.env('userEmail');
    const password = Cypress.env('userPassword');

    if (!email || !password) {
      throw new Error(
        'Missing credentials. Copy cypress.env.json.example to ' +
        'cypress.env.json and set userEmail / userPassword before ' +
        'running the auth specs.');
    }

    cy.visit('/');

    cy.contains('Signup / Login').click();

    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password, { parseSpecialCharSequences: false });
    cy.get('[data-qa="login-button"]').click();

    cy.contains('Logged in as').should('be.visible');
  });
});
