// Lavender.js --- 
// 
// Filename: Lavender.js
// Author: Louise <louise>
// Created: Sat Jan 27 10:44:23 2018 (+0100)
// Last-Updated: Sat Jan 27 11:51:21 2018 (+0100)
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
 * @return: An array of integers representing the map
 */
function lavender_gen(algorithm, seed, width, height) {
    rand = new LavenderRandom(seed);
    
    switch (algorithm) {
    case LAVENDER_ALGORITHM_BACKTRACKING:
	return lavender_backtracking(rand, width, height);
    case LAVENDER_ALGORITHM_PRIM:
	throw "This generation algorithm is not implemented";
    default:
	throw "You passed a bad algorithm constant";
    }
}

/**
 * lavender_backtracking:
 * This functlion generates a map using a Backtracking algorithm
 * 
 * @generator: The random generator used to generate values
 * @width: The width of the map
 * @height: The height of the map
 *
 * @return: An array of integers
 */
function lavender_backtracking(generator, width, height) {
    throw "This generation algorithm is not implemented";
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
