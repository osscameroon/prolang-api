import { cySelector } from '@cypress/models/utils';
import { NotFound } from '@cypress/models/not-found';

class Website {
  notFound = new NotFound();

  constructor() {}

  expectHomePageToBeDisplayed() {
    cy.url().should('include', '/');
    cy.get('h2 > span.block').contains('The API to browse programming languages');
  }

  navigateToDocumentationPage() {
    cy.get(cySelector('lnk-documentation')).should('have.attr', 'href', '/documentation').click();
    cy.url().should('include', '/documentation');
  }

  navigateToPlaygroundPage() {
    cy.get(cySelector('lnk-playground')).click();
    cy.url().should('include', '/playground');
    cy.get('h1').contains('GraphQL Playground');
  }

  navigateToHomePage() {
    cy.get(cySelector('lnk-home')).click();
    cy.url().should('include', '/');
  }
}

export { Website };
