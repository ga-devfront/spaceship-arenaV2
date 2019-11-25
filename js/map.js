export {mapGame as default};
class mapGame {
	constructor() {
		this.size = 15;
		this.obstacles = 15;
		this.playersPos = [];
		this.orientation = ["N", "E", "S", "W"];
		this.playerOrientation = [];
		this.map = this.newmapGameArray ();
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

	getRandomOrientation() {
		let randomOrientation = this.orientation[Math.floor(Math.random()*this.orientation.length)];
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


			if (this.map[randomX][randomY] === "x") {x--} else {
			for (let z = 0; z < 5; z++) {
				var finalX = undefined;
				var numberX = xpos2 - z;
				if (numberX > 14) {finalX = 14} else if (numberX < 0) {finalX = 0} else {finalX = numberX} ;
				plageX.push(finalX);
				var finalY = undefined;
				let numberY = ypos2 - z;
				if (numberY > 14) {finalY = 14} else if (numberY < 0) {finalY = 0} else {finalY = numberY} ;
				plageY.push(finalY);
			}
			for (let u = 0; u < 5; u++) {
				for (let s = 0; s < 5; s++) {
					if (this.map[plageX[u]][plageY[s]] != "x") {testObstacl = testObstacl + 1}
				}
			}

			if (testObstacl == 25) {
				this.map[randomX][randomY] = "x";
			} else {x--}
		}
		}
	}
	/*equipement*/
	addStuff() {
		for (let x = 0; x < 4; x++) {
			let randomCoord = this.getRandomPos();
			let randomX = randomCoord[0];
			let randomY = randomCoord[1];
			if (this.map[randomX][randomY] == "x" || this.map[randomX][randomY] == "s"+"") {x--}
			else {this.map[randomX][randomY] = "s"+x}
		}
	}
	/*joueurs*/

		/*position*/
	getPlayerOrientation(player) {
		if (this.playerOrientation[player.uuid]) {return this.playerOrientation[player.uuid]}
		 return undefined
	}

	setPlayerOrientation(player) {
		if (this.getPlayerOrientation(player) == undefined) {
			let randomOrientation = getRandomOrientation();
			this.playerOrientation[player.uuid] = randomOrientation;
		}


	}

	getPlayerLength(player) {
		let playerLength = player.ship.sprite.length;
		return playerLength;
	}

	getPlayerSquare (player) {
		let orientation = this.getPlayerOrientation(player);
		let length = this.getPlayerLength(player);
		switch(orientation) {
			case "N" :
				expression;
				break;
			case "E" :
				expresison;
				break;
			case "S" :
				expression;
				break;
			case "W" :
				expression;
				break;
		}
	}

	getPlayerPos(player) {
		if (this.playersPos[player.uuid]) {return this.playersPos[player.uuid]}
		 return undefined
	}

	setPlayerPos(player) {
		if (this.getPlayerPos(player) == undefined) {
			let randomCoord = this.getRandomPos();
			let randomX = randomCoord[0];
			let randomY = randomCoord[1];
			for (let x = 0; x < 1; x++) {
			if (typeof this.map[randomX][randomY] == "string" && this.map[randomX][randomY].length > 0) {x--}
			else {this.map[randomX][randomY] = player.name;
				this.playersPos[player.uuid] = [randomX, randomY];
			} /*ajouter la joueur a ma variable*/
		}} else {}
	}

		/*mouvement autorise*/
	checkmove(player) {}

	/* deplacement 
	plateau[4][4] = plateau[6][4];
	plateau[6][4] = ' '; */
}