/* Signup flow E2E test using fixtures and custom commands.
   Credentials and registration data come from cypress.env.json (or
   CYPRESS_* variables) — no hardcoded accounts in source. */
describe('Create New User Account', () => {
  beforeEach(() => {
    cy.fixture('test-data').as('testData');
  });

  it('should register successfully @smoke', function () {
    const reg = this.testData.registration;
    const email = `cy.run-${Date.now()}@mail.com`;

    cy.visit('/');
    cy.contains('Signup / Login').click();

    cy.get('[data-qa="signup-name"]').type(reg.name);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains('Enter Account Information').should('be.visible');
    cy.get('#id_gender1').check();
    cy.get('#password').type(Cypress.env('userPassword') || 'S3cure-Test-Pass!');
    cy.get('#first_name').type(reg.firstName);
    cy.get('#last_name').type(reg.lastName);
    cy.get('#address1').type(reg.address);
    cy.get('#country').select(reg.country);
    cy.get('#state').type(reg.state);
    cy.get('#city').type(reg.city);
    cy.get('#zipcode').type(reg.zipcode);
    cy.get('#mobile_number').type(reg.mobile);

    cy.get('[data-qa="create-account"]').click();

    cy.contains('Account Created!', { timeout: 10000 }).should('be.visible');
  });

  it('should reject registration with existing email', function () {
    const reg = this.testData.registration;
    const email = Cypress.env('userEmail') || 'testuser@example.com';

    cy.visit('/');
    cy.contains('Signup / Login').click();

    cy.get('[data-qa="signup-name"]').type(reg.name);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains('Email Address already exist!').should('be.visible');
  });
});
