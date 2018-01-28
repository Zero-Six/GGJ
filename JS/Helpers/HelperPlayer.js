/**
 * Created by clovis on 29/08/17.
 */
class HelperPlayer
{
    static CheckPlayerTile(map, entity)
    {

            let x = Math.floor((entity.sprite1.x + entity.sprite1.width /2) / Config.TileSize);
			let y = Math.floor((entity.sprite1.y + entity.sprite1.height/2) / Config.TileSize);
            if(map.grid[Math.floor(x)] == null || map.grid[Math.floor(x)][Math.floor(y)] == null)
                return;
            let cell = Tiles[map.grid[Math.floor(x)][Math.floor(y)]];
            if(cell == null)
                return;
            
            HelperPlayer.CheckLava(map, entity, x, y, cell);

            HelperPlayer.CheckIce(map, entity, x, y, cell);
            
            HelperPlayer.CheckGround(map, entity, x, y, cell);
			
			HelperPlayer.CheckMagnet(map,entity,x,y,cell);
			
        
    }

    /*static CheckSpikes(map, entity,x,y, cell)
    {
        if(cell.name != "spikes" || cell.activated == false)
            return;
        let spikes = new EntitySpikes(entity.scene, x * Config.TileSize, y * Config.TileSize);
        entity.reset();
    }*/
	static CheckLava(map, entity,x,y, cell)
    {

    }    
    

	static CheckIce(map, entity,x,y, cell)
    {
        if(cell.name != "ice")
            return;
       entity.mass = Config.MassIce;
    }
	
	static CheckGround(map, entity,x,y, cell)
    {
        if(cell.name != "ground")
            return;
       entity.mass = Config.MassGround;
    }
	
	static CheckMagnet(map, entity, x,y, cell)
	{
		var zone = entity.getArea(5,"magnet");
		for(var i in zone)
		{
			if( Math.abs(zone[i].x-x) > 1 && Math.abs(zone[i].y-y))
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