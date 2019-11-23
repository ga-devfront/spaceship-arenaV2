export {mapGame as default};
class mapGame {
	constructor() {
		this.size = 15;
		this.obstacles = 15;
		this.player1pos = undefined;
		this.player2pos = undefined;
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

	}

	setPlayerOrientation(player) {

	}

	getPlayerPos(player) {
		for (let x = 0; x < this.map.length; x++) {
			let y = this.map[x].indexOf(player.name);
			if (y != undefined) {return this.map[x][y]}
		}
		return undefined;
	}

	setPlayerPos(player) {
		if (this.getPlayerPos(player) == undefined) {
			let randomCoord = this.getRandomPos();
			let randomX = randomCoord[0];
			let randomY = randomCoord[1];
			for (let x = 0; x < 1; x++) {
			if (this.map[randomX][randomY] == "x" || this.map[randomX][randomY] == "s"+"") {x--}
			else {this.map[randomX][randomY] = player.name}}
		} else {}
	}

		/*mouvement autorise*/
	checkmove(player) {}
}