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

		this.sightMalus = 1;
		this.shaking = false;
		this.bluring = true;

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

		this.x = x;
		this.y = y;

		this.sprite1.play();
		this.sprite2.play();

	}

	blur(duration)
	{
		this.bluring = true;
		setTimeout(() => {
			this.bluring = false;
		}, duration);	
	}

	shake(duration)
	{
		this.shaking = true;
		setTimeout(() => {
			this.shaking = false;
		}, duration);
	}

	preupdate(delta)
	{
		super.preupdate(delta);
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

		let u = Math.floor(Math.random() * 5) + 1;
		createjs.Sound.play("Fall_0"+u);

		ParticleEmitter.create(this.scene, PIXI.Texture.fromFrame(this.file+"_1.png"), {
			x: this.x,
            y: this.y,
            life: 10,
            particleLife: 10,
            particleSpeed: 5,
            angleMax: 360,
            sizeRandom: true,
			sizeMax: 1
		});

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

			this.x = this.initialX;
			this.y = this.initialY;

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
		if(this.canMove)
		{
			if(this.vy < Config.PlayerMaxSpeed*-1)
				return;
				this.vy -= this.speed;
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
		if(this.canMove)
		{
			if(this.vy > Config.PlayerMaxSpeed)
				return;
				this.vy += this.speed;
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
		if(this.canMove)
		{
				if(this.vx < Config.PlayerMaxSpeed*-1)
					return;
				this.vx -= this.speed;
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
		if(this.canMove)
		{
			if(this.vx > Config.PlayerMaxSpeed)
				return;
				this.vx += this.speed;
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
				this.clearCombo();
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

	clearCombo()
	{
		this.canCombo = true;
		this.combo = [];
	}


	
	
	
}