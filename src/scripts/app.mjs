
import 'bootstrap';
import {AlertMessage } from "./alert_msg.mjs";
{
    
//      window.location.replace("app.html");
console.log("app");
function component() {
      var element = document.createElement('div');
      element.id = "test1";
      let msg = new AlertMessage();
      msg.show(element,AlertMessage.ALERT_CATEGORY.SUCCESS,{"detail":"hello"});

     
       
      return element;
    }
document.body.appendChild(component());


}