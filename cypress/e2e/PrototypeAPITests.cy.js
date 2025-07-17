/// <reference types="cypress" />

describe('✅ Smoke Test – GET /registers through ngrok', () => {
  it('returns 200 OK and an array', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_BASE_URL')}/UL_SavingsAccount-API_prototype/registers`,
      timeout: 90000,
      failOnStatusCode: false,
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an('array')
    })
  })
})
