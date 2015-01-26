var game = new Phaser.Game(800, 600, Phaser.AUTO, "phaser", {preload: preload, create: create, update: update})

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
	
	game.load.image("background", "Background-cellar.png")
	game.load.image("scene", "Scene-cellar.png")
	game.load.image("barrel1", "Barrel_1.png")
	game.load.image("barrel2", "Barrel_2.png")
	game.load.image("barrel3", "Barrel_3.png")
	game.load.image("barrel4", "Barrel_4.png")
	game.load.image("barrel5", "Barrel_5.png")
	game.load.image("barrel6", "Barrel_6.png")
	game.load.image("barrel7", "Barrel_7.png")
	game.load.image("barrel8", "Barrel_8.png")
	game.load.image("barrel9", "Barrel_9.png")
	game.load.image("barrel10", "Barrel_10.png")

	game.load.image("torch-body", "Torch_body.png")
	game.load.image("torch-flame", "Torch_flame.png")

	game.load.image("ladder", "Ladder.png")
	
	game.load.audio("thunderstorm", "GGJ2015 BCMMM - Rain & Thunder Loop (Real Ultimate Low Pass).ogg")
	game.load.audio("statue-grind", "GGJ2015 BCMMM - Statue Rotating Good.ogg")

	game.load.audio("barrelSound1", "barrel-sounds/1 - G.ogg")
	game.load.audio("barrelSound2", "barrel-sounds/8 - D.ogg")
	game.load.audio("barrelSound3", "barrel-sounds/7Csharp.ogg")
	game.load.audio("barrelSound4", "barrel-sounds/4Asharp.ogg")
	game.load.audio("barrelSound5", "barrel-sounds/3 - A.ogg")
	game.load.audio("barrelSound6", "barrel-sounds/11 - F.ogg")
	game.load.audio("barrelSound7", "barrel-sounds/10 - E.ogg")
	game.load.audio("barrelSound8", "barrel-sounds/2Gsharp.ogg")
	game.load.audio("barrelSound9", "barrel-sounds/5 - B.ogg")
	game.load.audio("barrelSound10", "barrel-sounds/6 - C.ogg")


	game.load.audio("barrel-sequence", "barrel-sounds/sequence.ogg")





	return randomId = makeId();
}

var torches = [
	{}, 
	{}, 
	{}, 
	{}, 
	{}, 
	{}, 
	{}, 
	{}
]

var referenceTorch = {}

