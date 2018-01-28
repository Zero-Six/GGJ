class SpellSpike extends Spells 
{
    cast(players, player)
    {
        player = Spells.getOtherPlayer(players, player);
        let area = player.getArea(11, "spikes");
        area.forEach(cell => {
            console.log(cell);
            let spikes = new EntitySpikes(player.scene, cell.x * Config.TileSize, cell.y * Config.TileSize);
            player.scene.addEntity(spikes);

            players.forEach((entity1) => {
                entity1.scene.viewport1.removeChild(entity1.sprite1);
                entity1.scene.viewport2.removeChild(entity1.sprite2);
                entity1.scene.viewport1.addChild(entity1.sprite1);
                entity1.scene.viewport2.addChild(entity1.sprite2);
            });
        });
        return 1;
    }

    cost()
    {
        return 1;
    }
}