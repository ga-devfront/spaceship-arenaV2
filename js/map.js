/* eslint max-len: ["error", { "code": 290 }] */
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["settings"] }] */
export default class mapGame {
  constructor() {
    this.size = 15;
    this.obstacles = 15;
    this.playersPos = [];
    this.playerPosSquare = [];
    this.orientation = ['N', 'E', 'S', 'W'];
    this.playerOrientation = [];
    this.map = undefined;
    this.generateMapGame();
    this.oldWeapon = [];
  }

  /* construction of the map */
  generateMapGame() {
    this.map = this.newmapGameArray();
    this.addObstacle();
    this.addStuff();
  }

  /* creat the array for the map */
  newmapGameArray() {
    const map = [];
    for (let x = 0; x < this.size; x += 1) {
      map[x] = [];
      for (let y = 0; y < this.size; y += 1) {
        map[x][y] = '';
      }
    }
    return map;
  }

  /* RANDOM */
  /* for having a random position of player */
  getRandomPos() {
    const randomLineNumber = Math.floor(Math.random() * this.size);
    const randomCollumnNumber = Math.floor(Math.random() * this.size);
    return [randomLineNumber, randomCollumnNumber];
  }

  /* for having a random orientation of player */
  getRandomOrientation() {
    const randomOrientation = this.orientation[Math.floor(Math.random() * this.orientation.length)];
    return randomOrientation;
  }

  /* add obstacle on map */
  addObstacle() {
    for (let x = 0; x < this.obstacles; x += 1) {
      const randomCoord = this.getRandomPos();
      const randomX = randomCoord[0];
      const randomY = randomCoord[1];
      const xpos2 = randomX + 2;
      const ypos2 = randomY + 2;
      const plageX = [];
      const plageY = [];
      let testObstacl = 0;


      if (this.map[randomX][randomY] === 'x') {
        x -= 1;
      } else {
        for (let z = 0; z < 5; z += 1) {
          let finalX;
          const numberX = xpos2 - z;
          if (numberX > 14) {
            finalX = 14;
          } else if (numberX < 0) {
            finalX = 0;
          } else {
            finalX = numberX;
          }
          plageX.push(finalX);
          let finalY;
          const numberY = ypos2 - z;
          if (numberY > 14) {
            finalY = 14;
          } else if (numberY < 0) {
            finalY = 0;
          } else {
            finalY = numberY;
          }
          plageY.push(finalY);
        }
        for (let u = 0; u < 5; u += 1) {
          for (let s = 0; s < 5; s += 1) {
            if (this.map[plageX[u]][plageY[s]] !== 'x') {
              testObstacl += 1;
            }
          }
        }

        if (testObstacl === 25) {
          this.map[randomX][randomY] = 'x';
        } else {
          x -= 1;
        }
      }
    }
  }

  /* add stuff on map */
  addStuff() {
    for (let x = 0; x < 4; x += 1) {
      const randomCoord = this.getRandomPos();
      const randomX = randomCoord[0];
      const randomY = randomCoord[1];
      const xpos2 = randomX + 2;
      const ypos2 = randomY + 2;
      const plageX = [];
      const plageY = [];
      let testObstacl = 25;
      const regex = /[s][1-9]/g;
      if (this.map[randomX][randomY] === 'x' || this.map[randomX][randomY] === regex) {
        x -= 1;
      } else {
        for (let z = 0; z < 5; z += 1) {
          let finalX;
          const numberX = xpos2 - z;
          if (numberX > 14) {
            finalX = 14;
          } else if (numberX < 0) {
            finalX = 0;
          } else {
            finalX = numberX;
          }
          plageX.push(finalX);
          let finalY;
          const numberY = ypos2 - z;
          if (numberY > 14) {
            finalY = 14;
          } else if (numberY < 0) {
            finalY = 0;
          } else {
            finalY = numberY;
          }
          plageY.push(finalY);
        }
        for (let u = 0; u < 5; u += 1) {
          for (let s = 0; s < 5; s += 1) {
            if (this.map[plageX[u]][plageY[s]].startsWith('s')) {
              testObstacl -= 1;
            }
          }
        }
        if (testObstacl === 25) {
          this.map[randomX][randomY] = `s${x}`;
        } else {
          x -= 1;
        }
      }
    }
  }

  /* for havin player position */
  getPlayerOrientation(player) {
    if (this.playerOrientation[player.uuid]) {
      return this.playerOrientation[player.uuid];
    }
    return undefined;
  }

