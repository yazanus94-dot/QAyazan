// 1.Create New User Account 
describe('Create New User Account', () => {

  it('should register successfully', () => {

    const email = `test${Date.now()}@mail.com`;

    cy.visit('https://automationexercise.com/');
    cy.contains('Signup / Login').click();

    cy.get('[data-qa="signup-name"]').type('YAZAN ALJABARI');
    cy.get('[data-qa="signup-email"]').type('yazanst@gmail.com');
    cy.get('[data-qa="signup-button"]').click();

    // ✅ wait for next page (IMPORTANT)
    cy.contains('Enter Account Information').should('be.visible');

    // ✅ REQUIRED field (MOST COMMON ISSUE)
    cy.get('#id_gender1').check();

    cy.get('#password').type('A123456yazan@');

    cy.get('#first_name').type('YAZAN');
    cy.get('#last_name').type('ALJABARI');
    cy.get('#address1').type('Amman');
    cy.get('#country').select('Canada');
    cy.get('#state').type('Amman');
    cy.get('#city').type('Amman');
    cy.get('#zipcode').type('00000');
    cy.get('#mobile_number').type('0799999999');

    cy.get('[data-qa="create-account"]').click();

   cy.contains('Account Created!', { timeout: 10000 }).should('be.visible');

  });

});

//  2. User Login
describe('User Login', () => {

  it('should login with valid credentials', () => {

    cy.visit('https://automationexercise.com/');

    // Go to login page
    cy.contains('Signup / Login').click();

    // Enter valid credentials
    cy.get('[data-qa="login-email"]').type('yazanad94@gmail.com');   // use your real account
    cy.get('[data-qa="login-password"]').type('A123456yazan@');       // use your real password

    cy.get('[data-qa="login-button"]').click();

    // Assertion
    cy.contains('Logged in as').should('be.visible');

  });

});

// 3. Add Products to Cart
describe('Search Product', () => {

  it('valid product search', () => {

    cy.visit('https://automationexercise.com/');

    cy.contains('Products').click();

    cy.url().should('include', '/products');

    cy.get('#search_product').type('Top');
    cy.get('#submit_search').click();

    // ✅ stable assertion
    cy.get('.features_items').should('be.visible');

    cy.get('.productinfo').should('exist');

  });


  it('invalid product search', () => {

    cy.visit('https://automationexercise.com/products');

    cy.get('#search_product').type('INVALID123');
    cy.get('#submit_search').click();

    cy.get('.productinfo').should('not.exist');

  });

});

// 4. Add Product to Cart
describe('Add Product to Cart', () => {

  it('should add product from product details page', () => {

    cy.visit('https://automationexercise.com/');

    // Go to Products page
    cy.contains('Products').click();

    cy.url().should('include', '/products');

    // Click first product "View Product"
    cy.get('.choose a').first().click();

    // Add to cart
    cy.contains('Add to cart').click();

    // View cart
    cy.contains('View Cart').click();

    // Assertion
    cy.url().should('include', '/view_cart');
    cy.get('.cart_description').should('be.visible');

  });

});

// 5. Add a Product Review
describe('Add Product Review', () => {

  it('should allow logged-in user to add a review', () => {

    // Step 1: Login first
    cy.visit('https://automationexercise.com/');

    cy.contains('Signup / Login').click();

    cy.get('[data-qa="login-email"]').type('yazanad94@gmail.com');   // use valid account
    cy.get('[data-qa="login-password"]').type('A123456yazan@');       // use valid password
    cy.get('[data-qa="login-button"]').click();

    cy.contains('Logged in as').should('be.visible');

    // Step 2: Go to Products
    cy.contains('Products').click();

    cy.url().should('include', '/products');

    // Step 3: Open first product
    cy.get('.choose a').first().click();

    // Step 4: Write review
    cy.get('#name').type('YAZAN ALJABARI');
    cy.get('#email').type('yazanad94@gmail.com');
    cy.get('#review').type('This is a good product');

    cy.get('#button-review').click();

    // Step 5: Assertion
    
   cy.contains('Thank you for your review', { timeout: 10000 }).should('be.visible');

  });

});