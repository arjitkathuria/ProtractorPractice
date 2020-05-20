var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
exports.config = {
    framework: 'jasmine',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    specs: ['asynAwaitUse.js'],
    capabilities: {
        browserName: 'chrome',//by default is chrome
        // chromeOptions: {
        //     args: [ "--headless", "--disable-gpu" ] //for headless
        //   }
    },
    params: {
        login: {
            user: 'arjit' //we can change it like --params.login.user "Kathuria"
        }
    },
    //   getPageTimeout: 1000,
    //   allScriptsTimeout: 20000

    onPrepare: function () {
        browser.manage().window().maximize();
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: 'screenshots',
                // takeScreenshots: true,//it will take screenshot for all the it blocks
                takeScreenshotsOnlyOnFailures: true //will take screenshot on failled steps
            })
        );
    }

}
