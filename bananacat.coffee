game = new Phaser.Game 800, 600, Phaser.AUTO, "body",
	preload: () ->
		console.log "preload"
		game.load.image "hall", "Great_hall_no_bannisters.png"
	create: () ->
		console.log "create"
		game.add.sprite 0, 0, "hall"
	update: () ->
		#console.log "update"

