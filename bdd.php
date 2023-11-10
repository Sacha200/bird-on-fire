<?php

$host = 'localhost';
$dbname = 'bird-on-fire';
$username = 'root';
$password = 'root';
;

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");

  // echo "Connexion to $dbname on $host successful";
  echo "Connexion to $dbname on $host successful";

} catch (PDOException $e) {
  die('Connexion failed: ' . $e->getMessage());
}

?>

<script>

  function getNames() {
    fetch('getName.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let parsedResponse = response.json();
        return parsedResponse;
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('There has been a problem:', error);
      });
  }
  getNames();

  function getBirdBySpeed(speed) {
    let url = "getBirdBySpeed.php?wSpeed=" + speed;
    fetch(url, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let parsedResponse = response.json();
        return parsedResponse;
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('There has been a problem:', error);
      });
  }
  getBirdBySpeed(5);

  function createNewSauce(sauceName) {
    let url = 'createNewName.php';
    let formData = new FormData();
    formData.append('name', sauceName);
=======

  function getNames() {
    fetch('getName.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let parsedResponse = response.json();
        return parsedResponse;
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('There has been a problem:', error);
      });
  }
  getNames();

  function getBirdBySpeed(speed) {
    let url = "getBirdBySpeed.php?wSpeed=" + speed;
    fetch(url, { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let parsedResponse = response.json();
        return parsedResponse;
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log('There has been a problem:', error);
      });
  }
  getBirdBySpeed(5);

  function createNewSauce(sauceName) {
    let url = 'createNewName.php';
    let formData = new FormData();
    formData.append('name', sauceName);

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  }

  createNewSauce('Wist')

</script>
</body>

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <div class="class">
    <h1>Hws</h1>
  </div>
</body>
>>>>>>> 28986f6647ae8246e8b5045f6cb34f1ecf7f32a8

fetch(url, {
method: 'POST',
body: formData
})
.then((response) => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.text();
})
.catch(function (error) {
console.error('Error:', error);
});
}

createNewSauce('Wist')

</script>
</body>