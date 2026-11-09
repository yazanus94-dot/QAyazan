/* Signup flow E2E test.
   Credentials and registration data come from cypress.env.json (or
   CYPRESS_* variables) — no hardcoded accounts in source. */
describe('Create New User Account', () => {
  const reg = Cypress.env('reg') || {};

  it('should register successfully', () => {
    cy.visit('/');

    cy.contains('Signup / Login').click();

    cy.get('[data-qa="signup-name"]').type(reg.name || 'Test Registration User');
    cy.get('[data-qa="signup-email"]').type(`cy.run-${Date.now()}@mail.com`);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains('Enter Account Information').should('be.visible');
    cy.get('#id_gender1').check();
    cy.get('#password').type(Cypress.env('userPassword') || 'S3cure-Test-Pass!');

    cy.get('#first_name').type(reg.firstName || 'Test');
    cy.get('#last_name').type(reg.lastName || 'User');
    cy.get('#address1').type(reg.address || 'Test Address 1');
    cy.get('#country').select('Canada');
    cy.get('#state').type(reg.state || 'Test State');
    cy.get('#city').type(reg.city || 'Test City');
    cy.get('#zipcode').type(reg.zipcode || '00000');
    cy.get('#mobile_number').type(reg.mobile || '0000000000');

    cy.get('[data-qa="create-account"]').click();

    cy.contains('Account Created!', { timeout: 10000 }).should('be.visible');
  });
});
