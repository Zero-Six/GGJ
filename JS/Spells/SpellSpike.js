class SpellSpike extends Spells 
{
    cast(players, player)
    {
        player = Spells.getOtherPlayer(players, player);
        player.getArea(11, "spikes");
        area.forEach(cell => {
            let spikes = new EntitySpikes(player.scene, cell.x * Config.TileSize, cell.y * Config.TileSize);
            player.scene.addEntity(spikes);
        });
        return 1;
    }
}