/**
 * Created by clovis on 29/08/17.
 */
class HelperPlayer
{
    static CheckPlayerTile(map, entity)
    {

        let iced= false;

        let results = [];

        let points = [];

        let topleft = new Vector2(entity.sprite1.x, entity.sprite1.y);
        let bottomright = new Vector2(entity.sprite1.x + entity.sprite1.width, entity.sprite1.y + entity.sprite1.height)
        let topright = new Vector2(entity.sprite1.x + entity.sprite1.width, entity.sprite1.y);
        let bottomleft = new Vector2(entity.sprite1.x, entity.sprite1.y + entity.sprite1.height);

        topleft.x += entity.sprite1.hitarea.x;
        topleft.y += entity.sprite1.hitarea.y;

        topright.x -= entity.sprite1.hitarea.width;
        topright.y += entity.sprite1.hitarea.y;

        bottomleft.x += entity.sprite1.hitarea.x;
        bottomleft.y -= entity.sprite1.hitarea.height;

        bottomright.x -= entity.sprite1.hitarea.width;
        bottomright.y -= entity.sprite1.hitarea.height;

        let rectangle1 = new Rectangle(topleft.x + Config.AirDensity * entity.Vx(), topleft.y + Config.AirDensity * entity.Vy(), bottomright.x - topleft.x , bottomright.y - topleft.y);
        


        points.push(topleft);
        points.push(bottomright);
        points.push(topright);
        points.push(bottomleft);
        let cells = [];
        for (let i = 0; i < points.length; i++) {
            //console.log(points);
            let point = points[i];
            if(map.grid[Math.floor(point.x / Config.TileSize)] == null || map.grid[Math.floor(point.x / Config.TileSize)][Math.floor(point.y / Config.TileSize)] == null)
                continue;
            let cell = Tiles[map.grid[Math.floor(point.x / Config.TileSize)][Math.floor(point.y / Config.TileSize)]];
            if(cell.name == "ice")
            {
                this.iced = true;
            }
            if(cell.name=="ground" && this.iced == true )
            {
                continue;
            }
            cells.push(cell);
        }

        let x = ~~(entity.x / Config.TileSize);
        let y = ~~(entity.y / Config.TileSize);

        cells.forEach(function(cell){
            HelperPlayer.CheckSpikes(map, entity, x, y, cell);
		
            HelperPlayer.CheckIce(map, entity, x, y, cell);
            
            HelperPlayer.CheckGround(map, entity, x, y, cell);
        });
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