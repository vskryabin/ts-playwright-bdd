console.log('Loading cucumber.cjs...');
require('dotenv/config');

module.exports = {
  default: {
    import: ['support/**/*.ts', 'steps/**/*.ts'],
    format: [
      'html:test-results/report.html',
      'json:test-results/report.json'
    ],
    paths: ['features/**/*.feature'],
    tags: '@quote1'
  }
};
