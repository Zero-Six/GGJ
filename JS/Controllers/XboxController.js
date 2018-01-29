class XboxController extends Controller 
{
    constructor(player)
    {
        super(player);
        this.gamepad = null;

        Program.GetInstance().App().ticker.add((delta) => {
            this.update();
        });

        let self = this;
        window.addEventListener("gamepadconnected", function(e) {
            console.log("Xbox connected");
            if(self.gamepad != null)
                return;
            e.stopImmediatePropagation();
            self.gamepad = navigator.getGamepads()[e.gamepad.index];
        });

        window.addEventListener("gamepaddisconnected", function(e) {
            console.log("Xbox disconnected");
            if(self.gamepad == null)
                return;
            e.stopImmediatePropagation();
            self.gamepad = null;
        });
    }

    update()
    {
        if(this.gamepad == null)
            return;
    
        for(let i = 0; i < this.gamepad.buttons.length; i++)
        {
            if(this.gamepad.buttons[i].pressed)
            {
                switch(i)
                {
                    case 6:
                    case 0:
                    case 4:
                    case 2:
                        this.button1();
                    break;
                    case 7:
                    case 1:
                    case 5:
                    case 3:
                        this.button2();
                    break;

                }
            }
        }

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