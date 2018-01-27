/**
 * Created by clovis on 27/08/17.
 */
let Config = 
{
    Width : 384,
    Height : 608,

    AirDensity  : 0.3,
	
	MassGround:0.3,
	MassIce:0.1,
	
    PlayerLife  : 3,
    PlayerFireTime  : 500,
    PlayerSpeed  : 10,

    FireDamage  : 0.01,

    TileSize  : 32,

    MapRooms : 3,

    MapWith : 0,
    MapHeight : 0,
}

Config.MapWidth = Config.MapRooms*11;
Config.MapHeight = Config.MapRooms*11;