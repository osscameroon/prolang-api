/// <reference types="cypress" />

import { Website } from '@cypress/models/website';

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

  it.only('should display page for not found url', () => {
    const website = new Website();

    website.notFound.navigateToUnknownPage();

    website.notFound.expectNotFoundPageToBeDisplayed();

    website.notFound.goBackToHomePage();

    website.expectHomePageToBeDisplayed();
  });

  // it('should maintenance website', () => {});
  // it('should redirect unauthenticated user to home page', () => {});
});