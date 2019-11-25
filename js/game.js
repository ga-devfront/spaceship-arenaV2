let gameRule = `
	<ul>
		<li></li>
		<li></li>
		<li></li>
	</ul>
	<span></span>
` /* a faire dans un autre fichier */
import shipSettings from "./shipsettings.js";
import mapGame from "./map.js";
import Player from "./player.js";
import weapon from "./weapon.js";
import obstacles from "./obstacles.js";

class Game {
	constructor(container) {
		if ((typeof container == "undefined") || (container.length == 0)) throw new Error("Merci de préciser un container pour initialiser l'instance de jeu");
		this.header = container.getElementsByTagName("header")[0];
		this.main = container.getElementsByTagName("main")[0];
		this.footer = container.getElementsByTagName("footer")[0];
		this.container = container;
		this.buttonSound = new Audio("audio/btn.mp3");
		this.buttonSound.volume = 0.1;
		this.backgroundSound = new Audio("audio/pulsation.mp");
		this.mapGame = new mapGame();
		this.mapImg = "img/mapv2.png"
		this.player1 = new Player();
		this.player2 = new Player();
		this.players = [this.player1, this.player2];
		this.currentPlayerId = 0;
		this.currentPlayer = () => {
			return this.players[this.currentPlayerId];
		};
		this.state = 0;
	}

	set state(state) {
		if (this.state === state) return;
		this.previousState = this.state;
		this._state = state;
		this.computeState();
	}

	get state() {
		return this._state;
	}

	set previousState(state) {
		this._previousState = state;
	}

	get previousState() {
		return this._previousState;
	}

	computeState() {
		switch (this.state) {
			case 0:
				this.step0();
				break;
			case 1:
				this.step1();
				break;
			case 101:
				this.step101();
				break;
			case 102:
				this.step102(this.currentPlayer());
				break;
			case 103:
				this.step103();
				break;
			case 201:
				this.step201();
				break;
			case 202:
				this.step202();
				break;
			case 203:
				this.step203();
				break;
			case 204:
				this.step204();
				break;
			case 205:
				this.step205();
				break;
			default:
				this.step200();
		}
	}

	newImg(settings) {
		const newEl = document.createElement("img"); //creat img
		newEl.setAttribute("src", settings.src); //set src attribute
		if (typeof settings.alt != "undefined" && settings.alt.length > 0) {
		newEl.setAttribute("alt", settings.alt);}; //set alt attritube
		for (let x = 0; settings.class.length > x; x++) {
			newEl.classList.add(settings.class[x]);
		};
		settings.parent.appendChild(newEl); //push img in dom
	} //function for new image

	newTxt(emplacement, myTxt) {
		const newTxt = document.createTextNode(myTxt);
		emplacement.appendChild(newTxt);
	}

	newButton(settings) {
		const newEl = document.createElement("button"); //creat button
		newEl.setAttribute("id", settings.id); //set the id
		for (let x = 0; settings.class.length > x; x++) {
			newEl.classList.add(settings.class[x]);
		}
		settings.parent.appendChild(newEl); //push button in dom

		if (typeof settings.img != "undefined" && settings.img.length > 0) {
			let img = settings.img;
			let alt = settings.alt;
			let classe = settings.imgclass;
			this.newImg({parent: newEl,
			src: img,
			alt: alt,
			class: [classe]});
			if (typeof settings.imghover != "undefined" && settings.imghover.length > 0) {
				let imgSelect = newEl.getElementsByTagName("img")[0];
				newEl.addEventListener("mouseover", function () {
					imgSelect.src = settings.imghover;
				}) //change img in hover and play sound
				newEl.addEventListener("mouseout", function () {
					imgSelect.src = settings.img;
				}) //change img in out
			}
		};

		if (typeof settings.txt != "undefined" && settings.txt.length > 0) {
			let txt = settings.txt;
			this.newTxt(newEl, txt);
		};

		let audio = this.buttonSound;
		newEl.addEventListener("mouseover", function () {
			audio.play();
		})

		if (typeof settings.onclick != "undefined") {
			newEl.addEventListener("click", function () {
				settings.onclick();
			})
		};
	} //function for new button

