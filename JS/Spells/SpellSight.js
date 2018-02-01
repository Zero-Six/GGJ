class SpellSight extends Spells
{
    cost()
    {
        return 1;
    }

    cast(players, player)
    {
        player = Spells.getOtherPlayer(players, player);
        player.sightMalus = 2;
        setTimeout(() => {
            player.sightMalus = 1;
        }, 5000);

        return 1;
    }
}