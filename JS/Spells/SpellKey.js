class SpellKey extends Spells
{

    cost()
    {
        return 2;
    }

    cast(players, player)
    {
        player = Spells.getOtherPlayer(players, player);
        player.seeKey = false;
        setTimeout(() => {
            player.seeKey = true;
        }, 10000)  
        return 2;
    }
}