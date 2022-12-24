import { Authentication } from '../models/authentication';
import { Dashboard } from '../models/dashboard';
import { AdminHeader } from '../models/admin-header';
import { Website } from '../models/website';
import { currentUserData } from '../../mocks/fixtures/api-response';

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

  it('should login user successfully', () => {
    const authentication = new Authentication();
    const email = 'teco@email.com';
    const password = 'password';

    authentication.goToLoginPage();

    authentication.fillInputs(email, password);

    authentication.submit();

    authentication.expectToBeRedirectedToDashboard();

    authentication.expectCookieToHaveBeenSet();
  });

  it('should logout the authenticated user', () => {
    const authentication = new Authentication();
    const dashboard = new Dashboard();
    const adminHeader = new AdminHeader();
    const website = new Website();

    authentication.loginUserAutomatically();

    dashboard.goToDashboard();

    cy.wait(1000);

    dashboard.expectDashboardPageToBeDisplayed();

    adminHeader.expectUsernameToMatch(currentUserData.name);

    adminHeader.toggleAccountMenu();

    adminHeader.clickOnLogoutMenuItem();

    cy.wait(1000);

    authentication.expectCookieToHaveBeenDestroyed();

    website.expectHomePageToBeDisplayed();
  });
});
