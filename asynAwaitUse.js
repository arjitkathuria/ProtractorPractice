
describe('data provider usage', ()=>{

    //----with async function----------------
    it('should use async await', async() =>{
         await browser.waitForAngularEnabled(false);
         await browser.manage().timeouts().implicitlyWait(3000);
         await browser.get('https://chercher.tech/protractor/handle-browser-windows-protractor');
         await browser.manage().window().maximize();
        let windowButton = element(by.id('two-window'));
        var parentWindow = await browser.getWindowHandle();
        await windowButton.click();
        var allHandlers = await browser.getAllWindowHandles();
         console.log(allHandlers);// it will print session id
        console.log(allHandlers.length); //it will print the length
        // it will switch to child window 
        await browser.switchTo().window(allHandlers[1]);
        console.log(await browser.getTitle());
        expect(await browser.getTitle()).toBe('Google')
        await browser.switchTo().window(parentWindow);
        console.log(await browser.getTitle());  
        // expect(await browser.getTitle()).toBe('Google')
            
    })

//----------------without async function------------
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


})