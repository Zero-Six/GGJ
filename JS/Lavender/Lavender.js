// Lavender.js --- 
// 
// Filename: Lavender.js
// Author: Louise <louise>
// Created: Sat Jan 27 10:44:23 2018 (+0100)
// Last-Updated: Sat Jan 27 19:15:37 2018 (+0100)
//           By: Louise <louise>
// 

const LAVENDER_ALGORITHM_NONE = 0;
const LAVENDER_ALGORITHM_BACKTRACKING = 1;
const LAVENDER_ALGORITHM_PRIM = 2;

/**
 * lavender_new:
 * This function creates a LavenderContext
 */
function lavender_new(seed, maps_file) {
    // Getting the maps.json file
    var request = new XMLHttpRequest();
    request.overrideMimeType("text/plain; charset=utf-8");
    request.open("GET", maps_file, false);
    request.send();

    return {
	"maps": JSON.parse(request.responseText),
	"r": new LavenderRandom(seed)
    }
}

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
 * @return: An array of integers representing the rooms
 */
function lavender_gen(context, algorithm, width, height) {
    let cells = [];

    if ((width % 2 == 0) || (height % 2 == 0)) {
	throw "Bad dimensions";
    }
    
    switch (algorithm) {
    case LAVENDER_ALGORITHM_BACKTRACKING:
	return lavender_backtracking(context, width, height);
    case LAVENDER_ALGORITHM_PRIM:
	throw "This generation algorithm is not implemented";
	break;
    default:
	throw "You passed a bad algorithm constant";
    }
}

/**
 * lavender_conv:
 * Converts an array of rooms to an array of tiles
 */
function lavender_conv(context, array, width, height) {
    return new Promise (
	function(resolve, reject) {
	    let res = [];
	    let it = process();
		
		


		it.next();
	    function *process() {
		for (var y = 0; y < (height * 11); y++) {
		    for (var x = 0; x < (width * 11); x++) {
			let local_x = x % 11;
			let local_y = y % 11;
			let cell = array[((y / 11) | 0) * width + ((x / 11) | 0)];
			
			if (local_y == 0) {
			    // Wall generation (Up)
			    if (!cell.walls[0] && ((local_x == 4) || (local_x == 5) || (local_x == 6))) {
				res.push(0);
			    } else {
				res.push(1);
			    }
			} else if (local_y == 10) {
			    // Wall generation (Down)
			    if (!cell.walls[2] && ((local_x == 4) || (local_x == 5) || (local_x == 6))) {
				res.push(0);
			    } else {
				res.push(1);
			    }
			} else if (local_x == 0) {
			    // Wall generation (Left)
			    if (!cell.walls[3] && ((local_y == 4) || (local_y == 5) || (local_y == 6))) {
				res.push(0);
			    } else {
				res.push(1);
			    }
			} else if (local_x == 10) {
			    // Wall generation (Right)
			    if (!cell.walls[1] && ((local_y == 4) || (local_y == 5) || (local_y == 6))) {
				res.push(0);
			    } else {
				res.push(1);
			    }
			} else {
			    // Room generation
			    let id = cell.id;
			    let map = context.maps[id];
			    res.push(map.content[(local_y - 1) * 9 + (local_x - 1)]);
			}
			yield lavender_wait(it, 5);
			console.log("o");
		    }
		}

		resolve(res);
	    }
	}
    );
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
function lavender_backtracking(context, width, height) {
    function mark_visited(array, cell) {
	array[cell].id = (Math.abs(context.r.random_value) % (context.maps.length - 1)) + 1;
	array[cell].visited = true;

	current_cell = cell;
	visited_cells += 1;
    }
    
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
		mark_visited(array, neighbour);

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
		mark_visited(array, neighbour);

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
		mark_visited(array, neighbour);

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
		mark_visited(array, neighbour);

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
	    while (!directional_functions[context.r.random_value & 3](cells, current_cell));
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

function lavender_wait(it, time) {
    setTimeout(function() { it.next(); }, time);
}
