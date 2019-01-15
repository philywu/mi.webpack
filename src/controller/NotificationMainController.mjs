import GLOBAL from '../scripts/constants.mjs';
import {BaseController} from "./BaseController.mjs";

class NotificationMainController extends BaseController {
    constructor(args) {
        super(args);

    }
    //init happend only when bind to page
    init(app) {
        console.log("notification");
        super.init(app);
        this.registerEvent();
    }

   
    registerEvent() {
        //bind this
        
    }



}
export {NotificationMainController};