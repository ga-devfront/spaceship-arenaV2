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
                    if (y < (speed - x) || (x + y) > ((speed + (x)*2)) || x > (speed + y) || (x + y) > (speed*3)) {} else {
                        let posSearchX = lineMax - x;
                        let posSearchY = columnMax - y;
                        if (this.map[posSearchX][posSearchY] === "" || this.map[posSearchX][posSearchY] === "s0" || this.map[posSearchX][posSearchY] === "s1" || this.map[posSearchX][posSearchY] === "s2" || this.map[posSearchX][posSearchY] === "s3" || this.map[posSearchX][posSearchY] === player.uuid) {
                        testPos.push([posSearchX, posSearchY]);}
                    } 
                }
            }}
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
8
					if (this.map[lineX][columnY] === "" || this.map[lineX][columnY] === "s0" || this.map[lineX][columnY] === "s1" || this.map[lineX][columnY] === "s2" || this.map[lineX][columnY] === "s3" || this.map[lineX][columnY] === player.uuid) {
						testNord = testNord + 1;
					}
					if (testNord == playerlength) {
						mapTest[liX][columnY].N = true
					}
				} /*test de la case nord en prenan compte du square du vaisseau */

				let testSud = 0;
				for (let s = 0; s < playerlength; s++) {
					let lineX = test[0]- s;
					let liX = test[0];
					let columnY = test[1];
					if (lineX < 0) {
						break;
					}
					if (lineX > 14) {
						break;
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
					let columnY = test[1]- e;
					let colY = test[1];
					if (columnY < 0) {
						break;
					}
					if (columnY > 14) {
						break;
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
					let columnY = test[1]+ o;
					let colY = test[1];
					if (columnY < 0) {
						break;
					}
					if (columnY > 14) {
						break;
					}
					if (this.map[lineX][columnY] === "" || this.map[lineX][columnY] === "s0" || this.map[lineX][columnY] === "s1" || this.map[lineX][columnY] === "s2" || this.map[lineX][columnY] === "s3" || this.map[lineX][columnY] === player.uuid) {
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