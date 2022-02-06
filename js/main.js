let board = new Board(7, 4);
board.generateBoard();

let display = new Display(board);
display.displayBoardHtml();

let game = new Game(board.boardArray);
game.startGame();