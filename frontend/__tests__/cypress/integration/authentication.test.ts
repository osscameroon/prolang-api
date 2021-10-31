import { Authentication } from '../models/authentication';

context('Authentication workflow', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.closeReactQueryWindow();
    cy.saveLocalStorage();

    cy.visit('/');
  });

  it('should display error notice when invalid credentials given', () => {
    const authentication = new Authentication();
    const email = 'user@email.com';
    const password = 'password';

    authentication.goToLoginPage();

    authentication.fillInputs(email, password);

    authentication.submit();

    authentication.expectUrlToNotChange();

    authentication.expectToastToBeVisible();
  });
});
