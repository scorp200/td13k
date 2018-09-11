var IS_DEV = false;
var Canvas = document.getElementById("c");
var ctx = Canvas.getContext("2d", { alpha: false });
var NOOP = function() {};
var ENABLE_MUSIC = false;
var ENABLE_SFX = false;
var ENABLE_VOICE = false;
var ENABLE_TUTORIAL = false;
var PI = Math.PI;
var TAU = PI * 2;

/**
 * Game states.
 * @enum {number}
 */
var GAME_STATE = {
	LOADING: 0,
	RUNNING: 1,
	PAUSED: 2
}

/**
 * The different types for Orbitals.
 * @enum {number}
 */
var ORBITAL_TYPE = {
	STAR: 0,
	PLANET: 1,
	SATELLITE: 2,
	MINING: 3,
	DEFENSE: 4,
	MOON: 5
}

/**
 *
 * @enum {number}
 */
var ORBITAL_MODULE_TYPE = {
	LASER: 0,
	BEAM: 1,
	ROCKET: 2,
	EMP: 3,
	LIGHTNING: 4
}

/**
 * Buff types for applying to ships.
 * @enum {number}
 */
var BUFF_TYPE = {
	SPEED: 0,
	RANGE: 1,
	TURNING: 2,
	FIRE_RATE: 4
}

/**
 * @enum {number}
 */
var TUTORIAL_EVENT = {
	INTRO: 0,
	MOUSE: 1,
	PAUSE: 2,
	ZOOM: 3,
	BUILD: 4
}
