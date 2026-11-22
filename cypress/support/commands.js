// ***********************************************
// Custom Cypress Commands for QA Automation Exercise
// ***********************************************

// -- Login command --
Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/');
    cy.contains('Signup / Login').click();
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(password, { parseSpecialCharSequences: false });
    cy.get('[data-qa="login-button"]').click();
    cy.contains('Logged in as').should('be.visible');
  });
});

// -- Logout command --
Cypress.Commands.add('logout', () => {
  cy.contains('Logout').click();
  cy.contains('Signup / Login').should('be.visible');
});

// -- Navigate to products page --
Cypress.Commands.add('goToProducts', () => {
  cy.visit('/');
  cy.contains('Products').click();
  cy.url().should('include', '/products');
});

// -- Search products --
Cypress.Commands.add('searchProducts', (term) => {
  cy.get('#search_product').clear().type(term);
  cy.get('#submit_search').click();
  cy.get('.features_items').should('be.visible');
});

// -- Add first product to cart --
Cypress.Commands.add('addFirstProductToCart', () => {
  cy.get('.choose a').first().click();
  cy.contains('Add to cart').click();
  cy.contains('View Cart').click();
  cy.url().should('include', '/view_cart');
});

// -- Verify cart has items --
Cypress.Commands.add('verifyCartHasItems', (count = 1) => {
  cy.get('.cart_description').should('have.length.at.least', count);
});

// -- Register new user --
Cypress.Commands.add('registerUser', (userData = {}) => {
  const defaults = {
    name: 'Test Registration User',
    email: `cy.run-${Date.now()}@mail.com`,
    password: 'S3cure-Test-Pass!',
    firstName: 'Test',
    lastName: 'User',
    address: 'Test Address 1',
    country: 'Canada',
    state: 'Test State',
    city: 'Test City',
    zipcode: '00000',
    mobile: '0000000000',
  };
  const data = { ...defaults, ...userData };

  cy.visit('/');
  cy.contains('Signup / Login').click();
  cy.get('[data-qa="signup-name"]').type(data.name);
  cy.get('[data-qa="signup-email"]').type(data.email);
  cy.get('[data-qa="signup-button"]').click();

  cy.contains('Enter Account Information').should('be.visible');
  cy.get('#id_gender1').check();
  cy.get('#password').type(data.password);
  cy.get('#first_name').type(data.firstName);
  cy.get('#last_name').type(data.lastName);
  cy.get('#address1').type(data.address);
  cy.get('#country').select(data.country);
  cy.get('#state').type(data.state);
  cy.get('#city').type(data.city);
  cy.get('#zipcode').type(data.zipcode);
  cy.get('#mobile_number').type(data.mobile);
  cy.get('[data-qa="create-account"]').click();

  cy.contains('Account Created!', { timeout: 10000 }).should('be.visible');
  return cy.wrap(data);
});

// -- Add product review (requires login) --
Cypress.Commands.add('addProductReview', (reviewData = {}) => {
  const defaults = {
    name: 'Test Reviewer',
    email: Cypress.env('userEmail'),
    review: 'This is a good product',
  };
  const data = { ...defaults, ...reviewData };

  cy.get('#name').type(data.name);
  cy.get('#email').type(data.email);
  cy.get('#review').type(data.review);
  cy.get('#button-review').click();

  cy.contains('Thank you for your review', { timeout: 10000 }).should('be.visible');
});

// -- Check if element exists and is visible --
Cypress.Commands.add('shouldBeVisible', { prevSubject: 'optional' }, (subject, selector) => {
  if (subject) {
    return cy.wrap(subject).should('be.visible');
  }
  return cy.get(selector).should('be.visible');
});

// -- Wait for network idle --
Cypress.Commands.add('waitForNetworkIdle', (timeout = 10000) => {
  cy.window().then((win) => {
    return new Cypress.Promise((resolve) => {
      let timer;
      const checkIdle = () => {
        if (win.performance && win.performance.getEntriesByType) {
          const resources = win.performance.getEntriesByType('resource');
          const pending = resources.filter(r => r.responseEnd === 0);
          if (pending.length === 0) {
            clearTimeout(timer);
            resolve();
          }
        }
      };
      timer = setInterval(checkIdle, 100);
      setTimeout(() => {
        clearInterval(timer);
        resolve();
      }, timeout);
    });
  });
});

// -- Assert no console errors --
Cypress.Commands.add('assertNoConsoleErrors', () => {
  cy.on('window:console', (consoleObj) => {
    if (consoleObj.type === 'error') {
      throw new Error(`Console error detected: ${consoleObj.args.join(' ')}`);
    }
  });
});

// -- Get test data from fixtures --
Cypress.Commands.add('getTestData', (fixtureName) => {
  return cy.fixture(fixtureName);
});
