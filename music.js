// Start music, TEST!
CPlayer.init(song);

// Generate music...
var done = false;
var loadingInt = setInterval(function () {
    if (CPlayer.generate() >= 1) {
		clearInterval(loadingInt);
		var wave = CPlayer.createWave();
		var url = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
		var audio = new Audio(url);
		audio.addEventListener("ended", function() {
		    this.currentTime = 0;
		    this.play();
		}, false);
		audio.play();
    }
}, 1);
