// TODO: ajouter gestion anglais 
class KeyboardController extends Controller {

    constructor(player, upcode, downcode, leftcode, rightcode, button1code, button2code) {
        super(player);

        this.arrowHHandler = null;
        this.arrowVHandler = null;
        this.buttonHandler = null;

        Program.GetInstance().App().ticker.add((delta) => {
            if(this.arrowVHandler != null)
            {
                this.arrowVHandler();
                //this.arrowHandler = null;
            }
            if(this.arrowHHandler != null)
            {
                this.arrowHHandler();
                //this.arrowHandler = null;
            }
            if(this.buttonHandler != null)
                this.buttonHandler();
        });
		
		
        KeyboardController.keyboard(leftcode).press = () => {
            this.arrowHHandler = this.left;
        };
        KeyboardController.keyboard(upcode).press = () => {
            this.arrowVHandler = this.up;
        };
        KeyboardController.keyboard(rightcode).press = () => {
            this.arrowHHandler = this.right;
        };
        KeyboardController.keyboard(downcode).press = () => {
            this.arrowVHandler = this.down;
        };
        KeyboardController.keyboard(button1code).press = () => {
            this.buttonHandler = this.button1;
        };
        KeyboardController.keyboard(button2code).press = () => {
            this.buttonHandler = this.button2;
        };


        KeyboardController.keyboard(leftcode).release = () => {
            this.arrowHHandler = null;
        };
        KeyboardController.keyboard(upcode).release = () => {
            this.arrowVHandler = null;
        };
        KeyboardController.keyboard(rightcode).release = () => {
            this.arrowHHandler = null;
        };
        KeyboardController.keyboard(downcode).release = () => {
            this.arrowVHandler = null;
        };
        KeyboardController.keyboard(button1code).release = () => {
            this.buttonHandler = null;
        };
        KeyboardController.keyboard(button2code).release = () => {
            this.buttonHandler = null;
        };

    }

    static keyboard(keyCode) {
        var key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        //The `downHandler`
        key.downHandler = function (event) {
            if (event.code === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = function (event) {
            if (event.code === key.code) {
                if (key.isDown && key.release) key.release();
                key.isDown = false;
                key.isUp = true;
            }
            event.preventDefault();
        };

        //Attach event listeners
        window.addEventListener(
            "keydown", key.downHandler.bind(key), false
        );
        window.addEventListener(
            "keyup", key.upHandler.bind(key), false
        );
        return key;
    }

    left() {
        this.player.moveLeft();
    }

    right() {
        this.player.moveRight();        
    }

    up() {
        this.player.moveUp();        
    }

    down() {
        this.player.moveDown();                
    }

    button1()
    {
        this.player.button1();                
    }

    button2()
    {
        this.player.button2();                
    }

    cancel()
    {
        this.arrowHHandler = null;
        this.arrowVHandler = null;
    }
}
