let options = [
	'./src/features/**/*.feature', // Path to feature files.
    '--require-module ts-node/register', // Load TypeScript module.
    '--require ./src/**/**/*.ts', // Path to step definitions.
    '--format @cucumber/pretty-formatter', // Load custom formatter.
    '--format json:./reports/cucumber_report.json', // Report formatting.
].join(' ');

module.exports = {
    test_runner: options
};