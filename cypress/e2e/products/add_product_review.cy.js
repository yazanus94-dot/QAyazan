/* Product review E2E test (requires a logged-in test account). */
describe('Add Product Review', () => {
  beforeEach(() => {
    cy.fixture('test-data').as('testData');
  });

  it('should allow logged-in user to add a review @smoke', function () {
    const email = Cypress.env('userEmail') || this.testData.validUser.email;
    const password = Cypress.env('userPassword') || this.testData.validUser.password;
    const review = this.testData.review;

    cy.login(email, password);
    cy.goToProducts();
    cy.get('.choose a').first().click();

    cy.addProductReview({
      name: review.name,
      email: email,
      review: review.review,
    });
  });

  it('should reject empty review', function () {
    const email = Cypress.env('userEmail') || this.testData.validUser.email;
    const password = Cypress.env('userPassword') || this.testData.validUser.password;

    cy.login(email, password);
    cy.goToProducts();
    cy.get('.choose a').first().click();

    cy.get('#name').type('Test Reviewer');
    cy.get('#email').type(email);
    cy.get('#review').clear();
    cy.get('#button-review').click();

    // Should show validation error or not submit
    cy.get('#review').then(($el) => {
      expect($el[0].validationMessage).to.not.be.empty;
    });
  });
});
