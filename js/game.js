class Game {
    constructor(boardArray) {
        this.boardArray = boardArray;
        this.finished = false;
        this.time = 0;
    }

    startGame() { // démarre au clic sur le bouton "C'est parti !"
        $("#start-btn").click(function() { 

            $('#modal-start').addClass('d-none');

            setTimeout(() => { // cache les cartes, démarre l'animation de la timebar, et appelle les fonctions qui vont servir à jouer

                $('.cell').addClass('face-down');
                $('#time').addClass('slide-in');
                this.timer();
                this.turnCard();
                this.loseGame();

                // this.winGame(); // vide pour l'instant

            }, 4000);

        }.bind(this));

        this.reload();
    }

    timer() { // démarre un compteur de temps et crée des variables minutes et secondes     
        setInterval(() => {
            if (!this.finished) {
                this.time++;
                this.minutes = parseInt(this.time / 60, 10);
                this.seconds = parseInt(this.time % 60, 10);
                this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
                this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
            }
        }, 1000);
    }

    reload() { // recharge au clic sur un des boutons "Nouvelle partie"
        $(".reload-btn").on("click", () => { 
            window.location.href = window.location.href;
            document.location.reload(true);
        });
    }

    loseGame() { // affiche modal 'perdu' au bout de 120 secondes
        setTimeout(() => {
            if ( this.boardArray.filter((cell) => cell.paired === false).length !== 0  ) {
                this.finished = true;
                $('#modal-defeat').removeClass('d-none');
            }
        }, 120000);
    }

    turnCard() { // prépare les cartes que l'on retourne à être comparées

        let ready = true;
        let checkArray = []; 
        const cells = document.querySelectorAll(".cell");

        for (let i = 0; i  < cells.length; i++) {
            let cardClicked = cells[i];

            $(cardClicked).on("click", () => { // au clic sur chaque carte html du tableau:
                let cardClickedObject = this.boardArray[cardClicked.getAttribute("id")]; // lie l'objet javascript correspondant.

                if (ready && cardClickedObject.paired === false) { // s'il n'y a pas déjà 2 cartes à comparer, et que la carte cliquée n'a pas trouvé sa paire:
                    $(cardClicked).removeClass('face-down'); // on la retourne.

                    // On va pusher les deux cartes cliquées dans un tableau, en vue de les vérifier
                    if (checkArray.length === 0) { 
                        checkArray.push(cardClickedObject);

                    } else if (checkArray.length === 1) { // s'il y avait déjà une carte à comparer, fige le jeu
                        ready = false;

                        if (checkArray[0] !== cardClickedObject) { // vérifie si la carte cliquée n'est celle déjà retournée (double clic par erreur)
                            checkArray.push(cardClickedObject);

                            setTimeout(() => { // effectue la comparaison et réactive le jeu
                                this.checkCards(checkArray);
                                ready = true;
                                checkArray = [];
                            }, 300);

                        } else {
                            ready = true;
                        };
                    };
                };
            });
        }
    }

    winGame() { // affiche le modal 'gagné' et envoie le score vers les scripts php
        // on arrête l'animation de la timebar
        $('#time').removeClass('slide-in');
        
        // fin compteur de temps
        this.finished = true;

        // on attribue les trois valeurs temps (score, minutes, secondes) aux inputs cachés du html                
        $('#time-input').val(this.time);
        $('#minutes-input').val(this.minutes);
        $('#seconds-input').val(this.seconds);

        // affiche le score dans le modal de victoire
        $('#game-time').html(`${this.minutes} : ${this.seconds}`);

        // au clic sur le bouton "Nouvelle partie", les trois valeurs temps sont envoyées dans les scripts php (pour pouvoir être pushées dans la base sql)
        $(document).on('submit', '#score', function (e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: "./php/score.php",
                data: {
                    time: $('#time-input').val(),
                    minutes: ($('#minutes-input').val()).toString(),
                    seconds: ($('#seconds-input').val()).toString()
                  },
                dataType: "json"
            });
        });

        // on affiche le modal de victoire
        $('#modal-victory').removeClass('d-none');
    }

    checkCards(checkArray) { // réagit selon si les cartes ont le même fruit ou non
        if ( checkArray[0].content !== checkArray[1].content ) { // Si les 2 cartes n'ont pas le même fruits : elles se retournent
                $(`#${checkArray[0].id}`).addClass('face-down');
                $(`#${checkArray[1].id}`).addClass('face-down');

        } else if ( checkArray[0].content === checkArray[1].content ) { // Si les 2 cartes ont le même fruits : elles deviennent "pairées"
            checkArray[0].paired = true;
            checkArray[1].paired = true;

            if ( this.boardArray.filter((cell) => cell.paired === false).length === 0  ) { // S'il ne reste plus de carte non pairée : Victoire
                this.winGame();
            }
        };
    }

}
