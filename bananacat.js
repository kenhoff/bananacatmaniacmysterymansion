var game = new Phaser.Game(800, 600, Phaser.AUTO, "body", {preload: preload, create: create, update: update})

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
  game.load.image("hall", "Great_hall_no_bannisters.png");
  game.load.image("cursor", "Mouse_cursor.png");
  game.load.image("bannister", "bannister.png");
  return randomId = makeId();
}
function create () {

  console.log("create");
  game.add.sprite(0, 0, "hall");
  bannister1 = game.add.sprite (157, 418, "bannister");
  bannister2 = game.add.sprite(560, 400, "bannister");
  bannister3 = game.add.sprite(250, 225, "bannister");
  bannister4 = game.add.sprite(470, 220, "bannister");
  bannister1["activated"] = false;
  bannister2["activated"] = false;
  bannister3["activated"] = false;
  bannister4["activated"] = false;
  cursor = game.add.sprite(0, 0, "cursor");
  firebaseRef.on("child_added", function(childSnapshot) {
    return cursorDict[childSnapshot.key()] = game.add.sprite(-50, -50, "cursor");
  });
  return firebaseRef.on("child_changed", function(childSnapshot) {
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
  movement = 10;
  if (bannister1["activated"]) {
    console.log("firing!");
    bannister1.x = bannister1Coords.x + movement;
    return bannister1.y = bannister1Coords.y + movement;
  } else {
    bannister1.x = bannister1Coords.x;
    return bannister1.y = bannister1Coords.y;
  }
}

