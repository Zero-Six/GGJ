/**
 * Created by clovis on 27/08/17.
 */
let Config = 
{
    Width : 384,
    Height : 608,

    AirDensity  : 0.3,
	
	MassGround:0.3,
	MassIce:0.9,
	
    PlayerLife  : 3,
    PlayerFireTime  : 500,
    PlayerSpeed  : 10,

    FireDamage  : 0.01,

    TileSize  : 32,

    MapRooms : 3,

    MapWith : 0,
    MapHeight : 0,
	
	MapSize:11,
	NormMagnet:2,
	zoneMagnet:3,
	
}

Config.MapWidth = Config.MapRooms*Config.MapSize;
Config.MapHeight = Config.MapRooms*Config.MapSize;