export {mapGame as default};
class mapGame {
	constructor() {
		this.size = 15;
		this.obstacles = 10;
		this.player1pos = undefined;
		this.player2pos = undefined;
		this.mapGame = this.newmapGameArray ();
		this.addObstacle();
		this.addStuff();
	}

    newmapGameArray () {
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
		let randomLineNumber = Math.floor(Math.random()*this.size);
		let randomCollumnNumber = Math.floor(Math.random()*this.size);
		return [randomLineNumber, randomCollumnNumber];
	}

	/*obstacle*/
	addObstacle() {
		for (let x = 0; x < this.obstacles; x++) {
			let randomCoord = this.getRandomPos();
			let randomX = randomCoord[0];
			let randomY = randomCoord[1];
			if (this.mapGame[randomX][randomY] == "x") {x--}
			else {this.mapGame[randomX][randomY] = "x"}
		}
	}
	/*equipement*/
	addStuff() {
		for (let x = 0; x < 4; x++) {
			let randomCoord = this.getRandomPos();
			let randomX = randomCoord[0];
			let randomY = randomCoord[1];
			if (this.mapGame[randomX][randomY] == "x" || this.mapGame[randomX][randomY] == "s"+"") {x--}
			else {this.mapGame[randomX][randomY] = "s"+x}
		}
	}
	/*joueurs*/

	setPlayerPos(player) {

	}

	checkmove(player) {}
		/*position*/
		/*mouvement autorise*/



	newmapGameTable () {
		const newTabl = document.createElement("table");
		/*newTabl.classList.add("mapGameGame");*/
		const newTablBody = document.createElement("tbody");
		/*newTablBody.classList.add("tbody");*/
		for (let x = 0; x < this.size; x++) {
			var newLine = document.createElement("tr");
			for (let y = 0; y < this.size; y++) {
				var newColumn = document.createElement("td");
				newLine.appendChild(newColumn);
				const newDiv = document.createElement("div");
				newDiv.setAttribute("data-x", x);
				newDiv.setAttribute("data-y", y);
				newColumn.appendChild(newDiv);
				/*newColumn.classList.add("gameGrid");
				newDiv.classList.add("basemapGame");
				this.newImgmapGame({parent: newDiv,
					src: this.mapGameImg,
					class: ["cellImg", "opacity02"]
				});*/
				var newId = {x:x , y:y, cel:newDiv};
				this.mapGameCoord.push(newId);
			};
			newTablBody.appendChild(newLine);
		};
		newTabl.appendChild(newTablBody);
		return newTabl;
	}
	
	testObstacl(allPlage) {
		for (let w = 0; w < 25; w++) {
			var currentPlage = allPlage[w];
			const found = this.mapGameCoord.find(element => element.x === currentPlage.x && element.y === currentPlage.y);
			if (found.cel.classList.contains("noSell")) {return false}
		} return true;
	}

	mapGameObstacle() {
		for (let i = 0; i < this.obstacles; i++) {
			let random = this.mapGameCoord[Math.floor(Math.random()*this.mapGameCoord.length)];
			let xPos2 = random.x + 2;
			let yPos2 = random.y + 2;

			let plageX = [];
			let plageY = [];
			let allPlage = [];

			for (let x = 0; x < 5; x++) {
				let numberX = xPos2 - x;
				plageX.push(numberX);
				let numberY = yPos2 - x;
				plageY.push(numberY);
			}

			function negativ(currentValue) {
				return currentValue >=0;
			}

			function overpositiv(currentValue) {
				return currentValue <=14;
			}

			if (plageX.every(negativ) && plageX.every(overpositiv) && plageY.every(negativ) && plageY.every(overpositiv)) {
				for (let y = 0; y < 5; y++) {
					for (let s = 0; s < 5; s++) {
						var plageTotal = {x:plageX[s], y:plageY[y]};
						allPlage.push(plageTotal);
					}
				}

				if (this.testObstacl(allPlage) === true) {
					let Celrandom = random.cel;
					Celrandom.classList.add("noSell");
					let obstacleRandom = this.obstaclesSprites[Math.floor(Math.random() * this.obstaclesSprites.length)];
					this.newImgmapGame ({
						parent: Celrandom,
						src: obstacleRandom,
						class: ["obstacleImg"]
					});
				} else { i-- }
			} else { i--}
		}
	}

	mapGameWeapons () {
		for (let x = 0; x < this.weapon.length; x++) {
			let mapGameRandom = this.mapGameCoord[Math.floor(Math.random()*this.mapGameCoord.length)];
			let item = this.weapon[x];
			if (mapGameRandom.cel.classList.contains("noSell")) {
				x--
			} else {
				let itemOrientation = item.sprite[Math.floor(Math.random()*item.sprite.length)];
				this.newImgmapGame({
					parent: mapGameRandom.cel,
					src: itemOrientation,
					class: [""]
				})
			}
		}
	}
}