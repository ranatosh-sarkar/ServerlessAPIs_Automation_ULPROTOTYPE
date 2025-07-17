/// <reference types="cypress" />

describe('✅ Smoke Test – GET /registers through ngrok', () => {
  it('returns 200 OK and an array', () => {
    cy.request({
      method: 'GET',
      url: '/registers',               // relative to e2e.baseUrl
      headers: { 'ngrok-skip-browser-warning': 'true' },
      failOnStatusCode: false,
      timeout: 90_000
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.be.an('array')
    })
  })
})
