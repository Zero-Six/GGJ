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
            HelperPlayer.CheckSpikes(map, entity, x, y, cell);
		
            HelperPlayer.CheckIce(map, entity, x, y, cell);
            
            HelperPlayer.CheckGround(map, entity, x, y, cell);
        
    }

    static CheckSpikes(map, entity,x,y, cell)
    {
        if(cell.name != "spikes" || cell.activated == false)
            return;
        let spikes = new EntitySpikes(entity.scene, x * Config.TileSize, y * Config.TileSize);
        entity.reset();
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
	
}