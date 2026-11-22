/* Product search E2E tests (positive + negative). No authentication required. */
describe('Search Product', () => {
  beforeEach(() => {
    cy.fixture('test-data').as('testData');
  });

  it('valid product search @smoke', function () {
    const term = this.testData.products.searchTerms.valid;

    cy.goToProducts();
    cy.searchProducts(term);
    cy.get('.productinfo').should('exist');
  });

  it('invalid product search returns no results', function () {
    const term = this.testData.products.searchTerms.invalid;

    cy.goToProducts();
    cy.searchProducts(term);

    // Should show empty state or no products
    cy.get('.features_items').should('be.visible');
    cy.get('.productinfo').should('not.exist');
  });

  it('empty search shows all products', () => {
    cy.goToProducts();
    cy.get('#search_product').clear();
    cy.get('#submit_search').click();
    cy.get('.features_items').should('be.visible');
    cy.get('.productinfo').should('exist');
  });
});
