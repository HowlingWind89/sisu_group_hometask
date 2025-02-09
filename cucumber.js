const glob = require('glob');

const stepDefinitionFiles = glob.sync('./src/step-definitions/**/*.ts');

let options = [
  './src/features/**/*.feature',
  '--require-module ts-node/register',
  ...stepDefinitionFiles.map(file => `--require ${file}`),
  '--format @cucumber/pretty-formatter',
  '--format json:./reports/cucumber_report.json',
].join(' ');

module.exports = {
  test_runner: options
};