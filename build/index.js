(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@basementuniverse/utils/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/@basementuniverse/utils/utils.js ***!
  \*******************************************************/
/***/ ((module) => {

/**
 * @overview A library of useful functions
 * @author Gordon Larrigan
 */

/**
 * Check if two numbers are approximately equal
 * @param {number} a Number a
 * @param {number} b Number b
 * @param {number} [p=Number.EPSILON] The precision value
 * @return {boolean} True if numbers a and b are approximately equal
 */
const floatEquals = (a, b, p = Number.EPSILON) => Math.abs(a - b) < p;

/**
 * Clamp a number between min and max
 * @param {number} a The number to clamp
 * @param {number} [min=0] The minimum value
 * @param {number} [max=1] The maximum value
 * @return {number} A clamped number
 */
const clamp = (a, min = 0, max = 1) => a < min ? min : (a > max ? max : a);

/**
 * Get the fractional part of a number
 * @param {number} a The number from which to get the fractional part
 * @return {number} The fractional part of the number
 */
const frac = a => a >= 0 ? a - Math.floor(a) : a - Math.ceil(a);

/**
 * Do a linear interpolation between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value, should be in the interval [0, 1]
 * @return {number} An interpolated value in the interval [a, b]
 */
const lerp = (a, b, i) => a + (b - a) * i;

/**
 * Get the position of i between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolated value in the interval [a, b]
 * @return {number} The position of i between a and b
 */
const unlerp = (a, b, i) => (i - a) / (b - a);

/**
 * Do a bilinear interpolation
 * @param {number} c00 Top-left value
 * @param {number} c10 Top-right value
 * @param {number} c01 Bottom-left value
 * @param {number} c11 Bottom-right value
 * @param {number} ix Interpolation value along x
 * @param {number} iy Interpolation value along y
 * @return {number} A bilinear interpolated value
 */
const blerp = (c00, c10, c01, c11, ix, iy) => lerp(lerp(c00, c10, ix), lerp(c01, c11, ix), iy);

/**
 * Re-map a number i from range a1...a2 to b1...b2
 * @param {number} i The number to re-map
 * @param {number} a1
 * @param {number} a2
 * @param {number} b1
 * @param {number} b2
 * @return {number}
 */
const remap = (i, a1, a2, b1, b2) => b1 + (i - a1) * (b2 - b1) / (a2 - a1);

/**
 * Do a smooth interpolation between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value
 * @return {number} An interpolated value in the interval [a, b]
 */
const smoothstep = (a, b, i) => lerp(a, b, 3 * Math.pow(i, 2) - 2 * Math.pow(i, 3));

/**
 * Get an angle in radians
 * @param {number} degrees The angle in degrees
 * @return {number} The angle in radians
 */
const radians = degrees => (Math.PI / 180) * degrees;

/**
 * Get an angle in degrees
 * @param {number} radians The angle in radians
 * @return {number} The angle in degrees
 */
const degrees = radians => (180 / Math.PI) * radians;

/**
 * Get a random float in the interval [min, max)
 * @param {number} min Inclusive min
 * @param {number} max Exclusive max
 * @return {number} A random float in the interval [min, max)
 */
const randomBetween = (min, max) => Math.random() * (max - min) + min;

/**
 * Get a random integer in the interval [min, max]
 * @param {number} min Inclusive min
 * @param {number} max Inclusive max
 * @return {number} A random integer in the interval [min, max]
 */
const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Get a normally-distributed random number
 * @param {number} [mu=0.5] The mean value
 * @param {number} [sigma=0.5] The standard deviation
 * @param {number} [samples=2] The number of samples
 * @return {number} A normally-distributed random number
 */
const cltRandom = (mu = 0.5, sigma = 0.5, samples = 2) => {
  let total = 0;
  for (let i = samples; i--;) {
    total += Math.random();
  }
  return mu + (total - samples / 2) / (samples / 2) * sigma;
};

/**
 * Get a normally-distributed random integer in the interval [min, max]
 * @param {number} min Inclusive min
 * @param {number} max Inclusive max
 * @return {number} A normally-distributed random integer
 */
const cltRandomInt = (min, max) => Math.floor(min + cltRandom(0.5, 0.5, 2) * (max + 1 - min));

/**
 * Return a weighted random integer
 * @param {Array<number>} w An array of weights
 * @return {number} An index from w
 */
const weightedRandom = w => {
  let total = w.reduce((a, i) => a + i, 0), n = 0;
  const r = Math.random() * total;
  while (total > r) {
    total -= w[n++];
  }
  return n - 1;
};

/**
 * An interpolation function
 * @callback interpolationCallback
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value, should be in the interval [0, 1]
 * @return {number} The interpolated value in the interval [a, b]
 */

/**
 * Return an interpolated value from an array
 * @param {Array<number>} a An array of values interpolate
 * @param {number} i A number in the interval [0, 1]
 * @param {interpolationCallback} [f=Math.lerp] The interpolation function to use
 * @return {number} An interpolated value in the interval [min(a), max(a)]
 */
const lerpArray = (a, i, f = lerp) => {
  const s = i * (a.length - 1);
  const p = clamp(Math.trunc(s), 0, a.length - 1);
  return f(a[p] || 0, a[p + 1] || 0, frac(s));
};

/**
 * Get the dot product of two vectors
 * @param {Array<number>} a Vector a
 * @param {Array<number>} b Vector b
 * @return {number} a ∙ b
 */
const dot = (a, b) => a.reduce((n, v, i) => n + v * b[i], 0);

/**
 * Get the factorial of a number
 * @param {number} a
 * @return {number} a!
 */
const factorial = a => {
  let result = 1;
  for (let i = 2; i <= a; i++) {
    result *= i;
  }
  return result;
};

/**
 * Get the number of permutations of r elements from a set of n elements
 * @param {number} n
 * @param {number} r
 * @return {number} nPr
 */
const permutation = (n, r) => factorial(n) / factorial(n - r);

/**
 * Get the number of combinations of r elements from a set of n elements
 * @param {number} n
 * @param {number} r
 * @return {number} nCr
 */
const combination = (n, r) => factorial(n) / (factorial(r) * factorial(n - r));

/**
 * A function for generating array values
 * @callback timesCallback
 * @param {number} i The array index
 * @return {*} The array value
 */

/**
 * Return a new array with length n by calling function f(i) on each element
 * @param {timesCallback} f
 * @param {number} n The size of the array
 * @return {Array<*>}
 */
const times = (f, n) => Array(n).fill(0).map((_, i) => f(i));

/**
 * Return an array containing numbers 0->(n - 1)
 * @param {number} n The size of the array
 * @return {Array<number>} An array of integers 0->(n - 1)
 */
const range = n => times(i => i, n);

/**
 * Zip 2 arrays together, i.e. ([1, 2, 3], [a, b, c]) => [[1, a], [2, b], [3, c]]
 * @param {Array<*>} a
 * @param {Array<*>} b
 * @return {Array<Array<*>>}
 */
const zip = (a, b) => a.map((k, i) => [k, b[i]]);

/**
 * Return array[i] with positive and negative wrapping
 * @param {Array<*>} a
 * @param {number} i The positively/negatively wrapped array index
 * @return {*} An element from the array
 */
const at = (a, i) => a[i < 0 ? a.length - (Math.abs(i + 1) % a.length) - 1 : i % a.length];

/**
 * Chop an array into chunks of size n
 * @param {Array<*>} a
 * @param {number} n The chunk size
 * @return {Array<Array<*>>} An array of array chunks
 */
const chunk = (a, n) => times(i => a.slice(i * n, i * n + n), Math.ceil(a.length / n));

/**
 * Randomly shuffle a shallow copy of an array
 * @param {Array<*>} a
 * @return {Array<*>} The shuffled array
 */
const shuffle = a => a.slice().sort(() => Math.random() - 0.5);

if (true) {
  module.exports = {
    floatEquals,
    clamp,
    frac,
    lerp,
    unlerp,
    blerp,
    remap,
    smoothstep,
    radians,
    degrees,
    randomBetween,
    randomIntBetween,
    cltRandom,
    cltRandomInt,
    weightedRandom,
    lerpArray,
    dot,
    factorial,
    permutation,
    combination,
    times,
    range,
    zip,
    at,
    chunk,
    shuffle,
  };
}


/***/ }),

/***/ "./node_modules/@basementuniverse/vec/vec.js":
/*!***************************************************!*\
  !*** ./node_modules/@basementuniverse/vec/vec.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { times, chunk, dot } = __webpack_require__(/*! @basementuniverse/utils */ "./node_modules/@basementuniverse/utils/utils.js");

/**
 * @overview A library of useful functions
 * @author Gordon Larrigan
 */

/**
 * A 2d vector
 * @typedef {Object} vec
 * @property {number} x The x component of the vector
 * @property {number} y The y component of the vector
 */

/**
 * Create a new vector
 * @param {number|vec} [x] The x component of the vector, or a vector to copy
 * @param {number} [y] The y component of the vector
 * @return {vec} A new vector
 * @example <caption>Various ways to initialise a vector</caption>
 * let a = vec(3, 2);  // (3, 2)
 * let b = vec(4);     // (4, 4)
 * let c = vec(a);     // (3, 2)
 * let d = vec();      // (0, 0)
 */
const vec = (x, y) => (!x && !y ?
  { x: 0, y: 0 } : (typeof x === 'object' ?
    { x: x.x || 0, y: x.y || 0 } : (y === null || y === undefined ?
      { x: x, y: x } : { x: x, y: y })
  )
);

/**
 * Get the components of a vector as an array
 * @param {vec} a The vector to get components from
 * @return {Array<number>} The vector components as an array
 */
vec.components = a => [a.x, a.y];

/**
 * Return a unit vector (1, 0)
 * @return {vec} A unit vector (1, 0)
 */
vec.ux = () => vec(1, 0);

/**
 * Return a unit vector (0, 1)
 * @return {vec} A unit vector (0, 1)
 */
vec.uy = () => vec(0, 1);

/**
 * Add vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {vec} a + b
 */
vec.add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

/**
 * Scale a vector
 * @param {vec} a Vector a
 * @param {number} b Scalar b
 * @return {vec} a * b
 */
vec.mul = (a, b) => ({ x: a.x * b, y: a.y * b });

/**
 * Subtract vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {vec} a - b
 */
vec.sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });

/**
 * Get the length of a vector
 * @param {vec} a Vector a
 * @return {number} |a|
 */
vec.len = a => Math.sqrt(a.x * a.x + a.y * a.y);

/**
 * Get the length of a vector using taxicab geometry
 * @param {vec} a Vector a
 * @return {number} |a|
 */
vec.manhattan = a => Math.abs(a.x) + Math.abs(a.y);

/**
 * Normalise a vector
 * @param {vec} a The vector to normalise
 * @return {vec} ^a
 */
vec.nor = a => {
  let len = vec.len(a);
  return len ? { x: a.x / len, y: a.y / len } : vec();
};

/**
 * Get a dot product of vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {number} a ∙ b
 */
vec.dot = (a, b) => a.x * b.x + a.y * b.y;

/**
 * Rotate a vector by r radians
 * @param {vec} a The vector to rotate
 * @param {number} r The angle to rotate by, measured in radians
 * @return {vec} A rotated vector
 */
vec.rot = (a, r) => {
  let s = Math.sin(r),
    c = Math.cos(r);
  return { x: c * a.x - s * a.y, y: s * a.x + c * a.y };
}

/**
 * Check if two vectors are equal
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {boolean} True if vectors a and b are equal, false otherwise
 */
vec.eq = (a, b) => a.x === b.x && a.y === b.y;

/**
 * Get the angle of a vector
 * @param {vec} a Vector a
 * @return {number} The angle of vector a in radians
 */
vec.rad = a => Math.atan2(a.y, a.x);

/**
 * Copy a vector
 * @param {vec} a The vector to copy
 * @return {vec} A copy of vector a
 */
vec.cpy = a => vec(a);

/**
 * A function to call on each component of a vector
 * @callback vectorMapCallback
 * @param {number} value The component value
 * @param {'x' | 'y'} label The component label (x or y)
 * @return {number} The mapped component
 */

/**
 * Call a function on each component of a vector and build a new vector from the results
 * @param {vec} a Vector a
 * @param {vectorMapCallback} f The function to call on each component of the vector
 * @return {vec} Vector a mapped through f
 */
