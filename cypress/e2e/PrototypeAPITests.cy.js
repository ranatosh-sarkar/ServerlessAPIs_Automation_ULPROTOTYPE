// cypress/e2e/UL_Prototype_API_Test/PrototypeAPITests.cy.js
/// <reference types="cypress" />

describe('✅ Smoke Test – GET /registers through ngrok', () => {
  it('returns 200 OK and an array', () => {
    // fallback: if the env var is missing, use cypress.config().baseUrl
    const base =
      Cypress.env('API_BASE_URL') || Cypress.config().baseUrl || '';

    cy.request({
      method: 'GET',
      url: `${base}/UL_SavingsAccount-API_prototype/registers`,
      headers: {
        // required on free-plan ngrok tunnels
        'ngrok-skip-browser-warning': 'true'
      },
      timeout: 90_000,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
    });
  });
});