  /* for having the length of the ship's player */
  getPlayerLength(player) {
    const playerLength = player.ship.sprite.length;
    return playerLength;
  }

  /* calcul the square of the player with length, position and orientation */
  getPlayerSquare(player) {
    const orientation = this.getPlayerOrientation(player);
    const length = this.getPlayerLength(player);
    const square = [];
    switch (orientation) {
      case 'N':
        for (let u = 0; u < length; u += 1) {
          let x = 0;
          const y = 0;
          x += u;
          square.push([x, y]);
        }
        break;
      case 'E':
        for (let u = 0; u < length; u += 1) {
          const x = 0;
          let y = 0;
          y -= u;
          square.push([x, y]);
        }
        break;
      case 'S':
        for (let u = 0; u < length; u += 1) {
          let x = 0;
          const y = 0;
          x -= u;
          square.push([x, y]);
        }
        break;
      case 'W':
        for (let u = 0; u < length; u += 1) {
          const x = 0;
          let y = 0;
          y += u;
          square.push([x, y]);
        }
        break;
      default:
        break;
    }
    return square;
  }

  getPlayerPos(player) {
    if (this.playersPos[player.uuid]) {
      return this.playersPos[player.uuid];
    }
    return undefined;
  }

  getPlayerSquarePos(player) {
    if (this.playerPosSquare[player.uuid]) {
      return this.playerPosSquare[player.uuid];
    }
    return undefined;
  }

  /*  */
  setPlayerOrientation(settings) {
    if (this.getPlayerOrientation(settings.player) === undefined) {
      const randomOrientation = this.getRandomOrientation();
      this.playerOrientation[settings.player.uuid] = randomOrientation;
    } else {
      this.playerOrientation[settings.player.uuid] = settings.orientation;
    }
  }

  updatePlayerStat(settings) {
    const {
      player,
    } = settings;
    const {
      weapon,
    } = settings;
    const {
      oldWeapon,
    } = settings;
    switch (oldWeapon) {
      case 's0':
        player.offensif -= 1;
        break;
      case 's1':
        player.speed -= 1;
        break;
      case 's2':
        player.defensif -= 1;
        break;
      default:
    }
    switch (weapon) {
      case 's0':
        player.offensif += 1;
        break;
      case 's1':
        player.speed += 1;
        break;
      case 's2':
        player.defensif += 1;
        break;
      case 's3':
        player.pv += 25;
        if (player.pv > 100) {
          player.pv = 100;
        }
        break;
      default:
    }
  }

