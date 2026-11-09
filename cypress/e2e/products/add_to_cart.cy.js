/* Add-to-cart E2E test. No authentication required. */
describe('Add Product to Cart', () => {
  it('should add product from product details page', () => {
    cy.visit('/');

    cy.contains('Products').click();

    cy.url().should('include', '/products');

    cy.get('.choose a').first().click();

    cy.contains('Add to cart').click();

    cy.contains('View Cart').click();

    cy.url().should('include', '/view_cart');
    cy.get('.cart_description').should('be.visible');
  });
});
