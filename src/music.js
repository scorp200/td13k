//
var Music = {
    loading: true,
    tracks: []
}

//
var Sound = {
    loading: true,
    board: []
}

// Generate sfx
sndClick = addSfx(sndClick);

// Generate music
addTrack(song);

function addSfx(sound) {
    var player = new CPlayer();
    player._snd = new Audio();
    player.init(sound);
    Sound.board.push(player);
    return player._snd;
}

function addTrack(track) {
    var player = new CPlayer();
    player._loading = true;
    player.init(track);
    Music.tracks.push(player);
}

// Generate music
var loadingProgressMusic = 0;
function generateMusic() {
    for(var n=0; n<Music.tracks.length; n++) {
        var track = Music.tracks[n];
        if (track._loading) {
            track._loading = track.generate() >= 1;
            loadingProgressMusic += 1;
    		var wave = track.createWave();
    		var url = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
    		var audio = new Audio(url);
    		audio.addEventListener("ended", function() {
    		    this.currentTime = 0;
    		    this.play();
    		}, false);
    		audio.play();
            audio.volume = 0.5;
        }
    }
    if (loadingProgressMusic >= Music.tracks.length) {
        Music.loading = false;
    }
}

// Generate sfx
var loadingProgressSound = 0;
function generateSound() {
    for(var n=0; n<Sound.board.length; n++) {
        var track = Sound.board[n];
        if (track.generate() >= 1) {
            loadingProgressSound += 1;
    		var wave = track.createWave();
    		var url = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
            track._snd.src = url;
        }
    }
    if (loadingProgressSound >= Sound.board.length) {
        Sound.loading = false;
    }
}
