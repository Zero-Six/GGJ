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

            }
        });

        if(this.gamepad.axes[0] < -0.5 || this.gamepad.axes[2] < -0.5)
        {
            this.left();
        }
        else if(this.gamepad.axes[0] > 0.5 || this.gamepad.axes[2] > 0.5)
        {
            this.right();
        }

        if(this.gamepad.axes[1] < -0.5 || this.gamepad.axes[3] < -0.5)
        {
            this.up();
        }
        else if(this.gamepad.axes[1] > 0.5 || this.gamepad.axes[3] > 0.5)
        {
            this.down();
        }
    }

    left()
    {
        console.log("left");
    }

    right()
    {
        console.log("right");
    }

    up()
    {
        console.log("up");
    }

    down()
    {
        console.log("down");
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