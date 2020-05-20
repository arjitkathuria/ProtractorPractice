var helper = require('../helper.js')

var HomePage = function() {

    var firstField = element(by.model('first'));
    var secondField = element(by.model('second'));
    var goButton = element(by.css('#gobutton'));
    var operation = element(by.model('operator'));

    this.add = function(num1, num2) {
        firstField.sendKeys(num1);
        secondField.sendKeys(num2);
        helper.selectDropdownbyNum(operation, 3)
        goButton.click(); 
    }

    this.calculate = function(num1, num2, operand){
        firstField.sendKeys(num1);
        secondField.sendKeys(num2);
        helper.selectDropdownbyNum(operation, operand)
        goButton.click(); 
    }

   
}

module.exports = new HomePage();