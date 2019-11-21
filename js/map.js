export {Map as default};
class Map {
	constructor(container) {
		if ((typeof container == "undefined") || (container.length == 0)) throw new Error("Merci de préciser un container pour générer la carte");
		this.size = 15;
		this.obstacles = 10;
		this.obstaclesSprites = ["img/meteor.png", "img/meteor2.png", "img/supernova.png", "img/supernova2.png", "img/greenplanet.png", "img/greenplanet2.png", "img/solar-spatial.png", "img/solar-spatial2.png"];
		this.container = container;
		this.mapCoord = [];
		this.mapImg = "img/mapv2.png";
		this.newMapTable();
		this.mapObstacle();
	}

	newImgMap(settings) {
		const newEl = document.createElement("img");
		settings.parent.appendChild(newEl);
		newEl.setAttribute("src", settings.src);
		for (let x = 0; settings.class.length > x; x++) {
			newEl.classList.add(settings.class[x]);
		};
	}

	newMapTable () {
		const newTabl = document.createElement("table");
		newTabl.classList.add("mapGame");
		const newTablBody = document.createElement("tbody");
		newTablBody.classList.add("tbody");
		for (let x = 0; x < this.size; x++) {
			var newLine = document.createElement("tr");
			for (let y = 0; y < this.size; y++) {
				var newColumn = document.createElement("td");
				newLine.appendChild(newColumn);
				const newDiv = document.createElement("div");
				newDiv.setAttribute("data-x", x);
				newDiv.setAttribute("data-y", y);
				/*
					div#map>div[data-x="12"]>div[data-y="20"]{ } CSS
					$("div#map>div[data-x="12"]>div[data-y="20"]"); jQuery
					document.querySelector("div#map>div[data-x="12"]>div[data-y="20"]"); Vanilla
				*/
				newColumn.appendChild(newDiv);
				newColumn.classList.add("gameGrid");
				newDiv.classList.add("baseMap");
				this.newImgMap({parent: newDiv,
					src: this.mapImg,
					class: ["cellImg", "opacity02"]
				});
				var newId = {x:x , y:y, cel:newDiv};
				this.mapCoord.push(newId);
			};
			newTablBody.appendChild(newLine);
		};
		newTabl.appendChild(newTablBody);
		this.container.appendChild(newTabl);
	}
	
	testObstacl(allPlage) {
		for (let w = 0; w < 25; w++) {
			var currentPlage = allPlage[w];
			const found = this.mapCoord.find(element => element.x === currentPlage.x && element.y === currentPlage.y);
			if (found.cel.classList.contains("noSell")) {return false}
		} return true;
	}

	mapObstacle() {
		for (let i = 0; i < this.obstacles; i++) {
			let random = this.mapCoord[Math.floor(Math.random()*this.mapCoord.length)];
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
					this.newImgMap ({
						parent: Celrandom,
						src: obstacleRandom,
						class: ["obstacleImg"]
					});
				} else { i-- }
			} else { i--}
		}
	}
}