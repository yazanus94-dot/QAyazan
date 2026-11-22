/* Add-to-cart E2E test using custom commands. No authentication required. */
describe('Add Product to Cart', () => {
  it('should add product from product details page @smoke', () => {
    cy.goToProducts();
    cy.addFirstProductToCart();
    cy.verifyCartHasItems(1);
  });

  it('should add multiple products to cart', () => {
    cy.goToProducts();
    cy.addFirstProductToCart();
    cy.goToProducts();
    cy.addFirstProductToCart();
    cy.verifyCartHasItems(2);
  });

  it('should remove product from cart', () => {
    cy.goToProducts();
    cy.addFirstProductToCart();
    cy.get('.cart_quantity_delete').click();
    cy.get('.cart_description').should('not.exist');
  });
});
