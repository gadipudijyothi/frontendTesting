const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://gridedge.site/mlwfhoijanjfa',
    "defaultCommandTimeout": 80000,
  },
  
})
