// TODO: ajouter gestion anglais 
class KeyboardController extends Controller {

    constructor(player, upcode, downcode, leftcode, rightcode, button1code, button2code) {
        super(player);

        this.arrowHandler = null;
        this.buttonHandler = null;

        Program.GetInstance().App().ticker.add((delta) => {
            if(this.arrowHandler != null)
            {
                this.arrowHandler();
                //this.arrowHandler = null;
            }
            if(this.buttonHandler != null)
                this.buttonHandler();
        });
		
		
        KeyboardController.keyboard(leftcode).press = () => {
            this.arrowHandler = this.left;
        };
        KeyboardController.keyboard(upcode).press = () => {
            this.arrowHandler = this.up;
        };
        KeyboardController.keyboard(rightcode).press = () => {
            this.arrowHandler = this.right;
        };
        KeyboardController.keyboard(downcode).press = () => {
            this.arrowHandler = this.down;
        };
        KeyboardController.keyboard(button1code).press = () => {
            this.buttonHandler = this.button1;
        };
        KeyboardController.keyboard(button2code).press = () => {
            this.buttonHandler = this.button2;
        };


        KeyboardController.keyboard(leftcode).release = () => {
            this.arrowHandler = null;
        };
        KeyboardController.keyboard(upcode).release = () => {
            this.arrowHandler = null;
        };
        KeyboardController.keyboard(rightcode).release = () => {
            this.arrowHandler = null;
        };
        KeyboardController.keyboard(downcode).release = () => {
            this.arrowHandler = null;
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
}
