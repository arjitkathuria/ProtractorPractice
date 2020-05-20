// npm i protractor-html-reporter-2
// npm i jasmine-reporters
// npm i fs-extra
//npm installation for html reported 2

var { SpecReporter } = require('jasmine-spec-reporter');
var jasmineReporters = require('jasmine-reporters');

var reportsDirectory = './reports';
var dashboardReportDirectory = reportsDirectory + '/dashboardReport';

exports.config = {
    directConnect: true,
    specs: ['asynAwaitUse.js'],

    onPrepare: function () {

        //----------------for terminal rteadability--------------
        //console logs configurations
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'all',      // display stacktrace for each failed assertion, values: (all|specs|summary|none) 
            displaySuccessesSummary: false, // display summary of all successes after execution 
            displayFailuresSummary: true,   // display summary of all failures after execution 
            displayPendingSummary: true,    // display summary of all pending specs after execution 
            displaySuccessfulSpec: true,    // display each successful spec 
            displayFailedSpec: true,        // display each failed spec 
            displayPendingSpec: false,      // display each pending spec 
            displaySpecDuration: false,     // display each spec duration 
            displaySuiteNumber: false,      // display each suite number (hierarchical) 
            colors: {
                success: 'green',
                failure: 'red',
                pending: 'yellow'
            },
            prefixes: {
                success: '✓ ',
                failure: '✗ ',
                pending: '* '
            },
            customProcessors: []
        }));

        //------------------for better reporting----------------
                // xml report generated for dashboard
                jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                    consolidateAll: true,
                    savePath: reportsDirectory + '/xml',
                    filePrefix: 'xmlOutput'
                }));
        
                var fs = require('fs-extra');
                if (!fs.existsSync(dashboardReportDirectory)) {
                    fs.mkdirSync(dashboardReportDirectory);
                }
        
                jasmine.getEnv().addReporter({
                    specDone: function (result) {
                        if (result.status == 'failed') {
                            browser.getCapabilities().then(function (caps) {
                                var browserName = caps.get('browserName');  
                                browser.takeScreenshot().then(function (png) {
                                    var stream = fs.createWriteStream(dashboardReportDirectory + '/' + browserName + '-' + result.fullName + '.png');
                                    stream.write(new Buffer(png, 'base64'));
                                    stream.end();
                                });
                            });
                        }
                    }
                });
    },

    //------------for better reportring-------------------
    onComplete: function () {
        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');

            var HTMLReport = require('protractor-html-reporter-2');
            testConfig = {
                reportTitle: 'Protractor Test Execution Report',
                outputPath: dashboardReportDirectory,
                outputFilename: 'index',
                screenshotPath: './',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            new HTMLReport().from(reportsDirectory + '/xml/xmlOutput.xml', testConfig);
        });
    }
};