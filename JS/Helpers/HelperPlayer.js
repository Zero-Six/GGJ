/**
 * Created by clovis on 29/08/17.
 */
class HelperPlayer
{
    static CheckPlayerTile(map, entity)
    {
        if(entity instanceof EntityPlayer == false)
            return;
        let player = entity;
        let x = Math.floor((entity.sprite1.x + entity.sprite1.width / 2) / Config.TileSize);
        let y = Math.floor((entity.sprite1.y + entity.sprite1.height) / Config.TileSize);

        HelperPlayer.CheckTrap(map, entity, x, y);

        /*if(map.grid[x][y] == Config.Tiles.Lava)
            player.setOnFire(true);
        else if(map.grid[x][y] == Config.Tiles.Water)
            player.setOnFire(false);*/
    }

    static CheckTrap(map, entity,x,y)
    {
        if(map.grid[x] == null || map.grid[x][y] == null)
            return;
        if(Tiles[map.grid[x][y]].name != "trap" && Tiles[map.grid[x][y]].activated == true)
            return;
        let trap = new EntityTrap(entity.scene, x * Config.TileSize, y * Config.TileSize);
        entity.reset();
    }
}