  setPlayerPos(settings) {
    if (this.getPlayerPos(settings.player) === undefined) {
      for (let x = 0; x < 1; x += 1) {
        const randomCoord = this.getRandomPos();
        const randomX = randomCoord[0];
        const randomY = randomCoord[1];
        if (this.playerOrientation[settings.player.uuid] === undefined) {
          this.setPlayerOrientation({
            player: settings.player,
          });
        }
        const square = this.getPlayerSquare(settings.player);
        const squarePosition = [];
        let verification = 0;
        for (let s = 0; s < square.length; s += 1) {
          const myX = randomX + square[s][0];
          const myY = randomY + square[s][1];
          squarePosition.push([myX, myY]);
        }
        for (let z = 0; z < squarePosition.length; z += 1) {
          if (squarePosition[z][0] >= 0 && squarePosition[z][0] <= 14 && squarePosition[z][1] >= 0 && squarePosition[z][1] <= 14) {
            /* verifie que la position est bien sur la carte */
            const xpos = squarePosition[z][0] + 1;
            const ypos = squarePosition[z][1] + 1;
            let test = 0;
            const plageX = [];
            const plageY = [];
            for (let s = 0; s < 3; s += 1) {
              let finalX;
              const numberX = xpos - s;
              if (numberX > 14) {
                finalX = 14;
              } else if (numberX < 0) {
                finalX = 0;
              } else {
                finalX = numberX;
              }
              plageX.push(finalX);
              let finalY;
              const numberY = ypos - s;
              if (numberY > 14) {
                finalY = 14;
              } else if (numberY < 0) {
                finalY = 0;
              } else {
                finalY = numberY;
              }
              plageY.push(finalY);
            }
            for (let u = 0; u < 3; u += 1) {
              for (let y = 0; y < 3; y += 1) {
                if (this.map[plageX[u]][plageY[y]] === '') {
                  test += 1;
                }
              }
            }
            if (test === 9) {
              if (this.map[squarePosition[z][0]][squarePosition[z][1]] === '') {
                verification += 1;
              } /* incrémente la verification si toutes les conditions son requises */
            }
          }
        }
        if (verification === squarePosition.length) {
          const squareFinal = [];
          for (let y = 0; y < squarePosition.length; y += 1) {
            this.map[squarePosition[y][0]][squarePosition[y][1]] = settings.player.uuid;
            squareFinal.push([squarePosition[y][0], squarePosition[y][1]]);
          }
          this.playerPosSquare[settings.player.uuid] = squareFinal;
          this.playersPos[settings.player.uuid] = [randomX, randomY];
        } else {
          x -= 1;
        }
      }
    } else {
      const {
        newPos,
      } = settings;
      const {
        newOrientation,
      } = settings;
      const oldSquare = this.getPlayerSquarePos(settings.player);
      for (let x = 0; x < oldSquare.length; x += 1) {
        if (this.oldWeapon[settings.player.uuid] === undefined || this.oldWeapon[settings.player.uuid] === 's4') {
          this.map[oldSquare[x][0]][oldSquare[x][1]] = '';
        } else {
          this.map[oldSquare[0][0]][oldSquare[0][1]] = this.oldWeapon[settings.player.uuid];
          this.oldWeapon[settings.player.uuid] = undefined;
        }
      }
      this.setPlayerOrientation({
        player: settings.player,
        orientation: newOrientation,
      });
      this.playersPos[settings.player.uuid] = newPos;
      const newX = newPos[0];
      const newY = newPos[1];

      const square = this.getPlayerSquare(settings.player);
      const squarePosition = [];
      for (let s = 0; s < square.length; s += 1) {
        const x = newX + square[s][0];
        const y = newY + square[s][1];
        squarePosition.push([x, y]);
      }
      const squareFinal = [];
      for (let y = 0; y < squarePosition.length; y += 1) {
        if (this.map[squarePosition[y][0]][squarePosition[y][1]] !== '') {
          if (settings.player.weapon === undefined) {
            settings.player.weapon = this.map[squarePosition[y][0]][squarePosition[y][1]];
            this.updatePlayerStat({
              player: settings.player,
              weapon: this.map[squarePosition[y][0]][squarePosition[y][1]],
            });
          } else {
            this.oldWeapon[settings.player.uuid] = settings.player.weapon;
            settings.player.weapon = this.map[squarePosition[y][0]][squarePosition[y][1]];
            this.updatePlayerStat({
              player: settings.player,
              weapon: this.map[squarePosition[y][0]][squarePosition[y][1]],
              oldWeapon: this.oldWeapon[settings.player.uuid],
            });
          }
        }
        this.map[squarePosition[y][0]][squarePosition[y][1]] = settings.player.uuid;
        squareFinal.push([squarePosition[y][0], squarePosition[y][1]]);
      }
      this.playerPosSquare[settings.player.uuid] = squareFinal;
    }
  }
  /* attaque */

  attack(settings) {
    settings.ennemi.pv = settings.ennemi.pv - (settings.player.offensif * 5) - (settings.ennemi.defensif);
  }

  testAttack(settings) {
    const pos = this.getPlayerPos(settings.player);
    const direction = this.getPlayerOrientation(settings.player);
    const lineX = pos[0];
    const columnY = pos[1];
    if (direction === 'N') {
      let line = lineX - 1;
      if (line < 0) {
        line = 0;
      }
      if (line > 14) {
        line = 14;
      }
      if (this.map[line][columnY] === settings.ennemy.uuid) {
        return true;
      }
    }
    if (direction === 'S') {
      let line = lineX + 1;
      if (line < 0) {
        line = 0;
      }
      if (line > 14) {
        line = 14;
      }
      if (this.map[line][columnY] === settings.ennemy.uuid) {
        return true;
      }
    }
    if (direction === 'E') {
      let column = columnY + 1;
      if (column < 0) {
        column = 0;
      }
      if (column > 14) {
        column = 14;
      }
      if (this.map[lineX][column] === settings.ennemy.uuid) {
        return true;
      }
    }
    if (direction === 'W') {
      let column = columnY - 1;
      if (column < 0) {
        column = 0;
      }
      if (column > 14) {
        column = 14;
      }
      if (this.map[lineX][column] === settings.ennemy.uuid) {
        return true;
      }
    }
    return false;
  }

  /* mouvement autorise */

  searchOnArray(searchElement, array) {
    const toFind = JSON.stringify(searchElement);
    const source = JSON.stringify(array);
    const result = source.indexOf(toFind);
    if (result !== -1) {
      return true;
    }
    return false;
  }

