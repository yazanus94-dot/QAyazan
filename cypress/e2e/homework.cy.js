// task1_v2.cy.js
// Alternative selectors for the same registration form elements
// Uses different selector strategies: label association, data-* attributes, traversal, CSS classes, value attribute

describe('Task #1 - Alternative selectors (different from first solution)', () => {
  beforeEach(() => {
    cy.visit('https://demowebshop.tricentis.com/register');
  });

  it('should verify each element using a completely different set of selectors', () => {
    // 1. Gender Male radio button – using label association (click label to check radio)
    cy.contains('label', 'Male').click();
    cy.get('#gender-male').should('be.checked');

    // 2. Gender Female radio button – using parent traversal and find input by value
    cy.contains('label', 'Female')
      .parent() // the <label> itself, but we need the input inside? Actually label wraps input? No, input is separate.
      // Better: use sibling input, but simpler: use data attribute
      cy.get('input[value="F"]').check();
    cy.get('input[value="F"]').should('be.checked');

    // Alternative for Female: using data-val attribute
    cy.get('input[data-val-required="Gender is required."][value="F"]').check();

    // 3. First Name input – using CSS class .text-box and then filtering by placeholder or preceding label
    cy.get('.text-box')
      .first() // First name is the first .text-box on the page? Not reliable. Better:
      cy.get('label[for="FirstName"]').next('input').should('exist');

    // 4. Last Name input – using contains on label and then find next input
    cy.contains('label', 'Last name').next('input').should('exist');

    // 5. Email input – using data-val-required attribute
    cy.get('input[data-val-required="Email is required."]').should('exist');

    // 6. Password input – using data-val-required for password
    cy.get('input[data-val-required="Password is required."]').should('exist');

    // 7. Confirm Password input – using data-val-equalto-other attribute
    cy.get('input[data-val-equalto-other="*.Password"]').should('exist');

    // 8. Register button – using value attribute selector
    cy.get('input[value="Register"]').should('exist');
    // Also possible: using class .button-1
    cy.get('.button-1.register-next-step-button').should('exist');
  });
});