var env = require('./env.js');
var using = require('jasmine-data-provider');
var homePage = require('./pages/HomePage')

describe('data provider usage', ()=>{

   //you can add this function somewher wlse also like testdat.js 
function dataProvider(){
    return[
        {a:2, b:3, c:1},
        {a:5, b:5, c:3}
    ]
}

    using(dataProvider, (data)=>{
        it('should use of data providers', ()=>{
            browser.get(env.baseUrl);
            homePage.calculate(data.a, data.b, data.c)
            browser.sleep(5000)
        })
    })

})