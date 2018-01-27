// Lavender.js --- 
// 
// Filename: Lavender.js
// Author: Louise <louise>
// Created: Sat Jan 27 10:44:23 2018 (+0100)
// Last-Updated: Sat Jan 27 12:16:39 2018 (+0100)
//           By: Louise <louise>
// 

const LAVENDER_ALGORITHM_NONE = 0;
const LAVENDER_ALGORITHM_BACKTRACKING = 1;
const LAVENDER_ALGORITHM_PRIM = 2;

/**
 * lavender_gen:
 * This function generates a map from the value given
 * 
 * @algorithm: The algorithm used to generate the map.
 *   You have to pass a constant as defined above.
 * @seed: The seed used to generate the map
 * @width: The width (in rooms, i.e. blocks of 11×11) of the map
 * @height: The height of the map
 * 
 * @return: An array of integers representing the tiles
 */
function lavender_gen(algorithm, seed, width, height) {
    let rand = new LavenderRandom(seed);
    let cells = [];
    
    switch (algorithm) {
    case LAVENDER_ALGORITHM_BACKTRACKING:
	cells = lavender_backtracking(rand, width, height);
	break;
    case LAVENDER_ALGORITHM_PRIM:
	throw "This generation algorithm is not implemented";
	break;
    default:
	throw "You passed a bad algorithm constant";
    }

    throw "The tile generation is not yet implemented";
}

/**
 * lavender_backtracking:
 * This functlion generates a map using a Backtracking algorithm
 * 
 * @generator: The random generator used to generate values
 * @width: The width of the map
 * @height: The height of the map
 *
 * @return: An array of integers representing the rooms
 */
function lavender_backtracking(generator, width, height) {
    let cells = [];
    let stack = [];
    
    for (var i = 0; i < (width * height); i++) {
	cells.push({visited: false, id: -1});
    }

    return cells;
}

class LavenderRandom {
    constructor(seed) {
	this.seed = seed;
    }

    get random_value() {
	// Linear congruential generator
	// Parameters : a = 134775813, c = 1, m = 2^32
	let new_value = (this.seed * 134775813 + 1) % 4294967296;

	this.seed = new_value;
	return new_value;
    }
}
