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
        /*if(map.grid[x][y] == Config.Tiles.Lava)
            player.setOnFire(true);
        else if(map.grid[x][y] == Config.Tiles.Water)
            player.setOnFire(false);*/
    }
}