export {mapGame as default};
class mapGame {
	constructor() {
		this.size = 15;
		this.obstacles = 15;
		this.playersPos = [];
		this.playerPosSquare = [];
		this.orientation = ["N", "E", "S", "W"];
		this.playerOrientation = [];
		this.map = undefined;
		this.generateMapGame();
		this.oldWeapon = [];
	}

	generateMapGame() {
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

				if (testObstacl === 25) {
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
			let xpos2 = randomX + 2;
			let ypos2 = randomY + 2;
			var plageX = [];
			var plageY = [];
			let testObstacl = 25;
			if (this.map[randomX][randomY] == "x" || this.map[randomX][randomY] == "s" + "") {
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
						if (this.map[plageX[u]][plageY[s]].startsWith("s")) {
							testObstacl = testObstacl - 1
						}
					}
				}
				if (testObstacl === 25) {
				this.map[randomX][randomY] = "s" + x}
				else {x--}
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

	updatePlayerStat(settings) {
		let player = settings.player;
		let weapon = settings.weapon;
		let oldWeapon = settings.oldWeapon;
		switch (oldWeapon) {
			case "s0":
				player.offensif = player.offensif - 1;
				break;
			case "s1":
				player.speed = player.speed - 1;
				break;
			case "s2":
				player.defensif = player.defensif - 1;
				break;
			default:
				;
		}
		switch (weapon) {
			case "s0":
				player.offensif = player.offensif + 1;
				break;
			case "s1":
				player.speed = player.speed + 1;
				break;
			case "s2":
				player.defensif = player.defensif + 1;
				break;
			case "s3":
				player.pv = player.pv + 25;
				if (player.pv > 100) {
					player.pv = 100
				}
				break;
			default:
				;
		}
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
						let xpos = squarePosition[z][0] + 1;
						let ypos = squarePosition[z][1] + 1;
						let test = 0;
						var plageX = [];
						var plageY = [];
						for (let s = 0; s < 3; s++) {
							var finalX = undefined;
							var numberX = xpos - s;
							if (numberX > 14) {
								finalX = 14
							} else if (numberX < 0) {
								finalX = 0
							} else {
								finalX = numberX
							};
							plageX.push(finalX);
							var finalY = undefined;
							let numberY = ypos - s;
							if (numberY > 14) {
								finalY = 14
							} else if (numberY < 0) {
								finalY = 0
							} else {
								finalY = numberY
							};
							plageY.push(finalY);
						}
						for (let u = 0; u < 3; u++) {
							for (let y = 0; y < 3; y++) {
								if (this.map[plageX[u]][plageY[y]] === "") {
									test = test + 1;
								}
							}
						}
						if (test === 9) {
						if (this.map[squarePosition[z][0]][squarePosition[z][1]] === "") {
							verification = verification + 1
						} /*incrémente la verification si toutes les conditions son requises*/}
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
			let newPos = settings.newPos;
			let newOrientation = settings.newOrientation;
			let oldSquare = this.getPlayerSquarePos(settings.player);
			for (let x = 0; x < oldSquare.length; x++) {
				if (this.oldWeapon[settings.player.uuid] === undefined || this.oldWeapon[settings.player.uuid] === "s4") {
					this.map[oldSquare[x][0]][oldSquare[x][1]] = "";
				} else {
					this.map[oldSquare[0][0]][oldSquare[0][1]] = this.oldWeapon[settings.player.uuid];
					this.oldWeapon[settings.player.uuid] = undefined
				}
			}
			this.setPlayerOrientation({
				player: settings.player,
				orientation: newOrientation
			});
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
				if (this.map[squarePosition[y][0]][squarePosition[y][1]] != "") {
					if (settings.player.weapon === undefined) {
						settings.player.weapon = this.map[squarePosition[y][0]][squarePosition[y][1]];
						this.updatePlayerStat({
							player: settings.player,
							weapon: this.map[squarePosition[y][0]][squarePosition[y][1]]
						});
					} else {
						this.oldWeapon[settings.player.uuid] = settings.player.weapon;
						settings.player.weapon = this.map[squarePosition[y][0]][squarePosition[y][1]];
						this.updatePlayerStat({
							player: settings.player,
							weapon: this.map[squarePosition[y][0]][squarePosition[y][1]],
							oldWeapon: this.oldWeapon[settings.player.uuid]
						});
					}
				}
				this.map[squarePosition[y][0]][squarePosition[y][1]] = settings.player.uuid; /*ajoute l'uuid' du joueur sur la carte*/
				var pos = [squarePosition[y][0], squarePosition[y][1]]; /*créer la position du joueur total dans une variable*/
				squareFinal.push(pos);
			}
			this.playerPosSquare[settings.player.uuid] = squareFinal;
		}
	}
	/*attaque*/

	attack(settings) {
		let player = settings.player;
		let ennemi = settings.ennemi;
		ennemi.pv = ennemi.pv - (player.offensif * 5) - (ennemi.defensif);
	}

	testAttack(settings) {
		let pos = this.getPlayerPos(settings.player);
		let direction = this.getPlayerOrientation(settings.player);
		let lineX = pos[0];
		let columnY = pos[1];
		if (direction == "N") {
			let line = lineX - 1;
			if (line < 0) {
				line = 0
			};
			if (line > 14) {
				line = 14
			}
			if (this.map[line][columnY] === settings.ennemy.uuid) {
				return true
			}
		}
		if (direction == "S") {
			let line = lineX + 1;
			if (line < 0) {
				line = 0
			};
			if (line > 14) {
				line = 14
			}
			if (this.map[line][columnY] === settings.ennemy.uuid) {
				return true
			}
		}
		if (direction == "E") {
			let column = columnY + 1;
			if (column < 0) {
				column = 0
			};
			if (column > 14) {
				column = 14
			}
			if (this.map[lineX][column] === settings.ennemy.uuid) {
				return true
			}
		}
		if (direction == "W") {
			let column = columnY - 1;
			if (column < 0) {
				column = 0
			};
			if (column > 14) {
				column = 14
			}
			if (this.map[lineX][column] === settings.ennemy.uuid) {
				return true
			}
		}
		return false
	}

	/*mouvement autorise*/

	searchOnArray(searchElement, array) {
		let toFind = JSON.stringify(searchElement);
		let source = JSON.stringify(array);
		let result = source.indexOf(toFind);
		if (result != -1) {
			return true
		}
		return false
	}

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
			let line = pos[z][0];
			let column = pos[z][1];
			let lineMax = line + speed;
			let columnMax = column + speed;
			for (let x = 0; x < (speed * 2 + 1); x++) {
				for (let y = 0; y < (speed * 2 + 1); y++) {
					if (y < (speed - x) || (x + y) > ((speed + (x) * 2)) || x > (speed + y) || (x + y) > (speed * 3)) {} else {
						let posSearchX = lineMax - x;
						let posSearchY = columnMax - y;
						if (posSearchX < 0) {
							posSearchX = 0
						};
						if (posSearchX > 14) {
							posSearchX = 14
						};
						if (posSearchY < 0) {
							posSearchY = 0
						};
						if (posSearchY > 14) {
							posSearchY = 14
						};
						if (this.map[posSearchX][posSearchY] === "" || this.map[posSearchX][posSearchY] === "s0" || this.map[posSearchX][posSearchY] === "s1" || this.map[posSearchX][posSearchY] === "s2" || this.map[posSearchX][posSearchY] === "s3" || this.map[posSearchX][posSearchY] === player.uuid) {
							testPos.push([posSearchX, posSearchY]);
						}
					}
				}
			}
		}
		for (let x = 0; x < testPos.length; x++) {
			let test = testPos[x];

			let testNord = 0;
			for (let n = 0; n < playerlength; n++) {
				let lineX = test[0] + n;
				let liX = test[0];
				let columnY = test[1];
				if (lineX < 0) {
					break;
				}
				if (lineX > 14) {
					break;
				}
				/* si il correspond a une des testPos */
				if (this.searchOnArray([lineX, columnY], testPos)) {
					testNord = testNord + 1;
				}
				if (testNord == playerlength) {
					mapTest[liX][columnY].N = true
				}
			} /*test de la case nord en prenan compte du square du vaisseau */

			let testSud = 0;
			for (let s = 0; s < playerlength; s++) {
				let lineX = test[0] - s;
				let liX = test[0];
				let columnY = test[1];
				if (lineX < 0) {
					break;
				}
				if (lineX > 14) {
					break;
				}
				if (this.searchOnArray([lineX, columnY], testPos)) {
					testSud = testSud + 1;
				}
				if (testSud == playerlength) {
					mapTest[liX][columnY].S = true
				}
			} /*test de la case sud en prenan compte du square du vaisseau */

			let testEst = 0;
			for (let e = 0; e < playerlength; e++) {
				let lineX = test[0];
				let columnY = test[1] - e;
				let colY = test[1];
				if (columnY < 0) {
					break;
				}
				if (columnY > 14) {
					break;
				}
				if (this.searchOnArray([lineX, columnY], testPos)) {
					testEst = testEst + 1;
				}
				if (testEst == playerlength) {
					mapTest[lineX][colY].E = true
				}
			} /*test de la case est en prenan compte du square du vaisseau */

			let testOuest = 0;
			for (let o = 0; o < playerlength; o++) {
				let lineX = test[0];
				let columnY = test[1] + o;
				let colY = test[1];
				if (columnY < 0) {
					break;
				}
				if (columnY > 14) {
					break;
				}
				if (this.searchOnArray([lineX, columnY], testPos)) {
					testOuest = testOuest + 1;
				}
				if (testOuest == playerlength) {
					mapTest[lineX][colY].W = true
				}
			} /*test de la case ouest en prenan compte du square du vaisseau */
		}



		for (let z = 0; z < pos.length; z++) {
			mapTest[pos[z][0]][pos[z][1]].N = "x";
			mapTest[pos[z][0]][pos[z][1]].S = "x";
			mapTest[pos[z][0]][pos[z][1]].E = "x";
			mapTest[pos[z][0]][pos[z][1]].W = "x";
		}
		return (mapTest);
	}

}