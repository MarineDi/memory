<?php require_once('php/config.php'); ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="-1"/>   

    <title>Jeu de mémoire</title>

    <link rel="stylesheet" href="css/style.css">
    <link rel="icon" href="img/favicon.png" type="image/x-icon">
</head>

<body>
    <h1>Jeu de mémoire</h1>
    <p>Retrouve les paires !</p>

    <!-- GRID -->
    <div id= "grid-container">
        <div id="grid"></div>
    </div>

    <!-- TIMEBAR -->
    <div id="timebar">
        <div id="time"></div>
    </div>

    <!-- MODAL: Start -->
    <div id="modal-start" class="modal">
        <div class="modal-inner">
            <h1>Jeu de mémoire</h1>
            <p>Retrouve les paires !</p>

            <!-- Shows the 3 best scores -->
            <div id="best-scores">
                <?php require_once('php/bestscores.php'); ?>
            </div>

            <button id="start-btn">C'est parti !</button>
        </div>
    </div>

    <!-- MODAL: Victory -->
    <div id="modal-victory" class="modal d-none">
        <div class="modal-inner">
            <h2>Vous avez gagné !</h2>
            <p>Bravo !</p>
            <h2>Votre temps :</h2>
            <p id="game-time">00 : 00</p>   
            <form id="score">

                <!-- Hidden inputs -->
                <input id="time-input" type="hidden" name="time" value="">
                <input id="minutes-input" type="hidden" name="minutes" value="">
                <input id="seconds-input" type="hidden" name="seconds" value="">

                <button type="submit" class="reload-btn">Nouvelle partie</button>
            </form>
        </div>
    </div>

    <!-- MODAL: Defeat -->
    <div id="modal-defeat" class="modal d-none">
        <div class="modal-inner">
            <h2>Vous avez perdu !</h2>
            <button class="reload-btn">Nouvelle partie</button>
        </div>
    </div>

    <script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script type="text/javascript" src="js/game.js"></script>
    <script type="text/javascript" src="js/display.js"></script>
    <script type="text/javascript" src="js/cell.js"></script>
    <script type="text/javascript" src="js/fruits.js"></script>
    <script type="text/javascript" src="js/board.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
</body>
</html>