vec.map = (a, f) => ({ x: f(a.x, 'x'), y: f(a.y, 'y') });

/**
 * Convert a vector into a string
 * @param {vec} a The vector to convert
 * @param {string} [s=', '] The separator string
 * @return {string} A string representation of the vector
 */
vec.str = (a, s = ', ') => `${a.x}${s}${a.y}`;

/**
 * A matrix
 * @typedef {Object} mat
 * @property {number} m The number of rows in the matrix
 * @property {number} n The number of columns in the matrix
 * @property {Array<number>} entries The matrix values
 */

/**
 * Create a new matrix
 * @param {number} [m=4] The number of rows
 * @param {number} [n=4] The number of columns
 * @param {Array<number>} [entries=[]] Matrix values in reading order
 * @return {mat} A new matrix
 */
const mat = (m = 4, n = 4, entries = []) => ({
  m, n,
  entries: entries.concat(Array(m * n).fill(0)).slice(0, m * n)
});

/**
 * Get an identity matrix of size n
 * @param {number} n The size of the matrix
 * @return {mat} An identity matrix
 */
mat.identity = n => mat(n, n, Array(n * n).fill(0).map((v, i) => +(Math.floor(i / n) === i % n)));

/**
 * Get an entry from a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @return {number} The value at position (i, j) in matrix a
 */
mat.get = (a, i, j) => a.entries[(j - 1) + (i - 1) * a.n];

/**
 * Set an entry of a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @param {number} v The value to set in matrix a
 */
mat.set = (a, i, j, v) => { a.entries[(j - 1) + (i - 1) * a.n] = v; };

/**
 * Get a row from a matrix as an array
 * @param {mat} a Matrix a
 * @param {number} m The row offset
 * @return {Array<number>} Row m from matrix a
 */
mat.row = (a, m) => {
  const s = (m - 1) * a.n;
  return a.entries.slice(s, s + a.n);
};

/**
 * Get a column from a matrix as an array
 * @param {mat} a Matrix a
 * @param {number} n The column offset
 * @return {Array<number>} Column n from matrix a
 */
mat.col = (a, n) => times(i => mat.get(a, (i + 1), n), a.m);

/**
 * Add matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat} a + b
 */
mat.add = (a, b) => a.m === b.m && a.n === b.n && mat.map(a, (v, i) => v + b.entries[i]);

/**
 * Subtract matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat} a - b
 */
mat.sub = (a, b) => a.m === b.m && a.n === b.n && mat.map(a, (v, i) => v - b.entries[i]);

/**
 * Multiply matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat|boolean} ab or false if the matrices cannot be multiplied
 */
mat.mul = (a, b) => {
  if (a.n !== b.m) { return false; }
  const result = mat(a.m, b.n);
  for (let i = 1; i <= a.m; i++) {
    for (let j = 1; j <= b.n; j++) {
      mat.set(result, i, j, dot(mat.row(a, i), mat.col(b, j)));
    }
  }
  return result;
};

/**
 * Scale a matrix
 * @param {mat} a Matrix a
 * @param {number} b Scalar b
 * @return {mat} a * b
 */
mat.scale = (a, b) => mat.map(a, v => v * b);

/**
 * Transpose a matrix
 * @param {mat} a The matrix to transpose
 * @return {mat} A transposed matrix
 */
mat.trans = a => mat(a.n, a.m, times(i => mat.col(a, (i + 1)), a.n).flat());

/**
 * Get the minor of a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @return {mat|boolean} The (i, j) minor of matrix a or false if the matrix is not square
 */
mat.minor = (a, i, j) => {
  if (a.m !== a.n) { return false; }
  const entries = [];
  for (let ii = 1; ii <= a.m; ii++) {
    if (ii === i) { continue; }
    for (let jj = 1; jj <= a.n; jj++) {
      if (jj === j) { continue; }
      entries.push(mat.get(a, ii, jj));
    }
  }
  return mat(a.m - 1, a.n - 1, entries);
};

/**
 * Get the determinant of a matrix
 * @param {mat} a Matrix a
 * @return {number|boolean} |a| or false if the matrix is not square
 */
mat.det = a => {
  if (a.m !== a.n) { return false; }
  if (a.m === 1) {
    return a.entries[0];
  }
  if (a.m === 2) {
    return a.entries[0] * a.entries[3] - a.entries[1] * a.entries[2];
  }
  let total = 0, sign = 1;
  for (let j = 1; j <= a.n; j++) {
    total += sign * a.entries[j - 1] * mat.det(mat.minor(a, 1, j));
    sign *= -1;
  }
  return total;
};

/**
 * Normalise a matrix
 * @param {mat} a The matrix to normalise
 * @return {mat|boolean} ^a or false if the matrix is not square
 */
mat.nor = a => {
  if (a.m !== a.n) { return false; }
  const d = mat.det(a);
  return mat.map(a, i => i * d);
};

/**
 * Get the adjugate of a matrix
 * @param {mat} a The matrix from which to get the adjugate
 * @return {mat} The adjugate of a
 */
mat.adj = a => {
  const minors = mat(a.m, a.n);
  for (let i = 1; i <= a.m; i++) {
    for (let j = 1; j <= a.n; j++) {
      mat.set(minors, i, j, mat.det(mat.minor(a, i, j)));
    }
  }
  const cofactors = mat.map(minors, (v, i) => v * (i % 2 ? -1 : 1));
  return mat.trans(cofactors);
};

/**
 * Get the inverse of a matrix
 * @param {mat} a The matrix to invert
 * @return {mat|boolean} a^-1 or false if the matrix has no inverse
 */
mat.inv = a => {
  if (a.m !== a.n) { return false; }
  const d = mat.det(a);
  if (d === 0) { return false; }
  return mat.scale(mat.adj(a), 1 / d);
};

/**
 * Check if two matrices are equal
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {boolean} True if matrices a and b are identical, false otherwise
 */
mat.eq = (a, b) => a.m === b.m && a.n === b.n && mat.str(a) === mat.str(b);

/**
 * Copy a matrix
 * @param {mat} a The matrix to copy
 * @return {mat} A copy of matrix a
 */
mat.cpy = a => mat(a.m, a.n, [...a.entries]);

/**
 * A function to call on each entry of a matrix
 * @callback matrixMapCallback
 * @param {number} value The entry value
 * @param {number} index The entry index
 * @param {Array<number>} entries The array of matrix entries
 * @return {number} The mapped entry
 */

/**
 * Call a function on each entry of a matrix and build a new matrix from the results
 * @param {mat} a Matrix a
 * @param {matrixMapCallback} f The function to call on each entry of the matrix
 * @return {mat} Matrix a mapped through f
 */
mat.map = (a, f) => mat(a.m, a.n, a.entries.map(f));

/**
 * Convert a matrix into a string
 * @param {mat} a The matrix to convert
 * @param {string} [ms=', '] The separator string for columns
 * @param {string} [ns='\n'] The separator string for rows
 * @return {string} A string representation of the matrix
 */
mat.str = (a, ms = ', ', ns = '\n') => chunk(a.entries, a.n).map(r => r.join(ms)).join(ns);

