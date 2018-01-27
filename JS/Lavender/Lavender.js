// Lavender.js --- 
// 
// Filename: Lavender.js
// Author: Louise <louise>
// Created: Sat Jan 27 10:44:23 2018 (+0100)
// Last-Updated: Sat Jan 27 11:03:18 2018 (+0100)
//           By: Louise <louise>
// 

const LAVENDER_ALGORITHM_NONE = 0;
const LAVENDER_ALGORITHM_BACKTRACKING = 1;
const LAVENDER_ALGORITHM_PRIM = 2;

function lavender_gen(algorithm, seed, width, height) {
    switch (algorithm) {
    case LAVENDER_ALGORITHM_BACKTRACKING:
    case LAVENDER_ALGORITHM_PRIM:
	throw "This generation algorithm is not implemented";
    default:
	throw "You passed a bad algorithm constant";
    }
}
