// Tutorial.
var Tutorial = (function() {

	var missions = [{
		text: "Welcome to Exo... You are the commander of a long forgotten expedition to a distant star. Many hundreds of years ago you and your people set out to inhabit the galaxy. Upon reaching your destination, you were able to establish a base on a nearby planet. Not long after, you find yourself under seige from mysterious forces. Are they aliens, or maybe your own race, hundreds of years ahead of you in technology, catching up to you... Either way, this is your home now... Defend it.",
		event: TUTORIAL_EVENT.INTRO,
		lifetime: 23 * 60
	},{
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
	var text = "";
	var event;
	var started = false;

	/**
	 *
	 */
	function start() {
		started = true;
		setMission();
	}

	/**
	 * @return {void}
	 */
	function setMission() {
		if (missions[currentMission]) {
			text = missions[currentMission].text;
			event = missions[currentMission].event;
			speak(text);
			console.log("gonna work?");
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

		if (text !== "") {
			var mission = missions[currentMission];
			if (mission.lifetime !== undefined && mission.lifetime-- <= 0) {
				completed[mission.event] = true;
			}
			if (completed[mission.event] === true) {
				currentMission++;
				text = "";
				timer = 60;
			}
		} else {
			if (started && timer-- <= 0) {
				setMission();
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
		ctx.rect(20, Canvas.height-20-200, 500, 200);
		ctx.fill();
		ctx.stroke();

		// Text.
		ctx.fillStyle = "#FFF";
		ctx.textAlign = "top";
        ctx.textBaseline = "left";
		wrapText(ctx, text, 28, Canvas.height-192, 500-16, 20);

	}

	// Export.
	return {
		get text() { return text; },
		start: start,
		update: update,
		render: render,
		complete: complete
	}

})();
