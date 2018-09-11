//
var Music = {
    loading: true,
    current: 0,
    tracks: []
}

//
var Sound = {
    loading: true,
    board: []
}

// Generate sfx
sndClick = addSfx(sndClick);
for(var n=0; n<laserSounds.length; n++) {
	laserSounds[n] = addSfx(laserSounds[n]);
}

// Generate music
var musSpace = addTrack(song);

function addSfx(sound) {
    var player = new CPlayer();
    player._snd = new Audio();
    player._loading = true;
    player.init(sound);
    Sound.board.push(player);
    return player._snd;
}

function addTrack(track) {
    var player = new CPlayer();
    player._snd = new Audio();
    player._loading = true;
    player.init(track);
    Music.tracks.push(player);
    return player._snd;
}

// Generate music
var loadingProgressMusic = 0;
function generateMusic() {
    for(var n=0; n<Music.tracks.length; n++) {
        var track = Music.tracks[n];
		track._loading = track.generate();
        if (track._loading >= 1) {
            loadingProgressMusic += 1;
    		var wave = track.createWave();
    		var url = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));
            track._snd.src = url;
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
		track._loading = track.generate() >= 1;
        if (track._loading) {
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

var currentMusic = musSpace;
function musicLoop(sound) {
    if (sound === null) return;
    if (ENABLE_MUSIC) {
        currentMusic = sound;
        if (!sound.hasListener) {
            sound.hasListener = true;
            sound.addEventListener("ended", function() {
                this.currentTime = 0;
                musicLoop(sound);
            }, false);
            currentMusic.play();
        } else {
            currentMusic.play();
        }
        sound.volume = 0.5;
    } else if (currentMusic) {
        currentMusic.pause();
    }
}

/**
 *
 */
function playSound(snd) {
	if (ENABLE_SFX) {
		snd.play();
	}
}
