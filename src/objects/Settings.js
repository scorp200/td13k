var Settings = (function() {

	var ul = document.createElement("UL");
	var style = ul.style;
	style.position = "absolute";
	style.right = "0px";
	style.bottom = "0px";
	style.color = "#FFF";
	style.margin = "16px";
	style.listStyle = "none";
	style.fontFamily = "monospace";
	document.body.appendChild(ul);

	/***************************************************************************
	 * @param {string} text The label for this input (also use for localStorage)
	 * @param {Function} callback
	 * @return {void}
	 */
	function addSetting(text, callback) {

		// Create DOM elements.
		var li = document.createElement("LI");
		var label = document.createElement("LABEL");
		var input = document.createElement("INPUT");
		label.textContent = text;
		input.type = "checkbox";
		li.appendChild(input);
		li.appendChild(label);
		ul.appendChild(li);

		// Create callback function to change and save setting.
		input.onclick = function() {
			GameStorage.set(text, input.checked);
			callback.call(input);
		}

		// Set saved state of checkbox/setting.
		if (GameStorage.get(text, "true") === "true") {
			input.checked = true;
			callback.call(input, true);
		}

	}

	/***************************************************************************
	 * @return {void}
	 */
	function init() {

		addSetting("tutorial", function() {
			ENABLE_TUTORIAL = this.checked;
		});

		addSetting("music", function(init) {
			ENABLE_MUSIC = this.checked;
			if (!init) {
				musicLoop(currentMusic);
			}
		});

		addSetting("sfx", function(init) {
			ENABLE_SFX = this.checked;
		});

		addSetting("voice", function() {
			ENABLE_VOICE = this.checked;
		});

	}

	//**************************************************************************
	// Export.
	return {
		init: init
	}

})();
