// ***********************************************
// This example commands.js shows you how to create various
// custom commands and overwrite existing commands.
//
// For more comprehensive examples of custom commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import 'cypress-localstorage-commands';

Cypress.Commands.add('closeReactQueryWindow', () => {
  return cy.setLocalStorage('reactQueryDevtoolsOpen', 'false');
});
