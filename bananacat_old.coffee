randomId = true
cursor = true
firebaseRef = new Firebase "https://bananacat.firebaseIO.com"
cursorDict = {}
bannister2 = true
bannister3 = true
bannister4 = true

`var bannister1`

bannister1Coords =  {x:  157, y: 418}
bannister2Coords =  {x:  560, y: 400}
bannister3Coords =  {x:  250, y: 225}
bannister4Coords =  {x:  470, y: 220}



makeId = () ->
	text = ""
	possible = "abcdefghijklmnopqrstuvwxyz0123456789"
	for count in [0...10]
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	text



preload = () ->
	console.log "preload"
	game.load.image "hall", "Great_hall_no_bannisters.png"
	game.load.image "cursor", "Mouse_cursor.png"
	game.load.image "bannister", "bannister.png"
	randomId = makeId()
	#console.log randomId

			

create = () ->
	console.log "create"
	game.add.sprite 0, 0, "hall"

	`bannister1 = game.add.sprite (157, 418, "bannister")`
	bannister2 = game.add.sprite 560, 400, "bannister"
	bannister3 = game.add.sprite 250, 225, "bannister"
	bannister4 = game.add.sprite 470, 220, "bannister"

	bannister1["activated"] = false
	bannister2["activated"] = false
	bannister3["activated"] = false
	bannister4["activated"] = false





	cursor = game.add.sprite 0, 0, "cursor"
	
	firebaseRef.on "child_added", (childSnapshot) ->
		cursorDict[childSnapshot.key()] = game.add.sprite -50, -50, "cursor"

	firebaseRef.on "child_changed", (childSnapshot) ->
		cursorDict[childSnapshot.key()].x = childSnapshot.val().x
		cursorDict[childSnapshot.key()].y = childSnapshot.val().y

update = () ->
	#console.log game.input.x, game.input.y
	cursor.x = game.input.x
	cursor.y = game.input.y
	firebaseRef.child(randomId).set
		x: game.input.x
		y: game.input.y
	
	
	
	console.log bannister1.input.pointerOver()

	movement = 10

	#console.log bannister1
	if (bannister1["activated"])
		console.log "firing!"
		bannister1.x = bannister1Coords.x + movement
		bannister1.y = bannister1Coords.y + movement
	else
		#console.log "normal position"
		bannister1.x = bannister1Coords.x
		bannister1.y = bannister1Coords.y



game = new Phaser.Game 800, 600, Phaser.AUTO, "body",
	preload: preload
	create: create
	update: update
