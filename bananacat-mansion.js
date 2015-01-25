var game = new Phaser.Game(800, 600, Phaser.AUTO, "body", {preload: preload, create: create, update: update})

var cursorDict = {}

firebaseRef = new Firebase("https://bananacat.firebaseIO.com");


makeId = function() {
	var count, possible, text, _i;
	text = "";
	possible = "abcdefghijklmnopqrstuvwxyz0123456789";
	for (count = _i = 0; _i < 10; count = ++_i) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

function preload () {
	console.log("preload");
	game.load.image("cursor", "Mouse_cursor.png");
	game.load.image("scene", "mansion/Scene_w_door_mask.png")
	game.load.image("background", "mansion/Background.png")
	game.load.image("leftdoor", "mansion/Left_door.png")
	game.load.image("rightdoor", "mansion/Right_door.png")
	game.load.image("lightningmask", "mansion/Lightning_mask.png")
	
	
	game.load.audio("thunderstorm", "GGJ2015 BCMMM - Rain & Thunder Loop.ogg")
	game.load.audio("music", "GGJ2015 - Banana Cat's Maniac Mystery Mansion Theme - Single Loop.ogg")
	game.load.audio("dooropen", "GGJ2015 BCMMM - Big Ass Doors Squeaking.ogg")


	return randomId = makeId();
}

var leftdoor
var rightdoor

function create () {

	console.log("create");
	cursor = game.add.sprite(0, 0, "cursor");
	background = game.add.sprite(0,0, "background")
	leftdoor = game.add.sprite(0,0,"leftdoor")
	rightdoor = game.add.sprite(0,0,"rightdoor")
	scene = game.add.sprite(0,0, "scene")
	mask = game.add.sprite(0,0,"lightningmask")

	game.add.tween(mask).to({alpha: 0}, 10000, Phaser.Easing.Quintic.In, true)
	
	firebaseRef.on("child_added", function(childSnapshot) {
		return cursorDict[childSnapshot.key()] = game.add.sprite(-50, -50, "cursor");
	});
	firebaseRef.on("child_changed", function(childSnapshot) {
		cursorDict[childSnapshot.key()].x = childSnapshot.val().x;
		return cursorDict[childSnapshot.key()].y = childSnapshot.val().y;
	})

	thunderstorm = game.add.audio("thunderstorm", 1, true)
	thunderstorm.play("", 0, 1, true)

	game.add.audio("music", 1, true).play("", 0, 1, true)

	doorOpen = game.add.audio("dooropen", 1)


	leftdoor.inputEnabled = true
	leftdoor.input.pixelPerfectClick = true
	leftdoor.events.onInputDown.add(function () {
		game.add.tween(leftdoor).to({x: -60}, 2000, Phaser.Easing.Linear.None, true)
		//play sound
		doorOpen.play()
	})
	rightdoor.inputEnabled = true
	rightdoor.input.pixelPerfectClick = true
	rightdoor.events.onInputDown.add(function () {
		game.add.tween(rightdoor).to({x: 60}, 2000, Phaser.Easing.Linear.None, true)
		//play sound
		doorOpen.play()
	})









}

function update () {
	var movement;
	cursor.x = game.input.x;
	cursor.y = game.input.y;
	firebaseRef.child(randomId).set({
		x: game.input.x,
		y: game.input.y
	});
}

