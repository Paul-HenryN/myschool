-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 08 déc. 2023 à 19:32
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

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
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id_admin` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admins`
--

INSERT INTO `admins` (`id_admin`, `name`, `email`, `password`) VALUES
(2, 'Administrateur', 'administrateur@myschool.net', '$2b$10$/uRKpLuzNs9gVUh3crlxi.Uqa/KqKv8NyvUCNhg/zPk5fD4ANKZTm'),
(4, 'test', 'test@myschool.net', '$2b$10$d/mBPlmT3pZ1CdZYgBxAae2.GiHH.0v9Lsg0VO/HKdbBCiU98O0sa'),
(8, 'Paul', 'paul@myschool.net', '$2b$10$fYRrmaxx46aDRtz6WlP3fe4DLYacWVKTqS6TLtvo8OlsNN.X/h/0a'),
(11, 'Adr', 'adr@myschool.net', '$2b$10$5CCRkiFOLopAJom3ZtUOyu1ODsq.zPAjvZsBgFuxAbkvicuLBPLtK'),
(12, 'Ad', 'ad@myschool.net', '$2b$10$3x32gMKftxC3athb7NRzXenUgyu.7g2R3gfLX0fTQZ5wy3S83WpfK'),
(20, 'fer', 'fer@myschool.net', '$2b$10$nUocnBXEvWqp9p9IaBvDcOnzHBmfoo8YSh0ej6KT1oSxdmOkXko3K'),
(22, 'hey', 'frg@myschool.net', '$2b$10$Mzf/9LtHpLHErNIMAsnScOENmTzesXZpSTU2ytDq5XNxcXpq5YamK'),
(23, 'New teacher', 'newTeacher@myschool.net', '$2b$10$FuCXhya5V.2Xp/dI8esC.OAT0FZUyfecHrB1ofhoCWoGUZ1unFR16');

-- --------------------------------------------------------

--
-- Structure de la table `grades`
--

CREATE TABLE `grades` (
  `id_student` int(11) NOT NULL,
  `id_subject` int(11) NOT NULL,
  `id_teacher` int(11) NOT NULL,
  `value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `grades`
--

INSERT INTO `grades` (`id_student`, `id_subject`, `id_teacher`, `value`) VALUES
(1, 2, 2, 2.5),
(2, 1, 1, 15.75);

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

CREATE TABLE `students` (
  `id_student` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `students`
--

INSERT INTO `students` (`id_student`, `name`, `email`, `password`) VALUES
(1, 'Maxime', 'maxime@gmail.com', 'test'),
(2, 'Oumou', 'oumou@gmail.com', 'test');

-- --------------------------------------------------------

--
-- Structure de la table `subjects`
--

CREATE TABLE `subjects` (
  `id_subject` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `coefficient` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `subjects`
--

INSERT INTO `subjects` (`id_subject`, `name`, `coefficient`) VALUES
(1, 'Développement durable', 2),
(2, 'Développement durable', 2),
(3, 'Anglais', 3);

-- --------------------------------------------------------

--
-- Structure de la table `teachers`
--

CREATE TABLE `teachers` (
  `id_teacher` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `id_subject` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `teachers`
--

INSERT INTO `teachers` (`id_teacher`, `name`, `email`, `password`, `id_subject`) VALUES
(1, 'Paul-Henry', 'ngpaulhenry@gmail.com', 'test', 1),
(2, 'Pavone', 'pavone@gmail.com', 'test', 1),
(4, 'Brand new teacher', 'brandnew@myschool.net', '$2b$10$.tlKaNsgZTbSxhaTXAOhoOC9XYcKek46uLZXJ20m8gPAr80.UUJlS', 1),
(5, 'Brand new teacher', 'testtest@myschool.net', '$2b$10$dkX0Uq1A70Yj/UqND3w.O.X5VVZ9wfMbkeylW1x7mQ7z0IA/fWCHa', 3);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id_admin`);

--
-- Index pour la table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id_student`,`id_subject`,`id_teacher`),
  ADD KEY `fk_id_subject` (`id_subject`),
  ADD KEY `fk_id_teacher` (`id_teacher`);

--
-- Index pour la table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id_student`);

--
-- Index pour la table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id_subject`);

--
-- Index pour la table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id_teacher`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `students`
--
ALTER TABLE `students`
  MODIFY `id_student` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id_subject` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id_teacher` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `fk_id_student` FOREIGN KEY (`id_student`) REFERENCES `students` (`id_student`),
  ADD CONSTRAINT `fk_id_subject` FOREIGN KEY (`id_subject`) REFERENCES `subjects` (`id_subject`),
  ADD CONSTRAINT `fk_id_teacher` FOREIGN KEY (`id_teacher`) REFERENCES `teachers` (`id_teacher`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
