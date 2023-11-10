<?php

$host = 'localhost';
$dbname = 'bird-on-fire';
$username = 'root';
$password = '';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");

  // echo "Connexion to $dbname on $host successful";

} catch (PDOException $e) {
  die('Connexion failed: ' . $e->getMessage());
}

if (isset($_GET['wSpeed'])) {
  $wSpeed = $_GET['wSpeed'];
  $request = $pdo->prepare('SELECT * FROM flappybird WHERE wSpeed = :wSpeed');
  $request->bindParam(':wSpeed', $wSpeed, PDO::PARAM_STR);

  $bird = $request->execute();
  $bird = $request->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode($bird);

?>