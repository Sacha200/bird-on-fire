<?php
$host = 'localhost';
$dbname = 'bird-on-fire';
$username = 'root';
$password = 'root';

try {
  $pdo = new PDO(
    'mysql:host=' . $host . ';dbname=' . $dbname,
    $username,
    $password,
    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8')
  );


  echo "Connexion to $dbname on $host successful";
} catch (PDOException $e) {
  die('Connexion failed: ' . $e->getMessage());
}



$request = $pdo->prepare("SELECT * FROM `users`");
$request->fetch();



?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>


  <div class="poil">
    <h1>POIL</h1>
  </div>
</body>

</html>