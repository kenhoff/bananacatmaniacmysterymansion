randomId = true
cursor = true
firebaseRef = new Firebase "https://bananacat.firebaseIO.com"
cursorDict = {}

makeId = () ->
	text = ""
	possible = "abcdefghijklmnopqrstuvwxyz0123456789"
	for count in [0...10]
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	text

game = new Phaser.Game 800, 600, Phaser.AUTO, "body",
	preload: () ->
		console.log "preload"
		game.load.image "hall", "Great_hall_no_bannisters.png"
		game.load.image "cursor", "Mouse_cursor.png"
		randomId = makeId()
		#console.log randomId

		firebaseRef.child(randomId).set
			timestamp: Date.now()

		firebaseRef.on "child_changed", (stuff) ->
			#console.log stuff.key()

			

	create: () ->
		console.log "create"
		game.add.sprite 0, 0, "hall"
		cursor = game.add.sprite 0, 0, "cursor"
		
		firebaseRef.on "child_added", (childSnapshot) ->
			console.log childSnapshot.key()
			cursorDict[childSnapshot.key()] = game.add.sprite -50, -50, "cursor"

		firebaseRef.on "child_changed", (childSnapshot) ->
			###
			if !(childSnapshot.key() in cursorDict)
				console.log childSnapshot.key()
				console.log cursorDict
				cursorDict[childSnapshot.key()] = game.add.sprite childSnapshot.val().x, childSnapshot.val().y, "cursor"
			###
			#console.log childSnapshot.val()
			cursorDict[childSnapshot.key()].x = childSnapshot.val().x
			cursorDict[childSnapshot.key()].y = childSnapshot.val().y
			cursorDict[childSnapshot.key()]["timestamp"] = childSnapshot.val().timestamp
			#console.log cursorDict[childSnapshot.key()]

	update: () ->
		#console.log "update"
		#console.log cursor.x
		cursor.x = game.input.x
		cursor.y = game.input.y
		firebaseRef.child(randomId).set
			timestamp: Date.now()
			x: game.input.x
			y: game.input.y
###
		for key in Object.keys cursorDict
			#console.log cursorDict[key]
			if !("timestamp" in cursorDict[key])
				cursorDict[key].destroy()
				delete cursorDict[key]
			else if ((Date.now() - cursorDict[key].timestamp) > 1000)
				cursorDict[key].destroy()
				delete cursorDict[key]
###


