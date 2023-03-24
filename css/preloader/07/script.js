class Preloader {
  constructor({ container, dimX, dimY, cellSize, lettersColor }) {
    this.container = document.querySelector(container);
    this.color = lettersColor;
    this.dimx = dimX;
    this.dimy = dimY;
    this.cellAmount = this.dimx * this.dimy;
    this.cellSize = cellSize;
    this.cells = [];
    this.cellProperties = {
      width: `${this.cellSize}px`,
      height: `${this.cellSize}px`,
      float: "left",
      border: "1px solid #fef",
      background: "#555",
    };
    this.inPoint = 184;
    this.leftBorder = null;
    this.counter = 0;
    this.stopRAF = null;
    this.letters = {
      l: [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 1],
      ],
      o: [
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
      ],
      a: [
        [0, 0, 1, 1],
        [0, 1, 0, 1],
        [1, 1, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
      ],
      d: [
        [1, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 0],
      ],
      i: [[1], [1], [1], [1], [1]],
      n: [
        [1, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
      ],
      g: [
        [1, 1, 1, 1],
        [1, 0, 0, 0],
        [1, 0, 1, 1],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
      ],
      dots: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 1],
      ],
    };
    this.lettersOrder = [
      {
        letter: "l",
        enterPoint: this.inPoint,
      },
      {
        letter: "o",
        enterPoint: this.inPoint + 5,
      },
      {
        letter: "a",
        enterPoint: this.inPoint + 10,
      },
      {
        letter: "d",
        enterPoint: this.inPoint + 15,
      },
      {
        letter: "i",
        enterPoint: this.inPoint + 20,
      },
      {
        letter: "n",
        enterPoint: this.inPoint + 22,
      },
      {
        letter: "g",
        enterPoint: this.inPoint + 27,
      },
      {
        letter: "dots",
        enterPoint: this.inPoint + 32,
      },
    ];
    this.init = this.init.bind(this);
  }
  setContainerProperties() {
    this.container.style.width = `${this.dimx * this.cellSize}px`;
    this.container.style.height = `${this.dimy * this.cellSize}px`;
  }
  createCells() {
    for (let i = 0; i < this.cellAmount; i++) {
      let cell = document.createElement("span");
      for (let prop in this.cellProperties) {
        cell.style[prop] = this.cellProperties[prop];
      }
      this.cells.push(cell);
    }
  }
  drawCells() {
    for (let i = 0; i < this.cells.length; i++) {
      this.container.appendChild(this.cells[i]);
    }
  }
  outputLetter(inPoint, letter, letterOffset) {
    let beginPoint;
    for (let i = 0; i < letter.length; i++) {
      for (let y = 0; y < letter[i].length; y++) {
        beginPoint = inPoint + y - letterOffset;
        if (this.counter > this.dimx - 1) {
          this.counter = 0;
          beginPoint = inPoint + y - letterOffset;
        }
        if (beginPoint < this.leftBorder) {
          beginPoint = inPoint + this.dimx + y - letterOffset;
        }
        if (letter[i][y]) {
          this.cells[beginPoint + this.dimx * i].style.backgroundColor =
            this.color;
        }
      }
    }
  }
  setLettersOnAField() {
    this.lettersOrder.forEach((v) => {
      this.outputLetter(v.enterPoint, this.letters[v.letter], this.counter);
    });
  }
  setLeftBorder() {
    for (let i = 0; i < this.dimy; i++) {
      if (this.inPoint > this.dimx * i && this.inPoint < this.dimx * (i + 1)) {
        this.leftBorder = this.dimx * i;
      }
    }
  }
  init() {
    this.setContainerProperties();
    this.createCells();
    this.drawCells();
    this.setLeftBorder();
    this.setLettersOnAField();
    this.animateLetters = this.animateLetters.bind(this);
    this.stop = this.stop.bind(this);
    this.animateLetters();
  }
  clearField() {
    this.cells.forEach((v) => (v.style.backgroundColor = "transparent"));
  }
  stop() {
    this.container.innerHTML = "";
    window.cancelAnimationFrame(this.stopRAF);
  }
  animateLetters() {
    this.clearField();
    this.setLettersOnAField();
    this.counter += 1;
    this.stopRAF = window.requestAnimationFrame(this.animateLetters);
  }
}

let config = {
  container: ".preloader",
  dimX: 45,
  dimY: 13,
  cellSize: 8,
  lettersColor: "red",
};

let preloader = new Preloader(config);

preloader.init();
