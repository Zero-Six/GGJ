// Lavender.js --- 
// 
// Filename: Lavender.js
// Author: Louise <louise>
// Created: Sat Jan 27 10:44:23 2018 (+0100)
// Last-Updated: Sat Jan 27 15:07:05 2018 (+0100)
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

    if ((width % 2 == 0) || (height % 2 == 0)) {
	throw "Bad dimensions";
    }
    
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
    function is_unvisited_neighbours(array, cell) {
	// Up checking
	if ((cell > width) && (!array[cell - height].visited))
	    return true;

	// Right checking
	if (((cell % width) != (width - 1)) && (!array[cell + 1].visited))
	    return true;

	// Down checking
	if (((cell + width) < array.length) && (!array[cell + height].visited))
	    return true;

	// Left checking
	if (((cell % width) != 0) && (!array[cell - 1].visited))
	    return true;
	
	return false;
    }
    
    let directional_functions = [
	// Up
	function(array, cell) {
	    if (cell < width) {
		return false;
	    }

	    let neighbour = cell - height;
	    let neighbour_cell = array[neighbour];
	    if (neighbour_cell.visited) {
		return false;
	    } else {
		array[cell].walls[0] = false;
		array[neighbour].walls[2] = false;
		array[neighbour].visited = true;

		current_cell = neighbour;
		visited_cells += 1;

		return true;
	    }
	},

	// Right
	function(array, cell) {
	    if ((cell % width) == (width - 1)) {
		return false;
	    }

	    let neighbour = cell + 1;
	    let neighbour_cell = array[neighbour];

	    if (neighbour_cell.visited) {
		return false;
	    } else {
		array[cell].walls[1] = false;
		array[neighbour].walls[3] = false;
		array[neighbour].visited = true;

		current_cell = neighbour;
		visited_cells += 1;

		return true;
	    }
	},

	// Down
	function(array, cell) {
	    if ((cell + width) >= array.length) {
		return false;
	    }

	    let neighbour = cell + width;
	    let neighbour_cell = array[neighbour];
	    
	    if (neighbour_cell.visited) {
		return false;
	    } else {
		array[cell].walls[2] = false;
		array[neighbour].walls[0] = false;
		array[neighbour].visited = true;

		current_cell = neighbour;
		visited_cells += 1;

		return true;
	    }
	},

	// Left
	function(array, cell) {
	    if ((cell % width) == 0) {
		return false;
	    }

	    let neighbour = cell - 1;
	    let neighbour_cell = array[neighbour];

	    if (neighbour_cell.visited) {
		return false;
	    } else {
		array[cell].walls[3] = false;
		array[neighbour].walls[1] = false;
		array[neighbour].visited = true;

		current_cell = neighbour;
		visited_cells += 1;

		return true;
	    }
	}
    ];
    
    let cells = [];
    let stack = [];
    let array_size = width * height;
    let visited_cells = 1;
    let current_cell = (array_size - 1) / 2;

    // Generating empty array
    for (var i = 0; i < (width * height); i++) {
	cells.push({visited: false, id: -1, walls: [true, true, true, true]});
    }

    cells[current_cell].visited = true;
    cells[current_cell].id = 0;

    // While there are unvisited cells
    while (visited_cells < array_size) {
	if (is_unvisited_neighbours(cells, current_cell)) { // If the current cell has unvisited neighbour
	    // Push the current cell to the stack
	    stack.push(current_cell);
	    // Go in a random direction, and if possible remove the wall between the new cell
	    // and the current one, and make the new cell the current one
	    while (!directional_functions[generator.random_value & 3](cells, current_cell));
	} else if (stack.length > 0) { // Else if the stack is not empty
	    // Pop a cell from the stack and make it the current one
	    current_cell = stack.pop();
	}
    }

    // Return the array
    return cells;
}

class LavenderRandom {
    constructor(seed) {
	this.seed = seed;
    }

    get random_value() {
	// Linear congruential generator
	// Parameters : a = 134775813, c = 1, m = 2^32
	let new_value = (this.seed * 214013 + 2531011) & 0xFFFFFFFF;

	this.seed = new_value;
	return new_value >> 16;
    }
}
