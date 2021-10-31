/// <reference types="cypress" />

// ***********************************************************
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to close React query window.
       * @example cy.closeReactQueryWindow()
       */
      closeReactQueryWindow(): Chainable<void>
    }
  }
}

// Import commands.js using ES2015 syntax:
import './commands';
