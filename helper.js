var helper = function(){

    //utility class following page object model

    //find all the elmenet from the option and then use as per the number
 
    this.selectDropdownbyNum = function ( element, optionNum ) {
        if (optionNum){
          var options = element.all(by.tagName('option'))   
            .then(function(options){
              options[optionNum].click();
            });
        }
      }
    };



    module.exports = new helper();