	newTable(emplacement, numberofLine, numberofColumn, tableID) {
		const newTable = document.createElement("table");
		newTable.setAttribute("id", tableID);

		const newTablBody = document.createElement("tbody");
		for (let i = 0; i < numberofLine; i++) {
			var newLine = document.createElement("tr");
			for (let o = 0; o < numberofColumn; o++) {
				var newColumn = document.createElement("td");
				newColumn.setAttribute("id", "gameplayer" + i);
				newColumn.classList.add("large", "hoverTableCell");
				newColumn.addEventListener("mouseover", () => {
					let sound = this.buttonSound;
					sound.play();
				}) //add sound on hover
				newLine.appendChild(newColumn);
			}
			newTablBody.appendChild(newLine);

		}
		newTable.appendChild(newTablBody);
		emplacement.appendChild(newTable);
	} //function for new table

	newHtmlElement(settings) {
		const newEl = document.createElement(settings.element);
		if (typeof settings.id != "undefined" && settings.id.length > 0) {
			newEl.setAttribute("id", settings.id);
		}
		for (let x = 0; settings.class.length > x; x++) {
			newEl.classList.add(settings.class[x]);
		}
		settings.parent.appendChild(newEl);
	} //function for new div

	supress(selection) {
		while (selection.firstChild) {
			selection.removeChild(selection.firstChild);
		}
	} //function for supress all child

	supressAll() {
		this.supress(this.header);
		this.supress(this.main);
		this.supress(this.footer);
	}

	fadeIn(select) {
		select.classList.add('show');
		select.classList.remove('hide');
	} //function for fade in

	fadeInAll() {
		this.fadeIn(this.header);
		this.fadeIn(this.main);
		this.fadeIn(this.footer);
	}

	fadeOut(select) {
		select.classList.add('hide');
		select.classList.remove('show');
	} //function for fade out 

	fadeOutAll() {
		this.fadeOut(this.header);
		this.fadeOut(this.main);
		this.fadeOut(this.footer);
	}

	shipPresentation(settings) {
		let emplacement = settings.parent
		let sound = this.buttonSound;
		emplacement.addEventListener("mouseover", function () {
			sound.play();
		})
		let logo = settings.ship.shipname + " " + "logo";
		let sprite = settings.ship.shipname + " " + "sprite";
		let logoimg = settings.ship.logo;
		let spriteimg = settings.ship.representation;
		this.newImg({parent: emplacement ,
		src: logoimg ,
		alt: logo ,
		class: []});
		this.newImg({parent: emplacement ,
			src: spriteimg ,
			alt: sprite,
			class: ["shipSelectAnim"]});
		let description = document.createTextNode(settings.ship.description);
		emplacement.appendChild(description);

		let speedship = settings.ship.abreviation + "speed";
		this.newHtmlElement({
			element: "div",
			parent: emplacement,
			id: speedship,
			class: ["container", "centerwrap", "stats"]
		});
		let speedID = document.getElementById(speedship);
		let speed = document.createTextNode("Speed");
		speedID.appendChild(speed);
		for (let i = 0; i < settings.ship.speed; i++) {
			this.newImg({parent: speedID ,
				src: "img/power1.png" ,
				class: []});
		}
		let negspeed = 6 - settings.ship.speed;
		for (let x = 0; x < negspeed; x++) {
			this.newImg({parent: speedID ,
				src: "img/power0.png" ,
				class: []});
		}

		let offship = settings.ship.abreviation + "off";
		this.newHtmlElement({
			element: "div",
			parent: emplacement,
			id: offship,
			class: ["container", "centerwrap", "stats"]
		});

		let offID = document.getElementById(offship);
		let off = document.createTextNode("Offensif");
		offID.appendChild(off);
		for (let y = 0; y < settings.ship.offensif; y++) {
			this.newImg({parent: offID ,
				src: "img/power1.png" ,
				class: []});
		}
		let negoff = 6 - settings.ship.offensif;
		for (let s = 0; s < negoff; s++) {
			this.newImg({parent: offID ,
				src: "img/power0.png" ,
				class: []});
		}

		let defship = settings.ship.abreviation + "def";
		this.newHtmlElement({
			element: "div",
			parent: emplacement,
			id: defship,
			class: ["container", "centerwrap", "stats"]
		});

		let defID = document.getElementById(defship);
		let def = document.createTextNode("Defensif");
		defID.appendChild(def);
		for (let y = 0; y < settings.ship.defensif; y++) {
			this.newImg({parent: defID ,
				src: "img/power1.png" ,
				class: []});
		}
		let negdef = 6 - settings.ship.defensif;
		for (let s = 0; s < negdef; s++) {
			this.newImg({parent: defID ,
				src: "img/power0.png" ,
				class: []});
		}
	}

