
var env = require('./env.js')//now we can use env.js file
var homePage = require('./pages/HomePage.js')//./ is currentt ../ is parent
var testData = require('./testData')
var using = require('jasmine-data-provider');

describe('Protractor Demo App', () => {

    var firstField = element(by.model('first'));
    var secondField = element(by.model('second'));
    var goButton = element(by.css('#gobutton'));


    //xit will skip running
    //fit will run that current


    xit('should have a title', () => {
        console.log(env.baseUrl+'======');
        
        browser.get(env.baseUrl);
        // browser.waitForAngular();//Protractor automatically applies this command before every WebDriver action.

        // var browser2 = browser.forkNewDriverInstance();
        // browser2.get('https://www.google.com')// it will open new instance with new url

        expect(browser.getTitle()).toEqual('Super Calculator');
    });

    xit('should have 2 textbox', () => {
        // browser.sleep(5000);
        firstField = element(by.model('first'));
        firstField.sendKeys('10');
        secondField.sendKeys('5');

        // browser.actions().dragAndDrop(firstField, secondField).perform();
        browser.actions().mouseMove(firstField);
   

        browser.actions().mouseDown(goButton).perform();
        browser.sleep(5000).then(()=>{
            console.log('waiting')
        })

        // goButton.click(); 
        //this is how we can print the count
        element.all(by.tagName('input')).count().then((count)=>{
            console.log(count) 
        })
        // browser.restart();
        // browser.get('https://www.google.com');//restart and open another url  

    })

    //-------------data providers in protractor-----------------------------

    //it will run 2 times because of data providers
    //for installtion of jasmine data provider npm i jasmine-data-provider

    using (testData.specData, (data)=>{ 
        fit('Add have 2 textbox', () => {
            browser.get('http://www.way2automation.com/angularjs-protractor/calc/')
            homePage.add(data.num1, data.num2);
            browser.sleep(5000).then(()=>{
                console.log(data.num1 + data.num2)
            });
    
        })
    })

});