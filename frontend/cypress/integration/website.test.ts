/// <reference types="cypress" />

import { Website } from '@cypress/models/website';
import { cySelector } from '@cypress/models/utils';

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

  it.only('should maintenance website', () => {
    cy.window().then(window => {
      // @ts-ignore
      const { worker, rest } = window.msw;

      worker.use(
        // @ts-ignore
        rest.get('http://localhost:5700/api/health', (_req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({})
          );
        })
      );
    });
    cy.wait(500);
    cy.get('h2').contains('Maintenance in progress...');
    cy.get(cySelector('lnk-email'))
      .should('have.attr', 'href', 'mailto:tericcabel@yahoo.com?subject=Prolang website down')
      .contains('Contact the admin');
  });

  // it('should redirect unauthenticated user to home page', () => {});
});