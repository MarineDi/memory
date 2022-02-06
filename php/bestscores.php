<?php

    require_once "config.php";
    
    // On récupère tous les scores de la base de donnée, du meilleur au moins bon
    $sql = "SELECT * FROM `scores` ORDER BY `time` ASC";
    $req = $db->query($sql);
    $scores = $req->fetchAll();

    // On change le titre selon le nombre de scores en base de données
    if (isset($scores[0]))
    {
        if (isset($scores[1]))
        {
            echo("<h2>Meilleurs temps :</h2>");
        } 
        else 
        {
            echo("<h2>Meilleur temps :</h2>");
        }
    }

    // On affiche un paragraphe pour chacun des trois meilleurs scores
    for ($i = 0; $i <= 2; $i++) 
    {
        if (isset($scores[$i]))
        {
            echo("<p id='time-{$i}'>{$scores[$i]['minutes']} : {$scores[$i]['seconds']}</p>");
        }
    }

?>



            
