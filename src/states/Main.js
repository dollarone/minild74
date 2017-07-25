import Map from 'objects/Map';
import Player from 'objects/Player';
import BasicAI from 'objects/BasicAI';

class Main extends Phaser.State {

	create() {

		//this.game.physics.startSystem(Phaser.Physics.BOX2D);

		this.game.physics.startSystem(Phaser.Physics.P2JS)
		this.game.physics.p2.restitution = 2


		this.game.stage.backgroundColor = '#98FB98';

		this.step = -1;

		this.speed = 0;

        this.gameover = false;

        this.rKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R)
    	this.rKey.onDown.add(this.restart, this);
    	this.map = new Map(this.game)
    	this.cursors = this.game.input.keyboard.createCursorKeys()


		this.game.physics.p2.setImpactEvents(true);
    	this.game.physics.p2.restitution = 0.8;

		//  Create our collision groups. One for the player, one for the pandas
    	this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup()
    	this.aiPlayersCollisionGroup = this.game.physics.p2.createCollisionGroup()

    	//  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    	//  (which we do) - what this does is adjust the bounds to use its own collision group.
    	this.game.physics.p2.updateBoundsCollisionGroup()

    	this.player1 = new Player(this.game, 390, 140)
    	this.game.camera.follow(this.player1.sprite)
    	this.player1.sprite.body.setCollisionGroup(this.playerCollisionGroup)
    	this.player1.sprite.body.collides([this.aiPlayersCollisionGroup])

    	let style = { font: 'bold 60pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450 }

    	this.textLabel = this.game.add.text(200, 100, "", style)

    	this.textLabel.anchor.set(0.5);
		this.textLabel.fixedToCamera = true

		this.ai_player_count = 7
		this.ai_players = []

		for(let i=0; i<this.ai_player_count; i++) {
			let player = new Player(this.game, 450 + i*80, 100+ i*10)
			let ai = new BasicAI(this.game, player, this.map.map)
			player.setAI(ai)
			this.ai_players.push(player)
			player.sprite.body.setCollisionGroup(this.aiPlayersCollisionGroup)
			player.sprite.body.collides([this.aiPlayersCollisionGroup, this.playerCollisionGroup])
		}
    }


	restart() {
		this.game.state.restart();
	}

	endgame() {
		this.gameover = true;
	}
	killparticle(part, wall) {
		part.kill();
	}
	update() {
		this.step += 1;

		//this.game.physics.p2.collide(this.player1.sprite, this.map.wallsLayer, null, this.player1.hitWall())
		//this.game.physics.p2.collide(this.player1.sprite, this.ai_players)		
		///this.game.physics.arcade.overlap(this.player1.sprite, this.map.roadLayer, this.player1.setOnRoad())
		//check if sprite is grass instead

		if (this.gameover) {
			return;
		}
  
		this.player1.update(this.cursors, this.map.map)
		for(let i=0; i<this.ai_player_count; i++) {
			this.ai_players[i].update(this.cursors, this.map.map)
		}

		//this.textLabel.setText(this.player1.onRoad + " " + this.player1.speed + " " + this.ai_players[0].sprite.body.angle.toFixed(2) + " and " + this.ai_players[0].wantedAngle)
		if (this.map.map.getTile(Math.floor(this.player1.sprite.x/32 + 5), Math.floor(this.player1.sprite.y/32), 'road') && 
			this.map.map.getTile(Math.floor(this.player1.sprite.x/32 + 5), Math.floor(this.player1.sprite.y/32), 'road').index != undefined) {
			this.unpack( this.map.map.getTile(Math.floor(this.player1.sprite.x/32 + 5), Math.floor(this.player1.sprite.y/32), 'road') )
		}

		
	}
unpack(obj) {
    for (var key in obj) {
        //console.log(obj[key])
    }
}
	
	render() {
		this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
		this.game.debug.body(this.player1.sprite)
		this.game.debug.body(this.ai_players[0].sprite)
		//this.game.debug.box2dWorld()
	}
}

export default Main;