	printMap () {
		const newTable = document.createElement("table");
		newTable.classList.add("mapGame");
		const newTableBody = document.createElement("tbody");
		newTableBody.setAttribute("id", "myGameMap");
		newTableBody.classList.add("tbody");
		for (let x=0; x < this.mapGame.map.length; x++) {
			var newLine = document.createElement("tr");
			for (let y=0; y < this.mapGame.map[x].length; y++) {
				var newColumn = document.createElement("td");
				newLine.appendChild(newColumn);
				const newDiv = document.createElement("div");
				newColumn.appendChild(newDiv);
				newColumn.classList.add("gameGrid");
					newDiv.classList.add("baseMap");
					this.newImg({parent: newDiv, src: this.mapImg, class:["cellImg", "opacity02"]})

				if (this.mapGame.map[x][y] === "x") {
					let randomObstacle = obstacles.all[Math.floor(Math.random()*obstacles.all.length)];
					let randImg = randomObstacle.sprite[Math.floor(Math.random()*randomObstacle.sprite.length)]
					this.newImg({parent: newDiv, src: randImg, class:["obstacleImg"]})
				}
				if (this.mapGame.map[x][y] === "s0") {
					let randomImg = weapon.gunSettings.sprite[Math.floor(Math.random()*weapon.gunSettings.sprite.length)]
					this.newImg({parent: newDiv, src: randomImg, class:["weaponImg"]})
				}
				if (this.mapGame.map[x][y] === "s1") {
					let randomImg = weapon.gunSettings.sprite[Math.floor(Math.random()*weapon.gunSettings.sprite.length)]
					this.newImg({parent: newDiv, src: randomImg, class:["weaponImg"]})
				}
				if (this.mapGame.map[x][y] === "s2") {
					let randomImg = weapon.gunSettings.sprite[Math.floor(Math.random()*weapon.gunSettings.sprite.length)]
					this.newImg({parent: newDiv, src: randomImg, class:["weaponImg"]})
				}
				if (this.mapGame.map[x][y] === "s3") {
					let randomImg = weapon.gunSettings.sprite[Math.floor(Math.random()*weapon.gunSettings.sprite.length)]
					this.newImg({parent: newDiv, src: randomImg, class:["weaponImg"]})
				}
			}
			newTableBody.appendChild(newLine);
		}
		newTable.appendChild(newTableBody);
		this.main.appendChild(newTable);
	}

	printPlayer(player) {
		let playerPos = this.mapGame.getPlayerPos(player);
		let line = playerPos[0];
		let column = playerPos[1];
		let map = document.getElementById("myGameMap");
		let lineMap = map.getElementsByTagName("tr")[line];
		let columnMap = lineMap.getElementsByTagName("td")[column];
		let cellMap = columnMap.getElementsByTagName("div")[0];
		console.log("printPpos:", playerPos);
		console.log("printPpos1:", playerPos[0]);
		console.log("printPpos2:", playerPos[1]);
		console.log("cellMap:", cellMap);
	}

