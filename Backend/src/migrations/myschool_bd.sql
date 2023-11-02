-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 02 nov. 2023 à 13:56
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `myschool_bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `etudiants`
--

CREATE TABLE `etudiants` (
  `id_etu` varchar(25) NOT NULL,
  `name_etu` varchar(50) NOT NULL,
  `prenom_etu` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `mot_de_passe` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `etudiants`
--

INSERT INTO `etudiants` (`id_etu`, `name_etu`, `prenom_etu`, `email`, `mot_de_passe`) VALUES
('E1', 'fatou', 'diop', 'fatou@gmai.com', 'pp'),
('E2', 'fatou', 'diop', 'fatou@gmai.com', 'pp');

-- --------------------------------------------------------

--
-- Structure de la table `matieres`
--

CREATE TABLE `matieres` (
  `code_matiere` varchar(25) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `coefficient` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `matieres`
--

INSERT INTO `matieres` (`code_matiere`, `nom`, `coefficient`) VALUES
('M1', 'math', 5),
('M2', 'arabe', 5);

-- --------------------------------------------------------

--
-- Structure de la table `notes`
--

CREATE TABLE `notes` (
  `id_etudiant` varchar(25) NOT NULL,
  `id_prof` varchar(25) NOT NULL,
  `code_matiere` varchar(25) NOT NULL,
  `valeur` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notes`
--

INSERT INTO `notes` (`id_etudiant`, `id_prof`, `code_matiere`, `valeur`) VALUES
('E2', 'A1', 'M1', 12);

-- --------------------------------------------------------

--
-- Structure de la table `professeur`
--

CREATE TABLE `professeur` (
  `id_prof` varchar(25) NOT NULL,
  `name_prof` varchar(50) NOT NULL,
  `prenom_prof` varchar(50) NOT NULL,
  `email` varchar(25) NOT NULL,
  `mot_de_passe` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `professeur`
--

INSERT INTO `professeur` (`id_prof`, `name_prof`, `prenom_prof`, `email`, `mot_de_passe`) VALUES
('A1', 'awa', 'ly', 'awaly@gmail.com', 'pppp'),
('A2', 'awa', 'ly', 'awaly@gmail.com', 'pppp');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `etudiants`
--
ALTER TABLE `etudiants`
  ADD PRIMARY KEY (`id_etu`);

--
-- Index pour la table `matieres`
--
ALTER TABLE `matieres`
  ADD PRIMARY KEY (`code_matiere`);

--
-- Index pour la table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id_etudiant`,`id_prof`,`code_matiere`),
  ADD KEY `fk_id_prof` (`id_prof`),
  ADD KEY `fk_code_matiere` (`code_matiere`);

--
-- Index pour la table `professeur`
--
ALTER TABLE `professeur`
  ADD PRIMARY KEY (`id_prof`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `fk_code_matiere` FOREIGN KEY (`code_matiere`) REFERENCES `matieres` (`code_matiere`),
  ADD CONSTRAINT `fk_id_etudiant` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiants` (`id_etu`),
  ADD CONSTRAINT `fk_id_prof` FOREIGN KEY (`id_prof`) REFERENCES `professeur` (`id_prof`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
