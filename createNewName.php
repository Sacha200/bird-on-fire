<?php
$host = 'localhost';
$dbname = 'bird-on-fire';
$username = 'root';
$password = '';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
} catch (PDOException $e) {
  die('Connexion failed: ' . $e->getMessage());
}

if (isset($_POST['name'])) {
  $newSauceName = $_POST['name'];
  $stmt = $pdo->prepare('INSERT INTO flappybird (name) VALUES (:newSauceName)');
  $stmt->bindParam(':newSauceName', $newSauceName, PDO::PARAM_STR);
  $stmt->execute();
}
?>