	creatRulesOverlay() {
		this.newHtmlElement({
			element: "div",
			parent: this.container,
			id: "rulesoverlay",
			class: []
		});
		this.newHtmlElement({
			element: "header",
			parent: rulesoverlay,
			class: ["container", "flexColumn", "width100"]
		});
		let header = document.querySelector("#rulesoverlay header");
		this.newHtmlElement({
			element: "div",
			parent: header,
			id: "rulesheader2",
			class: ["container", "marg-lr10", "reverse"]
		});
		this.newHtmlElement({
			element: "div",
			parent: header,
			id: "rulesheader3",
			class: ["title-font", "centerwrap", "container"]
		});
		this.newButton({
			parent: rulesheader2,
			id: "closeRules",
			img: "img/cross.png",
			class: ["nostyle", "margtop15", "marg-lr10"],
			onclick: () => {
				rulesoverlay.style.display = "none";
			}
		});
		const newTitle = document.createTextNode("Game Rules");
		rulesheader3.appendChild(newTitle);
		this.newHtmlElement({
			element: "main",
			parent: rulesoverlay,
			class: ["overflowAuto", "margtop15", "marg-lr10", "rulesSize"]
		});
		let main = document.querySelector("#rulesoverlay main");
		const newTxt = document.createTextNode("Principium autem unde latius se funditabat, emersit ex negotio tali. Chilo ex vicario et coniux eius Maxima nomine, questi apud Olybrium ea tempestate urbi praefectum, vitamque suam venenis petitam adseverantes inpetrarunt ut hi, quos suspectati sunt, ilico rapti conpingerentur in vincula, organarius Sericus et Asbolius palaestrita et aruspex Campensis.Cum autem commodis intervallata temporibus convivia longa et noxia coeperint apparari vel distributio sollemnium sportularum, anxia deliberatione tractatur an exceptis his quibus vicissitudo debetur, peregrinum invitari conveniet, et si digesto plene consilio id placuerit fieri, is adhibetur qui pro domibus excubat aurigarum aut artem tesserariam profitetur aut secretiora quaedam se nosse confingit.Nec vox accusatoris ulla licet subditicii in his malorum quaerebatur acervis ut saltem specie tenus crimina praescriptis legum committerentur, quod aliquotiens fecere principes saevi: sed quicquid Caesaris implacabilitati sedisset, id velut fas iusque perpensum confestim urgebatur impleri.Principium autem unde latius se funditabat, emersit ex negotio tali. Chilo ex vicario et coniux eius Maxima nomine, questi apud Olybrium ea tempestate urbi praefectum, vitamque suam venenis petitam adseverantes inpetrarunt ut hi, quos suspectati sunt, ilico rapti conpingerentur in vincula, organarius Sericus et Asbolius palaestrita et aruspex Campensis.Cum autem commodis intervallata temporibus convivia longa et noxia coeperint apparari vel distributio sollemnium sportularum, anxia deliberatione tractatur an exceptis his quibus vicissitudo debetur, peregrinum invitari conveniet, et si digesto plene consilio id placuerit fieri, is adhibetur qui pro domibus excubat aurigarum aut artem tesserariam profitetur aut secretiora quaedam se nosse confingit.Nec vox accusatoris ulla licet subditicii in his malorum quaerebatur acervis ut saltem specie tenus crimina praescriptis legum committerentur, quod aliquotiens fecere principes saevi: sed quicquid Caesaris implacabilitati sedisset, id velut fas iusque perpensum confestim urgebatur impleri.Principium autem unde latius se funditabat, emersit ex negotio tali. Chilo ex vicario et coniux eius Maxima nomine, questi apud Olybrium ea tempestate urbi praefectum, vitamque suam venenis petitam adseverantes inpetrarunt ut hi, quos suspectati sunt, ilico rapti conpingerentur in vincula, organarius Sericus et Asbolius palaestrita et aruspex Campensis.Cum autem commodis intervallata temporibus convivia longa et noxia coeperint apparari vel distributio sollemnium sportularum, anxia deliberatione tractatur an exceptis his quibus vicissitudo debetur, peregrinum invitari conveniet, et si digesto plene consilio id placuerit fieri, is adhibetur qui pro domibus excubat aurigarum aut artem tesserariam profitetur aut secretiora quaedam se nosse confingit.Nec vox accusatoris ulla licet subditicii in his malorum quaerebatur acervis ut saltem specie tenus crimina praescriptis legum committerentur, quod aliquotiens fecere principes saevi: sed quicquid Caesaris implacabilitati sedisset, id velut fas iusque perpensum confestim urgebatur impleri.Principium autem unde latius se funditabat, emersit ex negotio tali. Chilo ex vicario et coniux eius Maxima nomine, questi apud Olybrium ea tempestate urbi praefectum, vitamque suam venenis petitam adseverantes inpetrarunt ut hi, quos suspectati sunt, ilico rapti conpingerentur in vincula, organarius Sericus et Asbolius palaestrita et aruspex Campensis.Cum autem commodis intervallata temporibus convivia longa et noxia coeperint apparari vel distributio sollemnium sportularum, anxia deliberatione tractatur an exceptis his quibus vicissitudo debetur, peregrinum invitari conveniet, et si digesto plene consilio id placuerit fieri, is adhibetur qui pro domibus excubat aurigarum aut artem tesserariam profitetur aut secretiora quaedam se nosse confingit.Nec vox accusatoris ulla licet subditicii in his malorum quaerebatur acervis ut saltem specie tenus crimina praescriptis legum committerentur, quod aliquotiens fecere principes saevi: sed quicquid Caesaris implacabilitati sedisset, id velut fas iusque perpensum confestim urgebatur impleri.Principium autem unde latius se funditabat, emersit ex negotio tali. Chilo ex vicario et coniux eius Maxima nomine, questi apud Olybrium ea tempestate urbi praefectum, vitamque suam venenis petitam adseverantes inpetrarunt ut hi, quos suspectati sunt, ilico rapti conpingerentur in vincula, organarius Sericus et Asbolius palaestrita et aruspex Campensis.Cum autem commodis intervallata temporibus convivia longa et noxia coeperint apparari vel distributio sollemnium sportularum, anxia deliberatione tractatur an exceptis his quibus vicissitudo debetur, peregrinum invitari conveniet, et si digesto plene consilio id placuerit fieri, is adhibetur qui pro domibus excubat aurigarum aut artem tesserariam profitetur aut secretiora quaedam se nosse confingit.Nec vox accusatoris ulla licet subditicii in his malorum quaerebatur acervis ut saltem specie tenus crimina praescriptis legum committerentur, quod aliquotiens fecere principes saevi: sed quicquid Caesaris implacabilitati sedisset, id velut fas iusque perpensum confestim urgebatur impleri.");
		main.appendChild(newTxt);
	}

