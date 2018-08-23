//
var speechEnabled = false;
var voices;
var voiceIndex = 3;

// Load.
if (window.speechSynthesis) {
	speechEnabled = true;
	voices = window.speechSynthesis.getVoices();
	if (voices.length <= 0) {
		window.speechSynthesis.onvoiceschanged = function() {
			voices = window.speechSynthesis.getVoices();
		};
	}
}

// Wrapper for speaking a new sentence.
function speak(text) {
	if (speechEnabled) {
		window.speechSynthesis.cancel();
		var speech = new SpeechSynthesisUtterance(text);
		speech.rate = 1.0;
		speech.pitch = 0.1;
		speech.lang = 'en-US';
		speech.voice = voices[voiceIndex];
		window.speechSynthesis.speak(speech);
	}
}
