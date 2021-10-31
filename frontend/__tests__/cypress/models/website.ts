import { cySelector } from './utils';
import { NotFound } from './not-found';
import { Maintenance } from './maintenance';

class Website {
  notFound = new NotFound();
  maintenance = new Maintenance();

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

  goToDashboard() {
    cy.visit('/dashboard');
  }
}

export { Website };