	changeCurrentPlayer() {
		if (this.currentPlayerId == 0) {
			this.currentPlayerId = 1;
		} else { this.currentPlayerId = 0}
	}

	step0() {
		this.supressAll();
		this.fadeOutAll();

		this.backgroundSound.addEventListener("load", function () {
			this.backgroundSound.play();
		}, true)
		this.backgroundSound.autoplay = true,
			this.backgroundSound.loop = true,
			this.backgroundSound.volume = 0.5,
			this.creatRulesOverlay();
		this.newImg({parent: this.header,
		src: "img/logo.png",
		alt: "logo SpaceShip Arena",
		class:[]});
		this.newButton({
			parent: this.main,
			id: "start",
			txt: "Start",
			class: ["large", "big-font"],
			onclick: () => {
				this.state = 1;
			}
		});
		this.newButton({
			parent: this.footer,
			id: "twitter",
			img: "img/social/twitter.png",
			imghover: "img/social/twitter_hover.png",
			alt: "partager sur twitter",
			class: ["small", "marg-lr10"],
			onclick: function () {
				window.open("https://twitter.com/AgDevfront");
			}
		});
		this.newButton({
			parent: this.footer,
			id: "facebook",
			img: "img/social/fb.png",
			imghover: "img/social/fb_hover.png",
			alt: "partager sur facebook",
			class: ["small", "marg-lr10"],
			onclick: function () {
				window.open("https://twitter.com/AgDevfront");
			}
		});
		this.newButton({
			parent: this.footer,
			id: "instagram",
			img: "img/social/insta.png",
			imghover: "img/social/insta_hover.png",
			alt: "partager sur insta",
			class: ["small", "marg-lr10"],
			onclick: function () {
				window.open("https://twitter.com/AgDevfront");
			}
		});
		this.newButton({
			parent: this.footer,
			id: "rules",
			txt: "Game rules",
			class: ["large", "marg-lr10"],
			onclick: () => {
				document.getElementById("rulesoverlay").style.display = "flex";
			}
		});
		this.newButton({
			parent: this.footer,
			id: "sound_volume",
			img: "img/sound.png",
			alt: "contrôle du son",
			class: ["nostyle", "marg-lr10"],
			onclick: () => {
				let imgsound = (document.querySelector("#sound_volume>img"));
				if (this.backgroundSound.volume === 0.5) {
					this.backgroundSound.volume = 0.2;
					imgsound.src = "img/middlesound.png";
				} else if (this.backgroundSound.volume === 0.2) {
					this.backgroundSound.volume = 0;
					imgsound.src = "img/nosound.png";
				} else {
					this.backgroundSound.volume = 0.5;
					imgsound.src = "img/sound.png";
				}
			}
		});

		this.fadeInAll();
	}

