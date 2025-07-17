/// <reference types="cypress" />

describe('✅ Smoke Test – GET /registers through ngrok', () => {
  it('returns 200 OK and an array', () => {
    cy.request({
      method: 'GET',
      // full path via env var
      url: `${Cypress.env('API_BASE_URL')}/UL_SavingsAccount-API_prototype/registers`,
      timeout: 90_000,               // wait up to 90s
      failOnStatusCode: false,       // don’t fail on non-2xx automatically
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an('array')
    })
  })
})
