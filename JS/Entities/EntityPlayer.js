class EntityPlayer extends EntityWalking {

	constructor()
	{
		super();
		this.battery = 3;
		this.nextAction = null;
		this.canMove = true;

		this.canCombo = true;
		this.sprite = PIXI.Texture.fromFrame("j1_1.png");
		this.combo = [];
		
		Program.GetInstance().App().stage.addChild(this.sprite);
		
	}
	
	update(delta)
	{
		while(this.nextAction.length > 0)
		{
			this.nextAction.shift().bind(this)();			
		}
	}
	
	destroy()
	{
		Program.GetInstance().App().stage.removeChild(this.sprite);
	}
	
	up()
	{
		if(this.canWalk)
		{
			this.vy = -Config.PlayerSpeed;
		}
	}
	
	down()
	{
		if(this.canWalk)
		{
			this.vy = +Config.PlayerSpeed;
		}
	}
	
	left()
	{
		if(this.canWalk)
		{
			this.vx = -Config.PlayerSpeed;
		}
	}
	
	left()
	{
		if(this.canWalk)
		{
			this.vy = +Config.PlayerSpeed;
		}
	}
	
	action1()
	{
		if(this.canCombo)
		{
			this.addCombo(1);
		}
	}
	
	action2()
	{
		this.addCombo(2);
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