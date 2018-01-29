/**
 * Created by clovis on 27/08/17.
 */
let Config = 
{
    AirDensity  : 0.3,
	
	MassGround:0.3,
	MassIce:0.9,
	
    PlayerSpeed  : 10,
    PlayerMaxSpeed : 25,

    TileSize  : 32,

    MapRooms : 3,

    MapWith : 0,
    MapHeight : 0,
	
	MapSize:11,
	NormMagnet:2,
	zoneMagnet:3,
	
	NormBumper:100,
}

Config.MapWidth = Config.MapRooms*Config.MapSize;
Config.MapHeight = Config.MapRooms*Config.MapSize;