var gameState = { 'game':1, 'win':2, 'stop':3 }
const dim = 16;

export class Game {
  constructor(tiles, moves, status) {
    this.tiles = tiles;
    this.moves = moves;
    this.status = status;
  }

  getMoves() {
    return this.moves;
  }

  getStatus() {
    return this.status;
  }

  getBoard() {
    return this.tiles;
  }

  initBoard() {
    for (var i = 0; i < dim;) {
      this.tiles[i] = ++i;
    }
  //  return this.tiles;
  }

  getIndices(index) {
    var suitableIndices = [];
    var type = [~~(index / 4), index % 4];
    var shift = [4, 1];
    for (var i = 0; i < 2; i++) {
      if ([1, 2].includes(type[i])) {
        suitableIndices.push(index + shift[i], index - shift[i]);
      }
      if (type[i] === 0) suitableIndices.push(index + shift[i]);
      if (type[i] === 3) suitableIndices.push(index - shift[i]);
    }
    return suitableIndices;
  }

  getRandomInt(max) {
    return Math.floor(Math.random()*max);
  }

  tilesExchange(firstIndex, secondIndex) {
    this.tiles[secondIndex] = this.tiles[firstIndex];
    this.tiles[firstIndex] = dim;
  }

  notExist(index) {
    if ((index >= 0) & (index < dim)) return false;
    return true;
  }

  generateBoard() {
    var i = 100;
    var indexOfZero;
    var randIndex;
    var suitableIndices;
    while (i != 0) {
      indexOfZero = (this.tiles).indexOf(dim);
      //console.log(indexOfZero);
      suitableIndices = this.getIndices(indexOfZero);
      randIndex = suitableIndices[this.getRandomInt(suitableIndices.length)];
      if (this.notExist(randIndex)) continue;
      this.tilesExchange(randIndex, indexOfZero);
      i--;
    }
    //return this.tiles;
  }

  win() {
    var n = 0;
    while ((this.tiles[n] === ++n) & (n < dim)) {}
    if (n === dim) return true;
    return false;
  }

  move(index) {
    if (this.status != gameState.game) return false;
    if (this.notExist(index)) return false;

    var indexOfZero = (this.tiles).indexOf(dim);
    var colCheck = this.getIndices(indexOfZero);
    if (colCheck.includes(index)) {
      this.tilesExchange(index, indexOfZero);
      this.moves++;
    if (this.win()) this.status = gameState.win;
      return true;
    }
    return false;
  }

  restart() {
    this.generateBoard();
    this.moves = 0;
    this.status = gameState.game;
  }

  // start() {
  //   if (this.status === gameState.stop) {
  //     this.restart();
  //   }
  // }
}
