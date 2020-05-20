var fs = require('fs');

describe('Non Angular Automation', () => {

    var EC = protractor.ExpectedConditions;

    beforeEach(() => {
        console.log('I am before each')
    })

    var googleTextBox = element(by.name('q'));
    var googleSearchButton = element(by.css("input[value='Google Search']"))

    xit('should work as expected', () => {
        browser.waitForAngularEnabled(false)
        browser.manage().timeouts().implicitlyWait(30000);
        browser.get('https://www.google.com');
        browser.manage().window().maximize();
        googleTextBox.sendKeys('hello')
        browser.sleep('5000').then(() => {
            console.log('waiting');
        })
    })

    xit('Mouse Operations', function () {  //xit it will be skip
        try {
            // set implicit time to 30 seconds
            browser.waitForAngularEnabled(false)
            browser.manage().timeouts().implicitlyWait(30000);
            browser.get("https://chercher.tech/practice/drag-and-drop-example")
            browser.get("https://chercher.tech/practice/popups")

            // mouse hover on a submenu
            browser.actions().mouseMove(element(by.id("sub-menu"))).perform();//mouse hover
            browser.actions().click(element(by.name('alert'))).click().perform();

            browser.actions().dragAndDrop(
                element(by.id("drag1")),
                element(by.id("div2"))
            ).perform();

            browser.actions().mouseDown(element(by.id("drag1")).getWebElement()).perform()
            browser.actions().mouseMove(element(by.id("div2")).getWebElement()).perform()
            browser.actions().mouseUp().perform()

            //-------------drag an drom mouse move up down not working ----------------------------------
            //-------------keys down up and mouse move(hover) working fine------------------

            browser.get("https://google.com")
            browser.actions()
                .click(element(by.name("q")))
                .keyDown(protractor.Key.SHIFT)
                .sendKeys("arjit")
                .keyUp(protractor.Key.SHIFT)
                .perform()

            browser.sleep(5000).then(() => {
                console.log('waiting');
            })

        }
        catch (err) {
            console.log('error');
        }
    });

    xit('should open different size and property', () => { //fit means only this will run not any other including(xit, it)
        browser.waitForAngularEnabled(false)
        browser.manage().timeouts().implicitlyWait(30000);
        browser.get('https://www.amazon.in/');
        // browser.manage().window().getSize().then((size) => {
        //     console.log(size.width);
        //     console.log(size.height);
        // })// it will print the size
        // browser.manage().window().setPosition(200, 300) //browser WILL OPEN AT THIS COORDINATE
        let list = element.all(by.css('#nav-xshop a'));
        // list.each((item, index)=>{
        //     item.getText().then((text) => {
        //         console.log(text + 'index is' + index)
        //     })
        // })
        //use index if required
        //-------each to validate all elements===========


        // map-------
        // let mapList = list.map((item, index) =>{
        //     return{index: index,
        //         text: item.getText()
        //     }
        // })

        expect(list.get(0).getText()).toEqual('Mobiles'); // equals check
        expect(list.get(0).isDisplayed()).toBeTruthy();//  true verification

        // list.get(0).getText().then((text) =>{
        //     console.log(text + '------')
        // })


        console.log(browser.params.login.user) // this is how we use param
        //------------javascript commands--------
        browser.sleep(2000).then(() => {
            browser.executeScript("window.scroll(0,5000)"); //scrolling by JS
        })
        browser.sleep(2000);


    });

    xit('should verify all type of alert', () => {
        browser.waitForAngularEnabled(false);
        browser.ignoreSynchronization = true;
        browser.manage().timeouts().implicitlyWait(30000);
        browser.get('https://chercher.tech/practice/practice-pop-ups-selenium-webdriver')
        browser.manage().window().maximize();
        let alert = element(by.name('confirmation'));
        alert.click();
        browser.switchTo().alert().accept();
        // browser.switchTo().alert().dismiss() //to dismiss

        // browser.get("https://selenium:webdriver@chercher.tech/auth");
        //this is how you can verify authentication pop up
        browser.sleep(5000);

        //dropdown see helper method


    });

    xit('should verify dropdowns', () => {
        browser.waitForAngularEnabled(false);
        browser.ignoreSynchronization = true;
        browser.manage().timeouts().implicitlyWait(30000);
        browser.get('https://chercher.tech/practice/frames')
        browser.manage().window().maximize();
        //dropdown

        // its a web element thats why getWebELement() is used else it will be elementFinder
        browser.switchTo().frame(element(by.id("frame1")).getWebElement());
        // set the value of the textbar to the value stored
        element(by.xpath("//input[@type='text']")).sendKeys('hello');
        element.all(by.tagName('iframe')).count().then((count) => {
            console.log(count)
        })
        //it will give count only the frame which are inside it
        browser.switchTo().defaultContent();

        element.all(by.tagName('iframe')).count().then((count) => {
            console.log(count)
        })
        //now it reach back to page level

        browser.sleep(2000);

    })

    xit('should handle window session', () => {

        browser.waitForAngularEnabled(false);
        browser.manage().timeouts().implicitlyWait(3000);
        browser.get('https://chercher.tech/protractor/handle-browser-windows-protractor');
        browser.manage().window().maximize();
        let windowButton = element(by.id('two-window'));
        windowButton.click();//it will open new window now it has to session
        browser.getAllWindowHandles().then((allWindow) => {
            console.log(allWindow.length);

        })

        browser.sleep(5000);

    })

    xit('should handle multiple window session', () => {

        browser.waitForAngularEnabled(false);
        browser.manage().timeouts().implicitlyWait(3000);
        browser.get('https://chercher.tech/protractor/handle-browser-windows-protractor');
        browser.manage().window().maximize();
        let windowButton = element(by.id('two-window'));
        browser.getWindowHandle().then((parentWindow) => {
            //EC for element to be visible
            browser.wait(EC.visibilityOf(windowButton), 5000)
            windowButton.click();
            browser.getAllWindowHandles().then((allWindow) => {
                console.log(allWindow.length);
                for (let handle of allWindow) {
                    browser.switchTo().window(handle);
                    browser.getTitle().then(function (title) {
                        if (title == "Google") {
                            //not of expected conditions
                            browser.wait(EC.not(EC.titleIs('ParentTitle')), 5000);
//-------------expected conditions----------------------------------
                            //and and not of expected conditions
                            browser.wait(EC.and(EC.not(EC.titleIs('ParentTitle')), EC.titleContains('Google')))

                            element(by.name("q")).sendKeys("gates");
                            browser.getTitle().then((title) => {
                                console.log('Title is ' + title)
                            })
                        }
                    })
                }
            })
            browser.switchTo().window(parentWindow);//switching back to parent window
        })

        browser.getTitle().then((title) => {
            console.log('Title is ' + title)
            throw new Error('oops');
        }).catch((err) => {
            console.log(err.name)
        })
        //this how to catch errorbrowser.getTitle().then((titler) => {
        browser.sleep(5000);
    })

    xit('should take screenshot', () => {

        browser.waitForAngularEnabled(false);
        browser.manage().timeouts().implicitlyWait(3000);
        browser.get('https://chercher.tech/protractor/handle-browser-windows-protractor');
        browser.takeScreenshot().then((png) => {
            var stream = fs.createWriteStream('./screenshots/error.png');
            stream.write(new Buffer(png, 'base64'));
            stream.end();
        });
        browser.sleep(5000);

    })

    //-------it's a async function now you can use await

    fit('should take screenshot', async () => {

        await browser.waitForAngularEnabled(false);
        await browser.manage().timeouts().implicitlyWait(3000);
        await browser.get('https://chercher.tech/protractor/handle-browser-windows-protractor');
        await browser.sleep(5000);
        console.log('hiiiiiiiiii')
        //all will run in sync now

    })
})

