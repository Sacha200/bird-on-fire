-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 10 nov. 2023 à 12:50
-- Version du serveur : 5.7.34
-- Version de PHP : 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bird-on-fire`
--

-- --------------------------------------------------------

--
-- Structure de la table `flappybird`
--

CREATE TABLE `flappybird` (
  `id` int(11) NOT NULL,
  `isRand` varchar(255) NOT NULL,
  `top` int(255) NOT NULL,
  `bot` int(255) NOT NULL,
  `width` int(255) NOT NULL,
  `color` varchar(255) NOT NULL,
  `hSpeedOFF` int(11) NOT NULL,
  `hSpeed` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `flappybird`
--

INSERT INTO `flappybird` (`id`, `isRand`, `top`, `bot`, `width`, `color`, `hSpeedOFF`, `hSpeed`) VALUES
(1, 'suus', 0, 0, 60, 'blue', 0, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `flappybird`
--
ALTER TABLE `flappybird`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `flappybird`
--
ALTER TABLE `flappybird`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