if (true) {
  module.exports = { vec, mat };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!******************!*\
  !*** ./index.ts ***!
  \******************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const vec_1 = __webpack_require__(/*! @basementuniverse/vec */ "./node_modules/@basementuniverse/vec/vec.js");
class InputManager {
    constructor(options) {
        this.keyboardState = {};
        this.previousKeyboardState = {};
        this.mouseState = { button: false, position: (0, vec_1.vec)(), wheel: 0 };
        this.previousMouseState = { button: false, position: (0, vec_1.vec)(), wheel: 0 };
        this.options = Object.assign({}, InputManager.defaultOptions, options !== null && options !== void 0 ? options : {});
        // Set up event handlers
        if (this.options.mouse) {
            window.addEventListener('mousedown', () => {
                this.mouseState.button = true;
            });
            window.addEventListener('mouseup', () => {
                this.mouseState.button = false;
            });
            window.addEventListener('touchstart', () => {
                this.mouseState.button = true;
            });
            window.addEventListener('touchend', () => {
                this.mouseState.button = false;
            });
            window.addEventListener('mousemove', e => {
                this.mouseState.position.x = e.offsetX;
                this.mouseState.position.y = e.offsetY;
            });
            if (this.options.mouseWheel) {
                window.addEventListener('wheel', e => {
                    this.mouseState.wheel = e.deltaY > 0 ? 1 : -1;
                });
            }
        }
        if (this.options.keyboard) {
            window.addEventListener('keydown', e => {
                this.keyboardState[e.code] = true;
            });
            window.addEventListener('keyup', e => {
                this.keyboardState[e.code] = false;
            });
        }
    }
    /**
     * Initialise the input manager for managing mouse and keyboard input
     */
    static initialise(options) {
        if (InputManager.instance !== undefined) {
            throw new Error('Input manager already initialised');
        }
        InputManager.instance = new InputManager(options);
    }
    static getInstance() {
        if (InputManager.instance === undefined) {
            throw new Error('Input manager not properly initialised');
        }
        return InputManager.instance;
    }
    /**
     * Update the state of the input devices
     */
    static update() {
        const instance = InputManager.getInstance();
        instance.previousKeyboardState = Object.assign({}, instance.keyboardState);
        instance.previousMouseState = {
            ...instance.mouseState,
            position: vec_1.vec.cpy(instance.mouseState.position),
        };
        instance.mouseState.wheel = 0;
    }
    /**
     * Check if a key is currently pressed down
     */
    static keyDown(code) {
        const instance = InputManager.getInstance();
        // Check if any key is down
        if (!code) {
            for (const k in instance.keyboardState) {
                if (instance.keyboardState[k]) {
                    return true;
                }
            }
            return false;
        }
        return !!instance.keyboardState[code];
    }
    /**
     * Check if a key has been pressed since the last frame
     */
    static keyPressed(code) {
        const instance = InputManager.getInstance();
        // Check if any key was pressed
        if (!code) {
            for (const k in instance.keyboardState) {
                if (instance.keyboardState[k] &&
                    (!(k in instance.previousKeyboardState) ||
                        !instance.previousKeyboardState[k])) {
                    return true;
                }
            }
            return false;
        }
        return !!instance.keyboardState[code] && !instance.previousKeyboardState[code];
    }
    /**
     * Check if a key has been released since the last frame
     */
    static keyReleased(code) {
        const instance = InputManager.getInstance();
        // Check if any key was released
        if (!code) {
            for (const k in instance.keyboardState) {
                if (!instance.keyboardState[k] &&
                    !!instance.previousKeyboardState[k]) {
                    return true;
                }
            }
            return false;
        }
        return !instance.keyboardState[code] && !!instance.previousKeyboardState[code];
    }
    /**
     * Check if a mouse button is currently pressed down
     */
    static mouseDown() {
        const instance = InputManager.getInstance();
        return !!instance.mouseState.button;
    }
    /**
     * Check if a mouse button has been pressed since the last frame
     */
    static mousePressed() {
        const instance = InputManager.getInstance();
        return !!instance.mouseState.button && !instance.previousMouseState.button;
    }
    /**
     * Check if a mouse button has been released since the last frame
     */
    static mouseReleased() {
        const instance = InputManager.getInstance();
        return !instance.mouseState.button && !!instance.previousMouseState.button;
    }
    /**
     * Check if the mousewheel is scrolling up
     */
    static mouseWheelUp() {
        const instance = InputManager.getInstance();
        return instance.mouseState.wheel > 0;
    }
    /**
     * Check if the mousewheel is scrolling down
     */
    static mouseWheelDown() {
        const instance = InputManager.getInstance();
        return instance.mouseState.wheel < 0;
    }
    /**
     * Get the current mouse position in screen-space
     */
    static get mousePosition() {
        const instance = InputManager.getInstance();
        return instance.mouseState.position;
    }
}
exports["default"] = InputManager;
InputManager.defaultOptions = {
    mouse: true,
    mouseWheel: true,
    keyboard: true,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUE0QztBQTZCNUMsTUFBcUIsWUFBWTtJQW1CL0IsWUFBb0IsT0FBK0I7UUFSM0Msa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBRWxDLDBCQUFxQixHQUFrQixFQUFFLENBQUM7UUFFMUMsZUFBVSxHQUFlLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBQSxTQUFHLEdBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFFdEUsdUJBQWtCLEdBQWUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFBLFNBQUcsR0FBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUdwRixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxjQUFjLEVBQUUsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksRUFBRSxDQUFDLENBQUM7UUFFN0Usd0JBQXdCO1FBQ3hCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNoQyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtnQkFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQzNCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUNyQyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUErQjtRQUN0RCxJQUFJLFlBQVksQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztTQUN0RDtRQUNELFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVPLE1BQU0sQ0FBQyxXQUFXO1FBQ3hCLElBQUksWUFBWSxDQUFDLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDdkMsTUFBTSxJQUFJLEtBQUssQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1NBQzNEO1FBRUQsT0FBTyxZQUFZLENBQUMsUUFBUSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxNQUFNO1FBQ2xCLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU1QyxRQUFRLENBQUMscUJBQXFCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNFLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRztZQUM1QixHQUFHLFFBQVEsQ0FBQyxVQUFVO1lBQ3RCLFFBQVEsRUFBRSxTQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ2hELENBQUM7UUFDRixRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFhO1FBQ2pDLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU1QywyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULEtBQUssTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTtnQkFDdEMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUM3QixPQUFPLElBQUksQ0FBQztpQkFDYjthQUNGO1lBQ0QsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFhO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU1QywrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULEtBQUssTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsRUFBRTtnQkFDdEMsSUFDRSxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDekIsQ0FDRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQzt3QkFDdEMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQ25DLEVBQ0Q7b0JBQ0EsT0FBTyxJQUFJLENBQUM7aUJBQ2I7YUFDRjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBYTtRQUNyQyxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFNUMsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxLQUFLLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RDLElBQ0UsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDMUIsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFDbkM7b0JBQ0EsT0FBTyxJQUFJLENBQUM7aUJBQ2I7YUFDRjtZQUNELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxTQUFTO1FBQ3JCLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU1QyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUN0QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFNUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO0lBQzdFLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxhQUFhO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU1QyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7SUFDN0UsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTVDLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxjQUFjO1FBQzFCLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUU1QyxPQUFPLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNLEtBQUssYUFBYTtRQUM3QixNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFNUMsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDOztBQTlNSCwrQkErTUM7QUE1TXlCLDJCQUFjLEdBQWlCO0lBQ3JELEtBQUssRUFBRSxJQUFJO0lBQ1gsVUFBVSxFQUFFLElBQUk7SUFDaEIsUUFBUSxFQUFFLElBQUk7Q0FDZixDQUFDIn0=
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLG11TSIsInNvdXJjZXMiOlsid2VicGFjazovL0BiYXNlbWVudHVuaXZlcnNlL2lucHV0LW1hbmFnZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL0BiYXNlbWVudHVuaXZlcnNlL2lucHV0LW1hbmFnZXIvLi9ub2RlX21vZHVsZXMvQGJhc2VtZW50dW5pdmVyc2UvdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGJhc2VtZW50dW5pdmVyc2UvaW5wdXQtbWFuYWdlci8uL25vZGVfbW9kdWxlcy9AYmFzZW1lbnR1bml2ZXJzZS92ZWMvdmVjLmpzIiwid2VicGFjazovL0BiYXNlbWVudHVuaXZlcnNlL2lucHV0LW1hbmFnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGJhc2VtZW50dW5pdmVyc2UvaW5wdXQtbWFuYWdlci8uL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyoqXG4gKiBAb3ZlcnZpZXcgQSBsaWJyYXJ5IG9mIHVzZWZ1bCBmdW5jdGlvbnNcbiAqIEBhdXRob3IgR29yZG9uIExhcnJpZ2FuXG4gKi9cblxuLyoqXG4gKiBDaGVjayBpZiB0d28gbnVtYmVycyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbFxuICogQHBhcmFtIHtudW1iZXJ9IGEgTnVtYmVyIGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIE51bWJlciBiXG4gKiBAcGFyYW0ge251bWJlcn0gW3A9TnVtYmVyLkVQU0lMT05dIFRoZSBwcmVjaXNpb24gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbnVtYmVycyBhIGFuZCBiIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsXG4gKi9cbmNvbnN0IGZsb2F0RXF1YWxzID0gKGEsIGIsIHAgPSBOdW1iZXIuRVBTSUxPTikgPT4gTWF0aC5hYnMoYSAtIGIpIDwgcDtcblxuLyoqXG4gKiBDbGFtcCBhIG51bWJlciBiZXR3ZWVuIG1pbiBhbmQgbWF4XG4gKiBAcGFyYW0ge251bWJlcn0gYSBUaGUgbnVtYmVyIHRvIGNsYW1wXG4gKiBAcGFyYW0ge251bWJlcn0gW21pbj0wXSBUaGUgbWluaW11bSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IFttYXg9MV0gVGhlIG1heGltdW0gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gQSBjbGFtcGVkIG51bWJlclxuICovXG5jb25zdCBjbGFtcCA9IChhLCBtaW4gPSAwLCBtYXggPSAxKSA9PiBhIDwgbWluID8gbWluIDogKGEgPiBtYXggPyBtYXggOiBhKTtcblxuLyoqXG4gKiBHZXQgdGhlIGZyYWN0aW9uYWwgcGFydCBvZiBhIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG51bWJlciBmcm9tIHdoaWNoIHRvIGdldCB0aGUgZnJhY3Rpb25hbCBwYXJ0XG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBmcmFjdGlvbmFsIHBhcnQgb2YgdGhlIG51bWJlclxuICovXG5jb25zdCBmcmFjID0gYSA9PiBhID49IDAgPyBhIC0gTWF0aC5mbG9vcihhKSA6IGEgLSBNYXRoLmNlaWwoYSk7XG5cbi8qKlxuICogRG8gYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIGEgYW5kIGJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBtaW5pbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGIgVGhlIG1heGltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgaW50ZXJwb2xhdGlvbiB2YWx1ZSwgc2hvdWxkIGJlIGluIHRoZSBpbnRlcnZhbCBbMCwgMV1cbiAqIEByZXR1cm4ge251bWJlcn0gQW4gaW50ZXJwb2xhdGVkIHZhbHVlIGluIHRoZSBpbnRlcnZhbCBbYSwgYl1cbiAqL1xuY29uc3QgbGVycCA9IChhLCBiLCBpKSA9PiBhICsgKGIgLSBhKSAqIGk7XG5cbi8qKlxuICogR2V0IHRoZSBwb3NpdGlvbiBvZiBpIGJldHdlZW4gYSBhbmQgYlxuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG1pbmltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYiBUaGUgbWF4aW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBpbnRlcnBvbGF0ZWQgdmFsdWUgaW4gdGhlIGludGVydmFsIFthLCBiXVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgcG9zaXRpb24gb2YgaSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuY29uc3QgdW5sZXJwID0gKGEsIGIsIGkpID0+IChpIC0gYSkgLyAoYiAtIGEpO1xuXG4vKipcbiAqIERvIGEgYmlsaW5lYXIgaW50ZXJwb2xhdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IGMwMCBUb3AtbGVmdCB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGMxMCBUb3AtcmlnaHQgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMDEgQm90dG9tLWxlZnQgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMTEgQm90dG9tLXJpZ2h0IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gaXggSW50ZXJwb2xhdGlvbiB2YWx1ZSBhbG9uZyB4XG4gKiBAcGFyYW0ge251bWJlcn0gaXkgSW50ZXJwb2xhdGlvbiB2YWx1ZSBhbG9uZyB5XG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgYmlsaW5lYXIgaW50ZXJwb2xhdGVkIHZhbHVlXG4gKi9cbmNvbnN0IGJsZXJwID0gKGMwMCwgYzEwLCBjMDEsIGMxMSwgaXgsIGl5KSA9PiBsZXJwKGxlcnAoYzAwLCBjMTAsIGl4KSwgbGVycChjMDEsIGMxMSwgaXgpLCBpeSk7XG5cbi8qKlxuICogUmUtbWFwIGEgbnVtYmVyIGkgZnJvbSByYW5nZSBhMS4uLmEyIHRvIGIxLi4uYjJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBudW1iZXIgdG8gcmUtbWFwXG4gKiBAcGFyYW0ge251bWJlcn0gYTFcbiAqIEBwYXJhbSB7bnVtYmVyfSBhMlxuICogQHBhcmFtIHtudW1iZXJ9IGIxXG4gKiBAcGFyYW0ge251bWJlcn0gYjJcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuY29uc3QgcmVtYXAgPSAoaSwgYTEsIGEyLCBiMSwgYjIpID0+IGIxICsgKGkgLSBhMSkgKiAoYjIgLSBiMSkgLyAoYTIgLSBhMSk7XG5cbi8qKlxuICogRG8gYSBzbW9vdGggaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIGEgYW5kIGJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBtaW5pbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGIgVGhlIG1heGltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgaW50ZXJwb2xhdGlvbiB2YWx1ZVxuICogQHJldHVybiB7bnVtYmVyfSBBbiBpbnRlcnBvbGF0ZWQgdmFsdWUgaW4gdGhlIGludGVydmFsIFthLCBiXVxuICovXG5jb25zdCBzbW9vdGhzdGVwID0gKGEsIGIsIGkpID0+IGxlcnAoYSwgYiwgMyAqIE1hdGgucG93KGksIDIpIC0gMiAqIE1hdGgucG93KGksIDMpKTtcblxuLyoqXG4gKiBHZXQgYW4gYW5nbGUgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXMgVGhlIGFuZ2xlIGluIGRlZ3JlZXNcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuY29uc3QgcmFkaWFucyA9IGRlZ3JlZXMgPT4gKE1hdGguUEkgLyAxODApICogZGVncmVlcztcblxuLyoqXG4gKiBHZXQgYW4gYW5nbGUgaW4gZGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnMgVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFuZ2xlIGluIGRlZ3JlZXNcbiAqL1xuY29uc3QgZGVncmVlcyA9IHJhZGlhbnMgPT4gKDE4MCAvIE1hdGguUEkpICogcmFkaWFucztcblxuLyoqXG4gKiBHZXQgYSByYW5kb20gZmxvYXQgaW4gdGhlIGludGVydmFsIFttaW4sIG1heClcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gSW5jbHVzaXZlIG1pblxuICogQHBhcmFtIHtudW1iZXJ9IG1heCBFeGNsdXNpdmUgbWF4XG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgcmFuZG9tIGZsb2F0IGluIHRoZSBpbnRlcnZhbCBbbWluLCBtYXgpXG4gKi9cbmNvbnN0IHJhbmRvbUJldHdlZW4gPSAobWluLCBtYXgpID0+IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcblxuLyoqXG4gKiBHZXQgYSByYW5kb20gaW50ZWdlciBpbiB0aGUgaW50ZXJ2YWwgW21pbiwgbWF4XVxuICogQHBhcmFtIHtudW1iZXJ9IG1pbiBJbmNsdXNpdmUgbWluXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IEluY2x1c2l2ZSBtYXhcbiAqIEByZXR1cm4ge251bWJlcn0gQSByYW5kb20gaW50ZWdlciBpbiB0aGUgaW50ZXJ2YWwgW21pbiwgbWF4XVxuICovXG5jb25zdCByYW5kb21JbnRCZXR3ZWVuID0gKG1pbiwgbWF4KSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuXG4vKipcbiAqIEdldCBhIG5vcm1hbGx5LWRpc3RyaWJ1dGVkIHJhbmRvbSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbXU9MC41XSBUaGUgbWVhbiB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IFtzaWdtYT0wLjVdIFRoZSBzdGFuZGFyZCBkZXZpYXRpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2FtcGxlcz0yXSBUaGUgbnVtYmVyIG9mIHNhbXBsZXNcbiAqIEByZXR1cm4ge251bWJlcn0gQSBub3JtYWxseS1kaXN0cmlidXRlZCByYW5kb20gbnVtYmVyXG4gKi9cbmNvbnN0IGNsdFJhbmRvbSA9IChtdSA9IDAuNSwgc2lnbWEgPSAwLjUsIHNhbXBsZXMgPSAyKSA9PiB7XG4gIGxldCB0b3RhbCA9IDA7XG4gIGZvciAobGV0IGkgPSBzYW1wbGVzOyBpLS07KSB7XG4gICAgdG90YWwgKz0gTWF0aC5yYW5kb20oKTtcbiAgfVxuICByZXR1cm4gbXUgKyAodG90YWwgLSBzYW1wbGVzIC8gMikgLyAoc2FtcGxlcyAvIDIpICogc2lnbWE7XG59O1xuXG4vKipcbiAqIEdldCBhIG5vcm1hbGx5LWRpc3RyaWJ1dGVkIHJhbmRvbSBpbnRlZ2VyIGluIHRoZSBpbnRlcnZhbCBbbWluLCBtYXhdXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIEluY2x1c2l2ZSBtaW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXggSW5jbHVzaXZlIG1heFxuICogQHJldHVybiB7bnVtYmVyfSBBIG5vcm1hbGx5LWRpc3RyaWJ1dGVkIHJhbmRvbSBpbnRlZ2VyXG4gKi9cbmNvbnN0IGNsdFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4gTWF0aC5mbG9vcihtaW4gKyBjbHRSYW5kb20oMC41LCAwLjUsIDIpICogKG1heCArIDEgLSBtaW4pKTtcblxuLyoqXG4gKiBSZXR1cm4gYSB3ZWlnaHRlZCByYW5kb20gaW50ZWdlclxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSB3IEFuIGFycmF5IG9mIHdlaWdodHNcbiAqIEByZXR1cm4ge251bWJlcn0gQW4gaW5kZXggZnJvbSB3XG4gKi9cbmNvbnN0IHdlaWdodGVkUmFuZG9tID0gdyA9PiB7XG4gIGxldCB0b3RhbCA9IHcucmVkdWNlKChhLCBpKSA9PiBhICsgaSwgMCksIG4gPSAwO1xuICBjb25zdCByID0gTWF0aC5yYW5kb20oKSAqIHRvdGFsO1xuICB3aGlsZSAodG90YWwgPiByKSB7XG4gICAgdG90YWwgLT0gd1tuKytdO1xuICB9XG4gIHJldHVybiBuIC0gMTtcbn07XG5cbi8qKlxuICogQW4gaW50ZXJwb2xhdGlvbiBmdW5jdGlvblxuICogQGNhbGxiYWNrIGludGVycG9sYXRpb25DYWxsYmFja1xuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG1pbmltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYiBUaGUgbWF4aW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBpbnRlcnBvbGF0aW9uIHZhbHVlLCBzaG91bGQgYmUgaW4gdGhlIGludGVydmFsIFswLCAxXVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgaW50ZXJwb2xhdGVkIHZhbHVlIGluIHRoZSBpbnRlcnZhbCBbYSwgYl1cbiAqL1xuXG4vKipcbiAqIFJldHVybiBhbiBpbnRlcnBvbGF0ZWQgdmFsdWUgZnJvbSBhbiBhcnJheVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBhIEFuIGFycmF5IG9mIHZhbHVlcyBpbnRlcnBvbGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IGkgQSBudW1iZXIgaW4gdGhlIGludGVydmFsIFswLCAxXVxuICogQHBhcmFtIHtpbnRlcnBvbGF0aW9uQ2FsbGJhY2t9IFtmPU1hdGgubGVycF0gVGhlIGludGVycG9sYXRpb24gZnVuY3Rpb24gdG8gdXNlXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEFuIGludGVycG9sYXRlZCB2YWx1ZSBpbiB0aGUgaW50ZXJ2YWwgW21pbihhKSwgbWF4KGEpXVxuICovXG5jb25zdCBsZXJwQXJyYXkgPSAoYSwgaSwgZiA9IGxlcnApID0+IHtcbiAgY29uc3QgcyA9IGkgKiAoYS5sZW5ndGggLSAxKTtcbiAgY29uc3QgcCA9IGNsYW1wKE1hdGgudHJ1bmMocyksIDAsIGEubGVuZ3RoIC0gMSk7XG4gIHJldHVybiBmKGFbcF0gfHwgMCwgYVtwICsgMV0gfHwgMCwgZnJhYyhzKSk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlY3RvcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYSBWZWN0b3IgYVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGEg4oiZIGJcbiAqL1xuY29uc3QgZG90ID0gKGEsIGIpID0+IGEucmVkdWNlKChuLCB2LCBpKSA9PiBuICsgdiAqIGJbaV0sIDApO1xuXG4vKipcbiAqIEdldCB0aGUgZmFjdG9yaWFsIG9mIGEgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYVxuICogQHJldHVybiB7bnVtYmVyfSBhIVxuICovXG5jb25zdCBmYWN0b3JpYWwgPSBhID0+IHtcbiAgbGV0IHJlc3VsdCA9IDE7XG4gIGZvciAobGV0IGkgPSAyOyBpIDw9IGE7IGkrKykge1xuICAgIHJlc3VsdCAqPSBpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgbnVtYmVyIG9mIHBlcm11dGF0aW9ucyBvZiByIGVsZW1lbnRzIGZyb20gYSBzZXQgb2YgbiBlbGVtZW50c1xuICogQHBhcmFtIHtudW1iZXJ9IG5cbiAqIEBwYXJhbSB7bnVtYmVyfSByXG4gKiBAcmV0dXJuIHtudW1iZXJ9IG5QclxuICovXG5jb25zdCBwZXJtdXRhdGlvbiA9IChuLCByKSA9PiBmYWN0b3JpYWwobikgLyBmYWN0b3JpYWwobiAtIHIpO1xuXG4vKipcbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNvbWJpbmF0aW9ucyBvZiByIGVsZW1lbnRzIGZyb20gYSBzZXQgb2YgbiBlbGVtZW50c1xuICogQHBhcmFtIHtudW1iZXJ9IG5cbiAqIEBwYXJhbSB7bnVtYmVyfSByXG4gKiBAcmV0dXJuIHtudW1iZXJ9IG5DclxuICovXG5jb25zdCBjb21iaW5hdGlvbiA9IChuLCByKSA9PiBmYWN0b3JpYWwobikgLyAoZmFjdG9yaWFsKHIpICogZmFjdG9yaWFsKG4gLSByKSk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiBmb3IgZ2VuZXJhdGluZyBhcnJheSB2YWx1ZXNcbiAqIEBjYWxsYmFjayB0aW1lc0NhbGxiYWNrXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgYXJyYXkgaW5kZXhcbiAqIEByZXR1cm4geyp9IFRoZSBhcnJheSB2YWx1ZVxuICovXG5cbi8qKlxuICogUmV0dXJuIGEgbmV3IGFycmF5IHdpdGggbGVuZ3RoIG4gYnkgY2FsbGluZyBmdW5jdGlvbiBmKGkpIG9uIGVhY2ggZWxlbWVudFxuICogQHBhcmFtIHt0aW1lc0NhbGxiYWNrfSBmXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgc2l6ZSBvZiB0aGUgYXJyYXlcbiAqIEByZXR1cm4ge0FycmF5PCo+fVxuICovXG5jb25zdCB0aW1lcyA9IChmLCBuKSA9PiBBcnJheShuKS5maWxsKDApLm1hcCgoXywgaSkgPT4gZihpKSk7XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGNvbnRhaW5pbmcgbnVtYmVycyAwLT4obiAtIDEpXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgc2l6ZSBvZiB0aGUgYXJyYXlcbiAqIEByZXR1cm4ge0FycmF5PG51bWJlcj59IEFuIGFycmF5IG9mIGludGVnZXJzIDAtPihuIC0gMSlcbiAqL1xuY29uc3QgcmFuZ2UgPSBuID0+IHRpbWVzKGkgPT4gaSwgbik7XG5cbi8qKlxuICogWmlwIDIgYXJyYXlzIHRvZ2V0aGVyLCBpLmUuIChbMSwgMiwgM10sIFthLCBiLCBjXSkgPT4gW1sxLCBhXSwgWzIsIGJdLCBbMywgY11dXG4gKiBAcGFyYW0ge0FycmF5PCo+fSBhXG4gKiBAcGFyYW0ge0FycmF5PCo+fSBiXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTwqPj59XG4gKi9cbmNvbnN0IHppcCA9IChhLCBiKSA9PiBhLm1hcCgoaywgaSkgPT4gW2ssIGJbaV1dKTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXlbaV0gd2l0aCBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgd3JhcHBpbmdcbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBwb3NpdGl2ZWx5L25lZ2F0aXZlbHkgd3JhcHBlZCBhcnJheSBpbmRleFxuICogQHJldHVybiB7Kn0gQW4gZWxlbWVudCBmcm9tIHRoZSBhcnJheVxuICovXG5jb25zdCBhdCA9IChhLCBpKSA9PiBhW2kgPCAwID8gYS5sZW5ndGggLSAoTWF0aC5hYnMoaSArIDEpICUgYS5sZW5ndGgpIC0gMSA6IGkgJSBhLmxlbmd0aF07XG5cbi8qKlxuICogQ2hvcCBhbiBhcnJheSBpbnRvIGNodW5rcyBvZiBzaXplIG5cbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBjaHVuayBzaXplXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTwqPj59IEFuIGFycmF5IG9mIGFycmF5IGNodW5rc1xuICovXG5jb25zdCBjaHVuayA9IChhLCBuKSA9PiB0aW1lcyhpID0+IGEuc2xpY2UoaSAqIG4sIGkgKiBuICsgbiksIE1hdGguY2VpbChhLmxlbmd0aCAvIG4pKTtcblxuLyoqXG4gKiBSYW5kb21seSBzaHVmZmxlIGEgc2hhbGxvdyBjb3B5IG9mIGFuIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5PCo+fSBhXG4gKiBAcmV0dXJuIHtBcnJheTwqPn0gVGhlIHNodWZmbGVkIGFycmF5XG4gKi9cbmNvbnN0IHNodWZmbGUgPSBhID0+IGEuc2xpY2UoKS5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZmxvYXRFcXVhbHMsXG4gICAgY2xhbXAsXG4gICAgZnJhYyxcbiAgICBsZXJwLFxuICAgIHVubGVycCxcbiAgICBibGVycCxcbiAgICByZW1hcCxcbiAgICBzbW9vdGhzdGVwLFxuICAgIHJhZGlhbnMsXG4gICAgZGVncmVlcyxcbiAgICByYW5kb21CZXR3ZWVuLFxuICAgIHJhbmRvbUludEJldHdlZW4sXG4gICAgY2x0UmFuZG9tLFxuICAgIGNsdFJhbmRvbUludCxcbiAgICB3ZWlnaHRlZFJhbmRvbSxcbiAgICBsZXJwQXJyYXksXG4gICAgZG90LFxuICAgIGZhY3RvcmlhbCxcbiAgICBwZXJtdXRhdGlvbixcbiAgICBjb21iaW5hdGlvbixcbiAgICB0aW1lcyxcbiAgICByYW5nZSxcbiAgICB6aXAsXG4gICAgYXQsXG4gICAgY2h1bmssXG4gICAgc2h1ZmZsZSxcbiAgfTtcbn1cbiIsImNvbnN0IHsgdGltZXMsIGNodW5rLCBkb3QgfSA9IHJlcXVpcmUoJ0BiYXNlbWVudHVuaXZlcnNlL3V0aWxzJyk7XG5cbi8qKlxuICogQG92ZXJ2aWV3IEEgbGlicmFyeSBvZiB1c2VmdWwgZnVuY3Rpb25zXG4gKiBAYXV0aG9yIEdvcmRvbiBMYXJyaWdhblxuICovXG5cbi8qKlxuICogQSAyZCB2ZWN0b3JcbiAqIEB0eXBlZGVmIHtPYmplY3R9IHZlY1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHggVGhlIHggY29tcG9uZW50IG9mIHRoZSB2ZWN0b3JcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB5IFRoZSB5IGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdmVjdG9yXG4gKiBAcGFyYW0ge251bWJlcnx2ZWN9IFt4XSBUaGUgeCBjb21wb25lbnQgb2YgdGhlIHZlY3Rvciwgb3IgYSB2ZWN0b3IgdG8gY29weVxuICogQHBhcmFtIHtudW1iZXJ9IFt5XSBUaGUgeSBjb21wb25lbnQgb2YgdGhlIHZlY3RvclxuICogQHJldHVybiB7dmVjfSBBIG5ldyB2ZWN0b3JcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlZhcmlvdXMgd2F5cyB0byBpbml0aWFsaXNlIGEgdmVjdG9yPC9jYXB0aW9uPlxuICogbGV0IGEgPSB2ZWMoMywgMik7ICAvLyAoMywgMilcbiAqIGxldCBiID0gdmVjKDQpOyAgICAgLy8gKDQsIDQpXG4gKiBsZXQgYyA9IHZlYyhhKTsgICAgIC8vICgzLCAyKVxuICogbGV0IGQgPSB2ZWMoKTsgICAgICAvLyAoMCwgMClcbiAqL1xuY29uc3QgdmVjID0gKHgsIHkpID0+ICgheCAmJiAheSA/XG4gIHsgeDogMCwgeTogMCB9IDogKHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/XG4gICAgeyB4OiB4LnggfHwgMCwgeTogeC55IHx8IDAgfSA6ICh5ID09PSBudWxsIHx8IHkgPT09IHVuZGVmaW5lZCA/XG4gICAgICB7IHg6IHgsIHk6IHggfSA6IHsgeDogeCwgeTogeSB9KVxuICApXG4pO1xuXG4vKipcbiAqIEdldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlY3RvciBhcyBhbiBhcnJheVxuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byBnZXQgY29tcG9uZW50cyBmcm9tXG4gKiBAcmV0dXJuIHtBcnJheTxudW1iZXI+fSBUaGUgdmVjdG9yIGNvbXBvbmVudHMgYXMgYW4gYXJyYXlcbiAqL1xudmVjLmNvbXBvbmVudHMgPSBhID0+IFthLngsIGEueV07XG5cbi8qKlxuICogUmV0dXJuIGEgdW5pdCB2ZWN0b3IgKDEsIDApXG4gKiBAcmV0dXJuIHt2ZWN9IEEgdW5pdCB2ZWN0b3IgKDEsIDApXG4gKi9cbnZlYy51eCA9ICgpID0+IHZlYygxLCAwKTtcblxuLyoqXG4gKiBSZXR1cm4gYSB1bml0IHZlY3RvciAoMCwgMSlcbiAqIEByZXR1cm4ge3ZlY30gQSB1bml0IHZlY3RvciAoMCwgMSlcbiAqL1xudmVjLnV5ID0gKCkgPT4gdmVjKDAsIDEpO1xuXG4vKipcbiAqIEFkZCB2ZWN0b3JzXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHBhcmFtIHt2ZWN9IGIgVmVjdG9yIGJcbiAqIEByZXR1cm4ge3ZlY30gYSArIGJcbiAqL1xudmVjLmFkZCA9IChhLCBiKSA9PiAoeyB4OiBhLnggKyBiLngsIHk6IGEueSArIGIueSB9KTtcblxuLyoqXG4gKiBTY2FsZSBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIFNjYWxhciBiXG4gKiBAcmV0dXJuIHt2ZWN9IGEgKiBiXG4gKi9cbnZlYy5tdWwgPSAoYSwgYikgPT4gKHsgeDogYS54ICogYiwgeTogYS55ICogYiB9KTtcblxuLyoqXG4gKiBTdWJ0cmFjdCB2ZWN0b3JzXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHBhcmFtIHt2ZWN9IGIgVmVjdG9yIGJcbiAqIEByZXR1cm4ge3ZlY30gYSAtIGJcbiAqL1xudmVjLnN1YiA9IChhLCBiKSA9PiAoeyB4OiBhLnggLSBiLngsIHk6IGEueSAtIGIueSB9KTtcblxuLyoqXG4gKiBHZXQgdGhlIGxlbmd0aCBvZiBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEByZXR1cm4ge251bWJlcn0gfGF8XG4gKi9cbnZlYy5sZW4gPSBhID0+IE1hdGguc3FydChhLnggKiBhLnggKyBhLnkgKiBhLnkpO1xuXG4vKipcbiAqIEdldCB0aGUgbGVuZ3RoIG9mIGEgdmVjdG9yIHVzaW5nIHRheGljYWIgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHxhfFxuICovXG52ZWMubWFuaGF0dGFuID0gYSA9PiBNYXRoLmFicyhhLngpICsgTWF0aC5hYnMoYS55KTtcblxuLyoqXG4gKiBOb3JtYWxpc2UgYSB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjfSBhIFRoZSB2ZWN0b3IgdG8gbm9ybWFsaXNlXG4gKiBAcmV0dXJuIHt2ZWN9IF5hXG4gKi9cbnZlYy5ub3IgPSBhID0+IHtcbiAgbGV0IGxlbiA9IHZlYy5sZW4oYSk7XG4gIHJldHVybiBsZW4gPyB7IHg6IGEueCAvIGxlbiwgeTogYS55IC8gbGVuIH0gOiB2ZWMoKTtcbn07XG5cbi8qKlxuICogR2V0IGEgZG90IHByb2R1Y3Qgb2YgdmVjdG9yc1xuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjfSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGEg4oiZIGJcbiAqL1xudmVjLmRvdCA9IChhLCBiKSA9PiBhLnggKiBiLnggKyBhLnkgKiBiLnk7XG5cbi8qKlxuICogUm90YXRlIGEgdmVjdG9yIGJ5IHIgcmFkaWFuc1xuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byByb3RhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSByIFRoZSBhbmdsZSB0byByb3RhdGUgYnksIG1lYXN1cmVkIGluIHJhZGlhbnNcbiAqIEByZXR1cm4ge3ZlY30gQSByb3RhdGVkIHZlY3RvclxuICovXG52ZWMucm90ID0gKGEsIHIpID0+IHtcbiAgbGV0IHMgPSBNYXRoLnNpbihyKSxcbiAgICBjID0gTWF0aC5jb3Mocik7XG4gIHJldHVybiB7IHg6IGMgKiBhLnggLSBzICogYS55LCB5OiBzICogYS54ICsgYyAqIGEueSB9O1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHR3byB2ZWN0b3JzIGFyZSBlcXVhbFxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjfSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHZlY3RvcnMgYSBhbmQgYiBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZVxuICovXG52ZWMuZXEgPSAoYSwgYikgPT4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnk7XG5cbi8qKlxuICogR2V0IHRoZSBhbmdsZSBvZiBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFuZ2xlIG9mIHZlY3RvciBhIGluIHJhZGlhbnNcbiAqL1xudmVjLnJhZCA9IGEgPT4gTWF0aC5hdGFuMihhLnksIGEueCk7XG5cbi8qKlxuICogQ29weSBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byBjb3B5XG4gKiBAcmV0dXJuIHt2ZWN9IEEgY29weSBvZiB2ZWN0b3IgYVxuICovXG52ZWMuY3B5ID0gYSA9PiB2ZWMoYSk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggY29tcG9uZW50IG9mIGEgdmVjdG9yXG4gKiBAY2FsbGJhY2sgdmVjdG9yTWFwQ2FsbGJhY2tcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBUaGUgY29tcG9uZW50IHZhbHVlXG4gKiBAcGFyYW0geyd4JyB8ICd5J30gbGFiZWwgVGhlIGNvbXBvbmVudCBsYWJlbCAoeCBvciB5KVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbWFwcGVkIGNvbXBvbmVudFxuICovXG5cbi8qKlxuICogQ2FsbCBhIGZ1bmN0aW9uIG9uIGVhY2ggY29tcG9uZW50IG9mIGEgdmVjdG9yIGFuZCBidWlsZCBhIG5ldyB2ZWN0b3IgZnJvbSB0aGUgcmVzdWx0c1xuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjdG9yTWFwQ2FsbGJhY2t9IGYgVGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBjb21wb25lbnQgb2YgdGhlIHZlY3RvclxuICogQHJldHVybiB7dmVjfSBWZWN0b3IgYSBtYXBwZWQgdGhyb3VnaCBmXG4gKi9cbnZlYy5tYXAgPSAoYSwgZikgPT4gKHsgeDogZihhLngsICd4JyksIHk6IGYoYS55LCAneScpIH0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSB2ZWN0b3IgaW50byBhIHN0cmluZ1xuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byBjb252ZXJ0XG4gKiBAcGFyYW0ge3N0cmluZ30gW3M9JywgJ10gVGhlIHNlcGFyYXRvciBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ30gQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMuc3RyID0gKGEsIHMgPSAnLCAnKSA9PiBgJHthLnh9JHtzfSR7YS55fWA7XG5cbi8qKlxuICogQSBtYXRyaXhcbiAqIEB0eXBlZGVmIHtPYmplY3R9IG1hdFxuICogQHByb3BlcnR5IHtudW1iZXJ9IG0gVGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBtYXRyaXhcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgbWF0cml4XG4gKiBAcHJvcGVydHkge0FycmF5PG51bWJlcj59IGVudHJpZXMgVGhlIG1hdHJpeCB2YWx1ZXNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBtYXRyaXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbT00XSBUaGUgbnVtYmVyIG9mIHJvd3NcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbj00XSBUaGUgbnVtYmVyIG9mIGNvbHVtbnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW2VudHJpZXM9W11dIE1hdHJpeCB2YWx1ZXMgaW4gcmVhZGluZyBvcmRlclxuICogQHJldHVybiB7bWF0fSBBIG5ldyBtYXRyaXhcbiAqL1xuY29uc3QgbWF0ID0gKG0gPSA0LCBuID0gNCwgZW50cmllcyA9IFtdKSA9PiAoe1xuICBtLCBuLFxuICBlbnRyaWVzOiBlbnRyaWVzLmNvbmNhdChBcnJheShtICogbikuZmlsbCgwKSkuc2xpY2UoMCwgbSAqIG4pXG59KTtcblxuLyoqXG4gKiBHZXQgYW4gaWRlbnRpdHkgbWF0cml4IG9mIHNpemUgblxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIHNpemUgb2YgdGhlIG1hdHJpeFxuICogQHJldHVybiB7bWF0fSBBbiBpZGVudGl0eSBtYXRyaXhcbiAqL1xubWF0LmlkZW50aXR5ID0gbiA9PiBtYXQobiwgbiwgQXJyYXkobiAqIG4pLmZpbGwoMCkubWFwKCh2LCBpKSA9PiArKE1hdGguZmxvb3IoaSAvIG4pID09PSBpICUgbikpKTtcblxuLyoqXG4gKiBHZXQgYW4gZW50cnkgZnJvbSBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSByb3cgb2Zmc2V0XG4gKiBAcGFyYW0ge251bWJlcn0gaiBUaGUgY29sdW1uIG9mZnNldFxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgdmFsdWUgYXQgcG9zaXRpb24gKGksIGopIGluIG1hdHJpeCBhXG4gKi9cbm1hdC5nZXQgPSAoYSwgaSwgaikgPT4gYS5lbnRyaWVzWyhqIC0gMSkgKyAoaSAtIDEpICogYS5uXTtcblxuLyoqXG4gKiBTZXQgYW4gZW50cnkgb2YgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgcm93IG9mZnNldFxuICogQHBhcmFtIHtudW1iZXJ9IGogVGhlIGNvbHVtbiBvZmZzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSB2IFRoZSB2YWx1ZSB0byBzZXQgaW4gbWF0cml4IGFcbiAqL1xubWF0LnNldCA9IChhLCBpLCBqLCB2KSA9PiB7IGEuZW50cmllc1soaiAtIDEpICsgKGkgLSAxKSAqIGEubl0gPSB2OyB9O1xuXG4vKipcbiAqIEdldCBhIHJvdyBmcm9tIGEgbWF0cml4IGFzIGFuIGFycmF5XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IG0gVGhlIHJvdyBvZmZzZXRcbiAqIEByZXR1cm4ge0FycmF5PG51bWJlcj59IFJvdyBtIGZyb20gbWF0cml4IGFcbiAqL1xubWF0LnJvdyA9IChhLCBtKSA9PiB7XG4gIGNvbnN0IHMgPSAobSAtIDEpICogYS5uO1xuICByZXR1cm4gYS5lbnRyaWVzLnNsaWNlKHMsIHMgKyBhLm4pO1xufTtcblxuLyoqXG4gKiBHZXQgYSBjb2x1bW4gZnJvbSBhIG1hdHJpeCBhcyBhbiBhcnJheVxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBjb2x1bW4gb2Zmc2V0XG4gKiBAcmV0dXJuIHtBcnJheTxudW1iZXI+fSBDb2x1bW4gbiBmcm9tIG1hdHJpeCBhXG4gKi9cbm1hdC5jb2wgPSAoYSwgbikgPT4gdGltZXMoaSA9PiBtYXQuZ2V0KGEsIChpICsgMSksIG4pLCBhLm0pO1xuXG4vKipcbiAqIEFkZCBtYXRyaWNlc1xuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bWF0fSBiIE1hdHJpeCBiXG4gKiBAcmV0dXJuIHttYXR9IGEgKyBiXG4gKi9cbm1hdC5hZGQgPSAoYSwgYikgPT4gYS5tID09PSBiLm0gJiYgYS5uID09PSBiLm4gJiYgbWF0Lm1hcChhLCAodiwgaSkgPT4gdiArIGIuZW50cmllc1tpXSk7XG5cbi8qKlxuICogU3VidHJhY3QgbWF0cmljZXNcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge21hdH0gYiBNYXRyaXggYlxuICogQHJldHVybiB7bWF0fSBhIC0gYlxuICovXG5tYXQuc3ViID0gKGEsIGIpID0+IGEubSA9PT0gYi5tICYmIGEubiA9PT0gYi5uICYmIG1hdC5tYXAoYSwgKHYsIGkpID0+IHYgLSBiLmVudHJpZXNbaV0pO1xuXG4vKipcbiAqIE11bHRpcGx5IG1hdHJpY2VzXG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHttYXR9IGIgTWF0cml4IGJcbiAqIEByZXR1cm4ge21hdHxib29sZWFufSBhYiBvciBmYWxzZSBpZiB0aGUgbWF0cmljZXMgY2Fubm90IGJlIG11bHRpcGxpZWRcbiAqL1xubWF0Lm11bCA9IChhLCBiKSA9PiB7XG4gIGlmIChhLm4gIT09IGIubSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgY29uc3QgcmVzdWx0ID0gbWF0KGEubSwgYi5uKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gYS5tOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8PSBiLm47IGorKykge1xuICAgICAgbWF0LnNldChyZXN1bHQsIGksIGosIGRvdChtYXQucm93KGEsIGkpLCBtYXQuY29sKGIsIGopKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFNjYWxlIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IGIgU2NhbGFyIGJcbiAqIEByZXR1cm4ge21hdH0gYSAqIGJcbiAqL1xubWF0LnNjYWxlID0gKGEsIGIpID0+IG1hdC5tYXAoYSwgdiA9PiB2ICogYik7XG5cbi8qKlxuICogVHJhbnNwb3NlIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBUaGUgbWF0cml4IHRvIHRyYW5zcG9zZVxuICogQHJldHVybiB7bWF0fSBBIHRyYW5zcG9zZWQgbWF0cml4XG4gKi9cbm1hdC50cmFucyA9IGEgPT4gbWF0KGEubiwgYS5tLCB0aW1lcyhpID0+IG1hdC5jb2woYSwgKGkgKyAxKSksIGEubikuZmxhdCgpKTtcblxuLyoqXG4gKiBHZXQgdGhlIG1pbm9yIG9mIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIHJvdyBvZmZzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIFRoZSBjb2x1bW4gb2Zmc2V0XG4gKiBAcmV0dXJuIHttYXR8Ym9vbGVhbn0gVGhlIChpLCBqKSBtaW5vciBvZiBtYXRyaXggYSBvciBmYWxzZSBpZiB0aGUgbWF0cml4IGlzIG5vdCBzcXVhcmVcbiAqL1xubWF0Lm1pbm9yID0gKGEsIGksIGopID0+IHtcbiAgaWYgKGEubSAhPT0gYS5uKSB7IHJldHVybiBmYWxzZTsgfVxuICBjb25zdCBlbnRyaWVzID0gW107XG4gIGZvciAobGV0IGlpID0gMTsgaWkgPD0gYS5tOyBpaSsrKSB7XG4gICAgaWYgKGlpID09PSBpKSB7IGNvbnRpbnVlOyB9XG4gICAgZm9yIChsZXQgamogPSAxOyBqaiA8PSBhLm47IGpqKyspIHtcbiAgICAgIGlmIChqaiA9PT0gaikgeyBjb250aW51ZTsgfVxuICAgICAgZW50cmllcy5wdXNoKG1hdC5nZXQoYSwgaWksIGpqKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXQoYS5tIC0gMSwgYS5uIC0gMSwgZW50cmllcyk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcmV0dXJuIHtudW1iZXJ8Ym9vbGVhbn0gfGF8IG9yIGZhbHNlIGlmIHRoZSBtYXRyaXggaXMgbm90IHNxdWFyZVxuICovXG5tYXQuZGV0ID0gYSA9PiB7XG4gIGlmIChhLm0gIT09IGEubikgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGEubSA9PT0gMSkge1xuICAgIHJldHVybiBhLmVudHJpZXNbMF07XG4gIH1cbiAgaWYgKGEubSA9PT0gMikge1xuICAgIHJldHVybiBhLmVudHJpZXNbMF0gKiBhLmVudHJpZXNbM10gLSBhLmVudHJpZXNbMV0gKiBhLmVudHJpZXNbMl07XG4gIH1cbiAgbGV0IHRvdGFsID0gMCwgc2lnbiA9IDE7XG4gIGZvciAobGV0IGogPSAxOyBqIDw9IGEubjsgaisrKSB7XG4gICAgdG90YWwgKz0gc2lnbiAqIGEuZW50cmllc1tqIC0gMV0gKiBtYXQuZGV0KG1hdC5taW5vcihhLCAxLCBqKSk7XG4gICAgc2lnbiAqPSAtMTtcbiAgfVxuICByZXR1cm4gdG90YWw7XG59O1xuXG4vKipcbiAqIE5vcm1hbGlzZSBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgVGhlIG1hdHJpeCB0byBub3JtYWxpc2VcbiAqIEByZXR1cm4ge21hdHxib29sZWFufSBeYSBvciBmYWxzZSBpZiB0aGUgbWF0cml4IGlzIG5vdCBzcXVhcmVcbiAqL1xubWF0Lm5vciA9IGEgPT4ge1xuICBpZiAoYS5tICE9PSBhLm4pIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGNvbnN0IGQgPSBtYXQuZGV0KGEpO1xuICByZXR1cm4gbWF0Lm1hcChhLCBpID0+IGkgKiBkKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgVGhlIG1hdHJpeCBmcm9tIHdoaWNoIHRvIGdldCB0aGUgYWRqdWdhdGVcbiAqIEByZXR1cm4ge21hdH0gVGhlIGFkanVnYXRlIG9mIGFcbiAqL1xubWF0LmFkaiA9IGEgPT4ge1xuICBjb25zdCBtaW5vcnMgPSBtYXQoYS5tLCBhLm4pO1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSBhLm07IGkrKykge1xuICAgIGZvciAobGV0IGogPSAxOyBqIDw9IGEubjsgaisrKSB7XG4gICAgICBtYXQuc2V0KG1pbm9ycywgaSwgaiwgbWF0LmRldChtYXQubWlub3IoYSwgaSwgaikpKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgY29mYWN0b3JzID0gbWF0Lm1hcChtaW5vcnMsICh2LCBpKSA9PiB2ICogKGkgJSAyID8gLTEgOiAxKSk7XG4gIHJldHVybiBtYXQudHJhbnMoY29mYWN0b3JzKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBpbnZlcnNlIG9mIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBUaGUgbWF0cml4IHRvIGludmVydFxuICogQHJldHVybiB7bWF0fGJvb2xlYW59IGFeLTEgb3IgZmFsc2UgaWYgdGhlIG1hdHJpeCBoYXMgbm8gaW52ZXJzZVxuICovXG5tYXQuaW52ID0gYSA9PiB7XG4gIGlmIChhLm0gIT09IGEubikgeyByZXR1cm4gZmFsc2U7IH1cbiAgY29uc3QgZCA9IG1hdC5kZXQoYSk7XG4gIGlmIChkID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICByZXR1cm4gbWF0LnNjYWxlKG1hdC5hZGooYSksIDEgLyBkKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdHdvIG1hdHJpY2VzIGFyZSBlcXVhbFxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bWF0fSBiIE1hdHJpeCBiXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1hdHJpY2VzIGEgYW5kIGIgYXJlIGlkZW50aWNhbCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbm1hdC5lcSA9IChhLCBiKSA9PiBhLm0gPT09IGIubSAmJiBhLm4gPT09IGIubiAmJiBtYXQuc3RyKGEpID09PSBtYXQuc3RyKGIpO1xuXG4vKipcbiAqIENvcHkgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIFRoZSBtYXRyaXggdG8gY29weVxuICogQHJldHVybiB7bWF0fSBBIGNvcHkgb2YgbWF0cml4IGFcbiAqL1xubWF0LmNweSA9IGEgPT4gbWF0KGEubSwgYS5uLCBbLi4uYS5lbnRyaWVzXSk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggZW50cnkgb2YgYSBtYXRyaXhcbiAqIEBjYWxsYmFjayBtYXRyaXhNYXBDYWxsYmFja1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFRoZSBlbnRyeSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFRoZSBlbnRyeSBpbmRleFxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBlbnRyaWVzIFRoZSBhcnJheSBvZiBtYXRyaXggZW50cmllc1xuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbWFwcGVkIGVudHJ5XG4gKi9cblxuLyoqXG4gKiBDYWxsIGEgZnVuY3Rpb24gb24gZWFjaCBlbnRyeSBvZiBhIG1hdHJpeCBhbmQgYnVpbGQgYSBuZXcgbWF0cml4IGZyb20gdGhlIHJlc3VsdHNcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge21hdHJpeE1hcENhbGxiYWNrfSBmIFRoZSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggZW50cnkgb2YgdGhlIG1hdHJpeFxuICogQHJldHVybiB7bWF0fSBNYXRyaXggYSBtYXBwZWQgdGhyb3VnaCBmXG4gKi9cbm1hdC5tYXAgPSAoYSwgZikgPT4gbWF0KGEubSwgYS5uLCBhLmVudHJpZXMubWFwKGYpKTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgbWF0cml4IGludG8gYSBzdHJpbmdcbiAqIEBwYXJhbSB7bWF0fSBhIFRoZSBtYXRyaXggdG8gY29udmVydFxuICogQHBhcmFtIHtzdHJpbmd9IFttcz0nLCAnXSBUaGUgc2VwYXJhdG9yIHN0cmluZyBmb3IgY29sdW1uc1xuICogQHBhcmFtIHtzdHJpbmd9IFtucz0nXFxuJ10gVGhlIHNlcGFyYXRvciBzdHJpbmcgZm9yIHJvd3NcbiAqIEByZXR1cm4ge3N0cmluZ30gQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQuc3RyID0gKGEsIG1zID0gJywgJywgbnMgPSAnXFxuJykgPT4gY2h1bmsoYS5lbnRyaWVzLCBhLm4pLm1hcChyID0+IHIuam9pbihtcykpLmpvaW4obnMpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7IHZlYywgbWF0IH07XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB2ZWNfMSA9IHJlcXVpcmUoXCJAYmFzZW1lbnR1bml2ZXJzZS92ZWNcIik7XG5jbGFzcyBJbnB1dE1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5rZXlib2FyZFN0YXRlID0ge307XG4gICAgICAgIHRoaXMucHJldmlvdXNLZXlib2FyZFN0YXRlID0ge307XG4gICAgICAgIHRoaXMubW91c2VTdGF0ZSA9IHsgYnV0dG9uOiBmYWxzZSwgcG9zaXRpb246ICgwLCB2ZWNfMS52ZWMpKCksIHdoZWVsOiAwIH07XG4gICAgICAgIHRoaXMucHJldmlvdXNNb3VzZVN0YXRlID0geyBidXR0b246IGZhbHNlLCBwb3NpdGlvbjogKDAsIHZlY18xLnZlYykoKSwgd2hlZWw6IDAgfTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgSW5wdXRNYW5hZ2VyLmRlZmF1bHRPcHRpb25zLCBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCA/IG9wdGlvbnMgOiB7fSk7XG4gICAgICAgIC8vIFNldCB1cCBldmVudCBoYW5kbGVyc1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1vdXNlKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VTdGF0ZS5idXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlU3RhdGUuYnV0dG9uID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubW91c2VTdGF0ZS5idXR0b24gPSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZVN0YXRlLmJ1dHRvbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZVN0YXRlLnBvc2l0aW9uLnggPSBlLm9mZnNldFg7XG4gICAgICAgICAgICAgICAgdGhpcy5tb3VzZVN0YXRlLnBvc2l0aW9uLnkgPSBlLm9mZnNldFk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubW91c2VXaGVlbCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdXNlU3RhdGUud2hlZWwgPSBlLmRlbHRhWSA+IDAgPyAxIDogLTE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleWJvYXJkU3RhdGVbZS5jb2RlXSA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMua2V5Ym9hcmRTdGF0ZVtlLmNvZGVdID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXNlIHRoZSBpbnB1dCBtYW5hZ2VyIGZvciBtYW5hZ2luZyBtb3VzZSBhbmQga2V5Ym9hcmQgaW5wdXRcbiAgICAgKi9cbiAgICBzdGF0aWMgaW5pdGlhbGlzZShvcHRpb25zKSB7XG4gICAgICAgIGlmIChJbnB1dE1hbmFnZXIuaW5zdGFuY2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBtYW5hZ2VyIGFscmVhZHkgaW5pdGlhbGlzZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBJbnB1dE1hbmFnZXIuaW5zdGFuY2UgPSBuZXcgSW5wdXRNYW5hZ2VyKG9wdGlvbnMpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmIChJbnB1dE1hbmFnZXIuaW5zdGFuY2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnB1dCBtYW5hZ2VyIG5vdCBwcm9wZXJseSBpbml0aWFsaXNlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBJbnB1dE1hbmFnZXIuaW5zdGFuY2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgc3RhdGUgb2YgdGhlIGlucHV0IGRldmljZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgdXBkYXRlKCkge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICBpbnN0YW5jZS5wcmV2aW91c0tleWJvYXJkU3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBpbnN0YW5jZS5rZXlib2FyZFN0YXRlKTtcbiAgICAgICAgaW5zdGFuY2UucHJldmlvdXNNb3VzZVN0YXRlID0ge1xuICAgICAgICAgICAgLi4uaW5zdGFuY2UubW91c2VTdGF0ZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB2ZWNfMS52ZWMuY3B5KGluc3RhbmNlLm1vdXNlU3RhdGUucG9zaXRpb24pLFxuICAgICAgICB9O1xuICAgICAgICBpbnN0YW5jZS5tb3VzZVN0YXRlLndoZWVsID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSBrZXkgaXMgY3VycmVudGx5IHByZXNzZWQgZG93blxuICAgICAqL1xuICAgIHN0YXRpYyBrZXlEb3duKGNvZGUpIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBJbnB1dE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgYW55IGtleSBpcyBkb3duXG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrIGluIGluc3RhbmNlLmtleWJvYXJkU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZVtrXSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEhaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZVtjb2RlXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSBrZXkgaGFzIGJlZW4gcHJlc3NlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZVxuICAgICAqL1xuICAgIHN0YXRpYyBrZXlQcmVzc2VkKGNvZGUpIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBJbnB1dE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgLy8gQ2hlY2sgaWYgYW55IGtleSB3YXMgcHJlc3NlZFxuICAgICAgICBpZiAoIWNvZGUpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgayBpbiBpbnN0YW5jZS5rZXlib2FyZFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluc3RhbmNlLmtleWJvYXJkU3RhdGVba10gJiZcbiAgICAgICAgICAgICAgICAgICAgKCEoayBpbiBpbnN0YW5jZS5wcmV2aW91c0tleWJvYXJkU3RhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAhaW5zdGFuY2UucHJldmlvdXNLZXlib2FyZFN0YXRlW2tdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEhaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZVtjb2RlXSAmJiAhaW5zdGFuY2UucHJldmlvdXNLZXlib2FyZFN0YXRlW2NvZGVdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhIGtleSBoYXMgYmVlbiByZWxlYXNlZCBzaW5jZSB0aGUgbGFzdCBmcmFtZVxuICAgICAqL1xuICAgIHN0YXRpYyBrZXlSZWxlYXNlZChjb2RlKSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIC8vIENoZWNrIGlmIGFueSBrZXkgd2FzIHJlbGVhc2VkXG4gICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrIGluIGluc3RhbmNlLmtleWJvYXJkU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWluc3RhbmNlLmtleWJvYXJkU3RhdGVba10gJiZcbiAgICAgICAgICAgICAgICAgICAgISFpbnN0YW5jZS5wcmV2aW91c0tleWJvYXJkU3RhdGVba10pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhaW5zdGFuY2Uua2V5Ym9hcmRTdGF0ZVtjb2RlXSAmJiAhIWluc3RhbmNlLnByZXZpb3VzS2V5Ym9hcmRTdGF0ZVtjb2RlXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSBtb3VzZSBidXR0b24gaXMgY3VycmVudGx5IHByZXNzZWQgZG93blxuICAgICAqL1xuICAgIHN0YXRpYyBtb3VzZURvd24oKSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHJldHVybiAhIWluc3RhbmNlLm1vdXNlU3RhdGUuYnV0dG9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhIG1vdXNlIGJ1dHRvbiBoYXMgYmVlbiBwcmVzc2VkIHNpbmNlIHRoZSBsYXN0IGZyYW1lXG4gICAgICovXG4gICAgc3RhdGljIG1vdXNlUHJlc3NlZCgpIHtcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBJbnB1dE1hbmFnZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgcmV0dXJuICEhaW5zdGFuY2UubW91c2VTdGF0ZS5idXR0b24gJiYgIWluc3RhbmNlLnByZXZpb3VzTW91c2VTdGF0ZS5idXR0b247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgbW91c2UgYnV0dG9uIGhhcyBiZWVuIHJlbGVhc2VkIHNpbmNlIHRoZSBsYXN0IGZyYW1lXG4gICAgICovXG4gICAgc3RhdGljIG1vdXNlUmVsZWFzZWQoKSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHJldHVybiAhaW5zdGFuY2UubW91c2VTdGF0ZS5idXR0b24gJiYgISFpbnN0YW5jZS5wcmV2aW91c01vdXNlU3RhdGUuYnV0dG9uO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgbW91c2V3aGVlbCBpcyBzY3JvbGxpbmcgdXBcbiAgICAgKi9cbiAgICBzdGF0aWMgbW91c2VXaGVlbFVwKCkge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UubW91c2VTdGF0ZS53aGVlbCA+IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBtb3VzZXdoZWVsIGlzIHNjcm9sbGluZyBkb3duXG4gICAgICovXG4gICAgc3RhdGljIG1vdXNlV2hlZWxEb3duKCkge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IElucHV0TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UubW91c2VTdGF0ZS53aGVlbCA8IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBtb3VzZSBwb3NpdGlvbiBpbiBzY3JlZW4tc3BhY2VcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IG1vdXNlUG9zaXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gSW5wdXRNYW5hZ2VyLmdldEluc3RhbmNlKCk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZS5tb3VzZVN0YXRlLnBvc2l0aW9uO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IElucHV0TWFuYWdlcjtcbklucHV0TWFuYWdlci5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBtb3VzZTogdHJ1ZSxcbiAgICBtb3VzZVdoZWVsOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaWFXNWtaWGd1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sY3lJNld5SXVMaTlwYm1SbGVDNTBjeUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQkxDdERRVUUwUXp0QlFUWkNOVU1zVFVGQmNVSXNXVUZCV1R0SlFXMUNMMElzV1VGQmIwSXNUMEZCSzBJN1VVRlNNME1zYTBKQlFXRXNSMEZCYTBJc1JVRkJSU3hEUVVGRE8xRkJSV3hETERCQ1FVRnhRaXhIUVVGclFpeEZRVUZGTEVOQlFVTTdVVUZGTVVNc1pVRkJWU3hIUVVGbExFVkJRVVVzVFVGQlRTeEZRVUZGTEV0QlFVc3NSVUZCUlN4UlFVRlJMRVZCUVVVc1NVRkJRU3hUUVVGSExFZEJRVVVzUlVGQlJTeExRVUZMTEVWQlFVVXNRMEZCUXl4RlFVRkZMRU5CUVVNN1VVRkZkRVVzZFVKQlFXdENMRWRCUVdVc1JVRkJSU3hOUVVGTkxFVkJRVVVzUzBGQlN5eEZRVUZGTEZGQlFWRXNSVUZCUlN4SlFVRkJMRk5CUVVjc1IwRkJSU3hGUVVGRkxFdEJRVXNzUlVGQlJTeERRVUZETEVWQlFVVXNRMEZCUXp0UlFVZHdSaXhKUVVGSkxFTkJRVU1zVDBGQlR5eEhRVUZITEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNc1JVRkJSU3hGUVVGRkxGbEJRVmtzUTBGQlF5eGpRVUZqTEVWQlFVVXNUMEZCVHl4aFFVRlFMRTlCUVU4c1kwRkJVQ3hQUVVGUExFZEJRVWtzUlVGQlJTeERRVUZETEVOQlFVTTdVVUZGTjBVc2QwSkJRWGRDTzFGQlEzaENMRWxCUVVrc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eExRVUZMTEVWQlFVVTdXVUZEZEVJc1RVRkJUU3hEUVVGRExHZENRVUZuUWl4RFFVRkRMRmRCUVZjc1JVRkJSU3hIUVVGSExFVkJRVVU3WjBKQlEzaERMRWxCUVVrc1EwRkJReXhWUVVGVkxFTkJRVU1zVFVGQlRTeEhRVUZITEVsQlFVa3NRMEZCUXp0WlFVTm9ReXhEUVVGRExFTkJRVU1zUTBGQlF6dFpRVU5JTEUxQlFVMHNRMEZCUXl4blFrRkJaMElzUTBGQlF5eFRRVUZUTEVWQlFVVXNSMEZCUnl4RlFVRkZPMmRDUVVOMFF5eEpRVUZKTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTFCUVUwc1IwRkJSeXhMUVVGTExFTkJRVU03V1VGRGFrTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1dVRkRTQ3hOUVVGTkxFTkJRVU1zWjBKQlFXZENMRU5CUVVNc1dVRkJXU3hGUVVGRkxFZEJRVWNzUlVGQlJUdG5Ra0ZEZWtNc1NVRkJTU3hEUVVGRExGVkJRVlVzUTBGQlF5eE5RVUZOTEVkQlFVY3NTVUZCU1N4RFFVRkRPMWxCUTJoRExFTkJRVU1zUTBGQlF5eERRVUZETzFsQlEwZ3NUVUZCVFN4RFFVRkRMR2RDUVVGblFpeERRVUZETEZWQlFWVXNSVUZCUlN4SFFVRkhMRVZCUVVVN1owSkJRM1pETEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1RVRkJUU3hIUVVGSExFdEJRVXNzUTBGQlF6dFpRVU5xUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFMUJRVTBzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhYUVVGWExFVkJRVVVzUTBGQlF5eERRVUZETEVWQlFVVTdaMEpCUTNaRExFbEJRVWtzUTBGQlF5eFZRVUZWTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zVDBGQlR5eERRVUZETzJkQ1FVTjJReXhKUVVGSkxFTkJRVU1zVlVGQlZTeERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhEUVVGRExFOUJRVThzUTBGQlF6dFpRVU42UXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFbEJRVWtzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRlZMRVZCUVVVN1owSkJRek5DTEUxQlFVMHNRMEZCUXl4blFrRkJaMElzUTBGQlF5eFBRVUZQTEVWQlFVVXNRMEZCUXl4RFFVRkRMRVZCUVVVN2IwSkJRMjVETEVsQlFVa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1MwRkJTeXhIUVVGSExFTkJRVU1zUTBGQlF5eE5RVUZOTEVkQlFVY3NRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMmRDUVVOb1JDeERRVUZETEVOQlFVTXNRMEZCUXp0aFFVTktPMU5CUTBZN1VVRkRSQ3hKUVVGSkxFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RlFVRkZPMWxCUTNwQ0xFMUJRVTBzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhUUVVGVExFVkJRVVVzUTBGQlF5eERRVUZETEVWQlFVVTdaMEpCUTNKRExFbEJRVWtzUTBGQlF5eGhRVUZoTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFbEJRVWtzUTBGQlF6dFpRVU53UXl4RFFVRkRMRU5CUVVNc1EwRkJRenRaUVVOSUxFMUJRVTBzUTBGQlF5eG5Ra0ZCWjBJc1EwRkJReXhQUVVGUExFVkJRVVVzUTBGQlF5eERRVUZETEVWQlFVVTdaMEpCUTI1RExFbEJRVWtzUTBGQlF5eGhRVUZoTEVOQlFVTXNRMEZCUXl4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFdEJRVXNzUTBGQlF6dFpRVU55UXl4RFFVRkRMRU5CUVVNc1EwRkJRenRUUVVOS08wbEJRMGdzUTBGQlF6dEpRVVZFT3p0UFFVVkhPMGxCUTBrc1RVRkJUU3hEUVVGRExGVkJRVlVzUTBGQlF5eFBRVUVyUWp0UlFVTjBSQ3hKUVVGSkxGbEJRVmtzUTBGQlF5eFJRVUZSTEV0QlFVc3NVMEZCVXl4RlFVRkZPMWxCUTNaRExFMUJRVTBzU1VGQlNTeExRVUZMTEVOQlFVTXNiVU5CUVcxRExFTkJRVU1zUTBGQlF6dFRRVU4wUkR0UlFVTkVMRmxCUVZrc1EwRkJReXhSUVVGUkxFZEJRVWNzU1VGQlNTeFpRVUZaTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkRjRVFzUTBGQlF6dEpRVVZQTEUxQlFVMHNRMEZCUXl4WFFVRlhPMUZCUTNoQ0xFbEJRVWtzV1VGQldTeERRVUZETEZGQlFWRXNTMEZCU3l4VFFVRlRMRVZCUVVVN1dVRkRka01zVFVGQlRTeEpRVUZKTEV0QlFVc3NRMEZCUXl4M1EwRkJkME1zUTBGQlF5eERRVUZETzFOQlF6TkVPMUZCUlVRc1QwRkJUeXhaUVVGWkxFTkJRVU1zVVVGQlVTeERRVUZETzBsQlF5OUNMRU5CUVVNN1NVRkZSRHM3VDBGRlJ6dEpRVU5KTEUxQlFVMHNRMEZCUXl4TlFVRk5PMUZCUTJ4Q0xFMUJRVTBzVVVGQlVTeEhRVUZITEZsQlFWa3NRMEZCUXl4WFFVRlhMRVZCUVVVc1EwRkJRenRSUVVVMVF5eFJRVUZSTEVOQlFVTXNjVUpCUVhGQ0xFZEJRVWNzVFVGQlRTeERRVUZETEUxQlFVMHNRMEZCUXl4RlFVRkZMRVZCUVVVc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzFGQlF6TkZMRkZCUVZFc1EwRkJReXhyUWtGQmEwSXNSMEZCUnp0WlFVTTFRaXhIUVVGSExGRkJRVkVzUTBGQlF5eFZRVUZWTzFsQlEzUkNMRkZCUVZFc1JVRkJSU3hUUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEZGQlFWRXNRMEZCUXl4VlFVRlZMRU5CUVVNc1VVRkJVU3hEUVVGRE8xTkJRMmhFTEVOQlFVTTdVVUZEUml4UlFVRlJMRU5CUVVNc1ZVRkJWU3hEUVVGRExFdEJRVXNzUjBGQlJ5eERRVUZETEVOQlFVTTdTVUZEYUVNc1EwRkJRenRKUVVWRU96dFBRVVZITzBsQlEwa3NUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhKUVVGaE8xRkJRMnBETEUxQlFVMHNVVUZCVVN4SFFVRkhMRmxCUVZrc1EwRkJReXhYUVVGWExFVkJRVVVzUTBGQlF6dFJRVVUxUXl3eVFrRkJNa0k3VVVGRE0wSXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSVHRaUVVOVUxFdEJRVXNzVFVGQlRTeERRVUZETEVsQlFVa3NVVUZCVVN4RFFVRkRMR0ZCUVdFc1JVRkJSVHRuUWtGRGRFTXNTVUZCU1N4UlFVRlJMRU5CUVVNc1lVRkJZU3hEUVVGRExFTkJRVU1zUTBGQlF5eEZRVUZGTzI5Q1FVTTNRaXhQUVVGUExFbEJRVWtzUTBGQlF6dHBRa0ZEWWp0aFFVTkdPMWxCUTBRc1QwRkJUeXhMUVVGTExFTkJRVU03VTBGRFpEdFJRVVZFTEU5QlFVOHNRMEZCUXl4RFFVRkRMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTTdTVUZEZUVNc1EwRkJRenRKUVVWRU96dFBRVVZITzBsQlEwa3NUVUZCVFN4RFFVRkRMRlZCUVZVc1EwRkJReXhKUVVGaE8xRkJRM0JETEUxQlFVMHNVVUZCVVN4SFFVRkhMRmxCUVZrc1EwRkJReXhYUVVGWExFVkJRVVVzUTBGQlF6dFJRVVUxUXl3clFrRkJLMEk3VVVGREwwSXNTVUZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSVHRaUVVOVUxFdEJRVXNzVFVGQlRTeERRVUZETEVsQlFVa3NVVUZCVVN4RFFVRkRMR0ZCUVdFc1JVRkJSVHRuUWtGRGRFTXNTVUZEUlN4UlFVRlJMRU5CUVVNc1lVRkJZU3hEUVVGRExFTkJRVU1zUTBGQlF6dHZRa0ZEZWtJc1EwRkRSU3hEUVVGRExFTkJRVU1zUTBGQlF5eEpRVUZKTEZGQlFWRXNRMEZCUXl4eFFrRkJjVUlzUTBGQlF6dDNRa0ZEZEVNc1EwRkJReXhSUVVGUkxFTkJRVU1zY1VKQlFYRkNMRU5CUVVNc1EwRkJReXhEUVVGRExFTkJRMjVETEVWQlEwUTdiMEpCUTBFc1QwRkJUeXhKUVVGSkxFTkJRVU03YVVKQlEySTdZVUZEUmp0WlFVTkVMRTlCUVU4c1MwRkJTeXhEUVVGRE8xTkJRMlE3VVVGRlJDeFBRVUZQTEVOQlFVTXNRMEZCUXl4UlFVRlJMRU5CUVVNc1lVRkJZU3hEUVVGRExFbEJRVWtzUTBGQlF5eEpRVUZKTEVOQlFVTXNVVUZCVVN4RFFVRkRMSEZDUVVGeFFpeERRVUZETEVsQlFVa3NRMEZCUXl4RFFVRkRPMGxCUTJwR0xFTkJRVU03U1VGRlJEczdUMEZGUnp0SlFVTkpMRTFCUVUwc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQllUdFJRVU55UXl4TlFVRk5MRkZCUVZFc1IwRkJSeXhaUVVGWkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdVVUZGTlVNc1owTkJRV2RETzFGQlEyaERMRWxCUVVrc1EwRkJReXhKUVVGSkxFVkJRVVU3V1VGRFZDeExRVUZMTEUxQlFVMHNRMEZCUXl4SlFVRkpMRkZCUVZFc1EwRkJReXhoUVVGaExFVkJRVVU3WjBKQlEzUkRMRWxCUTBVc1EwRkJReXhSUVVGUkxFTkJRVU1zWVVGQllTeERRVUZETEVOQlFVTXNRMEZCUXp0dlFrRkRNVUlzUTBGQlF5eERRVUZETEZGQlFWRXNRMEZCUXl4eFFrRkJjVUlzUTBGQlF5eERRVUZETEVOQlFVTXNSVUZEYmtNN2IwSkJRMEVzVDBGQlR5eEpRVUZKTEVOQlFVTTdhVUpCUTJJN1lVRkRSanRaUVVORUxFOUJRVThzUzBGQlN5eERRVUZETzFOQlEyUTdVVUZGUkN4UFFVRlBMRU5CUVVNc1VVRkJVU3hEUVVGRExHRkJRV0VzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1VVRkJVU3hEUVVGRExIRkNRVUZ4UWl4RFFVRkRMRWxCUVVrc1EwRkJReXhEUVVGRE8wbEJRMnBHTEVOQlFVTTdTVUZGUkRzN1QwRkZSenRKUVVOSkxFMUJRVTBzUTBGQlF5eFRRVUZUTzFGQlEzSkNMRTFCUVUwc1VVRkJVU3hIUVVGSExGbEJRVmtzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0UlFVVTFReXhQUVVGUExFTkJRVU1zUTBGQlF5eFJRVUZSTEVOQlFVTXNWVUZCVlN4RFFVRkRMRTFCUVUwc1EwRkJRenRKUVVOMFF5eERRVUZETzBsQlJVUTdPMDlCUlVjN1NVRkRTU3hOUVVGTkxFTkJRVU1zV1VGQldUdFJRVU40UWl4TlFVRk5MRkZCUVZFc1IwRkJSeXhaUVVGWkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdVVUZGTlVNc1QwRkJUeXhEUVVGRExFTkJRVU1zVVVGQlVTeERRVUZETEZWQlFWVXNRMEZCUXl4TlFVRk5MRWxCUVVrc1EwRkJReXhSUVVGUkxFTkJRVU1zYTBKQlFXdENMRU5CUVVNc1RVRkJUU3hEUVVGRE8wbEJRemRGTEVOQlFVTTdTVUZGUkRzN1QwRkZSenRKUVVOSkxFMUJRVTBzUTBGQlF5eGhRVUZoTzFGQlEzcENMRTFCUVUwc1VVRkJVU3hIUVVGSExGbEJRVmtzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0UlFVVTFReXhQUVVGUExFTkJRVU1zVVVGQlVTeERRVUZETEZWQlFWVXNRMEZCUXl4TlFVRk5MRWxCUVVrc1EwRkJReXhEUVVGRExGRkJRVkVzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhOUVVGTkxFTkJRVU03U1VGRE4wVXNRMEZCUXp0SlFVVkVPenRQUVVWSE8wbEJRMGtzVFVGQlRTeERRVUZETEZsQlFWazdVVUZEZUVJc1RVRkJUU3hSUVVGUkxFZEJRVWNzV1VGQldTeERRVUZETEZkQlFWY3NSVUZCUlN4RFFVRkRPMUZCUlRWRExFOUJRVThzVVVGQlVTeERRVUZETEZWQlFWVXNRMEZCUXl4TFFVRkxMRWRCUVVjc1EwRkJReXhEUVVGRE8wbEJRM1pETEVOQlFVTTdTVUZGUkRzN1QwRkZSenRKUVVOSkxFMUJRVTBzUTBGQlF5eGpRVUZqTzFGQlF6RkNMRTFCUVUwc1VVRkJVU3hIUVVGSExGbEJRVmtzUTBGQlF5eFhRVUZYTEVWQlFVVXNRMEZCUXp0UlFVVTFReXhQUVVGUExGRkJRVkVzUTBGQlF5eFZRVUZWTEVOQlFVTXNTMEZCU3l4SFFVRkhMRU5CUVVNc1EwRkJRenRKUVVOMlF5eERRVUZETzBsQlJVUTdPMDlCUlVjN1NVRkRTU3hOUVVGTkxFdEJRVXNzWVVGQllUdFJRVU0zUWl4TlFVRk5MRkZCUVZFc1IwRkJSeXhaUVVGWkxFTkJRVU1zVjBGQlZ5eEZRVUZGTEVOQlFVTTdVVUZGTlVNc1QwRkJUeXhSUVVGUkxFTkJRVU1zVlVGQlZTeERRVUZETEZGQlFWRXNRMEZCUXp0SlFVTjBReXhEUVVGRE96dEJRVGxOU0N3clFrRXJUVU03UVVFMVRYbENMREpDUVVGakxFZEJRV2xDTzBsQlEzSkVMRXRCUVVzc1JVRkJSU3hKUVVGSk8wbEJRMWdzVlVGQlZTeEZRVUZGTEVsQlFVazdTVUZEYUVJc1VVRkJVU3hGUVVGRkxFbEJRVWs3UTBGRFppeERRVUZESW4wPSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==