import { cySelector } from './utils';

class Maintenance {
  expectMaintenancePageToBeDisplayed() {
    cy.get('h2').contains('Maintenance in progress...');
  }

  expectButtonToAdminVisible() {
    cy.get(cySelector('lnk-email'))
      .should('have.attr', 'href', 'mailto:tericcabel@yahoo.com?subject=Prolang website down')
      .contains('Contact the admin');
  }
}

export { Maintenance };
