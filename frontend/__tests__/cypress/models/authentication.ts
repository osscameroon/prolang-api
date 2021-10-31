import { cySelector } from './utils';

class Authentication {
  goToLoginPage() {
    cy.visit('/login');
  }

  fillInputs(email: string, password: string) {
    cy.get(cySelector('input-email')).type(email);
    cy.get(cySelector('input-password')).type(password);
  }

  submit() {
    cy.get(cySelector('btn-submit')).click();
  }

  expectUrlToNotChange() {
    cy.url().should('include', '/login');
  }

  expectToastToBeVisible() {
    cy.get('.Toastify').should('not.be.empty')
      .find('.Toastify__toast-body')
      .eq(0)
      .contains('The credential is invalid.');
  }
}

export { Authentication };
