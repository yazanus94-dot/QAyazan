/* Product review E2E test (requires a logged-in test account). */
describe('Add Product Review', () => {
  it('should allow logged-in user to add a review', () => {
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

    cy.contains('Products').click();

    cy.url().should('include', '/products');

    cy.get('.choose a').first().click();

    cy.get('#name').type('Test Reviewer');
    cy.get('#email').type(email);
    cy.get('#review').type('This is a good product');

    cy.get('#button-review').click();

    cy.contains('Thank you for your review', { timeout: 10000 }).should('be.visible');
  });
});
