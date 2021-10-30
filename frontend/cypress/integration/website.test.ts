/// <reference types="cypress" />

// @ts-ignore
context('Navigate on home page', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.closeReactQueryWindow();
    cy.saveLocalStorage();

    cy.visit('/');
  });

  it('should render homepage', function () {
    cy.url().should('include', '/');
    cy.get('h2 > span.block').contains('The API to browse programming languages');

    // The new url should include "/about"
    cy.url().should('include', '/about');

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('About Page');
  });
});