class EntityPlayer extends EntityWalking {

	constructor()
	{
		super();
		this.nextAction = [];
		this.battery = 3;
		this.canMove = true;

		this.canCombo = true;
		this.sprite = new PIXI.extras.AnimatedSprite([PIXI.Texture.fromFrame("j1_1.png")]);
		this.combo = [];
		
		Program.GetInstance().App().stage.addChild(this.sprite);
		
	}
	
	update(delta)
	{
		super.update(delta);
		while(this.nextAction.length > 0)
		{
			this.nextAction.shift().bind(this)();			
		}
	}
	
	destroy()
	{
		Program.GetInstance().App().stage.removeChild(this.sprite);
	}
	
	moveUp()
	{
		if(this.canMove)
		{
			this.vy = -Config.PlayerSpeed;
		}
	}
	
	moveDown()
	{
		if(this.canMove)
		{
			this.vy = +Config.PlayerSpeed;
		}
	}
	
	moveLeft()
	{
		if(this.canMove)
		{
			this.vx = -Config.PlayerSpeed;
		}
	}
	
	moveRight()
	{
		if(this.canMove)
		{
			this.vx = +Config.PlayerSpeed;
		}
	}
	
	button1()
	{
		if(this.canCombo)
		{
			this.addCombo(1);
		}
	}
	
	button2()
	{
		this.addCombo(2);
	}
	
	stopH()
	{
		this.vx = 0;
	}
	
	stopV()
	{
		this.vy = 0;
	}
	
	addCombo(c)
	{
		if(this.combo.length <3) // <3
		{
			this.combo.push(c);
			
			if(combo.length == 3)//combo atteint
			{
				
			}
		}
		else
		{
			
		}
	}
	
	
	
}