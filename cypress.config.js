const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'adpeni',
  e2e: {
    baseUrl: 'https://www.selaski.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
    video: true,
    screenshotOnRunFailure: true
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true
  }
});