// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    overwrite: false,
    html: true,
    json: true,
    autoOpen: false,
    embeddedScreenshots: true,
    saveAllAttempts: false,
    quiet: true
  },
  defaultCommandTimeout: 90000,
  requestTimeout: 90000,
  e2e: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:8082/UL_SavingsAccount-API_prototype',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    }
  }
});
