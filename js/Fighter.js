class Fighter extends Sprite {
	constructor({ 
		position, 
		velocity, 
		color = 'red', 
		imageSrc, 
		scale = 1, 
		framesMax = 1, 
		offset = { x: 0, y: 0 }, 
		sprites,
		attackBox = { offset: {}, width: undefined, height: undefined }
	}) {
		super({
			position,
			imageSrc,
			scale,
			framesMax,
			offset
		});

		this.velocity = velocity;
		this.width = 50;
		this.height = 150;
		this.lastKey;
		this.attackBox = {
			position: {
				x: this.position.x,
				y: this.position.y
			},
			offset: attackBox.offset,
			width: attackBox.width,
			height: attackBox.height,
		};
		this.color = color;
		this.isAttacking;
		this.health = 100;

		this.framesCurrent = 0;
		this.framesElapsed = 0;
		this.framesHold = 7;
		this.sprites = sprites
		this.dead = false

		for (const sprite in sprites) {
			sprites[sprite].image = new Image();
			sprites[sprite].image.src = sprites[sprite].imageSrc;
		}
	}

	update() {
		this.draw();
		if (!this.dead) this.animateFrames();

	// Attack Boxes
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
		this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;

	// Gravity function
		if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
			this.velocity.y = 0;
			this.position.y = 330
		} else {
			this.velocity.y += gravity;
		}
	}

	attack() {
		this.switchSprite('attack1')
		this.isAttacking = true;
	}

	takeHit() {
		this.health -= 20;

		if (this.health <= 0) {
			this.switchSprite('death')
		} else this.switchSprite('takeHit')
	}

	switchSprite(sprite) {
	// Overrides all other animations with the death animation
		if (this.image === this.sprites.death.image) {
			if (this.framesCurrent === this.sprites.death.framesMax -1) {
				this.dead = true;	
			}			
			return
		}

	// Overriding all other animations with the 'Attack' animation
		if (this.image === this.sprites.attack1.image && 
			this.framesCurrent < this.sprites.attack1.framesMax - 1
			) return

	// Overriding all other animations with the 'Take hit' animation
		if (this.image === this.sprites.takeHit.image && 
			this.framesCurrent < this.sprites.takeHit.framesMax - 1
			) return

		switch (sprite) {
			case 'idle':
				if (this.image !== this.sprites.idle.image) {
					this.image = this.sprites.idle.image;	
					this.framesMax = this.sprites.idle.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'run':
				if (this.image !== this.sprites.run.image) {
					this.image = this.sprites.run.image;
					this.framesMax = this.sprites.run.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'jump':
				if (this.image !== this.sprites.jump.image) {
					this.image = this.sprites.jump.image;
					this.framesMax = this.sprites.jump.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'fall':
				if (this.image !== this.sprites.fall.image) {
					this.image = this.sprites.fall.image;
					this.framesMax = this.sprites.fall.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'attack1':
				if (this.image !== this.sprites.attack1.image) {
					this.image = this.sprites.attack1.image;
					this.framesMax = this.sprites.attack1.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'takeHit':
				if (this.image !== this.sprites.takeHit.image) {
					this.image = this.sprites.takeHit.image;
					this.framesMax = this.sprites.takeHit.framesMax;
					this.framesCurrent = 0;
				}
				break;
			case 'death':
				if (this.image !== this.sprites.death.image) {
					this.image = this.sprites.death.image;
					this.framesMax = this.sprites.death.framesMax;
					this.framesCurrent = 0;
				}
				break;
		}
	}
}