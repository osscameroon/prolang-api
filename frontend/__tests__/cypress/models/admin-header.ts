import { cySelector } from './utils';

class AdminHeader {
  expectUsernameToMatch(name: string) {
    cy.get(cySelector('username')).contains(name);
  }

  toggleAccountMenu() {
    cy.get(cySelector('btn-account-menu')).click();
    cy.get(cySelector('account-menu-list')).should('be.visible');
  }

  clickOnLogoutMenuItem() {
    cy.get(cySelector('lnk-logout')).click();
  }
}

export { AdminHeader };
