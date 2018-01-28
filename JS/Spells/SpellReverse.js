class SpellReverse extends Spells 
{
    constructor()
    {
        super();
    }

    cost()
    {
        return 2;
    }

    cast(players, player)
    {
        super.cast(players, player);
        let other = Spells.getOtherPlayer(players, player);
        other.reversedControls = true;

        setTimeout(function(){
            other.reversedControls = false;
        }, 2000);

        return 2;
    }
}