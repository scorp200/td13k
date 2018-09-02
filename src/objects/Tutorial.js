// Tutorial.
var Tutorial = (function() {

	var missions = [{
		text: "You can move your view of the star system around by clicking and dragging anywhere on-screen.",
		event: TUTORIAL_EVENT.MOUSE
	},{
		text: "The SPACEBAR can be used to pause and un-pause the game. Try it now.",
		event: TUTORIAL_EVENT.PAUSE
	}];

	// Visual styling.
	var backgroundColor = "rgba(0, 0, 0, 0.5)";
	var borderColor = "#FFF";
	var borderWidth = 2;

	var timer = 60;
	var completed = [];
	var currentMission = 0;
	var text;
	var event;
	setMission();

	/**
	 * @return {void}
	 */
	function setMission() {
		if (missions[currentMission]) {
			text = missions[currentMission].text;
			event = missions[currentMission].event;
		}
	}

	/**
	 * @return {void}
	 */
	function complete(tutorialEvent) {
		completed[tutorialEvent] = true;
	}

	/**
	 * @return {void}
	 */
	function update() {

		if (timer-- <= 0) {
			setMission();
		}

		if (text !== "") {
			if (completed[missions[currentMission].event] === true) {
				currentMission++;
				text = "";
				timer = 60;
			}
		}
	}

	/**
	 *
	 */
	function render() {

		if (text === "") {
			return;
		}

		// Box.
		ctx.fillStyle = backgroundColor;
		ctx.strokeStyle = borderColor;
		ctx.lineWidth = borderWidth;
		ctx.beginPath();
		ctx.rect(20, Canvas.height-20-200, 400, 200);
		ctx.fill();
		ctx.stroke();

		// Text.
		ctx.fillStyle = "#FFF";
		ctx.textAlign = "top";
        ctx.textBaseline = "left";
		wrapText(ctx, text, 28, Canvas.height-192, 400-16, 20);

	}

	// Export.
	return {
		get text() { return text; },
		update: update,
		render: render,
		complete: complete
	}

})();
