// Tutorial.
var Tutorial = (function() {

	var missions = [{
		text: "Welcome to Exo... You are the commander of a long forgotten expedition to a distant star. Many hundreds of years ago you and your people set out to inhabit the galaxy. Upon reaching your destination, you were able to establish a base on a nearby planet. Not long after, you find yourself under seige from mysterious forces. Are they aliens, or maybe your own race, hundreds of years ahead of you in technology, catching up to you... Either way, this is your home now... Defend it.",
		event: TUTORIAL_EVENT.INTRO,
		lifetime: 23 * 0
	},{
		text: "You can move your view of the star system around by clicking and dragging anywhere on-screen. YOu can also use the W, A, S and D, or the arrow keys.",
		event: TUTORIAL_EVENT.MOUSE
	},{
		text: "You can also zoom in and out with your mouse wheel.",
		event: TUTORIAL_EVENT.ZOOM
	},{
		text: "The SPACEBAR can be used to pause and un-pause the game. Try it now.",
		event: TUTORIAL_EVENT.PAUSE
	},{
		text: "To survive in this star system, you will have to build to gather resources and defend yourself.",
		event: TUTORIAL_EVENT.PAUSE
	},{
		text: "At the top of your screen is general information. From left to right. The structural status of your base, when this hits 0 you are no more. The number of enemy waves you have survived. Seconds until the next wave. Your stored minerals. And your stored energy.",
		event: TUTORIAL_EVENT.PAUSE
	},{
		text: "At the bottom of your screen are your construction options. Satellites are use to generate energy from the sun and relay connection to your main base. Mining stations gather minerals from planets. The rest are just weapons of destruction.",
		event: TUTORIAL_EVENT.PAUSE
	},{
		text: "Try constructing something now. Select one of the icons. Select the star or a planet to build station in orbit of. Then select the orbit distance.",
		event: TUTORIAL_EVENT.BUILD
	},{
		text: "Satellites and stations can only function with a connection to your main base. Anything not connected is considered offline, and will do nothing. However, when offline, they will be undetectable by enemy ships.",
		event: TUTORIAL_EVENT.BUILD
	},{
		text: "To extend your functional range, you will have to build multiple satellites to relay the signal. Anything close enough to your base is already online, new satellites may have to be constructed around other celestial bodies. The connection is shown with green lines branching out from your base.",
		event: TUTORIAL_EVENT.BUILD
	},{
		text: "That's as much as I can help you. My programmers thought it wise not to provide me with information on your weapon systems. You will have to work that out yourself.",
		event: TUTORIAL_EVENT.BUILD
	},{
		text: "Good luck...",
		event: TUTORIAL_EVENT.BUILD,
		end: true
	}];

	// Visual styling.
	var backgroundColor = "rgba(0,0,0,0.5)";
	var borderColor = "#FFF";
	var borderWidth = 2;

	var started = false;
	var end = false;
	var timer = 60;
	var completed = [];
	var currentMission = 0;
	var text = "";
	var event;

	/***************************************************************************
	 * @return {void}
	 */
	function start() {
		if (ENABLE_TUTORIAL) {
			gameState = GAME_STATE.PAUSED;
			started = true;
			setMission();
		} else {
			end = true;
		}
	}

	/***************************************************************************
	 * @return {void}
	 */
	function setMission() {
		if (missions[currentMission]) {
			text = missions[currentMission].text;
			event = missions[currentMission].event;
			end = missions[currentMission].end === true;
			if (end) {
				GameStorage.set("tutorial", false);
			}
			speak(text, true);
		}
	}

	/***************************************************************************
	 * @param {number} tutorialEvent TUTORIAL_EVENT.
	 * @return {void}
	 */
	function complete(tutorialEvent) {
		completed[tutorialEvent] = true;
	}

	/***************************************************************************
	 * @return {void}
	 */
	function update() {

		if (text !== "") {
			var mission = missions[currentMission];
			if (mission.lifetime !== undefined && mission.lifetime-- <= 0) {
				completed[mission.event] = true;
			}
			if (completed[mission.event] === true && Mouse.clickRegion(20, Canvas.height/2-20-200/2, 500, 200)) {
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

	/***************************************************************************
	 * @return {void}
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
		ctx.rect(20, Canvas.height/2-20-200/2, 500, 200);
		ctx.fill();
		ctx.stroke();

		// Text.
		ctx.fillStyle = "#FFF";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		wrapText(ctx, text, 28, Canvas.height/2-192/2-16, 500-16, 20);

		// Continue prompt.
		var mission = missions[currentMission];
		if (completed[mission.event] === true) {
			ctx.textAlign = "center";
			ctx.font = "small-caps 600 12px monospace";
			ctx.fillText("click to continue...", 270, Canvas.height/2+55);
		}

	}

	//**************************************************************************
	// Export.
	return {
		get text() { return text; },
		get end() { return end; },
		start: start,
		update: update,
		render: render,
		complete: complete
	}

})();
