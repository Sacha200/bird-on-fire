# bird-on-fire
bird-on-fire game
Ce jeu est un clone de Flappy Bird, un jeu populaire dans lequel le joueur contrôle un oiseau qui doit traverser des tuyaux sans les toucher. Le jeu est simple mais addictif, et il est parfait pour les joueurs de tous âges.

Instructions :

Pour jouer, utilisez la touche espace pour contrôler l'oiseau. Appuyez sur la touche espace pour faire voler l'oiseau, Le but du jeu est de traverser les tuyaux sans les toucher. Chaque fois que vous touchez un tuyau, vous perdez.


Fonctionnalités

Le jeu dispose de plusieurs fonctionnalités, notamment :
- Des niveaux personnalisés
- Des skins pour l'oiseau
- le choix des maps 


## Installation et Configuration

### Prérequis
Ce projet nécessite :
- Un serveur PHP (7.4 ou supérieur)
- MySQL (5.7 ou supérieur)
- Un serveur web (Apache recommandé)

### Option 1 : Avec XAMPP (Recommandé pour Windows) ⭐
1. **Télécharger et installer XAMPP** : https://www.apachefriends.org/fr/download.html
2. **Copier le projet** dans le dossier `C:\xampp\htdocs\`
3. **Démarrer les services** :
   - Lancer XAMPP Control Panel
   - Démarrer Apache et MySQL
4. **Configurer la base de données** :
   - Ouvrir http://localhost/phpmyadmin
   - Créer une nouvelle base de données nommée `bird-on-fire`
   - Importer le fichier `flappybird.sql` (onglet "Importer")
5. **Lancer le jeu** : http://localhost/bird-on-fire-/index.html

### Option 2 : Avec Laragon (Moderne et automatique)
1. **Télécharger et installer Laragon** : https://laragon.org/download/
2. **Copier le projet** dans le dossier `C:\laragon\www\`
3. **Démarrer Laragon** et cliquer sur "Démarrer tout"
4. **Configurer la base de données** via phpMyAdmin (accessible depuis Laragon)
5. **Accéder au jeu** : le lien sera généré automatiquement par Laragon

### Option 3 : Avec MAMP/WAMP
1. **Lancer MAMP/WAMP**
2. **Copier le projet** dans le dossier `htdocs`
3. **Importer la base de données** à l'aide du fichier `flappybird.sql`
4. **Lancer le localhost**

### Configuration de la base de données
- **Nom de la base** : `bird-on-fire`
- **Utilisateur** : `root`
- **Mot de passe** : `` (vide) ou `root` selon votre configuration
- **Fichier SQL** : `flappybird.sql` (à importer dans phpMyAdmin)

