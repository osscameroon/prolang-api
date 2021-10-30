/// <reference types="cypress" />

import { Website } from '@cypress/models/Website';

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

  it('should navigate to the website', () => {
    const website = new Website();

    website.expectHomePageToBeDisplayed();

    website.navigateToDocumentationPage();

    website.navigateToPlaygroundPage();

    website.navigateToHomePage();
  });

  // it('should 404', () => {});
  // it('should maintenance website', () => {});
  // it('should redirect unauthenticated user to home page', () => {});
});