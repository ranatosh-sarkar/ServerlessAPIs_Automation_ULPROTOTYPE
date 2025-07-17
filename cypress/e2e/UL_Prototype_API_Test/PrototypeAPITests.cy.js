/// <reference types="cypress" />

describe('✅ Smoke Test – GET /registers through ngrok', () => {
  it('returns 200 OK and an array', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_BASE_URL')}/UL_SavingsAccount-API_prototype/registers`,
      failOnStatusCode: false,
      headers: {
        // ⬅️ mandatory for free-plan ngrok
        'ngrok-skip-browser-warning': 'true',
      },
      timeout: 90_000,
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an('array')
    })
  })
})
