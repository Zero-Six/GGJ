// TODO: ajouter gestion anglais 
class KeyboardController extends Controller {

    constructor(player, upcode, downcode, leftcode, rightcode, button1code, button2code)
	{
		super();
		this.press = 
		{
			right:false,
			left:false,
			up:false,
			down:false,
			button1:false,
			button2:false
		}
		
		this.delta = 20;
		
		this.code2but = {};
		
		this.code2but[upcode] = "up";
		this.code2but[downcode] = "down";
		this.code2but[rightcode] = "right";
		this.code2but[leftcode] = "left";
		this.code2but[button1code] = "button1";
		this.code2but[button2code] = "button2";
		
		this.stepping = false;
		
		window.addEventListener("keydown",this.keypress.bind(this),false);
		window.addEventListener("keyup",this.keyup.bind(this),false);
		
	}
	
	keyup(e)
	{
		var dir = this.code2but[e.keyCode];
		if(dir)
		{
			this.press[dir] = false;
			
			if(dir[0] == "b") // C'est un bouton !
			{
				this[dir]();
			}
		
		}
		// console.log(JSON.stringify(this.press))

	}
	
	keypress(e)
	{
		var dir = this.code2but[e.keyCode];
		// alert(dir)
		if(dir)
		{
			this.press[dir] = true;
			if(dir[0] != "b")
			{
				if(!this.stepping)
				{
					this.stepping = true;
					console.log("lancement step");
					this.step();
				}
				
			}
		}
			// console.log(JSON.stringify(this.press))

	}
	
	step()
	{
		console.log("STEP")
		// alert("step")
		// alert(JSON.stringify(this))
					
			// if(this.press.right == this.press.left )
			// {
				// this.press.right = this.press.left = false;
			// }
			
			// if(this.press.down == this.press.up)
			// {
				// this.press.down = this.press.up = false;
			// }
			
		
		// if([this.press.up,this.press.down,this.press.left,this.press.right].indexOf(true) != -1) //au moins un mouvement
		// {
			// alert("yep yep");

			
			
			for(var i in this.press)
			{
				var dir = this.press[i];
				if(i[0] != "b" && dir)
				{
					this.right();
				}
			}
			
			console.log(JSON.stringify(this));
			setTimeout(this.step.bind(this),this.delta);
				
		// }
		// else
		// {
			// this.stepping = false;
			// this.press.left = this.press.right = false;
			// this.press.down = this.press.up = false;
		// }
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