class Spells
{

	static checkSpell(scene, player,  seq)
	{
		let id = seq.join("");
		if(Spells.List()[id] != null)
		{
			let players = [
				scene.player1, scene.player2
			];
			createjs.Sound.play("Send");
			if(Spells.List()[id].cost() > player.battery)
				return 0;
			return Spells.List()[id].cast(players, player);
		}
		return 0;
	}

	static List(){
		return {
			"111" : new SpellReverse(),
			"112" : new SpellSpeed(),
			"122" : new SpellKey(),
			"211" : new SpellIce(), 
			"221" : new SpellSight(),
			"121" : new SpellSpike(),
		}
	}

	static getOtherPlayer(players, player)
	{
		if(players[0] == player)
			return players[1];
		else 
			return players[0];
	}

	cast(players, player)
	{
		console.log("casting");
		console.log(this.constructor.name);
		return 0;
	}
	
	
	
	
	
	
}