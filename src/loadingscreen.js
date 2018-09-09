var LoadingScreen = {

    ready: false,

    update: function() {

        if (Music.loading) {
            generateMusic();
        } else if (Sound.loading) {
            generateSound();
        } else {
            if (!LoadingScreen.ready) {
                LoadingScreen.ready = true;
                musicLoop(musSpace);
                speak("Welcum to Exo");
            }
            if (Mouse.click) {
                gameState = GAME_STATE.RUNNING;
				Game.init();
                if (musSpace.pause) {
                    musicLoop(musSpace);
                }
            }
        }

    },

    render: function() {
        var centerX = Canvas.width / 2;
        var centerY = Canvas.height / 2;

        //ctx.beginPath();
        ctx.fillStyle = "#FFF";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "#FFF";
        ctx.shadowBlur = 50 + Math.sin(performance.now()/100)*2;
        ctx.font = "small-caps 700 256px monospace";
        ctx.fillText("X", centerX, centerY-64);
        ctx.fillText("e o", centerX, centerY-90);
        ctx.shadowBlur = 0;

        ctx.font = "small-caps 700 32px monospace";
        if (Music.loading) {
            ctx.fillText("Loading music...", centerX, centerY+64);
        } else if (Sound.loading) {
            ctx.fillText("Loading sounds...", centerX, centerY+64);
        } else {
            ctx.fillText("Click to continue!", centerX, centerY+64);
        }

        ctx.font = "small-caps 700 16px monospace";
        ctx.fillText("Created by", centerX, Canvas.height-148);
        ctx.fillText("ai Doge & Jack Oatley", centerX, Canvas.height-128);
		ctx.fillText("with music by Francis Fonye", centerX, Canvas.height-108);
        ctx.fillText("for #js13k", centerX, Canvas.height-88);
		ctx.fillText("made with; Atom & SoundBox", centerX, Canvas.height-48);
		ctx.fillText("works best in Chrome, quality in other browsers will vary!", centerX, Canvas.height-28);
    }

}
