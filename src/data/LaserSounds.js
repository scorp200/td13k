// This music has been exported by SoundBox. You can use it with
// http://sb.bitsnbites.eu/player-small.js in your own product.

// See http://sb.bitsnbites.eu/demo.html for an example of how to
// use it in a demo.

var sharedInst = [2,10,116,1,3,0,164,255,0,0,0,0,64,0,0,0,0,6,0,2,255,0,0,28,0,0,0,6];

// Laser sounds.
var laserSounds = [];	// Array of sounds.
var number = 40;		// Number to generate.
while (number--) {
	laserSounds[number] = {
	  	songData: [{
	      	i: sharedInst,
	      	p: [1],
	      	c: [{
				n: [206-number],	// Change note.
	        	f: []
			}]
	    }],
	  rowLen: 5513,
	  patternLen: 2,
	  endPattern: 0,
	  numChannels: 1
	};
}
