--- a/cypress/e2e/UL_Prototype_API_Test/PrototypeAPITests.cy.js
+++ b/cypress/e2e/UL_Prototype_API_Test/PrototypeAPITests.cy.js
@@ describe('✅ Smoke Test – GET /registers through ngrok', () => {
-    cy.request({
-      method: 'GET',
-      url: `${Cypress.config().baseUrl}/UL_SavingsAccount-API_prototype/registers`,
+    cy.request({
+      method: 'GET',
+      url: '/registers',
       headers: {
         'ngrok-skip-browser-warning': 'true'
       },
       timeout: 90_000,
       failOnStatusCode: false
     }).then((res) => {
       expect(res.status).to.eq(200);
       expect(res.body).to.be.an('array');
     });
