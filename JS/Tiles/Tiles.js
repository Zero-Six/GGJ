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
			
			var tx1 = (x%Config.MapSize) == 0;
			var tx2 = ((x+1)%(Config.MapSize)) == 0;
			
			var ty1 = (y%Config.MapSize) == 0;
			var ty2 = ((y+1)%(Config.MapSize)) == 0;
			
			
			if(tx1 && ty1)
			{
				d = 1;
			}
			else if(tx2 && ty1)
			{
				d = 2;
			}
			else if(tx2 && ty2)
			{
				d = 3;
			}
			else if(tx1 && ty2)
			{
				d = 4;
			}
			else
			{
				var r = motif(x,y); //Texture pseudo-random
				if(tx1) d = 5+r*4;
				else if(tx2) d = 6+r*4;
				else if(ty1) d = 8+r*4;
				else if(ty2) d = 7+r*4;
			
			}
			
		
			
			if(d != 0)return "wall_"+d;
			return "ground_6";
			
		}
		// sprite:"ground_6"
		
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
		sprite: "ground_2",
		activated:false
		
	},
	
	
	5 : {
		name:"bumper",
		solid : false,
		sprite : "ground_0"
	},
	
	
	6 : {
		name:"magnet",
		solid : true,
		spriteAnim:function(x,y)
		{
			
			var anim = new PIXI.extras.AnimatedSprite([
			PIXI.Texture.fromFrame("tourbillon_1.png"),
			PIXI.Texture.fromFrame("tourbillon_2.png"),
			PIXI.Texture.fromFrame("tourbillon_3.png"),
			PIXI.Texture.fromFrame("tourbillon_4.png")
			]);
			anim.animationSpeed = 0.1;
			anim.x = x*32;
			anim.y = y*32;
			anim.play();
			return anim
		}
	},
	
	
	7 : {
		name:"bow",
		solid : true,
		sprite:"ground_5",
	}, 
	
	
	8 : {
		name:"mine",
		solid : false,
		sprite : 'ground_0',
	}, 
	
	
	9 : {
		name:"key",
		solid : false,
		sprite:"ground_4",
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
		spriteAnim:function(x,y)
		{
			
			var anim = new PIXI.extras.AnimatedSprite([
			PIXI.Texture.fromFrame("level-batterie_1.png"),
			PIXI.Texture.fromFrame("level-batterie_2.png"),
			PIXI.Texture.fromFrame("level-batterie_3.png"),
			PIXI.Texture.fromFrame("level-batterie_4.png")
			]);
			anim.animationSpeed = 0.1;
			anim.x = x*32;
			anim.y = y*32;
			anim.play();
			return anim
		}
	},
	
	
	12 : {
		name:"spawn",
		solid : false,
		sprite:"ground_3",
	}, 

	13 : {
		name:"spawn",
		solid : false,
		sprite:"ground_3",
	}, 
	
	
	
}

function motif(x,y) // Entre 0 et 3
{
	var s = (x+y*y+x)%8;
	if(s > 3)return 0;
	return s;
	
}