function create () {


	thunderstorm = game.add.audio("thunderstorm", 1, true)
	
	thunderstorm.play("", 0, 0.40, true)

	console.log("create");
	game.add.sprite(0, 0, "background");
	game.add.sprite(0, 0, "scene")

	x = 200
	y = 0

	torches.forEach(function(torch){
		torch.body = game.add.sprite(x,y, "torch-body")
		torch.flame = game.add.sprite(x,y, "torch-flame")
		torch.flame.alpha = 0
		x += 60
		if (y == 0) {y = 40}
		else {y = 0}
	})

	referenceTorch.body = game.add.sprite(100,150, "torch-body")
	referenceTorch.flame = game.add.sprite(100,150, "torch-flame")

	barrel1 = game.add.sprite(0, 0, "barrel1")
	barrel2 = game.add.sprite(0, 0, "barrel2")
	barrel3 = game.add.sprite(0, 0, "barrel3")
	barrel4 = game.add.sprite(0, 0, "barrel4")
	barrel5 = game.add.sprite(0, 0, "barrel5")
	barrel6 = game.add.sprite(0, 0, "barrel6")
	barrel7 = game.add.sprite(0, 0, "barrel7")
	barrel8 = game.add.sprite(0, 0, "barrel8")
	barrel9 = game.add.sprite(0, 0, "barrel9")
	barrel10 = game.add.sprite(0, 0, "barrel10")


	barrel1.barrelID = 1
	barrel2.barrelID = 2
	barrel3.barrelID = 3
	barrel4.barrelID = 4
	barrel5.barrelID = 5
	barrel6.barrelID = 6
	barrel7.barrelID = 7
	barrel8.barrelID = 8
	barrel9.barrelID = 9
	barrel10.barrelID = 10

	referenceTorch.body.inputEnabled = true
	referenceTorch.sound = game.add.audio("barrel-sequence", 1)
	referenceTorch.body.events.onInputDown.add(function () {
		console.log("clicked torch")
		firebaseRef.child("referenceTorch").set({clicked: true})
	})

	firebaseRef.child("referenceTorch").on("value", function (snapshot) {
		console.log(snapshot.val())
		if (snapshot.val().clicked == true) {
			referenceTorch.sound.play()
		}
		firebaseRef.child("referenceTorch").set({clicked: false})
		
	})

	barrels = [
		barrel1, barrel2, barrel3, barrel4, barrel5, barrel6, barrel7, barrel8, barrel9, barrel10
	]

	barrels.forEach(function (barrel) {
		barrel.inputEnabled = true
		barrel.input.pixelPerfectClick = true
		//console.log("barrel sound:", "barrelSound" + barrel.barrelID)
		barrel.sound = game.add.audio("barrelSound" + barrel.barrelID, 1)
	})

	ladder = game.add.sprite(0, -600, "ladder")
	cursor = game.add.sprite(0, 0, "cursor");
	firebaseRef.on("child_added", function(childSnapshot) {
		return cursorDict[childSnapshot.key()] = game.add.sprite(-50, -50, "cursor");
	});
	firebaseRef.on("child_changed", function(childSnapshot) {
		cursorDict[childSnapshot.key()].x = childSnapshot.val().x;
		return cursorDict[childSnapshot.key()].y = childSnapshot.val().y;
	})

	statueNoise = game.add.audio("statue-grind", 1)

	barrel1.events.onInputDown.add(clickBarrel, {barrelNumber: 1})
	barrel2.events.onInputDown.add(clickBarrel, {barrelNumber: 2})
	barrel3.events.onInputDown.add(clickBarrel, {barrelNumber: 3})
	barrel4.events.onInputDown.add(clickBarrel, {barrelNumber: 4})
	barrel5.events.onInputDown.add(clickBarrel, {barrelNumber: 5})
	barrel6.events.onInputDown.add(clickBarrel, {barrelNumber: 6})
	barrel7.events.onInputDown.add(clickBarrel, {barrelNumber: 7})
	barrel8.events.onInputDown.add(clickBarrel, {barrelNumber: 8})
	barrel9.events.onInputDown.add(clickBarrel, {barrelNumber: 9})
	barrel10.events.onInputDown.add(clickBarrel, {barrelNumber: 10})


	firebaseRef.child("barrels").on("child_added", function (snapshot) {
		// play barrel number noise here
		//
		//
		barrels[snapshot.val().barrel - 1].sound.play()

		if (snapshot.val().barrel == correctSequence[playerSequence.length]) {
			playerSequence.push(snapshot.val().barrel)
			//console.log ("setting torch #:", playerSequence.length)
			//console.log (torches[playerSequence.length-1])
			torches[playerSequence.length - 1].flame.alpha = 1
		}
		else {
			playerSequence = []
			torches.forEach(function (torch) {
				torch.flame.alpha = 0
			})
			firebaseRef.child("barrels").set({})
		}
	})

}
var correctSequence = [1,2,3,4,5,6,7,8]
var playerSequence = []

function clickBarrel() {
	//console.log("clicked barrel", this.barrelNumber)
	firebaseRef.child("barrels").push({barrel: this.barrelNumber})
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
	checkBarrels()
}



function checkBarrels () {
	if (game.input.keyboard.isDown(Phaser.Keyboard.BACKWARD_SLASH)) {
		console.log("cheater")
		game.add.tween(ladder).to({y: 0}, 5000, Phaser.Easing.Linear.None, true)
		statueNoise.play("", 0, 1)
	}

	if (JSON.stringify(playerSequence) == JSON.stringify(correctSequence)) {
		console.log("DINGDINGDING")
		playerSequence = []
		firebaseRef.child("barrels").set({})
		game.add.tween(ladder).to({y: 0}, 5000, Phaser.Easing.Linear.None, true)
		statueNoise.play("", 0, 1)
		
	}


}


