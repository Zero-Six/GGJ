class EntityPlayer extends EntityWalking {

	constructor(scene, file, x, y)
	{
		super(scene);

		this.file = file;

		this.initialX = x;
		this.initialY = y;

		this.seeKey = true;
		this.hasKey = false;

		this.dying = false;

		this.clearTimer = null;

		this.mass = 0.3;
		this.nextAction = [];
		this.battery = 1;

		this.speed = Config.PlayerSpeed;

		this.reversedControls = false;

		this.combo = [];
		this.canCombo = true;

		this.frames = [];
		for(let i = 1; i < 39; i++)
		{
			this.frames.push(PIXI.Texture.fromFrame(this.file+"_"+i+".png"));
		}
		
		this.switchSprite(this.frames);

		this.sprite1.hitarea = new Rectangle(7,18,7,0);
		this.sprite2.hitarea = new Rectangle(7,18,7,0);

		this.sprite1.x = x;
		this.sprite2.y = y;

		this.sprite1.play();
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

	dropKey()
	{
		if(this.hasKey)
		{
			let area = [];
			let i = 3;
			do {
				area = this.getArea(i);
				i++;
			}
			while(area == null || area.length <= 0);
			i = ~~(Math.random() * area.length);
			this.scene.changeMapCell(area[i].x, area[i].y, 9);
			this.hasKey = false;
		}
	}

	reset() 
	{
		if(this.dying == true)
			return;
		this.dying = true;
		this.canMove = false;
		this.canCombo = false;

		this.dropKey();

		let death = [];
		for(let i = 19; i < 24; i++)
		{
			death.push(PIXI.Texture.fromFrame(this.file+"_"+i+".png"));
		}

		this.switchSprite(death);

		this.sprite1.animationSpeed = 0.1;
		this.sprite2.animationSpeed = 0.1;
		this.sprite1.play();
		this.sprite2.play();
		this.sprite1.loop = false;
		this.sprite2.loop = false;

		this.solid = false;

		this.sprite1.onComplete = () => {

			this.dying = false;
			this.canMove = true;
			this.solid = true;
			this.canCombo = true;

			this.switchSprite(this.frames);

			this.sprite1.play();
			this.sprite2.play();

			this.sprite1.animationSpeed = 0.3;
			this.sprite2.animationSpeed = 0.3;

			this.sprite1.loop = true;
			this.sprite2.loop = true;

			this.sprite1.x = this.initialX;
			this.sprite1.y = this.initialY;

			this.scene.viewport1.addChild(this.sprite1);
			this.scene.viewport2.addChild(this.sprite2);
		}
	}

	hit(other)
    {
        if(other instanceof EntitySpikes)
        {
            other.reset();
        }
    }
	
	moveUp(check = true)
	{
		if(this.reversedControls && check == true)
		{
			this.moveDown(false);
			return;
		}
		this.nextAction.push(function(){
		if(this.canMove && this.vy <= 0 )
		{
				this.vy = -this.speed;
		}});
	}
	
	moveDown(check = true)
	{
		if(this.reversedControls && check == true)
		{
			this.moveUp(false);
			return;
		}
		this.nextAction.push(function(){
		if(this.canMove && this.vy >= 0)
		{
				this.vy = +this.speed;
		}});
	}
	
	moveLeft(check = true)
	{
		if(this.reversedControls && check == true)
		{
			this.moveRight(false);
			return;
		}
		this.nextAction.push(function(){
		if(this.canMove && this.vx <= 0)
		{
				this.vx = -this.speed;
		}});
	}
	
	moveRight(check = true)
	{
		if(this.reversedControls && check == true)
		{
			this.moveLeft(false);
			return;
		}
		this.nextAction.push(function(){
		if(this.canMove && this.vx >= 0)
		{
				this.vx = +this.speed;
		}});
	}
	
	button1()
	{
		if(this.canCombo)
		{
			createjs.Sound.play("Bip1");
			this.addCombo(1);
		}
	}
	
	button2()
	{
		if(this.canCombo)
		{
			createjs.Sound.play("Bip2");
			this.addCombo(2);
		};
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
		if(this.combo.length == 0)
		{
			this.clearTimer = setTimeout(() => {
				this.clearCombo(false);
			}, 3000);
		}
		if(this.combo.length <3) // <3
		{
			this.combo.push(c);
			this.canCombo = false;
			setTimeout(() => {
				this.canCombo = true;
			}, 150);
			//console.log(c);
			
			if(this.combo.length == 3)//combo atteint
			{
				clearTimeout(this.clearTimer);
				this.canCombo = false;
				this.battery -= Spells.checkSpell(this.scene, this, this.combo);
				setTimeout(() =>{this.clearCombo();}, 500);
			}
		}
	}

	clearCombo(sound = true)
	{
		this.canCombo = true;
		this.combo = [];
		if(sound)
			createjs.Sound.play("Send");

	}


	
	
	
}