var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser", {preload: preload, create: create, update: update})

var cursorDict = {}

firebaseRef = new Firebase("https://bananacat.firebaseIO.com");


bannister1Coords = {
	x: 157,
	y: 418
};

bannister2Coords = {
	x: 560,
	y: 400
};

bannister3Coords = {
	x: 250,
	y: 225
};

bannister4Coords = {
	x: 470,
	y: 220
};

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
	game.load.image("bannister", "bannister.png");
	game.load.image("scene", "Scene.png")
	game.load.image("background", "Background.png")
	game.load.image("statue", "Statue.png")
	game.load.image("doorway", "Doorway.png")
	game.load.image("mask", "Mask.png")
	game.load.audio("thunderstorm", "GGJ2015 BCMMM - Rain & Thunder Loop (Low Pass).ogg")
	game.load.audio("statue-grind", "GGJ2015 BCMMM - Statue Rotating Good.ogg")
	game.load.audio("click-down", "GGJ2015 BCMMM - Door Handle Click.ogg")
	game.load.audio("click-up", "GGJ2015 BCMMM - Door Shut.ogg")
	return randomId = makeId();
}
function create () {

	console.log("create");
	game.add.sprite(0, 0, "background");
	game.add.sprite(0, 0, "doorway");
	statue = game.add.sprite(0, 0, "statue");
	game.add.sprite(0, 0, "mask");
	game.add.sprite(0, 0, "scene");
	bannister1 = game.add.sprite (157, 418, "bannister");
	bannister2 = game.add.sprite(560, 400, "bannister");
	bannister3 = game.add.sprite(250, 225, "bannister");
	bannister4 = game.add.sprite(470, 220, "bannister");
	bannister1["activated"] = false;
	bannister2["activated"] = false;
	bannister3["activated"] = false;
	bannister4["activated"] = false;
	bannister1.inputEnabled = true
	bannister2.inputEnabled = true
	bannister3.inputEnabled = true
	bannister4.inputEnabled = true
	cursor = game.add.sprite(0, 0, "cursor");
	firebaseRef.on("child_added", function(childSnapshot) {
		return cursorDict[childSnapshot.key()] = game.add.sprite(-50, -50, "cursor");
	});
	firebaseRef.on("child_changed", function(childSnapshot) {
		cursorDict[childSnapshot.key()].x = childSnapshot.val().x;
		return cursorDict[childSnapshot.key()].y = childSnapshot.val().y;
	})

	thunderstorm = game.add.audio("thunderstorm", 1, true)
	thunderstorm.play("", 0, 1, true)

	statueNoise = game.add.audio("statue-grind", 2)
	clickUp = game.add.audio("click-up", 2) 
	clickDown = game.add.audio("click-down", 2) 





	firebaseRef.child("bannister1").on("child_changed", function (childSnapshot) {
//		console.log(childSnapshot.val())
		bannister1["activated"] = childSnapshot.val()
		if (childSnapshot.val() == true) {
			clickUp.play()
		}
		if (childSnapshot.val() == false) {
			clickDown.play()
		}
		
	})
	firebaseRef.child("bannister2").on("child_changed", function (childSnapshot) {
//		console.log(childSnapshot.val())
		bannister2["activated"] = childSnapshot.val()
		if (childSnapshot.val() == true) {
			clickUp.play()
		}
		if (childSnapshot.val() == false) {
			clickDown.play()
		}
	})
	firebaseRef.child("bannister3").on("child_changed", function (childSnapshot) {
//		console.log(childSnapshot.val())
		bannister3["activated"] = childSnapshot.val()
		if (childSnapshot.val() == true) {
			clickUp.play()
		}
		if (childSnapshot.val() == false) {
			clickDown.play()
		}
	})
	firebaseRef.child("bannister4").on("child_changed", function (childSnapshot) {
//console.log(childSnapshot.val())
		bannister4["activated"] = childSnapshot.val()
		if (childSnapshot.val() == true) {
			clickUp.play()
		}
		if (childSnapshot.val() == false) {
			clickDown.play()
		}
	})



}

var statueNoise

function update () {
	var movement;
	cursor.x = game.input.x;
	cursor.y = game.input.y;
	firebaseRef.child(randomId).set({
		x: game.input.x,
		y: game.input.y
	});
	updateBannister1()
	updateBannister2()
	updateBannister3()
	updateBannister4()

	checkBannisters()
}

function checkBannisters () {
	if ((bannister1["activated"] == true) && (bannister2["activated"] == true) && (bannister3["activated"] == true) && (bannister4["activated"] == true)) {
		console.log ("DING DING DING")//move statue, let players continue
		game.add.tween(statue).to({y: 600}, 10000, Phaser.Easing.Linear.None, true)
		statueNoise.play()
	}

	if (game.input.keyboard.isDown(Phaser.Keyboard.BACKWARD_SLASH)) {
		console.log("cheater")
		game.add.tween(statue).to({y: 600}, 10000, Phaser.Easing.Linear.None, true)
		statueNoise.play()
	}
}

var movement = 10;

function updateBannister1 () {
	if (bannister1.input.pointerDown() && bannister1.input.pointerOver()) {
		bannister1["activated"] = true	
		firebaseRef.child("bannister1").set({
			activate: true
		})
	}
	if (bannister1.input.justReleased() || bannister1.input.justOut()) {
		firebaseRef.child("bannister1").set({
			activate: false
		})
		
	}

	if (bannister1["activated"]) {
		bannister1.y = bannister1Coords.y - movement;
	} else {
		bannister1.x = bannister1Coords.x;
		return bannister1.y = bannister1Coords.y;
	}

}
function updateBannister2 () {
	if (bannister2.input.pointerDown() && bannister2.input.pointerOver()) {
		bannister2["activated"] = true	
		firebaseRef.child("bannister2").set({
			activate: true
		})
	}
	if (bannister2.input.justReleased() || bannister2.input.justOut()) {
		firebaseRef.child("bannister2").set({
			activate: false
		})
		
	}

	if (bannister2["activated"]) {
		bannister2.y = bannister2Coords.y - movement;
	} else {
		bannister2.x = bannister2Coords.x;
		return bannister2.y = bannister2Coords.y;
	}

}
function updateBannister3 () {
	if (bannister3.input.pointerDown() && bannister3.input.pointerOver()) {
		bannister3["activated"] = true	
		firebaseRef.child("bannister3").set({
			activate: true
		})
	}
	if (bannister3.input.justReleased() || bannister3.input.justOut()) {
		firebaseRef.child("bannister3").set({
			activate: false
		})
		
	}

	if (bannister3["activated"]) {
		bannister3.y = bannister3Coords.y - movement;
	} else {
		bannister3.x = bannister3Coords.x;
		return bannister3.y = bannister3Coords.y;
	}

}
function updateBannister4 () {
	if (bannister4.input.pointerDown() && bannister4.input.pointerOver()) {
		bannister4["activated"] = true	
		firebaseRef.child("bannister4").set({
			activate: true
		})
	}
	if (bannister4.input.justReleased() || bannister4.input.justOut()) {
		firebaseRef.child("bannister4").set({
			activate: false
		})
		
	}

	if (bannister4["activated"]) {
		bannister4.y = bannister4Coords.y - movement;
	} else {
		bannister4.x = bannister4Coords.x;
		return bannister4.y = bannister4Coords.y;
	}

}
