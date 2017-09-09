"use strict"

// BULLET HELL POINT SERVICE
app.service("BH_points", function(){
	let current = 0;

	return {
		AddPoints: function(points){
			current += points;
		},
		getPoints: function(){
			return current;
		},
		getPointsPadded: function(){
			let str = String(current);

			while(str.length < 9){
				str = "0"+str;
			}
			return str;
		}
	};
})
// PLAYER SERVICE
.service("BH_player", function(){
	let	maxHealth = 0;

	function spawnPlayer(data){
		// Player stats
		this.xPos = data.position[0], this.yPos = data.position[1],
		this.xSpd = data.speed[0], this.ySpd = data.speed[1],
		this.health = data.health, maxHealth = data.health,
		this.shotDelay = data.shotDelay,
		this.radius = data.radius,

		// take damage
		this.takeDmg = function(dmg){
			this.health - dmg >= 0 ? this.health -= dmg : this.health = 0;
		}
		// Get Lives
		this.getMaxHealth = function(){
			return maxHealth;
		}
	};

	return {
		spawnPlayer: spawnPlayer
	};
})
// ENEMY SERVICE
.service("BH_enemy", function(){
	let maxHealth = 0;
	function spawnEnemy(data){
		// enemy stats
		this.xPos = data.position[0], this.yPos = data.position[1],
		this.xSpd = data.speed[0], this.ySpd = data.speed[1],
		this.health = data.health, maxHealth = data.health,
		this.shotDelay = data.shotDelay,
		this.radius = data.radius,
		this.phase = 0,
		this.angle = 0,
		this.deadFlag = false;

		// take damage
		this.takeDmg = function(dmg){
			this.health - dmg >= 0 ? this.health -= dmg : this.health = 0;
		}
		// Get Lives
		this.getMaxHealth = function(){
			return maxHealth;
		}
		this.outOfBounds = function(gameWidth, gameHeight){
			if(this.yPos - this.radius > gameHeight - 0 + 10)
				return true;
			else if(this.yPos + this.radius < -10)
				return true;
			else if(this.xPos - this.radius > gameWidth - 300 + 10)
				return true;
			else if(this.xPos + this.radius < -10)
				return true;
			else
				return false;
		}
	};

	return {
		spawnEnemy: spawnEnemy
	};
})

// PLAYER BULLET SERVICE
.service("BH_playerBullet", function(){
	function spawnBullet(data){
		this.xPos = data.position[0], this.yPos = data.position[1],
		this.xSpd = data.speed[0], this.ySpd = data.speed[1],
		this.width = data.size[0], this.height = data.size[1],
		this.power = data.power
	};

	return {
		spawnBullet: spawnBullet
	};
})
// ENEMY BULLET SERVICE
.service("BH_enemyBullet", function(){
	let maxSpd = 1.0;
	let minSpd = 0.01;

	function spawnBullet(data){
		//stats
		this.xPos = data.position[0], this.yPos = data.position[1],
		this.xSpd = data.speed[0], this.ySpd = data.speed[1],
		this.accel = data.acceleration,
		this.radius = data.radius,
		this.behavior = data.behavior,
		this.angle = 0,

		// fix direction for proper movement
		this.magnitude = Math.sqrt(data.target[0]*data.target[0] + data.target[1]*data.target[1]),
		this.xDir = data.target[0]/this.magnitude, this.yDir = data.target[1]/this.magnitude,

		this.newTarget = function(target){
			this.magnitude = Math.sqrt(target[0]*target[0] + target[1]*target[1])
			this.xDir = target[0]/this.magnitude, this.yDir = target[1]/this.magnitude
		},

		this.getMaxSpd = function(){
			return maxSpd;
		},
		this.getMinSpd = function(){
			return minSpd;
		},
		this.outOfBounds = function(gameWidth, gameHeight){
			if(this.yPos - this.radius > gameHeight - 0 + this.radius)
				return true;
			else if(this.yPos + this.radius < this.radius)
				return true;
			else if(this.xPos - this.radius > gameWidth - 300 + this.radius)
				return true;
			else if(this.xPos + this.radius < -this.radius)
				return true;
			else
				return false;
		}
	};
	return {
		spawnBullet: spawnBullet
	};
})
