/**
 * Created by clovis on 29/08/17.
 */
class HelperPlayer
{
    static CheckPlayerTile(map, entity)
    {

            let x = Math.floor((entity.sprite1.x + entity.sprite1.width /2) / Config.TileSize);
			let y = Math.floor((entity.sprite1.y + entity.sprite1.height/1.5) / Config.TileSize);
            if(map.grid[Math.floor(x)] == null || map.grid[Math.floor(x)][Math.floor(y)] == null)
                return;
            let cell = Tiles[map.grid[Math.floor(x)][Math.floor(y)]];
            if(cell == null)
                return;
            
            HelperPlayer.CheckLava(map, entity, x, y, cell);
            HelperPlayer.CheckKey(map, entity, x, y, cell);

            HelperPlayer.CheckIce(map, entity, x, y, cell);
            HelperPlayer.CheckSpawn(map, entity, x, y, cell);
            
            HelperPlayer.CheckGround(map, entity, x, y, cell);
			
			HelperPlayer.CheckMagnet(map,entity,x,y,cell);
			HelperPlayer.CheckPickup(map,entity,x,y,cell);
			
        
    }

   

    /*static CheckSpikes(map, entity,x,y, cell)
    {
        if(cell.name != "spikes" || cell.activated == false)
            return;
        let spikes = new EntitySpikes(entity.scene, x * Config.TileSize, y * Config.TileSize);
        entity.reset();
    }*/

    static CheckPickup(map, entity, x, y, cell)
    {
        if(cell.name != "pickup")
            return;
        if(entity.battery >= 3)
        {
            return;
        }
        entity.battery+=2;
        if(entity.battery > 3)
            entity.battery = 3;
        createjs.Sound.play("Key");
        entity.scene.changeMapCell(x,y, 0);
    }

    static CheckSpawn(map, entity, x, y, cell)
    {
        if(cell.name != "spawn" || entity.solid == false)
            return;
        if(entity.hasKey == true)
        {
            if(map.grid[x][y] == 12 && entity == entity.scene.player1)
            {
                alert("Le joueur 1 a gagné ! Yay !");
                window.href.reload();
            }
            else if(map.grid[x][y] == 13 && entity == entity.scene.player2)
            {
                alert("Le joueur 2 a gagné ! Yay !");
                window.href.reload();
            }
        }
    }

    static CheckKey(map, entity,x,y, cell)
    {
        if(cell.name != "key" || entity.solid == false)
            return;
        entity.hasKey = true;
        createjs.Sound.play("Key");
        entity.scene.changeMapCell(x,y, 0);
    }    

	static CheckLava(map, entity,x,y, cell)
    {
        if(cell.name != "lava" || entity.solid == false)
            return;
        setTimeout(() => {
            let x = Math.floor((entity.sprite1.x + entity.sprite1.width /2) / Config.TileSize);
			let y = Math.floor((entity.sprite1.y + entity.sprite1.height/1.8) / Config.TileSize);
            if(map.grid[Math.floor(x)] == null || map.grid[Math.floor(x)][Math.floor(y)] == null)
                return;
            let cell = Tiles[map.grid[Math.floor(x)][Math.floor(y)]];
            if(cell == null)
                return;
            if(cell.name == "lava" && entity.dying == false)
            {
                createjs.Sound.play("Lava");
                entity.reset();
            }
        }, 100);
    }    
    

	static CheckIce(map, entity,x,y, cell)
    {
        if(cell.name != "ice")
            return;
            if(entity.vx != 0 || entity.vy != 0)
            {
            let i = ~~(Math.random() * 8);
            createjs.Sound.play("Step_Ice_0"+i);
            }
       entity.mass = Config.MassIce;
    }
	
	static CheckGround(map, entity,x,y, cell)
    {
        if(cell.name != "ground")
            return;
        if(entity.vx != 0 || entity.vy != 0)
        {
        let i = ~~(Math.random() * 8);
        createjs.Sound.play("Step_0"+i);
        }
       entity.mass = Config.MassGround;
    }
	
	static CheckMagnet(map, entity, x,y, cell)
	{
		var zone = entity.getArea(Config.zoneMagnet,"magnet");
		for(var i in zone)
		{
			if( Math.abs(zone[i].x*32+16-entity.sprite1.x) > 10 && Math.abs(zone[i].y*32+16-entity.sprite1.y) > 10)
			{
				var v = this.VectNorm(zone[i].x*32+16,zone[i].y*32+16,x*32,y*32,Config.NormMagnet);
				entity.vx += -v.x;
				entity.vy += -v.y;
			}
			
		}
	}
	
	static VectNorm(xa,ya,xb,yb,norm)
	{
		var v = {x:xb-xa,y:yb-ya};
		var n = Math.sqrt((v.x * v.x) + (v.y * v.y));
		v.x *= norm/n;
		v.y *= norm/n;
		return v;
	}
	
	
	
	
	
	
	
}