class Board {
    constructor(cellsByLine, cellsByColumn) {
        this.cellsByLine = cellsByLine;
        this.cellsByColumn = cellsByColumn;
        this.numberOfCells = this.cellsByLine * this.cellsByColumn;
        this.numberOfFruits = this.numberOfCells / 2;
        this.boardArray = [];
    }

    generateBoard() { // créé un array de cellules correspondant à la taille de la grille de jeu
        for (let i = 0; i < this.numberOfCells; i++) {
            let newCell = new Cell(i);
            this.boardArray.push(newCell);
        }
        this.shuffle(fruitsArray);
        this.addFruits();
        this.addFruits();
    }

    returnEmptyCells() { // renvoie un tableau contenant les cellules sans fruit
        return this.boardArray.filter((cell) => cell.content === "0");
    }
    
    addFruits() { // distribue des fruits de façon aléatoire sur la moitié de la grille
        for (let i = 0; i < this.numberOfFruits; i++) {
            let emptyCells = this.returnEmptyCells();
            let index = Math.floor(Math.random() * emptyCells.length);
            emptyCells[index].content = fruitsArray[i].name;
        }
    }
    
    shuffle(array) { // mélange tous les fruits existants pour varier les affichages possibles
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}