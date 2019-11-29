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

	setPlayerOrientation(settings) {
		if (this.getPlayerOrientation(settings.player) == undefined) {
			let randomOrientation = this.getRandomOrientation();
			this.playerOrientation[settings.player.uuid] = randomOrientation;
		} else {
			this.playerOrientation[settings.player.uuid] = settings.orientation;
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
					x = x + u;
					square.push([x, y]);
				}
				break;
			case "E":
				for (let u = 0; u < length; u++) {
					let x = 0;
					let y = 0;
					y = y - u;
					square.push([x, y]);
				}
				break;
			case "S":
				for (let u = 0; u < length; u++) {
					let x = 0;
					let y = 0;
					x = x - u;
					square.push([x, y]);
				}
				break;
			case "W":
				for (let u = 0; u < length; u++) {
					let x = 0;
					let y = 0;
					y = y + u;
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

	setPlayerPos(settings) {
		
		if (this.getPlayerPos(settings.player) == undefined) {
			for (let x = 0; x < 1; x++) {
				let randomCoord = this.getRandomPos();
				let randomX = randomCoord[0];
				let randomY = randomCoord[1];
				if (this.playerOrientation[settings.player.uuid] == undefined) {
					this.setPlayerOrientation({
						player: settings.player,
					});
				}
				let square = this.getPlayerSquare(settings.player);
				let squarePosition = [];
				let verification = 0;
				for (let s = 0; s < square.length; s++) {
					let x = randomX + square[s][0];
					let y = randomY + square[s][1];
					squarePosition.push([x, y]);
				}
				for (let z = 0; z < squarePosition.length; z++) {
					if (squarePosition[z][0] >= 0 && squarePosition[z][0] <= 14 && squarePosition[z][1] >= 0 && squarePosition[z][1] <= 14) {
						/* verifie que la position est bien sur la carte*/
						if (this.map[squarePosition[z][0]][squarePosition[z][1]] === "") {
							verification = verification + 1
						} /*incrémente la verification si toutes les conditions son requises*/
					}
				}
				if (verification == squarePosition.length) {

					let squareFinal = [];
					for (let y = 0; y < squarePosition.length; y++) {
						this.map[squarePosition[y][0]][squarePosition[y][1]] = settings.player.uuid; /*ajoute l'uuid' du joueur sur la carte*/
						var pos = [squarePosition[y][0], squarePosition[y][1]]; /*créer la position du joueur total dans une variable*/
						squareFinal.push(pos);
					}
					this.playerPosSquare[settings.player.uuid] = squareFinal;
					this.playersPos[settings.player.uuid] = [randomX, randomY];
				} else {
					x--
				}
			}
		} else {
			let oldPos = this.playerOrientation[settings.player.uuid];
			let newPos = settings.newPos;
			let newOrientation = settings.newOrientation;
			console.log('OldOrientation: ', oldPos);
			let oldSquare = this.getPlayerSquarePos(settings.player);
			for (let x = 0; x < oldSquare.length; x++) {
				this.map[oldSquare[x][0]][oldSquare[x][1]] = "";
			}
			this.setPlayerOrientation({
				player: settings.player,
				orientation: newOrientation
			});
			console.log('newOrientation: ', newOrientation);
			this.playersPos[settings.player.uuid] = newPos;
			let newX = newPos[0];
			let newY = newPos[1];

			let square = this.getPlayerSquare(settings.player);
			let squarePosition = [];
			for (let s = 0; s < square.length; s++) {
				let x = newX + square[s][0];
				let y = newY + square[s][1];
				squarePosition.push([x, y]);
			}
			let squareFinal = [];
			for (let y = 0; y < squarePosition.length; y++) {
				this.map[squarePosition[y][0]][squarePosition[y][1]] = settings.player.uuid; /*ajoute l'uuid' du joueur sur la carte*/
				var pos = [squarePosition[y][0], squarePosition[y][1]]; /*créer la position du joueur total dans une variable*/
				squareFinal.push(pos);
			}
			this.playerPosSquare[settings.player.uuid] = squareFinal;
			console.log(this.map)
		}
	}

	/*mouvement autorise*/

	testmove(player) {
		let pos = this.getPlayerSquarePos(player);
		let speed = player.speed;
		let playerlength = this.getPlayerLength(player);
		let mapTest = this.newmapGameArray();
		let testPos = [];

		for (let k = 0; k < mapTest.length; k++) {
			/* on passe chaque ligne de mapTest en test*/
			for (let w = 0; w < mapTest[k].length; w++) {
				mapTest[k][w] = {
					N: false,
					S: false,
					E: false,
					W: false
				};
			}
		}
		for (let z = 0; z < pos.length; z++) {
			mapTest[pos[z][0]][pos[z][1]].N = true;
			mapTest[pos[z][0]][pos[z][1]].S = true;
			mapTest[pos[z][0]][pos[z][1]].E = true;
			mapTest[pos[z][0]][pos[z][1]].W = true;
		}

		for (let x = 0; x < speed; x++) {
			/*on effectue la recherche pour le nombre de cases de déplacement possible */

			for (let k = 0; k < mapTest.length; k++) {
				/* on passe chaque ligne de mapTest en test*/
				for (let w = 0; w < mapTest[k].length; w++) {
					/*on passe chaque colonne de mapTest en test*/
					if (mapTest[k][w].N === true || mapTest[k][w].S === true || mapTest[k][w].E === true || mapTest[k][w].W === true) {
						testPos.push([k, w])
					};
					/* si la case est une possibilité on l'ajoute alors au test à effectuer*/
				}
			}
			for (let x = 0; x < testPos.length; x++) {
				let test = testPos[x];

				let testNord = 0;
				for (let n = 0; n < playerlength; n++) {
					let lineX = test[0] - 1 + n;
					let liX = test[0] - 1;
					if (liX < 0) {
						liX = 0
					}
					if (liX > 14) {
						liX = 14
					}
					let columnY = test[1];
					if (lineX < 0) {
						lineX = 0
					}
					if (lineX > 14) {
						lineX = 14
					}
					if (this.map[lineX][columnY] === "" || this.map[lineX][columnY] === "s0" || this.map[lineX][columnY] === "s1" || this.map[lineX][columnY] === "s2" || this.map[lineX][columnY] === "s3" || this.map[lineX][columnY] === player.uuid) {
						testNord = testNord + 1;
					}
					if (testNord == playerlength) {
						mapTest[liX][columnY].N = true
					}
				} /*test de la case nord en prenan compte du square du vaisseau */

				let testSud = 0;
				for (let s = 0; s < playerlength; s++) {
					let lineX = test[0] + 1 - s;
					let liX = test[0] + 1;
					if (liX < 0) {
						liX = 0
					}
					if (liX > 14) {
						liX = 14
					}
					let columnY = test[1];
					if (lineX < 0) {
						lineX = 0
					}
					if (lineX > 14) {
						lineX = 14
					}
					if (this.map[lineX][columnY] === "" || this.map[lineX][columnY] === "s0" || this.map[lineX][columnY] === "s1" || this.map[lineX][columnY] === "s2" || this.map[lineX][columnY] === "s3" || this.map[lineX][columnY] === player.uuid) {
						testSud = testSud + 1;
					}
					if (testSud == playerlength) {
						mapTest[liX][columnY].S = true
					}
				} /*test de la case sud en prenan compte du square du vaisseau */

				let testEst = 0;
				for (let e = 0; e < playerlength; e++) {
					let lineX = test[0];
					let columnY = test[1] + 1 - e;
					let colY = test[1] + 1;
					if (colY < 0) {
						colY = 0
					}
					if (colY > 14) {
						colY = 14
					}
					if (lineX < 0) {
						lineX = 0
					}
					if (lineX > 14) {
						lineX = 14
					}
					if (this.map[lineX][columnY] === "" || this.map[lineX][columnY] === "s0" || this.map[lineX][columnY] === "s1" || this.map[lineX][columnY] === "s2" || this.map[lineX][columnY] === "s3" || this.map[lineX][columnY] === player.uuid) {
						testEst = testEst + 1;
					}
					if (testEst == playerlength) {
						mapTest[lineX][colY].E = true
					}
				} /*test de la case est en prenan compte du square du vaisseau */

				let testOuest = 0;
				for (let o = 0; o < playerlength; o++) {
					let lineX = test[0];
					let columnY = test[1] - 1 + o;
					let colY = test[1] - 1;
					if (colY < 0) {
						colY = 0
					}
					if (colY > 14) {
						colY = 14
					}
					if (lineX < 0) {
						lineX = 0
					}
					if (lineX > 14) {
						lineX = 14
					}
					if (this.map[lineX][columnY] === "" || this.map[lineX][columnY] === "s0" || this.map[lineX][columnY] === "s1" || this.map[lineX][columnY] === "s2" || this.map[lineX][columnY] === "s3" || this.map[lineX][columnY] === player.uuid) {
						testOuest = testOuest + 1;
					}
					if (testOuest == playerlength) {
						mapTest[lineX][colY].W = true
					}
				} /*test de la case ouest en prenan compte du square du vaisseau */
			}

		}

		for (let z = 0; z < pos.length; z++) {
			mapTest[pos[z][0]][pos[z][1]].N = "x";
			mapTest[pos[z][0]][pos[z][1]].S = "x";
			mapTest[pos[z][0]][pos[z][1]].E = "x";
			mapTest[pos[z][0]][pos[z][1]].W = "x";
		}
		console.log(mapTest);
		return (mapTest);
	}

}

/* deplacement 
plateau[4][4] = plateau[6][4];
plateau[6][4] = ' '; */