/// <reference types="cypress" />

// @ts-ignore
context('Navigate on home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5701');
  });

  it('should render homepage', function () {
    cy.get('h2 > span.block').contains('The API to browse programming languages');
  });
});