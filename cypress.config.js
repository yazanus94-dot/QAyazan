const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '5v5h42',
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
