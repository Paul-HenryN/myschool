-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2023 at 09:11 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myschool_bd`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id_admin` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id_admin`, `name`, `email`, `password`) VALUES
(2, 'Administrateur', 'administrateur@myschool.net', '$2b$10$/uRKpLuzNs9gVUh3crlxi.Uqa/KqKv8NyvUCNhg/zPk5fD4ANKZTm'),
(4, 'test', 'test@myschool.net', '$2b$10$d/mBPlmT3pZ1CdZYgBxAae2.GiHH.0v9Lsg0VO/HKdbBCiU98O0sa'),
(8, 'Paul', 'paul@myschool.net', '$2b$10$fYRrmaxx46aDRtz6WlP3fe4DLYacWVKTqS6TLtvo8OlsNN.X/h/0a'),
(11, 'Adr', 'adr@myschool.net', '$2b$10$5CCRkiFOLopAJom3ZtUOyu1ODsq.zPAjvZsBgFuxAbkvicuLBPLtK'),
(12, 'Ad', 'ad@myschool.net', '$2b$10$3x32gMKftxC3athb7NRzXenUgyu.7g2R3gfLX0fTQZ5wy3S83WpfK'),
(20, 'fer', 'fer@myschool.net', '$2b$10$nUocnBXEvWqp9p9IaBvDcOnzHBmfoo8YSh0ej6KT1oSxdmOkXko3K'),
(22, 'hey', 'frg@myschool.net', '$2b$10$Mzf/9LtHpLHErNIMAsnScOENmTzesXZpSTU2ytDq5XNxcXpq5YamK');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `id_student` int(11) NOT NULL,
  `id_subject` int(11) NOT NULL,
  `id_teacher` int(11) NOT NULL,
  `value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`id_student`, `id_subject`, `id_teacher`, `value`) VALUES
(1, 2, 2, 2.5),
(2, 1, 1, 15.75);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id_student` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id_student`, `name`, `email`, `password`) VALUES
(1, 'Maxime', 'maxime@gmail.com', 'test'),
(2, 'Oumou', 'oumou@gmail.com', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id_subject` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `coefficient` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id_subject`, `name`, `coefficient`) VALUES
(1, 'Maths', 6),
(2, 'Big Data', 1);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id_teacher` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id_teacher`, `name`, `email`, `password`) VALUES
(1, 'Paul-Henry', 'ngpaulhenry@gmail.com', 'test'),
(2, 'Pavone', 'pavone@gmail.com', 'test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`id_student`,`id_subject`,`id_teacher`),
  ADD KEY `fk_id_subject` (`id_subject`),
  ADD KEY `fk_id_teacher` (`id_teacher`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id_student`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id_subject`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id_teacher`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id_admin` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id_student` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id_subject` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id_teacher` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `fk_id_student` FOREIGN KEY (`id_student`) REFERENCES `students` (`id_student`),
  ADD CONSTRAINT `fk_id_subject` FOREIGN KEY (`id_subject`) REFERENCES `subjects` (`id_subject`),
  ADD CONSTRAINT `fk_id_teacher` FOREIGN KEY (`id_teacher`) REFERENCES `teachers` (`id_teacher`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
