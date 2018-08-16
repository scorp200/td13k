// Setup Canvas (move to graphics.js)
var doc = document;
var Canvas = doc.getElementById("c");
var ctx = Canvas.getContext("2d");
Canvas.width = window.innerWidth;
Canvas.height = window.innerHeight;
ctx.clearRect(0, 0, Canvas.width, Canvas.height);
