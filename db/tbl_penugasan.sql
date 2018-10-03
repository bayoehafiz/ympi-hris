-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 03, 2018 at 07:43 PM
-- Server version: 5.6.35
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ympi-hris`
--

--
-- Dumping data for table `tbl_penugasan`
--

INSERT INTO `tbl_penugasan` (`id`, `nama`, `active`, `created`, `updated`) VALUES
(1, 'Chief', 1, '2018-10-03 12:34:37', '2018-10-03 12:34:37'),
(2, 'Direktur', 1, '2018-10-03 12:35:43', '2018-10-03 12:35:43'),
(3, 'Foreman', 1, '2018-10-03 12:35:50', '2018-10-03 12:35:50'),
(4, 'General Manager', 1, '2018-10-03 12:35:58', '2018-10-03 12:35:58'),
(5, 'Leader', 1, '2018-10-03 12:36:06', '2018-10-03 12:36:06'),
(6, 'Manager', 1, '2018-10-03 12:36:12', '2018-10-03 12:36:12'),
(7, 'President Director', 0, '2018-10-03 12:36:20', '2018-10-03 12:36:43'),
(8, 'Senior Chief', 1, '2018-10-03 12:36:26', '2018-10-03 12:36:26'),
(9, 'Senior Foreman', 1, '2018-10-03 12:36:33', '2018-10-03 12:36:33'),
(10, 'Sub Leader', 1, '2018-10-03 12:36:39', '2018-10-03 12:36:39');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
