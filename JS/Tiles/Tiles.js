let Tiles = 
{
	
	0 : {
		name:"ground",
		solid : false,
		sprite:"ground_0",
		
	}, 
	
	1 : {
		name:"wall",
		solid : true,
		spriteGen:function(x,y,grid)
		{
			var d = 0;
			var t1x = (x/(Config.MapSize-1))%1 == 0;
			var t1y = (y/(Config.MapSize-1))%1 == 0;
			var t2x = (x/(Config.MapSize-2))%1 == 0;
			var t2y = (y/(Config.MapSize-2))%1 == 0;
			
			if(t1x && t1y)d=1;
			else if(t2x && t1y)d=2;
			else if(t2x && t2y)d=3;
			else if(t1x && t2y)d=4;
			else
			{
				if(t1x)d=4;
				else if(t2x)d=5;
				else if(t2y)d=6;
				else if(t1y)d=7;
			}
			
			return "wall_"+(d||20)
			
		},
		
	}, 
	
	2 : {
		name:"ice",
		solid : false,
		sprite:"ground_1",
	}, 
	
	3 : {
		name:"lava",
		solid : false,
		spriteAnim:function(x,y)
		{
			
			var anim = new PIXI.extras.AnimatedSprite([
			PIXI.Texture.fromFrame("lava_1.png"),
			PIXI.Texture.fromFrame("lava_2.png"),
			PIXI.Texture.fromFrame("lava_3.png"),
			PIXI.Texture.fromFrame("lava_4.png")
			]);
			anim.animationSpeed = 0.1;
			anim.x = x*32;
			anim.y = y*32;
			anim.play();
			return anim
		}
	}, 
	
	
	4: {
		name:"spikes",
		solid: false,
		sprite: "ground_0",
		activated:false
		
	},
	
	
	5 : {
		name:"bumper",
		solid : false,
		sprite:"ground_0",
	},
	
	
	6 : {
		name:"magnet",
		solid : true,
		sprite:"ground_0",
	},
	
	
	7 : {
		name:"bow",
		solid : true,
		sprite:"ground_0",
	}, 
	
	
	8 : {
		name:"mine",
		solid : false,
		sprite:"ground_0",
	}, 
	
	
	9 : {
		name:"key",
		solid : false,
		sprite:"ground_0",
	},

	
	10 : {
		name:"door",
		solid : false,
		sprite:"ground_0",
	},
	
	
	11 : {
		name:"pickup",
		solid : false,
		sprite:"ground_0",
	},
	
	
	12 : {
		name:"spawn",
		solid : false,
		sprite:"ground_0",
	}, 
	
	
	
}