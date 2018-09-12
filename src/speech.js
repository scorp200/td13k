//
var speechSynth = window.speechSynthesis;
var speechEnabled = false;
var voices;
var voiceIndex = 3;

// Load.
if (speechSynth) {
	speechEnabled = true;
	voices = speechSynth.getVoices();
	if (voices.length <= 0) {
		speechSynth.onvoiceschanged = function() {
			voices = speechSynth.getVoices();
		};
	}
}

/**
 * Wrapper for speaking a new sentence.
 * @param {string} text The text to be spoken.
 * @param {boolean=} suppress Whether to supress subtiles for this speech.
 * @return {void}
 */
function speak(text, suppress) {

	// Subtitles.
	if (!suppress) {
		Gui.addSubtitles(text, 60*4);
	}

	// Speak.
	// Large texts are split into individual sentences, to avoid long text bug.
	if (speechEnabled && ENABLE_VOICE) {
		speechSynth.cancel();
		var newText = text.split(". ");
		newText.forEach(function(t) {
			var speech = new SpeechSynthesisUtterance(t+".");
			speech.rate = 1;
			speech.pitch = 0.1;
			speech.lang = "en";
			speechSynth.speak(speech);
		});
	}

}
