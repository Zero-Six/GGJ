class EntityPlayer extends EntityWalking {

	constructor(file)
	{
		super();
		this.mass = 0.3;
		this.nextAction = [];
		this.battery = 3;
		this.canMove = true;

		this.combo = [];
		this.canCombo = true;

		let frames = [];
		for(let i = 1; i < 27; i++)
		{
			frames.push(PIXI.Texture.fromFrame(file+"_"+i+".png"));
		}
		this.sprite1 = new PIXI.extras.AnimatedSprite(frames);
		this.sprite1.x = 0;
		this.sprite1.y = 0;
		this.sprite1.anchor.set(0.5);

		this.sprite1.animationSpeed = 0.3;
        //this.sprite.scale.set(1.5,1.5);
		this.sprite1.play();

		this.sprite2 = new PIXI.extras.AnimatedSprite(frames);
		this.sprite2.x = 0;
		this.sprite2.y = 0;
		this.sprite2.anchor.set(0.5);

		this.sprite2.animationSpeed = 0.3;
        //this.sprite.scale.set(1.5,1.5);
		this.sprite2.play();
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