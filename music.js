//
var Music = {
    loading: true,
    tracks: []
}

// Generate music
addTrack(song);

function addTrack(track) {
    var player = new CPlayer();
    player.init(track);
    Music.tracks.push(player);
}

// Generate music...
var loadingProgress = 0;
for(var n=0; n<Music.tracks.length; n++) {
    var track = Music.tracks[n];
    var loadingInt = setInterval(function () {
        if (track.generate() >= 1) {
    		clearInterval(loadingInt);
            loadingProgress += 1;
    		var wave = track.createWave();
    		var url = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
    		var audio = new Audio(url);
    		audio.addEventListener("ended", function() {
    		    this.currentTime = 0;
    		    this.play();
    		}, false);
    		audio.play();

            if (loadingProgress >= Music.tracks.length) {
                Music.loading = false;
            }

        }
    }, 1);
}
