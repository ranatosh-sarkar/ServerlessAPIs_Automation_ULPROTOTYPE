describe('✅ Smoke Test – GET /registers through ngrok', () => {
  it('returns 200 OK and an array', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_BASE_URL')}/UL_SavingsAccount-API_prototype/registers`,
      headers: {
        // skip ngrok’s interstitial “browser warning” page
        'ngrok-skip-browser-warning': 'true'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
    });
  });
});