	step1() {
		this.fadeOut(this.main);
		setTimeout(() => {
			this.supress(this.main);
		}, 500);
		setTimeout(() => {
			this.newButton({
				parent: this.main,
				id: "creat",
				img: "img/local.png",
				imghover: "img/local_hover.png",
				txt: "Play local",
				alt: "Play local",
				class: ["marg-lr10", "square", "big-font"],
				onclick: () => {
					this.state = 101;
				}
			});

			this.newButton({
				parent: this.main,
				id: "join",
				img: "img/online.png",
				imghover: "img/online_hover.png",
				txt: "Play online",
				alt: "Play online",
				class: ["marg-lr10", "square", "big-font"],
				onclick: () => {
					this.state = 201;
				}
			});
			this.fadeIn(this.main);
		}, 501);

	}

	step101() {
		this.fadeOut(this.main);
		setTimeout(() => {
			this.supress(this.main);
		}, 500);
		setTimeout(() => {
			this.newHtmlElement({
				element: "div",
				parent: this.main,
				id: "playersName",
				class: ["container", "centerwrap", "flexColumn"]
			});

			this.newHtmlElement({
				element: "div",
				parent: playersName,
				id: "titleName",
				class: ["container", "centerwrap", "big-font"]
			});
			this.newTxt(titleName, "Enter players name :");
			this.newHtmlElement({
				element: "div",
				parent: playersName,
				id: "inputName",
				class: ["container", "spacearound", "margtop15"]
			});
			let player1Input = document.createElement("input");
			let player2Input = document.createElement("input");
			player1Input.type = "text";
			player1Input.id = "inputP1Name";
			player1Input.name = "Player 1 Name";
			player1Input.required = true;
			player1Input.minlength = 4;
			player1Input.maxlength = 20;
			player1Input.value = "Player 1";
			player1Input.classList.add("small", "name", "marg-lr10");

			player2Input.type = "text";
			player2Input.id = "inputP2Name";
			player2Input.name = "Player 2 Name";
			player2Input.required = true;
			player2Input.minlength = 4;
			player2Input.maxlength = 20;
			player2Input.value = "Player 2";
			player2Input.classList.add("small", "name", "marg-lr10");

			inputName.appendChild(player1Input);
			inputName.appendChild(player2Input);
			
			this.newHtmlElement({
				element: "div",
				parent: playersName,
				id: "submitName",
				class: ["container", "centerwrap", "margtop15"]
			});

			this.newButton({
				parent: submitName,
				txt: "next",
				class: ["large"],
			onclick: () => {
				let nameP1 = document.getElementById("inputP1Name").value;
				let nameP2 = document.getElementById("inputP2Name").value;
				this.player1.name = nameP1;
				this.player2.name = nameP2;
				this.state = 102;
			}
			});


			this.fadeIn(this.main);
	}, 501);
	}

