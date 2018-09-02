//
var speechSynth = speechSynthesis;
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

// Wrapper for speaking a new sentence.
function speak(text) {
	Gui.subtitles.push({
		text: text,
		time: 60 * 4
	});
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
