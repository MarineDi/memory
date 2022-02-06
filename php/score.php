<?php

    // On initialise nos variables, puis on les relie aux datas envoyées par la requête Ajax dans game.js
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) == 'XMLHTTPREQUEST')
    {
        $time = null;
        $minutes = null; 
        $seconds = null;

        if (isset($_POST['time']) && isset($_POST['minutes']) && isset($_POST['seconds']))
        {
            $time = $_POST['time'];
            $minutes = $_POST['minutes'];
            $seconds = $_POST['seconds'];
        }
        
        response($time, $minutes, $seconds);
    }

    // On insère nos datas dans notre base de données
    function response($time, $minutes, $seconds)
    {
        include "config.php";

        $req=$db->prepare("INSERT INTO scores (`time`, `minutes`, `seconds`) VALUES (?,?,?)");

        $req->execute(array($time, $minutes, $seconds));
    }

?>
