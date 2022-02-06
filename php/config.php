<?php

    // On renseigne les paramètres utiles à la connexion
    $dbHost = "localhost";
    $dbUser = "root";
    $dbPassword = "";
    $dbName = "memory";

    // On se connecte à MySQL avec la méthode PDO (PHP Data Objects)
    try 
    {
        $db = new PDO("mysql:host={$dbHost};dbname={$dbName}", $dbUser, $dbPassword);
    } 
    catch (PDOException $e) 
    {
        echo $e->getMessage();
    }

?> 