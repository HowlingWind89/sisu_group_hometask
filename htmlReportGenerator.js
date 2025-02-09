const reporter = require('cucumber-html-reporter');
var date = new Date ();
var currentDate = date.getDate() + '_' + (date.getMonth()+1) + '_' + date.getFullYear() + '_' + 
                        date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '_' + date.getMilliseconds();

var options = {
    theme: 'bootstrap',
    jsonFile: 'reports/cucumber_report.json',
    output: 'reports/cucumber_report_' + currentDate + '.html',
    screenshotsDirectory: './screenshots/',
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    launchReport: false,
};

reporter.generate(options);