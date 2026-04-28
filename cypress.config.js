const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '5v5h42',
  e2e: {
    baseUrl: "https://automationexercise.com",
  },
});