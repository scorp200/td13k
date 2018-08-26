//
var speechSynth = speechSynthesis;
var speechEnabled = false;
var voices;
var voiceIndex = 3;

// Load.
if (speechSynth) {
	speechEnabled = ENABLE_VOICE;
	voices = speechSynth.getVoices();
	if (voices.length <= 0) {
		speechSynth.onvoiceschanged = function() {
			voices = speechSynth.getVoices();
			//console.log(voices);
		};
	}
	//console.log(voices);
}

// Wrapper for speaking a new sentence.
function speak(text) {
	if (speechEnabled) {
		speechSynth.cancel();
		var speech = new SpeechSynthesisUtterance(text);
		speech.rate = 1;
		speech.pitch = 0.1;
		speech.lang = 'en-US';
		speech.voice = voices[voiceIndex % voices.length];
		speechSynth.speak(speech);
	}
}
