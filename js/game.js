import gameRules from "./gameRules.js";
import shipSettings from "./shipsettings.js";
import mapGame from "./map.js";
import Player from "./player.js";
import weapon from "./weapon.js";
import obstacles from "./obstacles.js";

class Game {
	constructor(container) {
		if ((typeof container === "undefined") || (container.length == 0)) throw new Error("Merci de préciser un container pour initialiser l'instance de jeu");
		this.header = $(container + ' header')[0];
		this.main = $(container + ' main')[0];
		this.footer = $(container + ' footer')[0];
		this.container = container;
		this.buttonSound = new Audio("audio/btn.mp3");
		this.buttonSound.volume = 0.1;
		this.backgroundSound = new Audio("audio/pulsation.mp3");
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
		this.previousState = 0;
	}

	set state(state) {
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
			case 104:
				this.step104();
				break;
			default:
				this.step0();
		}
	}

	newImg(settings) {
		const newEl = $("<img>"); //creat img
		$(newEl).attr("src", settings.src); //set src attribute
		if (typeof settings.alt != "undefined" && settings.alt.length > 0) {
			$(newEl).attr("alt", settings.alt);
		}; //set alt attritube
		if (typeof settings.id != "undefined" && settings.id.length > 0) {
			$(newEl).attr("id", settings.id);
		}; //set id attritube
		for (let x = 0; settings.class.length > x; x++) {
			$(newEl).addClass(settings.class[x]);
		};
		if (typeof settings.title != "undefined" && settings.title.length > 0) {
			$(newEl).attr("title", settings.title);
		}; //set id attritube
		$(settings.parent).append(newEl); //push img in dom
	} //function for new image

	newTxt(emplacement, myTxt) {
		$(emplacement).append(document.createTextNode(myTxt));
	}

	newButton(settings) {
		const newEl = $(`<button id="${settings.id}">`); //creat button
		for (let x = 0; settings.class.length > x; x++) {
			$(newEl).addClass(settings.class[x]);
		}
		$(settings.parent).append(newEl); //push button in dom

		if (typeof settings.img != "undefined" && settings.img.length > 0) {
			let img = settings.img;
			let alt = settings.alt;
			let classe = settings.imgclass;
			this.newImg({
				parent: newEl,
				src: img,
				alt,
				class: [classe]
			});
			if (typeof settings.imghover != "undefined" && settings.imghover.length > 0) {
				let imgSelect = $('#' + settings.id + ' img')[0];
				$(newEl).hover(
					function () {
					imgSelect.src = settings.imghover;
				}, function () {
					imgSelect.src = settings.img;}) //change img in hover and play sound

		}};

		if (typeof settings.txt != "undefined" && settings.txt.length > 0) {
			this.newTxt(newEl, settings.txt);
		};

		let audio = this.buttonSound;
		$(newEl).hover(function () {
			audio.play();
		});

		if (typeof settings.onclick != "undefined") {
			$(newEl).click(function () {
				settings.onclick();
			})
		};
	} //function for new button

	newTable(emplacement, numberofLine, numberofColumn, tableID) {
		const newTable = $("<table>");
		$(newTable).attr("id", tableID);

		const newTablBody = $("<tbody>");
		for (let i = 0; i < numberofLine; i++) {
			var newLine = $("<tr>");
			for (let o = 0; o < numberofColumn; o++) {
				var newColumn = $("<td>");
				$(newColumn).attr("id", "gameplayer" + i);
				$(newColumn).addClass("large", "hoverTableCell");
				$(newColumn).hover(() => {
					let sound = this.buttonSound;
					sound.play();
				}) //add sound on hover
				$(newLine).append(newColumn);
			}
			$(newTablBody).append(newLine);

		}
		$(newTable).append(newTablBody);
		$(emplacement).append(newTable);
	} //function for new table

	newHtmlElement(settings) {
		const newEl = $("<" + settings.element + ">");
		if (typeof settings.id != "undefined" && settings.id.length > 0) {
			$(newEl).attr("id", settings.id);
		}
		for (let x = 0; settings.class.length > x; x++) {
			$(newEl).addClass(settings.class[x]);
		}
		$(settings.parent).append(newEl);
	} //function for new div

	supressAll() {
		$(this.header).empty();
		$(this.main).empty();
		$(this.footer).empty();
	}

	fadeInAll() {
		$(this.header).fadeIn(500);
		$(this.main).fadeIn(500);
		$(this.footer).fadeIn(500);
	}

	fadeOutAll() {
		$(this.header).fadeOut(500);
		$(this.main).fadeOut(500);
		$(this.footer).fadeOut(500);
	}

	shipPresentation(settings) {
		let emplacement = settings.parent
		let sound = this.buttonSound;
		$(emplacement).hover(function () {
			sound.play();
		});
		let logo = settings.ship.shipname + " " + "logo";
		let sprite = settings.ship.shipname + " " + "sprite";
		let logoimg = settings.ship.logo;
		let spriteimg = settings.ship.representation;
		this.newImg({
			parent: emplacement,
			src: logoimg,
			alt: logo,
			class: []
		});
		this.newImg({
			parent: emplacement,
			src: spriteimg,
			alt: sprite,
			class: ["shipSelectAnim"]
		});
		$(emplacement).append(document.createTextNode(settings.ship.description));

		let speedship = settings.ship.abreviation + "speed";
		this.newHtmlElement({
			element: "div",
			parent: emplacement,
			id: speedship,
			class: ["container", "centerWrap", "stats"]
		});
		let speedID = $("#" + speedship);
		$(speedID).append(document.createTextNode("Speed"));
		for (let i = 0; i < settings.ship.speed; i++) {
			this.newImg({
				parent: speedID,
				src: "img/power1.png",
				class: []
			});
		}
		let negspeed = 6 - settings.ship.speed;
		for (let x = 0; x < negspeed; x++) {
			this.newImg({
				parent: speedID,
				src: "img/power0.png",
				class: []
			});
		}

		let offship = settings.ship.abreviation + "off";
		this.newHtmlElement({
			element: "div",
			parent: emplacement,
			id: offship,
			class: ["container", "centerWrap", "stats"]
		});

		let offID = $("#" + offship);
		$(offID).append(document.createTextNode("Offensif"));
		for (let y = 0; y < settings.ship.offensif; y++) {
			this.newImg({
				parent: offID,
				src: "img/power1.png",
				class: []
			});
		}
		let negoff = 6 - settings.ship.offensif;
		for (let s = 0; s < negoff; s++) {
			this.newImg({
				parent: offID,
				src: "img/power0.png",
				class: []
			});
		}

		let defship = settings.ship.abreviation + "def";
		this.newHtmlElement({
			element: "div",
			parent: emplacement,
			id: defship,
			class: ["container", "centerWrap", "stats"]
		});

		let defID = $("#" + defship);
		$(defID).append(document.createTextNode("Defensif"));
		for (let y = 0; y < settings.ship.defensif; y++) {
			this.newImg({
				parent: defID,
				src: "img/power1.png",
				class: []
			});
		}
		let negdef = 6 - settings.ship.defensif;
		for (let s = 0; s < negdef; s++) {
			this.newImg({
				parent: defID,
				src: "img/power0.png",
				class: []
			});
		}
	}

	printMap() {
		this.newHtmlElement({
			element: "div",
			parent: this.main,
			id: "myGameMap",
			class: ["mapGame", "mapMoove", "rotate"]
		});
		for (let x = 0; x < this.mapGame.map.length; x++) {
			var newLine = $("<div>");
			for (let y = 0; y < this.mapGame.map[x].length; y++) {
				var newColumn = $("<div>");
				$(newLine).append(newColumn);
				const newDiv = $("<div>");
				$(newColumn).attr("data-x", x);
				$(newColumn).attr("data-y", y);
				$(newColumn).append(newDiv);
				$(newColumn).addClass("gameGrid");
				$(newDiv).addClass("baseMap");
				this.newImg({
					parent: newDiv,
					src: this.mapImg,
					class: ["cellImg", "opacity02"]
				})

				if (this.mapGame.map[x][y] === "x") {
					let randomObstacle = obstacles.all[Math.floor(Math.random() * obstacles.all.length)];
					let randImg = randomObstacle.sprite[Math.floor(Math.random() * randomObstacle.sprite.length)]
					this.newImg({
						parent: newDiv,
						src: randImg,
						class: ["obstacleImg"]
					})
				}
				if (this.mapGame.map[x][y] === "s0") {
					let randomImg = weapon.gunSettings.sprite[Math.floor(Math.random() * weapon.gunSettings.sprite.length)]
					this.newImg({
						parent: newDiv,
						src: randomImg,
						id: "s0",
						class: ["weaponImg"]
					})
				}
				if (this.mapGame.map[x][y] === "s1") {
					let randomImg = weapon.reactorSettings.sprite[Math.floor(Math.random() * weapon.reactorSettings.sprite.length)]
					this.newImg({
						parent: newDiv,
						src: randomImg,
						id: "s1",
						class: ["weaponImg"]
					})
				}
				if (this.mapGame.map[x][y] === "s2") {
					let randomImg = weapon.shieldSettings.sprite[Math.floor(Math.random() * weapon.shieldSettings.sprite.length)]
					this.newImg({
						parent: newDiv,
						src: randomImg,
						id: "s2",
						class: ["weaponImg"]
					})
				}
				if (this.mapGame.map[x][y] === "s3") {
					let randomImg = weapon.healthpackSettings.sprite[Math.floor(Math.random() * weapon.healthpackSettings.sprite.length)]
					this.newImg({
						parent: newDiv,
						src: randomImg,
						id: "s3",
						class: ["weaponImg"]
					})
				}
			}
			$(myGameMap).append(newLine);
		}
		$(this.main).append(myGameMap);
	}

	printPlayer(player) {
		let length = this.mapGame.getPlayerLength(player);
		let square = this.mapGame.getPlayerSquarePos(player);

		for (let x = 0; x < length; x++) {
			let line = square[x][0];
			let column = square[x][1];
			let cellMap = $(`#myGameMap>div>[data-x="${line}"][data-y="${column}"]>div`);
			let divCell = $(`#myGameMap>div>[data-x="${line}"][data-y="${column}"]`);
			$(divCell).addClass("cellPlayer");
			this.newImg({
				parent: cellMap,
				src: player.ship.sprite[x][this.mapGame.getPlayerOrientation(player)],
				class: ["playerImg"]
			});

		}
	}

	supressPlayer(player) {
		let length = this.mapGame.getPlayerLength(player);
		let square = this.mapGame.getPlayerSquarePos(player);
		for (let x = 0; x < length; x++) {
			let line = square[x][0];
			let column = square[x][1];
			let divCell = $(`#myGameMap>div>[data-x="${line}"][data-y="${column}"]`);
			$(divCell).removeClass("cellPlayer");
			$(`#myGameMap>div>[data-x="${line}"][data-y="${column}"]>div .playerImg`).remove();
		}
	}

	supressPlayerMooves() {
		for (let x = 0; x < this.mapGame.map.length; x++) {
			for (let y = 0; y < this.mapGame.map[x].length; y++) {
				let columnMap = $(`#myGameMap>div>[data-x="${x}"][data-y="${y}"]`);
				if ($(columnMap).hasClass("moove")) {
					$(columnMap).removeClass("moove");
					$(columnMap).off();
				}
			}
		}
	}


	buttonMoveChoice(settings) {
		if (settings.test) {
			this.newButton({
				parent: $("#buttonOrientation"),
				id: settings.orientation,
				img: "img/arrow" + settings.orientation + ".png",
				class: ["square2"]
			});
			$("#" + settings.orientation).click ( () => {
				this.moveAction({
					player: settings.player,
					x: settings.x,
					y: settings.y,
					orientation: settings.orientation
				})
			})
	} else {
		this.newButton({
			parent: $("#buttonOrientation"),
			id: settings.direction,
			img: "img/arrow" + settings.orientation + ".png",
			class: ["square2", "opacity02"]
		});
	}
	}

	creatMoveChoice(settings) {
		let mapTest = this.mapGame.testmove(settings.player);
		let x = settings.x;
		let y = settings.y;
		if ($("#orientationChoose")) {
			$("#orientationChoose").remove();
		}
		this.newHtmlElement({
			parent: this.container,
			element: "div",
			id: "orientationChoose",
			class: ["overlay", "container", "flexColumn", "moveChoose"]
		});
		this.newHtmlElement({
			parent: $("#orientationChoose"),
			element: "div",
			id: "titleOrientation",
			class: ["container", "centerWrap", "bigFont", "margTop15"]
		});
		this.newTxt(titleOrientation, "Choose your orientation");
		this.newHtmlElement({
			parent: $("#orientationChoose"),
			element: "div",
			id: "buttonOrientation",
			class: ["container", "spaceAround", "margTop15"]
		});

		this.buttonMoveChoice({test: mapTest[x][y].N,
			orientation: "N",
			player: settings.player,
		x,
		y,})
		this.buttonMoveChoice({test: mapTest[x][y].S,
			orientation: "S",
			player: settings.player,
		x,
		y,})
		this.buttonMoveChoice({test: mapTest[x][y].E,
			orientation: "E",
			player: settings.player,
		x,
		y,})
		this.buttonMoveChoice({test: mapTest[x][y].W,
			orientation: "W",
			player: settings.player,
		x,
		y,})
	}

	moveAction(settings) {
		$("#skipMove").remove();
		let x = settings.x;
		let y = settings.y;
		let mooveOrientation = "";
		switch (settings.orientation) {
			case "N":
				mooveOrientation = "N";
				break;
			case "S":
				mooveOrientation = "S";
				break;
			case "E":
				mooveOrientation = "E";
				break;
			case "W":
				mooveOrientation = "W";
				break;
		};

		let moovePosition = [x, y];
		$("#orientationChoose").remove();
		this.supressPlayer(settings.player);
		this.supressPlayerMooves();
		this.mapGame.setPlayerPos({
			player: settings.player,
			newPos: moovePosition,
			newOrientation: mooveOrientation
		});
		this.refreshMap();
		this.printPlayer(settings.player);
		this.refreshPlayerOverlay();
		if (this.mapGame.testAttack({player: settings.player, ennemy: this.getOpponent(settings.player)})) {
		this.attackPossibl(settings.player);}
		else {
		this.changeCurrentPlayer();
		this.state = 103;}
	};

	playeTurn(player) {
		this.refreshPlayerOverlay();
		let mapTest = this.mapGame.testmove(player);
		for (let x = 0; x < mapTest.length; x++) {
			for (let y = 0; y < mapTest[x].length; y++) {
				if (mapTest[x][y].N === true || mapTest[x][y].S === true || mapTest[x][y].E === true || mapTest[x][y].W === true) {
					let columnMap = $(`#myGameMap>div>[data-x="${x}"][data-y="${y}"]`);
					$(columnMap).addClass("moove");
					$(columnMap).click (() => {
						this.creatMoveChoice({
							player: player,
							x: x,
							y: y
						});
					})
				}
			}
		}
		this.newButton({
			parent: this.main,
			id: "skipMove",
			txt: "Skip Move >>",
			class: ["large", "margLr10", "overlay", "skip"],
			onclick: () => {
				this.supressPlayerMooves();
				skipMove.remove();
				if (this.mapGame.testAttack({player: player, ennemy: this.getOpponent(player)})) {
					this.attackPossibl(player);}
					else {
					this.changeCurrentPlayer();
					this.state = 103;}
			}
		});
	}

	attackPossibl(player) {
		let opponent = this.getOpponent(player);
		if (this.mapGame.testAttack({
				player: player,
				ennemy: opponent
			})) {
			let length = this.mapGame.getPlayerLength(opponent);
			let square = this.mapGame.getPlayerSquarePos(opponent);

			for (let x = 0; x < length; x++) {
				let line = square[x][0];
				let column = square[x][1];
				let divCell = $(`#myGameMap>div>[data-x="${line}"][data-y="${column}"]`);
				$(divCell).addClass("attack");
				$(divCell).click (() => {
					$("#skipAttack").remove();
					this.attack(player)})
			}
			this.newButton({
				parent: this.main,
				id: "skipAttack",
				txt: "Skip Attack >>",
				class: ["large", "margLr10", "overlay", "skip"],
				onclick: () => {
					this.supressAttackPossibl(player);
					$(skipAttack).remove();
					this.changeCurrentPlayer();
					this.state = 103;
				}
			});
		
		}
	}

	supressAttackPossibl(player) {
		let opponent = this.getOpponent(player);
		if (this.mapGame.testAttack({
				player: player,
				ennemy: opponent
			})) {
			let length = this.mapGame.getPlayerLength(opponent);
			let square = this.mapGame.getPlayerSquarePos(opponent);

			for (let x = 0; x < length; x++) {
				let line = square[x][0];
				let column = square[x][1];
				let divCell = $(`#myGameMap>div>[data-x="${line}"][data-y="${column}"]`);
				$(divCell).removeClass("attack");
				$(divCell).off();
			}
		}
	}

	attack(player) {
		let opponent = this.getOpponent(player);
		this.mapGame.attack({player: player, ennemi: opponent});
		this.supressAttackPossibl(player);
		this.refreshPlayerOverlay();
		this.changeCurrentPlayer();
		this.state = 103;
	}

	refreshMap() {
		for (let x = 0; x < this.mapGame.map.length; x++) {
			for (let y = 0; y < this.mapGame.map[x].length; y++) {
				for (let z = 0; z < 4; z++) {
					let weaponTest = $(`#myGameMap>div>[data-x="${x}"][data-y="${y}"]>div>#s${z}`);
					if (weaponTest != null) {
						if (this.mapGame.map[x][y] === "s" + z) {} else {
							weaponTest.remove()
						}
					} else {
						if (this.mapGame.map[x][y] === "s" + z) {
							let weaponImg = undefined;
							switch ("s" + z) {
								case "s0":
									weaponImg = weapon.gunSettings.sprite[Math.floor(Math.random() * weapon.gunSettings.sprite.length)];
									break;
								case "s1":
									weaponImg = weapon.reactorSettings.sprite[Math.floor(Math.random() * weapon.reactorSettings.sprite.length)];
									break;
								case "s2":
									weaponImg = weapon.shieldSettings.sprite[Math.floor(Math.random() * weapon.shieldSettings.sprite.length)];
									break;
							}
							this.newImg({
								parent: $(`#myGameMap>div>[data-x="${x}"][data-y="${y}"]>div`),
								src: weaponImg,
								id: "s" + z,
								class: ["weaponImg"]
							});
						}
					}
				}
			}
		}
	}

	getOpponent(player) {
		if (player == this.players[0]) {
			return this.players[1]
		}
		return this.players[0]
	}

	creatPlayersOverlay() {
		for (let x = 0; x < this.players.length; x++) {
			let player = this.players[x];
			let direction = "";
			if (x === 0) {
				direction = "left";
			} else {
				direction = "right"
			}
			this.newHtmlElement({
				element: "div",
				parent: this.main,
				id: player.uuid,
				class: ["overlay", "player", direction, "container", "flexColumn", "spaceEvenly"]
			});			
			if (player == this.currentPlayer()) {
				$("#" + player.uuid).addClass("activ")
			} else {
				$("#" + player.uuid).addClass("inactiv")
			}
			let name = player.uuid + "name";
			this.newHtmlElement({
				element: "div",
				parent: $("#" + player.uuid),
				id: name,
				class: ["container", "centerWrap", "bigFont"]
			});
			let divName = $("#" + name);
			this.newTxt(divName, player.name);
			let logo = player.ship.shipname + " " + "logo";
			let sprite = player.ship.shipname + " " + "sprite";
			let logoimg = player.ship.logo;
			let spriteimg = player.ship.representation;
			this.newImg({
				parent:  $("#" + player.uuid),
				src: logoimg,
				alt: logo,
				class: []
			});
			this.newImg({
				parent:  $("#" + player.uuid),
				src: spriteimg,
				alt: sprite,
				class: ["shipSelectAnim"]
			});

			this.newHtmlElement({
				element: "div",
				parent:  $("#" + player.uuid),
				id: "life" + player.uuid,
				class: ["container", "centerWrap", "stats"]
			});
			$("#life" + player.uuid).append(document.createTextNode("PV"));

			this.newHtmlElement({
				element: "div",
				parent: $("#life" + player.uuid),
				id: "contentPv" + player.uuid,
				class: ["container", "centerWrap", "life"]
			});

			this.newHtmlElement({
				element: "span",
				parent: $("#contentPv" + player.uuid),
				id: "TxtActualPv" + player.uuid,
				class: ["health"]
			});
			$("#TxtActualPv" + player.uuid).append(document.createTextNode(player.pv));

			this.newHtmlElement({
				element: "span",
				parent: $("#contentPv" + player.uuid),
				id: "TxtMaxPv" + player.uuid,
				class: []
			});
			$("#TxtMaxPv" + player.uuid).append(document.createTextNode(" / 100"));

			this.newHtmlElement({
				element: "div",
				parent: $("#contentPv" + player.uuid),
				id: "healthProgress" + player.uuid,
				class: ["healthProgress"]
			});
			$("#healthProgress" + player.uuid).width(player.health + "%");



			this.newHtmlElement({
				element: "div",
				parent:  $("#" + player.uuid),
				id: "speed" + player.uuid,
				class: ["container", "centerWrap", "stats"]
			});
			$("#speed" + player.uuid).append(document.createTextNode("Speed"));
			for (let i = 0; i < player.speed; i++) {
				this.newImg({
					parent: $("#speed" + player.uuid),
					src: "img/power1.png",
					class: []
				});
			}
			let negspeed = 6 - player.speed;
			for (let x = 0; x < negspeed; x++) {
				this.newImg({
					parent: $("#speed" + player.uuid),
					src: "img/power0.png",
					class: []
				});
			}

			this.newHtmlElement({
				element: "div",
				parent:  $("#" + player.uuid),
				id: "off" + player.uuid,
				class: ["container", "centerWrap", "stats"]
			});

			$("#off" + player.uuid).append(document.createTextNode("Offensif"));
			for (let y = 0; y < player.offensif; y++) {
				this.newImg({
					parent: $("#off" + player.uuid),
					src: "img/power1.png",
					class: []
				});
			}
			let negoff = 6 - player.offensif;
			for (let s = 0; s < negoff; s++) {
				this.newImg({
					parent: $("#off" + player.uuid),
					src: "img/power0.png",
					class: []
				});
			}

			this.newHtmlElement({
				element: "div",
				parent:  $("#" + player.uuid),
				id: "def" + player.uuid,
				class: ["container", "centerWrap", "stats"]
			});

			$("#def" + player.uuid).append(document.createTextNode("Defensif"));
			for (let y = 0; y < player.defensif; y++) {
				this.newImg({
					parent: $("#def" + player.uuid),
					src: "img/power1.png",
					class: []
				});
			}
			let negdef = 6 - player.defensif;
			for (let s = 0; s < negdef; s++) {
				this.newImg({
					parent: $("#def" + player.uuid),
					src: "img/power0.png",
					class: []
				});
			}

			this.newHtmlElement({
				element: "div",
				parent:  $("#" + player.uuid),
				id: "stuff" + player.uuid,
				class: ["container", "centerWrap", "flexColumn", "stuff"]
			})
			$("#stuff" + player.uuid).append(document.createTextNode("weapon"));
			this.newHtmlElement({
				element: "div",
				parent: $("#stuff" + player.uuid),
				id: "actualStuff" + player.uuid,
				class: ["container", "centerWrap", "actualStuff", "margTop15"]
			})
			this.newImg({
				parent: $("#actualStuff" + player.uuid),
				src: "img/weapons/none.png",
				class: [],
				title: "no equipment"
			});
		}
	}

	refreshPlayerOverlay() {
		for (let x = 0; x < this.players.length; x++) {
			let player = this.players[x];
			$("#speed" + player.uuid).remove();
			$("#off" + player.uuid).remove();
			$("#def" + player.uuid).remove();
			$("#stuff" + player.uuid).remove();

			if (player == this.currentPlayer()) {
				$("#" + player.uuid).removeClass("inactiv");
				$("#" + player.uuid).addClass("activ");
			} else {
				$("#" + player.uuid).removeClass("activ");
				$("#" + player.uuid).addClass("inactiv");
			}

			$("#healthProgress" + player.uuid).width(player.health + "%");

			let interval = window.setInterval(() => {
			  if ($("#TxtActualPv" + player.uuid).text() != player.pv)
			  {
				if ($("#TxtActualPv" + player.uuid).text() > player.pv)
				  $("#TxtActualPv" + player.uuid).text(Number($("#TxtActualPv" + player.uuid).text()) - Number(1));
				else
				  $("#TxtActualPv" + player.uuid).text(Number($("#TxtActualPv" + player.uuid).text()) + Number(1));
			  }
			  else
			  {
				window.clearInterval(interval);
			  }
			},
			Math.abs(1000 / (Number($("#TxtActualPv" + player.uuid).text()) - Number(player.pv))));
			$("#healthProgress" + player.uuid).width(player.pv + "%");

			this.newHtmlElement({
				element: "div",
				parent: $("#" + player.uuid),
				id: "speed" + player.uuid,
				class: ["container", "centerWrap", "stats"]
			});
			$("#speed" + player.uuid).append(document.createTextNode("Speed"));

			for (let i = 0; i < player.speed; i++) {
				this.newImg({
					parent: $("#speed" + player.uuid),
					src: "img/power1.png",
					class: []
				});
			}
			let negspeed = 6 - player.speed;
			for (let x = 0; x < negspeed; x++) {
				this.newImg({
					parent: $("#speed" + player.uuid),
					src: "img/power0.png",
					class: []
				});
			}

			this.newHtmlElement({
				element: "div",
				parent: $("#" + player.uuid),
				id: "off" + player.uuid,
				class: ["container", "centerWrap", "stats"]
			});

			$("#off" + player.uuid).append(document.createTextNode("Offensif"));
			for (let y = 0; y < player.offensif; y++) {
				this.newImg({
					parent: $("#off" + player.uuid),
					src: "img/power1.png",
					class: []
				});
			}
			let negoff = 6 - player.offensif;
			for (let s = 0; s < negoff; s++) {
				this.newImg({
					parent: $("#off" + player.uuid),
					src: "img/power0.png",
					class: []
				});
			}

			this.newHtmlElement({
				element: "div",
				parent: $("#" + player.uuid),
				id: "def" + player.uuid,
				class: ["container", "centerWrap", "stats"]
			});

			$("#def" + player.uuid).append(document.createTextNode("Defensif"));
			for (let y = 0; y < player.defensif; y++) {
				this.newImg({
					parent: $("#def" + player.uuid),
					src: "img/power1.png",
					class: []
				});
			}
			let negdef = 6 - player.defensif;
			for (let s = 0; s < negdef; s++) {
				this.newImg({
					parent: $("#def" + player.uuid),
					src: "img/power0.png",
					class: []
				});
			}

			this.newHtmlElement({
				element: "div",
				parent: $("#" + player.uuid),
				id: "stuff" + player.uuid,
				class: ["container", "centerWrap", "flexColumn", "stuff"]
			})
			$("stuff" + player.uuid).append(document.createTextNode("weapon"));
			this.newHtmlElement({
				element: "div",
				parent: $("stuff" + player.uuid),
				id: "actualStuff" + player.uuid,
				class: ["container", "centerWrap", "actualStuff", "margTop15"]
			})

			switch (player.weapon) {
				case "s0":
					this.newImg({
						parent: $("#actualStuff" + player.uuid),
						src: "img/weapons/gun/gun.png",
						class: [],
						title: "+1 attack"
					});
					break;
				case "s1":
					this.newImg({
						parent: $("#actualStuff" + player.uuid),
						src: "img/weapons/speed/speed.png",
						class: [],
						title: "+1 speed"
					});
					break;
				case "s2":
					this.newImg({
						parent: $("#actualStuff" + player.uuid),
						src: "img/weapons/shield/shield.png",
						class: [],
						title: "+1 defense"
					});
					break;
				default:
					this.newImg({
						parent: $("#actualStuff" + player.uuid),
						src: "img/weapons/none.png",
						class: [],
						title: "no equipment"
					});
			}
		}
	}

	creatRulesOverlay() {
		this.newHtmlElement({
			element: "div",
			parent: this.container,
			id: "rulesoverlay",
			class: ["overlay", "rules"]
		});
		this.newHtmlElement({
			element: "header",
			parent: $("#rulesoverlay"),
			class: ["container", "flexColumn", "width100"]
		});
		this.newHtmlElement({
			element: "div",
			parent: $("#rulesoverlay header"),
			id: "rulesheader2",
			class: ["container", "margLr10", "reverse"]
		});
		this.newHtmlElement({
			element: "div",
			parent: $("#rulesoverlay header"),
			id: "rulesheader3",
			class: ["titleFont", "centerWrap", "container"]
		});
		this.newButton({
			parent: $("#rulesheader2"),
			id: "closeRules",
			img: "img/cross.png",
			class: ["noStyle", "margTop15", "margLr10"],
			onclick: () => {
				$("#rulesoverlay").css("display", "none");
			}
		});
		$("#rulesheader3").append(document.createTextNode("Game Rules"));
		this.newHtmlElement({
			element: "main",
			parent: $("#rulesoverlay"),
			class: ["overflowAuto", "margTop15", "margLr10", "rulesSize"]
		});
		$("#rulesoverlay main").append(gameRules());
	}

	changeCurrentPlayer() {
		if (this.currentPlayerId == 0) {
			this.currentPlayerId = 1;
		} else {
			this.currentPlayerId = 0
		}
	}

	checkEnd(player) {
		let opponent = this.getOpponent(player);
		if (player.pv <= 0 || opponent.pv <= 0) {
			this.state = 104;
		}
	}

	resetPlayer() {
		for (let x = 0; x < this.players.length; x++) {
			this.players[x].pv = 100;
			this.players[x].ship = undefined;
			this.players[x].orientation = undefined;
			this.players[x].weapon = undefined;
		}

		this.mapGame.oldWeapon = [];
		this.mapGame.playersPos = [];
		this.mapGame.playerPosSquare = [];
		this.mapGame.playerOrientation = [];
	}

	step0() {
		this.supressAll();
		$(this.header).fadeOut(0);
		$(this.main).fadeOut(0);
		$(this.footer).fadeOut(0);

		$(document).ready(() => {this.backgroundSound.play()})

		this.backgroundSound.autoplay = true,
			this.backgroundSound.loop = true,
			this.backgroundSound.volume = 0.5,
			this.creatRulesOverlay();
		this.newImg({
			parent: this.header,
			src: "img/logo.png",
			alt: "logo SpaceShip Arena",
			class: []
		});
		this.newButton({
			parent: this.main,
			id: "start",
			txt: "Start",
			class: ["large", "bigFont"],
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
			class: ["small", "margLr10"],
			onclick: function () {
				window.open("https://twitter.com/AgDevfront/");
			}
		});
		this.newButton({
			parent: this.footer,
			id: "facebook",
			img: "img/social/fb.png",
			imghover: "img/social/fb_hover.png",
			alt: "partager sur facebook",
			class: ["small", "margLr10"],
			onclick: function () {
				window.open("https://www.facebook.com/agdevfront/");
			}
		});
		this.newButton({
			parent: this.footer,
			id: "instagram",
			img: "img/social/insta.png",
			imghover: "img/social/insta_hover.png",
			alt: "partager sur insta",
			class: ["small", "margLr10"],
			onclick: function () {
				window.open("https://www.instagram.com/agdevfront/");
			}
		});
		this.newButton({
			parent: this.footer,
			id: "rules",
			txt: "Game rules",
			class: ["large", "margLr10"],
			onclick: () => {
				$("#rulesoverlay").css("display", "flex");
			}
		});
		this.newButton({
			parent: this.footer,
			id: "sound_volume",
			img: "img/sound.png",
			alt: "contrôle du son",
			class: ["noStyle", "margLr10"],
			onclick: () => {
				if (this.backgroundSound.volume === 0.5) {
					this.backgroundSound.volume = 0.2;
					$("#sound_volume>img").attr("src", "img/middlesound.png");
				} else if (this.backgroundSound.volume === 0.2) {
					this.backgroundSound.volume = 0;
					$("#sound_volume>img").attr("src", "img/nosound.png")
				} else {
					this.backgroundSound.volume = 0.5;
					$("#sound_volume>img").attr("src", "img/sound.png")
				}
			}
		});

		this.fadeInAll();
	}

	step1() {
		$(this.main).fadeOut(500);
		setTimeout(() => {
			if ($(this.header).hasClass("resizeSmall")) {
				$(this.header).removeClass("resizeSmall");
				$(this.header).addClass("resizeBig");
			};
			if ($(this.header).hasClass("margTopNeg50")) {
				$(this.header).removeClass("margTopNeg50");
				$(this.header).addClass("margTop100");
			};
			$(this.main).empty();
		}, 500);
		setTimeout(() => {
			this.newButton({
				parent: this.main,
				id: "creat",
				img: "img/local.png",
				imghover: "img/local_hover.png",
				txt: "Play local",
				alt: "Play local",
				class: ["margLr10", "square", "bigFont"],
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
				class: ["margLr10", "square", "bigFont"],
				onclick: () => {
					alert("online mode is in development");
				}
			});
			$(this.main).fadeIn(500);
		}, 501);

	}

	step101() {
		$(this.main).fadeOut(500);
		setTimeout(() => {
			if ($(this.header).hasClass("resizeSmall")) {
				$(this.header).removeClass("resizeSmall");
				$(this.header).addClass("resizeBig");
			};
			if ($(this.header).hasClass("margTopNeg50")) {
				$(this.header).removeClass("margTopNeg50");
				$(this.header).addClass("margTop100");
			};
			$(this.main).empty();
		}, 500);
		setTimeout(() => {
			this.newHtmlElement({
				element: "div",
				parent: this.main,
				id: "playersName",
				class: ["container", "centerWrap", "flexColumn"]
			});

			this.newHtmlElement({
				element: "div",
				parent: $("#playersName"),
				id: "titleName",
				class: ["container", "centerWrap", "bigFont"]
			});
			this.newTxt($("#titleName"), "Enter players name :");
			this.newHtmlElement({
				element: "div",
				parent: $("#playersName"),
				id: "inputName",
				class: ["container", "spaceAround", "margTop15"]
			});
			let player1Input = $("<input>");
			let player2Input = $("<input>");
			$(player1Input).attr({
				type: "text",
				id: "inputP1Name",
				name: "Player 1 Name",
				required: true,
				minlength: 4,
				maxlength: 20,
				value: "player 1"
			});
			$("#inputName").append(player1Input);
			$("#inputP1Name").addClass("small name margLr10");

			$(player2Input).attr({
				type: "text",
				id: "inputP2Name",
				name: "Player 2 Name",
				required: true,
				minlength: 4,
				maxlength: 20,
				value: "player 2"
			});
			$("#inputName").append(player2Input);
			$("#inputP2Name").addClass("small name margLr10");

			this.newHtmlElement({
				element: "div",
				parent: $("#playersName"),
				id: "submitName",
				class: ["container", "centerWrap", "margTop15"]
			});

			this.newButton({
				parent: $("#submitName"),
				txt: "next",
				class: ["large"],
				onclick: () => {
					this.player1.name = $("#inputP1Name").val();
					this.player2.name = $("#inputP2Name").val();
					this.state = 102;
				}
			});


			$(this.main).fadeIn(500);
		}, 501);
	}

	step102(player) {
		$(this.main).fadeOut(500);
		setTimeout(() => {
			$(this.main).empty();
		}, 500);
		setTimeout(() => {
			$(this.main).addClass("margTopNeg50");
			$(this.main).removeClass("margTop100");

			$(this.header).addClass("resizeSmall");
			$(this.header).removeClass("resizeBig");

			this.newHtmlElement({
				element: "div",
				parent: this.main,
				id: "shipChoice",
				class: ["container", "centerWrap", "flexColumn", "width80"]
			});

			this.newHtmlElement({
				element: "div",
				parent: shipChoice,
				id: "titleShipChoice",
				class: ["container", "centerWrap", "bigFont"]
			});

			this.newTxt(titleShipChoice, (player.name + " " + "choose your ship"))


			this.newHtmlElement({
				element: "div",
				parent: shipChoice,
				id: "tableOfShip",
				class: ["container", "spaceAround", "margTop15"]
			});

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipbb",
				class: ["container", "spaceAround", "selectShip"]
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
				this.changeCurrentPlayer();
				if (this.currentPlayer().ship != undefined) {
					this.state = 103
				} else {
					this.step102(this.currentPlayer())
				};
			};

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipfc",
				class: ["container", "spaceAround", "selectShip"]
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
				this.changeCurrentPlayer();
				if (this.currentPlayer().ship != undefined) {
					this.state = 103
				} else {
					this.step102(this.currentPlayer())
				};
			};

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipsf",
				class: ["container", "spaceAround", "selectShip"]
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
				this.changeCurrentPlayer();
				if (this.currentPlayer().ship != undefined) {
					this.state = 103
				} else {
					this.step102(this.currentPlayer())
				};
			};

			this.newHtmlElement({
				element: "div",
				parent: tableOfShip,
				id: "shipst",
				class: ["container", "spaceAround", "selectShip"]
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
				this.changeCurrentPlayer();
				if (this.currentPlayer().ship != undefined) {
					this.state = 103
				} else {
					this.step102(this.currentPlayer())
				};
			};

			$(this.main).fadeIn(500);
		}, 501);
	}

	step103() {
		if (this.state != this.previousState) {
			$(this.main).fadeOut(500);
			setTimeout(() => {
				$(this.main).empty();
				this.main.classList.add("margTopNeg250");
				this.main.classList.remove("margTopNeg50");
			}, 500);
			setTimeout(() => {
				this.creatPlayersOverlay();
				this.printMap();
				for (let u = 0; u < this.players.length; u++) {
					this.mapGame.setPlayerPos({
						player: this.players[u],
						newPos: undefined,
						newOrientation: undefined
					});
				};
				this.printPlayer(this.player1);
				this.printPlayer(this.player2);
				this.playeTurn(this.currentPlayer());
				$(this.main).fadeIn(500);
			}, 501);
		}
		if (this.state == this.previousState) {
			this.checkEnd(this.currentPlayer());
			this.playeTurn(this.currentPlayer());
		}

	}

	step104() {
		$(this.main).fadeOut(500);
		$("#" + this.currentPlayer().uuid).fadeOut(500);
		$("#" + this.getOpponent(this.currentPlayer()).uuid).fadeOut(500);
		setTimeout(() => {
			$(this.main).empty();
			this.main.classList.add("margTopNeg50");
			this.main.classList.remove("margTopNeg250");
			$("#" + this.currentPlayer().uuid).remove();
			$("#" + this.getOpponent(this.currentPlayer()).uuid).remove();
		}, 500);
		setTimeout(() => {
			this.newHtmlElement({
				element: "div",
				parent: this.main,
				id: "endGameChoice",
				class: ["container", "centerWrap", "flexColumn"]
			});

			this.newHtmlElement({
				element: "div",
				parent: endGameChoice,
				id: "endGameWiner",
				class: ["container", "centerWrap", "bigFont"]
			});
			this.newHtmlElement({
				element: "div",
				parent: endGameChoice,
				id: "endGameButon",
				class: ["container", "spaceAround", "margTop15"]
			});

			if (this.currentPlayer().pv > 0) {
				let winerTxT = this.currentPlayer().name + " win !";
				this.newTxt(endGameWiner, winerTxT);
			} else {
				let winerTxT = this.getOpponent(this.currentPlayer()).name + " win !";
				this.newTxt(endGameWiner, winerTxT);
			}

			this.newButton({
				parent: endGameButon,
				id: "gameMenu",
				img: "img/local.png",
				imghover: "img/local_hover.png",
				txt: "Game menu",
				alt: "Game menu",
				class: ["margLr10", "square", "bigFont"],
				onclick: () => {
					this.mapGame.generateMapGame();
					this.resetPlayer();
					this.state = 1;
				}
			});
			this.newButton({
				parent: endGameButon,
				id: "replay",
				img: "img/replay.png",
				imghover: "img/replay_hover.png",
				txt: "Replay",
				alt: "Replay",
				class: ["margLr10", "square", "bigFont"],
				onclick: () => {
					this.mapGame.generateMapGame();
					this.resetPlayer();
					this.state = 101;
				}
			});
			$(this.main).fadeIn(500);
		}, 501);
	}
}

new Game("#game1");