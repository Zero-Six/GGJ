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
			var t1x = (x/(Config.MapWidth))%1 == 0;
			var t1y = (y/(Config.MapHeight))%1 == 0;
			var t2x = (x/(Config.MapWidth-1))%1 == 0;
			var t2y = (x/(Config.MapHeight-1))%1 == 0;
			
			if(t1x && t1y)d=0;
			else if(t2x && t1y)d=1;
			else if(t1x && t2y)d=3;
			else if(t2x && t2y)d=2;
			else
			{
				
			}
			
			return "wall_"+0
			
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
		sprite:"ground_0",
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