  testmove(player) {
    const pos = this.getPlayerSquarePos(player);
    const {
      speed,
    } = player;
    const playerlength = this.getPlayerLength(player);
    const mapTest = this.newmapGameArray();
    const testPos = [];


    for (let k = 0; k < mapTest.length; k += 1) {
      /* on passe chaque ligne de mapTest en test */
      for (let w = 0; w < mapTest[k].length; w += 1) {
        mapTest[k][w] = {
          N: false,
          S: false,
          E: false,
          W: false,
        };
      }
    }
    for (let z = 0; z < pos.length; z += 1) {
      const line = pos[z][0];
      const column = pos[z][1];
      const lineMax = line + speed;
      const columnMax = column + speed;
      for (let x = 0; x < (speed * 2 + 1); x += 1) {
        for (let y = 0; y < (speed * 2 + 1); y += 1) {
          if (y < (speed - x) || (x + y) > ((speed + (x) * 2)) || x > (speed + y) || (x + y) > (speed * 3)) { /* */ } else {
            let posSearchX = lineMax - x;
            let posSearchY = columnMax - y;
            if (posSearchX < 0) {
              posSearchX = 0;
            }
            if (posSearchX > 14) {
              posSearchX = 14;
            }
            if (posSearchY < 0) {
              posSearchY = 0;
            }
            if (posSearchY > 14) {
              posSearchY = 14;
            }
            if (this.map[posSearchX][posSearchY] === '' || this.map[posSearchX][posSearchY] === 's0' || this.map[posSearchX][posSearchY] === 's1' || this.map[posSearchX][posSearchY] === 's2' || this.map[posSearchX][posSearchY] === 's3' || this.map[posSearchX][posSearchY] === player.uuid) {
              testPos.push([posSearchX, posSearchY]);
            }
          }
        }
      }
    }
    for (let x = 0; x < testPos.length; x += 1) {
      const test = testPos[x];

      let testNord = 0;
      for (let n = 0; n < playerlength; n += 1) {
        const lineX = test[0] + n;
        const liX = test[0];
        const columnY = test[1];
        if (lineX < 0) {
          break;
        }
        if (lineX > 14) {
          break;
        }
        /* si il correspond a une des testPos */
        if (this.searchOnArray([lineX, columnY], testPos)) {
          testNord += 1;
        }
        if (testNord === playerlength) {
          mapTest[liX][columnY].N = true;
        }
      } /* test de la case nord en prenan compte du square du vaisseau */

      let testSud = 0;
      for (let s = 0; s < playerlength; s += 1) {
        const lineX = test[0] - s;
        const liX = test[0];
        const columnY = test[1];
        if (lineX < 0) {
          break;
        }
        if (lineX > 14) {
          break;
        }
        if (this.searchOnArray([lineX, columnY], testPos)) {
          testSud += 1;
        }
        if (testSud === playerlength) {
          mapTest[liX][columnY].S = true;
        }
      } /* test de la case sud en prenan compte du square du vaisseau */

      let testEst = 0;
      for (let e = 0; e < playerlength; e += 1) {
        const lineX = test[0];
        const columnY = test[1] - e;
        const colY = test[1];
        if (columnY < 0) {
          break;
        }
        if (columnY > 14) {
          break;
        }
        if (this.searchOnArray([lineX, columnY], testPos)) {
          testEst += 1;
        }
        if (testEst === playerlength) {
          mapTest[lineX][colY].E = true;
        }
      } /* test de la case est en prenan compte du square du vaisseau */

      let testOuest = 0;
      for (let o = 0; o < playerlength; o += 1) {
        const lineX = test[0];
        const columnY = test[1] + o;
        const colY = test[1];
        if (columnY < 0) {
          break;
        }
        if (columnY > 14) {
          break;
        }
        if (this.searchOnArray([lineX, columnY], testPos)) {
          testOuest += 1;
        }
        if (testOuest === playerlength) {
          mapTest[lineX][colY].W = true;
        }
      } /* test de la case ouest en prenan compte du square du vaisseau */
    }


    for (let z = 0; z < pos.length; z += 1) {
      mapTest[pos[z][0]][pos[z][1]].N = 'x';
      mapTest[pos[z][0]][pos[z][1]].S = 'x';
      mapTest[pos[z][0]][pos[z][1]].E = 'x';
      mapTest[pos[z][0]][pos[z][1]].W = 'x';
    }
    return (mapTest);
  }
}
