class Spells
{

	static checkSpell(scene, seq)
	{
		let id = combo.join("");
		if(Spells.List[id] != null)
		{
			let players = [
				scene.player1, scene.player2
			];
			Spells.List[id].cast(players);
		}
	}

	static List = {

	}

	cast(players)
	{
		console.log("casting");
		console.log(this);
	}
	
	
	
	
	
	
}