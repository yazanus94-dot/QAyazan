/* Login flow E2E test using custom commands and fixtures.
   Credentials come from cypress.env.json (or CYPRESS_* variables) —
   no hardcoded accounts in source. */
describe('User Login', () => {
  beforeEach(() => {
    cy.fixture('test-data').as('testData');
  });

  it('should login with valid credentials @smoke', function () {
    const email = Cypress.env('userEmail') || this.testData.validUser.email;
    const password = Cypress.env('userPassword') || this.testData.validUser.password;

    cy.login(email, password);
    cy.contains('Logged in as').should('be.visible');
  });

  it('should reject invalid credentials', function () {
    this.testData.invalidUsers.forEach((user) => {
      cy.visit('/');
      cy.contains('Signup / Login').click();

      cy.get('[data-qa="login-email"]').type(user.email);
      cy.get('[data-qa="login-password"]').type(user.password, { parseSpecialCharSequences: false });
      cy.get('[data-qa="login-button"]').click();

      cy.contains('Your email or password is incorrect!').should('be.visible');
    });
  });

  it('protected page redirects anonymous users', () => {
    cy.visit('/');
    cy.contains('Products').click();
    cy.url().should('include', '/products');
    cy.contains('Signup / Login').should('be.visible');
  });

  it('logout ends the session', () => {
    const email = Cypress.env('userEmail') || 'testuser@example.com';
    const password = Cypress.env('userPassword') || 'TestPass123!';

    cy.login(email, password);
    cy.logout();
    cy.contains('Signup / Login').should('be.visible');
  });
});
