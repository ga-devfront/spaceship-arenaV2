let gameRule = `
	<ul>
		<li></li>
		<li></li>
		<li></li>
	</ul>
	<span></span>
` /* a faire dans un autre fichier */
import shipSettings from "./shipsettings.js";
import Map from "./map.js"

class Game {
	constructor(container) {
		if ((typeof container == "undefined") || (container.length == 0)) throw new Error("Merci de préciser un container pour initialiser l'instance de jeu");
		this.header = container.getElementsByTagName("header")[0];
		this.main = container.getElementsByTagName("main")[0];
		this.footer = container.getElementsByTagName("footer")[0];
		this.container = container;
		this.buttonSound = new Audio("audio/btn.mp3");
		this.buttonSound.volume = 0.3;
		this.backgroundSound = new Audio("audio/pulsation.mp");
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
			case 2:
				this.step2();
				break;
			case 3:
				this.step3();
				break;
			case 4:
				this.step4();
				break;
			case 5:
				this.step5();
				break;
			default:
				this.step0();
		}
	}

	newImg(emplacement, source, alternative, myClass) {
		const newEl = document.createElement("img"); //creat img
		newEl.setAttribute("src", source); //set src attribute
		newEl.setAttribute("alt", alternative); //set alt attritube
		newEl.classList.add(myClass); //add class
		emplacement.appendChild(newEl); //push img in dom
	} //function for new image

	newTxt(emplacement, myTxt) {
		const newTxt = document.createTextNode(myTxt);
		emplacement.appendChild(newTxt);
	}

	newButton(buttonSettings) {
		const newEl = document.createElement("button"); //creat button
		newEl.setAttribute("id", buttonSettings.id); //set the id
		for (let x = 0; buttonSettings.class.length > x; x++) {
			newEl.classList.add(buttonSettings.class[x]);
		}
		buttonSettings.parent.appendChild(newEl); //push button in dom

		if (typeof buttonSettings.img != "undefined" && buttonSettings.img.length > 0) {
			let img = buttonSettings.img;
			let alt = buttonSettings.alt;
			let classe = buttonSettings.imgclass;
			this.newImg(newEl, img, alt, classe);
			if (typeof buttonSettings.imghover != "undefined" && buttonSettings.imghover.length > 0) {
				let imgSelect = newEl.getElementsByTagName("img")[0];
				newEl.addEventListener("mouseover", function () {
					imgSelect.src = buttonSettings.imghover;
				}) //change img in hover and play sound
				newEl.addEventListener("mouseout", function () {
					imgSelect.src = buttonSettings.img;
				}) //change img in out
			}
		};

		if (typeof buttonSettings.txt != "undefined" && buttonSettings.txt.length > 0) {
			let txt = buttonSettings.txt;
			this.newTxt(newEl, txt);
		};

		let audio = this.buttonSound;
		newEl.addEventListener("mouseover", function () {
			audio.play();
		})

		if (typeof buttonSettings.onclick != "undefined") {
			newEl.addEventListener("click", function () {
				buttonSettings.onclick();
			})
		};
	} //function for new button

	newImgMap(emplacement, source, alternative, myClass, myClass2) {
		const newEl = document.createElement("img"); //creat img
		newEl.setAttribute("src", source); //set src attribute
		newEl.setAttribute("alt", alternative); //set alt attritube
		newEl.classList.add(myClass, myClass2); //add class
		emplacement.appendChild(newEl); //push img in dom
	} //function for new image

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
		this.newImg(emplacement, logoimg, logo, "none");
		this.newImg(emplacement, spriteimg, sprite, "shipSelectAnim");
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
			this.newImg(speedID, "img/power1.png", "none", "none");
		}
		let negspeed = 6 - settings.ship.speed;
		for (let x = 0; x < negspeed; x++) {
			this.newImg(speedID, "img/power0.png", "none", "none");
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
			this.newImg(offID, "img/power1.png", "none", "none");
		}
		let negoff = 6 - settings.ship.offensif;
		for (let s = 0; s < negoff; s++) {
			this.newImg(offID, "img/power0.png", "none", "none");
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
			this.newImg(defID, "img/power1.png", "none", "none");
		}
		let negdef = 6 - settings.ship.defensif;
		for (let s = 0; s < negdef; s++) {
			this.newImg(defID, "img/power0.png", "none", "none");
		}

		emplacement.addEventListener("click", () => {
			this.state = 5;
		});
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
		this.newImg(this.header, "img/logo.png", "logo SpaceShip Arena", "none");
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
				img: "img/creatserv.png",
				imghover: "img/creatserv_hover.png",
				txt: "Create new Game",
				alt: "Create new game",
				class: ["marg-lr10", "square", "big-font"],
				onclick: () => {
					this.state = 2;
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
					this.state = 3;
				}
			});
			this.fadeIn(this.main);
		}, 501);

	}

	step2() {
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

	step3() {
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
					this.state = 4;
				})
			};

			this.fadeIn(this.main);
		}, 501);
	}

	step4() {
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

	step5() {
		this.fadeOut(this.main);
		setTimeout(() => {
			this.supress(this.main);
			this.main.classList.add("margtopneg250");
			this.main.classList.remove("margtopneg15");
		}, 500);
		setTimeout(() => {
			let map = new Map(this.main);
			this.fadeIn(this.main);
		}, 501);

	}
}

let main = document.getElementById("game1");
let game = new Game(main);

/*let main2 = document.getElementById("game2");
let game2 = new Game(main2);*/