class SpellSpeed extends Spells 
{
    cast(players, player)
    {
        player = Spells.getOtherPlayer(players, player);
        player.speed *= 2;
        setTimeout(() => {
            player.speed /= 2;
        }, 2000);
        return 2;
    }
}