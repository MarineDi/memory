class Display {
    constructor(board) {
        this.board = board;
    }
    displayBoardHtml() {
        const grid = $("#grid");
        let gridLine = "";
        let gridCell = "";
        let k = 0;

        // Créé de nouvelles lignes sur Y
        for (let i = 0; i < board.cellsByColumn; i++) {
            gridLine = $(`<div class='gridline' id='line${i}'></div>`);
            grid.append(gridLine);

            // Dans chaque ligne, créé de nouvelles cellules sur X
            for (let j = 0; j < board.cellsByLine; j++) {
                const fruit = board.boardArray[k].content;
                gridCell = $(`<div class='cell ${fruit}' id='${k}'></div>`);
                gridLine.append(gridCell);
                k++;
            }
        }
    }
}