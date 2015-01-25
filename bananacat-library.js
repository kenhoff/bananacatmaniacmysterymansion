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
	
	game.load.image("background", "Banana_cat_credits.png")
	
	game.load.audio("music", "GGJ2015 - Banana Cat's Maniac Mystery Mansion Theme - Single Loop.ogg")

	game.load.audio("thunderstorm", "GGJ2015 BCMMM - Rain & Thunder Loop (Low Pass).ogg")

	return randomId = makeId();
}


function create () {


	// too loud
	//thunderstorm = game.add.audio("thunderstorm", 1, true)
	//thunderstorm.play("", 0, 1, true)
	//
	game.add.audio("music", 1, true).play("", 0, 1, true)

	console.log("create");
	game.add.sprite(0, 0, "background");
	cursor = game.add.sprite(0, 0, "cursor");
	firebaseRef.on("child_added", function(childSnapshot) {
		return cursorDict[childSnapshot.key()] = game.add.sprite(-50, -50, "cursor");
	});
	firebaseRef.on("child_changed", function(childSnapshot) {
		cursorDict[childSnapshot.key()].x = childSnapshot.val().x;
		return cursorDict[childSnapshot.key()].y = childSnapshot.val().y;
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
