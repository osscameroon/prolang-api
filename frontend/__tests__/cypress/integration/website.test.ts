/// <reference types="cypress" />
import { Website } from '../models/website';
import { mockHealthCheckRequestToReturnBadStatus } from '../support/utils';

context('Navigate on the website', () => {
  before(() => {
    cy.clearLocalStorageSnapshot();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.closeReactQueryWindow();
    cy.saveLocalStorage();

    cy.visit('/');
  });

  it('should navigate on the website pages', () => {
    const website = new Website();

    website.expectHomePageToBeDisplayed();

    website.navigateToDocumentationPage();

    website.navigateToPlaygroundPage();

    website.navigateToHomePage();
  });

  it('should display page for not found url', () => {
    const website = new Website();

    website.notFound.navigateToUnknownPage();

    website.notFound.expectNotFoundPageToBeDisplayed();

    website.notFound.goBackToHomePage();

    website.expectHomePageToBeDisplayed();
  });

  it('should maintenance website', () => {
    const website = new Website();

    mockHealthCheckRequestToReturnBadStatus();

    cy.wait(1000);

    website.maintenance.expectMaintenancePageToBeDisplayed();
    website.maintenance.expectButtonToAdminVisible();
  });

  it('should redirect unauthenticated user to home page', () => {
    const website = new Website();

    website.goToDashboard();
    website.expectHomePageToBeDisplayed();
  });
});
