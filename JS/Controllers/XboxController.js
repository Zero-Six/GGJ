class XboxController extends Controller 
{
    constructor(player)
    {
        super(player);
        this.gamepad = null;
        this.timer = null;
        let self = this;
        window.addEventListener("gamepadconnected", function(e) {
            console.log("Xbox connected");
            if(self.gamepad != null)
                return;
            e.stopImmediatePropagation();
            self.gamepad = navigator.getGamepads()[e.gamepad.index];
            self.timer = setInterval(function(){
                self.update();
            }, 100);

        });

        window.addEventListener("gamepaddisconnected", function(e) {
            console.log("Xbox disconnected");
            if(self.gamepad == null)
                return;
            e.stopImmediatePropagation();
            self.gamepad = null;
            self.cancel();
        });
    }

    update()
    {
        if(this.gamepad == null)
            return;
        this.gamepad.buttons.forEach(button => {
            if(button.pressed)
            {
            console.log("caca");
            console.log("prout");
            }
        });
    }

    left()
    {

    }

    right()
    {

    }

    up()
    {

    }

    down()
    {

    }

    action()
    {

    }

    cancel()
    {
        clearInterval(this.timer);
        this.timer = null;
    }
}