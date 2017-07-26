class BasicAI {

	constructor(game, player, map){
		this.game = game
		this.player = player
		this.map = map
		this.prevX = this.player.sprite.x
		this.prevY = this.player.sprite.y
		this.maxSpeed = 200
		this.angle = player.sprite.angle
		this.wantedAngle = player.sprite.angle

		this.cursors = {}
		this.cursors.right = {}
		this.cursors.left = {}
		this.cursors.up = {}
		this.cursors.down = {}
		this.cursors.right.isDown = false
		this.cursors.left.isDown = false
		this.cursors.up.isDown = false
		this.cursors.down.isDown = false
	}
	updateOLd() {
		if(this.prevX < this.player.sprite.x) {
			if(this.prevY < this.player.sprite.y) {
				this.decideCursors(1, 1)
			}
			else if(this.prevY > this.player.sprite.y) {
				this.decideCursors(1, -1)
			}
			else {
				this.decideCursors(1, 0)
			}
		}
		else if(this.prevX > this.player.sprite.x) {
			if(this.prevY < this.player.sprite.y) {
				this.decideCursors(-1, 1)
			}
			else if(this.prevY > this.player.sprite.y) {
				this.decideCursors(-1, -1)
			}
			else {
				this.decideCursors(-1, 0)
			}
		}
		else {
			if(this.prevY < this.player.sprite.y) {
				this.decideCursors(0, 1)
			}
			else if(this.prevY > this.player.sprite.y) {
				this.decideCursors(0, -1)
			}
			else {
				this.decideCursors(0, 0)
			}
		}	

		this.prevX = this.player.sprite.x
		this.prevY = this.player.sprite.y
	}

	update() {

		let dirX = 0
		let dirY = 0
		let deltaX = this.player.sprite.x - this.prevX
		let deltaY = this.player.sprite.y - this.prevY

		//console.log("deltaX,Y: " + deltaX + "," + deltaY)

		if(this.prevX < this.player.sprite.x) {
			dirX = 1
		}
		else if(this.prevX > this.player.sprite.x) {
			dirX = -1
		}

		if(this.prevY < this.player.sprite.y) {
			dirY = 1
		}
		else if(this.prevY > this.player.sprite.y) {
			dirY = -1
		}

		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			//this.dirX *= 2
		}
		else if (Math.abs(deltaX) < Math.abs(deltaY)) {
			//this.dirY *= 2
		}

		this.decideCursors(dirX, dirY)
//nsole.log("dirX,Y: " + dirX + "," + dirY)
		this.prevX = this.player.sprite.x
		this.prevY = this.player.sprite.y
	}

	decideCursors(dirX, dirY) {
		this.cursors.up.isDown = true
		this.cursors.right.isDown = false
		this.cursors.left.isDown = false



		let minX = 0
		let maxX = 0
		let minY = 0
		let maxY = 0
		let incX = 1
		let incY = 1
		let checkXfirst = true

		let foundOrder = false
		if (this.player.wantedAngle == this.player.sprite.body.angle) {
			
			switch(this.player.wantedAngle) {
				case -180:
					minY += 0
					maxY += 2
					minX -= 2
					maxX += 2
					break
				case -135:
					minY -= 0
					maxY += 2
					minX -= 2
					maxX += 0
					break
				case -90:
					minY -= 2
					maxY += 2
					minX -= 1
					maxX -= 0

					break
				case -45:
					minY -= 3
					maxY += 0
					minX -= 2
					maxX += 0
					break
				case 0:
					checkXfirst = false
					minY -= 1
					maxY -= 0
					minX -= 3
					maxX += 3
					//incY = -1
					break
				case 45:
					minY -= 2
					maxY += 0
					minX -= 0
					maxX += 2
					break
				case 90:
					minY -= 3
					maxY += 3
					minX += 1
					maxX += 2
					break
				case 135:
					minY -= 0
					maxY += 2
					minX -= 0
					maxX += 2
					break
			}
			
			if (checkXfirst) {
				for (let x=minX; x<maxX; x+=incX) {
					for (let y=minY; y<maxY; y+=incY) {
						
						if(this.checkGrid(x, y)) {
							
							foundOrder = true
							console.log("new wantedAngle: " + this.player.wantedAngle + "  cur angle: " + this.player.sprite.body.angle)
							break
						}
					}
				}
			}
			else {
				for (let y=minY; y<maxY; y+=incY) {
					for (let x=minX; x<maxX; x+=incX) {
						
						if(this.checkGrid(x, y)) {
							foundOrder = true
							console.log("new wantedAngle: " + this.player.wantedAngle + "  cur angle: " + this.player.sprite.body.angle)
							break
						}
					}
				}
			}
			
		}
		else {
			
			switch(this.player.wantedAngle) {
				case 0:
					if (this.player.sprite.body.angle < -3) {
						this.cursors.right.isDown = true
					}
					else if (this.player.sprite.body.angle > 3) {
						this.cursors.left.isDown = true
					}
					else {
						this.player.sprite.body.angle = 0
					}
					break
				case 45:
					if (this.player.sprite.body.angle < 42) {
						this.cursors.right.isDown = true
					}
					else if (this.player.sprite.body.angle > 48) {
						this.cursors.left.isDown = true
					}
					else {
						this.player.sprite.body.angle = 45
					}
					break
				case 90: 
					if (this.player.sprite.body.angle < 88 && this.player.sprite.body.angle > 0) {
						this.cursors.right.isDown = true
					}
					else if (this.player.sprite.body.angle > 93) {
						this.cursors.left.isDown = true
					}
					else {
						this.player.sprite.body.angle = 90
					}
					break
				case 135:
					if (this.player.sprite.body.angle < 132 && this.player.sprite.body.angle > 0) {
						this.cursors.right.isDown = true
					}
					else if (this.player.sprite.body.angle > 138  || this.player.sprite.body.angle < 0) {
						this.cursors.left.isDown = true
					}
					else {
						this.player.sprite.body.angle = 135
					}
					break
				case -180:
					if (this.player.sprite.body.angle < 177 && this.player.sprite.body.angle > 0) {
						this.cursors.right.isDown = true
					}
					else if (this.player.sprite.body.angle > -177 && this.player.sprite.body.angle < 0) {
						this.cursors.left.isDown = true
					}
					else {
						this.player.sprite.body.angle = -180
					}
					break
				case -135:
					if (this.player.sprite.body.angle < -138) {
						this.cursors.right.isDown = true
					}
					else if (this.player.sprite.body.angle > -132 && this.player.sprite.body.angle < 0) {
						this.cursors.left.isDown = true
					}
					else {
						this.player.sprite.body.angle = -135
					}
					break
				case -90:
					if (this.player.sprite.body.angle < -93) {
						this.cursors.right.isDown = true
					}
					else if (this.player.sprite.body.angle > -87 && this.player.sprite.body.angle < 0) {
						this.cursors.left.isDown = true
					}
					else {
						this.player.sprite.body.angle = -90
					}
					break
				case -45:
					if (this.player.sprite.body.angle < -48) {
						this.cursors.right.isDown = true
					}
					else if (this.player.sprite.body.angle > -42) {
						this.cursors.left.isDown = true
					}
					else {
						this.player.sprite.body.angle = -45
					}
					break
			}
		}
	}

	checkGrid(x, y) {
		let tile = this.map.getTile(Math.floor(this.player.sprite.x/32 + x), Math.floor(this.player.sprite.y/32 + y), 'road')
		if (tile == undefined) return false
		//	console.log("tile " + tile.index)

		switch(this.player.wantedAngle) {
			case 90:
				if (tile.index == 222) {
					//this.cursors.right.isDown = true
					this.player.wantedAngle = 135
					return true
				}
				if (tile.index == 206) {
					this.player.wantedAngle = 45
					//this.cursors.left.isDown = true
					return true
				}
				break
			case 135:
				if (tile.index == 190) {
					//this.cursors.right.isDown = true
					this.player.wantedAngle = -180
					return true
				}
				if (tile.index == 221) {
					this.player.wantedAngle = 90
					//this.cursors.left.isDown = true
					return true
				}
				break
			case -180:
				if (tile.index == 206) {
					this.player.wantedAngle = -135
					//this.cursors.right.isDown = true
					return true
				}
				if (tile.index == 222) {
					this.player.wantedAngle = 135
					//this.cursors.right.isDown = true
					return true
				}
				break
			case -135:
				if (tile.index == 190) {
					//this.cursors.right.isDown = true
					this.player.wantedAngle = -180
					return true
				}
				if (tile.index == 221) {
					this.player.wantedAngle = -90
					//this.cursors.left.isDown = true
					return true
				}
				break
			case -90:
				if (tile.index == 206) {
					this.player.wantedAngle = -135
					//this.cursors.left.isDown = true
					return true
				}
				if (tile.index == 222) {
					this.player.wantedAngle = -45
					//this.cursors.right.isDown = true
					return true
				}
				break
			case -45:
				if (tile.index == 190) {
					//this.cursors.right.isDown = true
					this.player.wantedAngle = 0
					return true
				}
				if (tile.index == 221) {
					this.player.wantedAngle = -90
					//this.cursors.left.isDown = true
					return true
				}				break
			case 0:
				if (tile.index == 206) {
					//this.cursors.right.isDown = true
					this.player.wantedAngle = 45
					return true
				}
				if (tile.index == 222) {
					this.player.wantedAngle = -45
					//this.cursors.right.isDown = true
					return true
				}
				break
			case 45:
				if (tile.index == 190) {
					//this.cursors.right.isDown = true
					this.player.wantedAngle = 0
					return true
				}
				if (tile.index == 221) {
					this.player.wantedAngle = 90
					//this.cursors.left.isDown = true
					return true
				}
				break
		}

		return false

	}

}


export default BasicAI;