	step102 (player) {
		this.fadeOut(this.main);
		setTimeout(() => {
			this.supress(this.main);
		}, 500);
		setTimeout(() => {
			this.main.classList.add("margtopneg50");
			this.main.classList.remove("margtop100");

			this.header.classList.add("resizeSmall");
			this.header.classList.remove("resizeBig");

			this.newHtmlElement({
				element: "div",
				parent: this.main,
				id: "shipChoice",
				class: ["container", "centerwrap", "flexColumn", "width80"]
			});

			this.newHtmlElement({
				element: "div",
				parent: shipChoice,
				id: "titleShipChoice",
				class: ["container", "centerwrap", "big-font"]
			});

			this.newTxt(titleShipChoice, (player.name + " " + "choose your ship"))


			this.newHtmlElement({
				element: "div",
				parent: shipChoice,
				id: "tableOfShip",
				class: ["container", "spacearound", "margtop15"]
			});

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipbb",
				class: ["container", "spacearound", "selectShip"]
			});

			this.shipPresentation({
				parent: shipbb,
				ship: shipSettings.blackBirdSettings,
			});

			shipbb.onclick = () => {
				player.ship = shipSettings.blackBirdSettings;
				player.speed = shipSettings.blackBirdSettings.speed;
				player.offensif = shipSettings.blackBirdSettings.offensif;
				player.defensif = shipSettings.blackBirdSettings.defensif;
				this.changeCurrentPlayer ();
				if (this.currentPlayer().ship != undefined) {this.state = 103} else {
					this.step102(this.currentPlayer())};
			};

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipfc",
				class: ["container", "spacearound", "selectShip"]
			});

			this.shipPresentation({
				parent: shipfc,
				ship: shipSettings.federalCruserSettings,
			});

			shipfc.onclick = () => {
				player.ship = shipSettings.federalCruserSettings;
				player.speed = shipSettings.federalCruserSettings.speed;
				player.offensif = shipSettings.federalCruserSettings.offensif;
				player.defensif = shipSettings.federalCruserSettings.defensif;
				this.changeCurrentPlayer ();
				if (this.currentPlayer().ship != undefined) {this.state = 103} else {
					this.step102(this.currentPlayer())};
			};

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipsf",
				class: ["container", "spacearound", "selectShip"]
			});

			this.shipPresentation({
				parent: shipsf,
				ship: shipSettings.speedFireSettings,
			});

			shipsf.onclick = () => {
				player.ship = shipSettings.speedFireSettings;
				player.speed = shipSettings.speedFireSettings.speed;
				player.offensif = shipSettings.speedFireSettings.offensif;
				player.defensif = shipSettings.speedFireSettings.defensif;
				this.changeCurrentPlayer ();
				if (this.currentPlayer().ship != undefined) {this.state = 103} else {
					this.step102(this.currentPlayer())};
			};

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipst",
				class: ["container", "spacearound", "selectShip"]
			});

			this.shipPresentation({
				parent: shipst,
				ship: shipSettings.spaceThunderSettings,
			});

			shipst.onclick = () => {
				player.ship = shipSettings.spaceThunderSettings;
				player.speed = shipSettings.spaceThunderSettings.speed;
				player.offensif = shipSettings.spaceThunderSettings.offensif;
				player.defensif = shipSettings.spaceThunderSettings.defensif;
				this.changeCurrentPlayer ();
				if (this.currentPlayer().ship != undefined) {this.state = 103} else {
					this.step102(this.currentPlayer())};
			};

			this.fadeIn(this.main);
	}, 501);
	}

	step103 () {
		this.fadeOut(this.main);
		setTimeout(() => {
			this.supress(this.main);
			this.main.classList.add("margtopneg250");
			this.main.classList.remove("margtopneg50");
		}, 500);
		setTimeout(() => {
			this.printMap ();
			for (let x = 0; x < this.players.length; x++) {
				this.mapGame.setPlayerPos(this.players[x]);
			};
			console.log('this.playersPos[player.uuid] client: ', this.mapGame.getPlayerPos((this.player1)));
			console.log('this.playersPos[player.uuid] client: ', this.mapGame.getPlayerPos((this.player2)));
			console.log(this.mapGame.map);
			this.printPlayer(this.player1);
			this.fadeIn(this.main);
		}, 501);
	}

	step201() {
		this.fadeOut(this.main);
		setTimeout(() => {
			this.supress(this.main);
		}, 500);
		setTimeout(() => {
			this.newButton({
				parent: this.main,
				id: "creat",
				img: "img/creatserv.png",
				imghover: "img/creatserv_hover.png",
				txt: "Create new Game",
				alt: "Create new game",
				class: ["marg-lr10", "square", "big-font"],
				onclick: () => {
					this.state = 202;
				}
			});

			this.newButton({
				parent: this.main,
				id: "join",
				img: "img/joinserv.png",
				imghover: "img/joinserv_hover.png",
				txt: "Join Game",
				alt: "Join game",
				class: ["marg-lr10", "square", "big-font"],
				onclick: () => {
					this.state = 203;
				}
			});
			this.fadeIn(this.main);
		}, 501);

	}

	step202() {
		this.fadeOut(this.main);
		setTimeout(() => {
			this.supress(this.main);
		}, 500);
		setTimeout(() => {
			const newGame = document.createElement("form");
			newGame.action = "/action.php";
			const newGameName = document.createElement("input");
			newGameName.type = "text";
			newGameName.id = "inputNewGameName";
			newGameName.name = "Game Name";
			newGameName.required = true;
			newGameName.minlength = 4;
			newGameName.maxlength = 20;
			newGameName.value = "min 4 - max 20 carac";
			newGameName.classList.add("large", "inputTxt");

			this.newHtmlElement({
				element: "div",
				parent: this.main,
				id: "containerCreatGame",
				class: ["container", "centerwrap", "flexColumn"]
			});
			this.newHtmlElement({
				element: "div",
				parent: containerCreatGame,
				id: "titleCreat",
				class: ["container", "big-font", "large"]
			});
			this.newHtmlElement({
				element: "div",
				parent: containerCreatGame,
				id: "inputCreat",
				class: ["container", "centerwrap", "margtop15", "tableCell"]
			});

			const newGameLabel = document.createElement("label");
			newGameLabel.for = "inputNewGameName";
			const newTextLabel = document.createTextNode("Enter your game name");
			const newGameButton = document.createElement("input");
			newGameButton.type = "submit";
			newGameButton.value = ">>";
			newGameButton.classList.add("small", "submitButton");
			newGameButton.addEventListener("mouseover", () => {
				let audio = this.buttonSound;
				audio.play();
			})
			inputCreat.appendChild(newGame);
			newGame.appendChild(newGameName);
			newGame.appendChild(newGameButton);
			titleCreat.appendChild(newTextLabel);
			this.fadeIn(this.main);
		}, 501);
	}

	step203() {
		this.fadeOut(this.main);
		setTimeout(() => {
			this.supress(this.main);
			this.header.classList.add("resizeSmall");
			this.header.classList.remove("resizeBig");
		}, 500);
		setTimeout(() => {
			this.main.classList.add("margtopneg50");
			this.main.classList.remove("margtop100");

			this.newHtmlElement({
				element: "div",
				parent: this.main,
				id: "tableOfGames",
				class: ["container", "centerwrap", "listTable"]
			});

			this.newHtmlElement({
				element: "div",
				parent: tableOfGames,
				id: "titleChoice",
				class: ["container", "big-font", "large"]
			});

			this.newHtmlElement({
				element: "div",
				parent: tableOfGames,
				id: "listChoice",
				class: ["container", "centerwrap", "overflowAuto", "tableCell"]
			});

			this.newTxt(titleChoice, "Choose your game");

			this.newTable(listChoice, 10, 1, "gameList");
			for (let i = 0; i < 10; i++) {
				let line = document.getElementById("gameplayer" + i);
				let game = document.createTextNode("game number" + i);
				line.appendChild(game);
				line.addEventListener("click", () => {
					this.state = 204;
				})
			};

			this.fadeIn(this.main);
		}, 501);
	}

	step204() {
		this.fadeOut(this.main);
		setTimeout(() => {
			this.supress(this.main);
		}, 500);
		setTimeout(() => {
			if (this.main.classList.contains("margtop100") == true) {
				this.main.classList.add("margtopneg15");
				this.main.classList.remove("margtop100");
			};

			if (this.header.classList.contains("resizeBig") == true) {
				this.header.classList.add("resizeSmall");
				this.header.classList.remove("resizeBig");
			};

			this.newHtmlElement({
				element: "div",
				parent: this.main,
				id: "tableOfShip",
				class: ["container", "spacearound", "width80"]
			});

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipbb",
				class: ["container", "spacearound", "selectShip"]
			});
			this.shipPresentation({
				parent: shipbb,
				ship: shipSettings.blackBirdSettings,
			});

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipfc",
				class: ["container", "spacearound", "selectShip"]
			});
			this.shipPresentation({
				parent: shipfc,
				ship: shipSettings.federalCruserSettings,
			});

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipsf",
				class: ["container", "spacearound", "selectShip"]
			});
			this.shipPresentation({
				parent: shipsf,
				ship: shipSettings.speedFireSettings,
			});

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipst",
				class: ["container", "spacearound", "selectShip"]
			});
			this.shipPresentation({
				parent: shipst,
				ship: shipSettings.spaceThunderSettings,
			});

			this.fadeIn(this.main);
		}, 501);
	}

	step205() {
		this.fadeOut(this.main);
		setTimeout(() => {
			this.supress(this.main);
			this.main.classList.add("margtopneg250");
			this.main.classList.remove("margtopneg15");
		}, 500);
		setTimeout(() => {
			this.printMap();
			/*this.mapGame*/
			this.fadeIn(this.main);
		}, 501);

	}
}

let main = document.getElementById("game1");
let game = new Game(main);

/*let main2 = document.getElementById("game2");
let game2 = new Game(main2);*/