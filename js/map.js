export {
	mapGame as
	default
};
class mapGame {
	constructor() {
		this.size = 15;
		this.obstacles = 15;
		this.playersPos = [];
		this.playerPosSquare = [];
		this.orientation = ["N", "E", "S", "W"];
		this.playerOrientation = [];
		this.map = this.newmapGameArray();
		this.addObstacle();
		this.addStuff();
	}

	newmapGameArray() {
		let mapGame = new Array()
		for (let x = 0; x < this.size; x++) {
			mapGame[x] = new Array();
			for (let y = 0; y < this.size; y++) {
				mapGame[x][y] = "";
			}
		}
		return mapGame
	}


	getRandomPos() {
		let randomLineNumber = Math.floor(Math.random() * this.size);
		let randomCollumnNumber = Math.floor(Math.random() * this.size);
		return [randomLineNumber, randomCollumnNumber];
	}

	getRandomOrientation() {
		let randomOrientation = this.orientation[Math.floor(Math.random() * this.orientation.length)];
		return randomOrientation;
	}

	/*obstacle*/
	addObstacle() {
		for (let x = 0; x < this.obstacles; x++) {
			let randomCoord = this.getRandomPos();
			let randomX = randomCoord[0];
			let randomY = randomCoord[1];
			let xpos2 = randomX + 2;
			let ypos2 = randomY + 2;
			var plageX = [];
			var plageY = [];
			var testObstacl = 0;


			if (this.map[randomX][randomY] === "x") {
				x--
			} else {
				for (let z = 0; z < 5; z++) {
					var finalX = undefined;
					var numberX = xpos2 - z;
					if (numberX > 14) {
						finalX = 14
					} else if (numberX < 0) {
						finalX = 0
					} else {
						finalX = numberX
					};
					plageX.push(finalX);
					var finalY = undefined;
					let numberY = ypos2 - z;
					if (numberY > 14) {
						finalY = 14
					} else if (numberY < 0) {
						finalY = 0
					} else {
						finalY = numberY
					};
					plageY.push(finalY);
				}
				for (let u = 0; u < 5; u++) {
					for (let s = 0; s < 5; s++) {
						if (this.map[plageX[u]][plageY[s]] != "x") {
							testObstacl = testObstacl + 1
						}
					}
				}

				if (testObstacl == 25) {
					this.map[randomX][randomY] = "x";
				} else {
					x--
				}
			}
		}
	}
	/*equipement*/
	addStuff() {
		for (let x = 0; x < 4; x++) {
			let randomCoord = this.getRandomPos();
			let randomX = randomCoord[0];
			let randomY = randomCoord[1];
			if (this.map[randomX][randomY] == "x" || this.map[randomX][randomY] == "s" + "") {
				x--
			} else {
				this.map[randomX][randomY] = "s" + x
			}
		}
	}
	/*joueurs*/

	/*position*/
	getPlayerOrientation(player) {
		if (this.playerOrientation[player.uuid]) {
			return this.playerOrientation[player.uuid]
		}
		return undefined
	}

	setPlayerOrientation(player) {
		if (this.getPlayerOrientation(player) == undefined) {
			let randomOrientation = this.getRandomOrientation();
			this.playerOrientation[player.uuid] = randomOrientation;
		}


	}

	getPlayerLength(player) {
		let playerLength = player.ship.sprite.length;
		return playerLength;
	}

	getPlayerSquare(player) {
		let orientation = this.getPlayerOrientation(player);
		let length = this.getPlayerLength(player);
		let square = [];
		switch (orientation) {
			case "N":
				for (let u = 0; u < length; u++) {
					let x = 0;
					let y = 0;
					y = y + u;
					square.push([x, y]);
				}
				break;
			case "E":
				for (let u = 0; u < length; u++) {
					let x = 0;
					let y = 0;
					x = x + u;
					square.push([x, y]);
				}
				break;
			case "S":
				for (let u = 0; u < length; u++) {
					let x = 0;
					let y = 0;
					y = y - u;
					square.push([x, y]);
				}
				break;
			case "W":
				for (let u = 0; u < length; u++) {
					let x = 0;
					let y = 0;
					x = x - u;
					square.push([x, y]);
				}
				break;
		}
		return square;
	}

	getPlayerPos(player) {
		if (this.playersPos[player.uuid]) {
			return this.playersPos[player.uuid]
		}
		return undefined
	}

	getPlayerSquarePos(player) {
		if (this.playerPosSquare[player.uuid]) {
			return this.playerPosSquare[player.uuid]
		}
		return undefined
	}

	setPlayerPos(player) {
		if (this.getPlayerPos(player) == undefined) {
			for (let x = 0; x < 1; x++) {
				let randomCoord = this.getRandomPos();
				let randomX = randomCoord[0];
				let randomY = randomCoord[1];
				this.setPlayerOrientation(player);
				let square = this.getPlayerSquare(player);
				let squarePosition = [];
				let verification = 0;
				for (let s = 0; s < square.length; s++) {
					let x = randomX + square[s][0];
					let y = randomY + square[s][1];
					squarePosition.push([x, y]);
				}
				for (let z = 0; z < squarePosition.length; z++) {
				/*problème recurant a trouver */	if (typeof this.map[squarePosition[z][0]][squarePosition[z][1]] == "string" && this.map[squarePosition[z][0]][squarePosition[z][1]] < 0) {} else if (typeof this.map[squarePosition[z][0]][squarePosition[z][1]] == "string") {
						verification = verification + 1 
					}
				}
				if (verification == squarePosition.length) {
					let square = [];
					for (let y = 0; y < squarePosition.length; y++) {
						this.map[squarePosition[y][0]][squarePosition[y][1]] = player.name;
						var pos = [squarePosition[y][0], squarePosition[y][1]];
						square.push(pos);
					}
					this.playerPosSquare[player.uuid] = square;
					this.playersPos[player.uuid] = [randomX, randomY];
				} else {
					x--
				}

			}
		}
	}

	/*mouvement autorise*/
	checkmove(player) {
		let pos = this.getPlayerPos(player);
		let speed = player.speed;
		let movePos = [];
		let line = pos[0];
		let column = pos[1];
		let lineMax = line + speed;
		let columnMax = column + speed;
		for (let x = 0; x < (speed * 2 + 1); x++) {
			for (let y = 0; y < (speed * 2 + 1); y++) {
				if (y < (speed - x) || (x + y) > ((speed + (x)*2)) || x > (speed + y) || (x + y) > (speed*3)) {} else {
					let posSearchX = lineMax - x;
					let posSearchY = columnMax - y;
					let posSearch = [posSearchX, posSearchY];
					movePos.push(posSearch);}
				}
				/*speed - x = ecart souhaité */
			}
			console.log("position initial:", pos);
			console.log("moove possible:", movePos);
			return(movePos);
		}
	}

/* deplacement 
plateau[4][4] = plateau[6][4];
plateau[6][4] = ' '; */