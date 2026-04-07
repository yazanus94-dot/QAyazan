// all_actions_one_execution.cy.js
// All actions from Register page in a single test execution

describe('Execute all actions from Register page in one go', () => {
  it('should perform all interactions sequentially', () => {
    // 1. Start on Register page
    cy.visit('https://demowebshop.tricentis.com/register');

    // 2. Gender radio button
    cy.get('#gender-male').check();

    // 3. First name field
    cy.get('#FirstName').type('John');

    // 4. Last name field (optional, but added for completeness)
    cy.get('#LastName').type('Doe');

    // 5. Register button (clicks but may fail because required fields missing? Let's keep)
    cy.get('#register-button').click();
    // Note: This will attempt registration and likely show validation errors, but continues.

    // 6. Go back to Register page to continue other actions? Better to keep on same page or re-visit?
    // The requirement says "on the same website" but starting from register page.
    // I'll re-visit register page after actions that navigate away, to ensure all actions can be executed.
    // However, to keep it realistic, I'll re-visit after navigation steps.

    // --- Following actions may navigate away, so we re-visit register page each time ---

    // 7. Jewelry – top menu (this will navigate to Jewelry page)
    cy.visit('https://demowebshop.tricentis.com/register'); // back to register
    cy.get('.top-menu').contains('a', 'Jewelry').click();

    // 8. Log in link (navigates to login)
    cy.visit('https://demowebshop.tricentis.com/register');
    cy.get('.ico-login').click();

    // 9. Search field (on register page, type)
    cy.visit('https://demowebshop.tricentis.com/register');
    cy.get('#small-searchterms').click().type('jewelry');

    // 10. Contact us link (footer)
    cy.visit('https://demowebshop.tricentis.com/register');
    cy.get('.footer').contains('a', 'Contact us').click();

    // 11. My account – <h3> element in footer
    cy.visit('https://demowebshop.tricentis.com/register');
    cy.get('.footer h3').contains('My account').click();

    // 12. My account – actual link below h3
    cy.visit('https://demowebshop.tricentis.com/register');
    cy.get('.footer h3')
      .contains('My account')
      .parents('.column')
      .find('a')
      .contains('My account')
      .click();

    // 13. Subscribe to newsletter
    cy.visit('https://demowebshop.tricentis.com/register');
    cy.get('#newsletter-email').type('testuser' + Date.now() + '@example.com');
    cy.get('#newsletter-subscribe-button').click();

    // 14. Gift Cards link (top menu)
    cy.visit('https://demowebshop.tricentis.com/register');
    cy.get('.top-menu a[href="/gift-cards"]').click();

    // 15. Gift Cards from left sidebar
    cy.visit('https://demowebshop.tricentis.com/register');
    cy.get('.block-category-navigation a[href="/gift-cards"]').click();

    // 16. Demo Web Shop logo (navigates to homepage)
    cy.visit('https://demowebshop.tricentis.com/register');
    cy.get('img[alt="Tricentis Demo Web Shop"]').click();
  });
});