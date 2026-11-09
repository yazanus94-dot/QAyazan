/* Product search E2E tests (positive + negative). No authentication required. */
describe('Search Product', () => {
  it('valid product search', () => {
    cy.visit('/');

    cy.contains('Products').click();

    cy.url().should('include', '/products');

    cy.get('#search_product').type('Top');
    cy.get('#submit_search').click();

    cy.get('.features_items').should('be.visible');
    cy.get('.productinfo').should('exist');
  });

  it('invalid product search', () => {
    cy.visit('/products');

    cy.get('#search_product').type('INVALID123');
    cy.get('#submit_search').click();

    cy.get('.productinfo').should('not.exist');
  });
});
