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
    	this.sprite.body.setRectangle(32, 64);
    	
    	//this.sprite.body.setSize(1,1,0,0);
    	this.acceleration = 10
    	this.speed = 100
    	this.drag = 1
    	this.maxSpeed = 2000
    	this.maxBackingSpeed = 100
    	this.maxAcceleration = 50
    	this.maxBackingAcceleration = 20

    	this.sprite.frame = game.rnd.integerInRange(0, 16)
    	this.turning_factor = 4
    	this.onRoad = false
    	//this.sprite.body.angle = -90
    	this.sprite.body.angle = 90
//    	this.sprite.body.debug = true
    	this.ai = null
		this.wantedAngle = 90
	}

	oooldupdate() {


		if (this.game.input.activePointer.leftButton.isDown) {
			this.angle -= this.mod;
			this.sprite.angle = this.angle;
		}
		else if (this.game.input.activePointer.rightButton.isDown) {
			this.angle += this.mod;
			this.sprite.angle =this.angle;
		}

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

    	if (this.ai != null) {
    		this.ai.update()
    		cursors = this.ai.cursors
    	}
    	if (map.getTile(Math.floor(this.sprite.x/32), Math.floor(this.sprite.y/32), 'road') != null) {
    		this.onRoad = true
    	}
    	else {
    		this.onRoad = false 
    	}
        if (cursors.up.isDown) {
            this.acceleration = 1            
        } else if (cursors.down.isDown) {            
//            this.acceleration = -11
this.sprite.body.reverse(100)
        } else {
            this.decreaseAcceleration(30)
        }

        if (!this.onRoad) {
			if (this.acceleration > 0) {
				this.speed = 30
			}
			else if (this.acceleration < 0) {
				this.speed = -30
			}
			else {
				this.speed = 0
			}
			this.decreaseAcceleration(100)
		}
			

        if (cursors.left.isDown) {    
        	this.sprite.body.rotateLeft(40*2)
            //this.sprite.body.rotation -= 0.04//this.speed/100 //this.speed/this.turning_factor
       //     this.animations.play('left', 4, true);
        } else if (cursors.right.isDown) {
        	this.sprite.body.rotateRight(40*2)
            //this.sprite.angle += 0.04//this.speed/100//4//this.speed/this.turning_factor
         //   this.animations.play('right', 4, true);
        } else {
        	this.sprite.body.setZeroRotation()
            //this.body.acceleration.x = 0;
        }        
        if  (false && (this.speed > 0 && this.speed - this.drag < 0) || (this.speed < 0 && this.speed + this.drag > 0)) {
        	this.speed = 0
        	this.acceleration = 0
        }
        else {        	
        	this.speed += this.acceleration
        	//this.sprite.x = this.sprite.x + this.speed * Math.cos(this.sprite.angle * Math.PI / 180)
        	//this.sprite.y = this.sprite.y + this.speed * Math.sin(this.sprite.angle * Math.PI / 180)

			if (true || this.speed > 0 && cursors.up.isDown)
    		{
    			this.speed = 200
//        		this.game.physics.p2.velocityFromRotation(this.sprite.rotation, this.speed, this.sprite.body.velocity);
				
    		}
        }
         if (cursors.down.isDown) {            
//            this.acceleration = -11
			this.sprite.body.reverse(100)
		}
		else {
			this.sprite.body.moveForward(this.speed)
		}

        if (this.speed > this.maxSpeed) {
        	this.speed = this.maxSpeed
        }
        if (this.speed < this.maxBackingSpeed) {
        	this.speed = this.maxBackingSpeed
        }

        if (this.acceleration > this.maxAcceleration) {
        	this.acceleration = this.maxAcceleration
        }

        if (this.acceleration < this.maxBackingAcceleration) {
        	this.acceleration = this.maxBackingAcceleration
        }


    }  
}


export default Player;