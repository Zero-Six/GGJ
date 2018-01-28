class SpellIce extends Spells
{
    cost()
    {
        return 1;
    }

    cast(players, player)
    {
        player = Spells.getOtherPlayer(players, player);
        let area = player.getArea(11);
        console.log(area);
        area.forEach(cell => {
            player.scene.map1.grid[cell.x][cell.y] = 2;
            player.scene.map2.grid[cell.x][cell.y] = 2;
            player.scene.map1.updateTile(cell.x, cell.y);
            player.scene.map2.updateTile(cell.x, cell.y);
        });
        setTimeout(function(){
            area.forEach(cell => {
                player.scene.map1.grid[cell.x][cell.y] = 0;
                player.scene.map2.grid[cell.x][cell.y] = 0;
                player.scene.map1.updateTile(cell.x, cell.y);
                player.scene.map2.updateTile(cell.x, cell.y);
            });
        }, 5000);
        return 1;
    }
}