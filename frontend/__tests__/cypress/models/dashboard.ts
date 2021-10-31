class Dashboard {
  goToDashboard() {
    cy.visit('/dashboard');
  }

  expectDashboardPageToBeDisplayed() {
    cy.url().should('include', '/dashboard');
  }
}

export { Dashboard };
