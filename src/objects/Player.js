class Player {

	constructor(game, x, y){
		this.game = game;
		this.sprite = this.game.add.sprite(x, y, 'cars');
		this.sprite.anchor.setTo(0.5, 0.5);
		//this.sprite.scale.setTo(0.3);
		this.sprite.angle = -90
		//this.sprite.rotation = 0.5
		this.game.physics.enable(this.sprite, Phaser.Physics.P2JS)
    	//this.game.input.mouse.capture = true;
    	
    	this.sprite.body.collideWorldBounds = true;
    	this.sprite.frame = game.rnd.integerInRange(0, 15)

    	this.maxSpeed = 300
		this.accelerationIncreasePerFrame = 0.1
    	this.maxBackingSpeed = -60
    	this.maxSpeedOnGrass = 40
    	this.maxBackingSpeedOnGrass = -30

    	if (this.sprite.frame == 6 || this.sprite.frame == 8 || this.sprite.frame == 10) {
    		this.sprite.body.setRectangle(30, 48)
    		this.sprite.body.mass = 3
    		this.turningBonus = 20
    		this.maxSpeed = 297
			this.accelerationIncreasePerFrame = 0.11
	    	this.maxBackingSpeed = -70
    		this.maxSpeedOnGrass = 50
    		this.maxBackingSpeedOnGrass = -40

    	}
    	else if (this.sprite.frame == 0 || this.sprite.frame == 1 || this.sprite.frame == 5 || this.sprite.frame == 11 || this.sprite.frame == 14) {
    		this.sprite.body.setRectangle(24, 58)
    		this.maxSpeed = 298
    		this.turningBonus = 10
			this.accelerationIncreasePerFrame = 0.11

    	}
    	else if (this.sprite.frame == 7 || this.sprite.frame == 13) {
    		this.sprite.body.setRectangle(26, 56)
    		this.maxSpeed = 299
    		this.turningBonus = 2
			this.accelerationIncreasePerFrame = 0.12

    	}
    	else {
			this.sprite.body.setRectangle(28, 59)
			this.maxSpeed = 300
			this.accelerationIncreasePerFrame = 0.1

    	}
    	//this.maxSpeed = 300
    	//this.sprite.body.setSize(1,1,0,0);
    	this.acceleration = 0
    	this.speed = 0
    	this.drag = 1
    	
    	
    	this.currentMaxSpeed = this.maxSpeed
    	this.currentMaxBackingSpeed = this.maxBackingSpeed

    	this.maxAcceleration = 3
		this.maxBackingAcceleration = -2


    	this.onRoad = false
    	this.sprite.body.angle = 90
//    	this.sprite.body.debug = true
    	this.ai = null
		this.wantedAngle = 90
		this.drowned = 2
		this.dead = false
	}


	setAI(ai) {
		this.ai = ai
	}

	hitWall() {
		//this.speed = 0
		  
		 //this.acceleration = 0
	}

	decreaseAcceleration(amount) {
		if (this.acceleration > 0) {
			if (this.acceleration - amount < 0) {
				this.acceleration = 0
			}
			else {
				this.acceleration -= amount
			}
		}
		else if (this.acceleration < 0) {
			if (this.acceleration + amount > 0) {
				this.acceleration = 0
			}
			else {
				this.acceleration += amount
			}
		}
	}

	decreaseSpeed(amount) {
		if (this.speed > 0) {
			if (this.speed - amount < 0) {
				this.speed = 0
			}
			else {
				this.speed -= amount
			}
		}
		else if (this.speed < 0) {
			if (this.speed + amount > 0) {
				this.speed = 0
			}
			else {
				this.speed += amount
			}
		}
	}


    update(cursors, map) {
    	if (this.dead) {
    		return
    	}
    	if (this.drowned == 0) {
    		this.sprite.kill()
    		this.dead = true
    		return
    	}
    	else if (this.drowned < 2) {
    		this.drowned-=1
    		this.sprite.frame = 17
    		return
    	}

    	if (this.ai != null) {
    		this.ai.update()
    		cursors = this.ai.cursors
    	}
    	if (map.getTile(Math.floor(this.sprite.x/32), Math.floor(this.sprite.y/32), 'water') != null) {
    		this.drowned-=1
    		this.sprite.frame = 16
    	}

    	if (map.getTile(Math.floor(this.sprite.x/32), Math.floor(this.sprite.y/32), 'road') != null) {
    		this.onRoad = true
    	}
    	else {
    		this.onRoad = false 
    	}
        if (cursors.up.isDown) {
        	if (this.acceleration < 0) {
        		this.acceleration = 0
        	}
            this.acceleration +=  this.accelerationIncreasePerFrame
        } 
        else if (cursors.down.isDown) {
        	if (this.acceleration > 0) {
        		this.acceleration = 0
        	}
            this.acceleration -= this.accelerationIncreasePerFrame*4
        } 
        else {
        	this.acceleration = 0
        }


        if (cursors.left.isDown) {    
        	this.sprite.body.rotateLeft(40*this.speed/(100-this.turningBonus))
            //this.sprite.body.rotation -= 0.04//this.speed/100 //this.speed/this.turning_factor
       //     this.animations.play('left', 4, true);
        } else if (cursors.right.isDown) {
        	this.sprite.body.rotateRight(40*this.speed/(100-this.turningBonus))
            //this.sprite.angle += 0.04//this.speed/100//4//this.speed/this.turning_factor
         //   this.animations.play('right', 4, true);
        } else {
        	this.sprite.body.setZeroRotation()
            //this.body.acceleration.x = 0;
        }        

      	this.speed += this.acceleration

        if (!this.onRoad) {
        	this.currentMaxSpeed = this.maxSpeedOnGrass
        	this.currentMaxBackingSpeed = this.maxBackingSpeedOnGrass
        }
        else {
        	this.currentMaxSpeed = this.maxSpeed
        	this.currentMaxBackingSpeed = this.maxBackingSpeed
        }

    	if (this.speed < 0) {
    		if (this.speed < this.currentMaxBackingSpeed)
        	this.speed = this.currentMaxBackingSpeed
	        if (this.acceleration < this.maxBackingAcceleration) {
	        	this.acceleration = this.maxBackingAcceleration
	        }
	    }
	    else {
	    	if (this.speed > this.currentMaxSpeed) {
	        	this.speed = this.currentMaxSpeed
		    }
	        if (this.acceleration > this.maxAcceleration) {
	        	this.acceleration = this.maxAcceleration
	        }
		}

		this.sprite.body.moveForward(this.speed)

    }  
}


export default Player;