import { cySelector } from '@cypress/models/utils';

class NotFound {
  navigateToUnknownPage() {
    cy.visit('/unknown-page', { failOnStatusCode: false });
  }

  expectNotFoundPageToBeDisplayed() {
    cy.get('h2').contains('Oops! The page not found');
    cy.get(cySelector('lnk-home')).contains('Go to the home page');
  }

  goBackToHomePage() {
    cy.get(cySelector('lnk-home')).click();
  }
}

export { NotFound };
