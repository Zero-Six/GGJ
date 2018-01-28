class SpellKey extends Spells
{
    cast(players, player)
    {
        player = Spells.getOtherPlayer(players, player);
        player.seeKey = false;
        setTimeout(() => {
            player.seeKey = true;
        }, 10000)  
        return 1;
    }
}