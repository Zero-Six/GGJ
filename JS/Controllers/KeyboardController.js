// TODO: ajouter gestion anglais 
class KeyboardController extends Controller {

    constructor(player, upcode, downcode, leftcode, rightcode, button1code, button2code) {
        super(player);
        this.timer = null;
        let left = this.left.bind(this);
        let right = this.right.bind(this);
        let up = this.up.bind(this);
        let down = this.down.bind(this);
        let button1 = this.button1.bind(this);
        let button2 = this.button2.bind(this);
        KeyboardController.keyboard(leftcode).press = () => {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.left();
            }, 20);
        };
        KeyboardController.keyboard(upcode).press = () => {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.up();
            }, 20);
        };
        KeyboardController.keyboard(rightcode).press = () => {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.right();
            }, 20);
        };
        KeyboardController.keyboard(downcode).press = () => {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.down();
            }, 20);
        };
        KeyboardController.keyboard(button1code).press = () => {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.button1();
            }, 20);
        };
        KeyboardController.keyboard(button2code).press = () => {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.button2();
            }, 20);
        };


        KeyboardController.keyboard(leftcode).release = () => {
            this.cancel();
        };
        KeyboardController.keyboard(upcode).release = () => {
            this.cancel();

        };
        KeyboardController.keyboard(rightcode).release = () => {
            this.cancel();

        };
        KeyboardController.keyboard(downcode).release = () => {
            this.cancel();

        };
        KeyboardController.keyboard(button1code).release = () => {
            this.cancel();

        };
        KeyboardController.keyboard(button2code).release = () => {
            this.cancel();

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
            if (event.keyCode === key.code) {
                if (key.isUp && key.press) key.press();
                key.isDown = true;
                key.isUp = false;
            }
            event.preventDefault();
        };

        //The `upHandler`
        key.upHandler = function (event) {
            if (event.keyCode === key.code) {
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
        clearInterval(this.timer);
        this.timer = null;
    }

}