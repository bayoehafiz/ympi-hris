-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 03, 2018 at 07:40 PM
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
-- Dumping data for table `tbl_jabatan`
--

INSERT INTO `tbl_jabatan` (`id`, `nama`, `active`, `created`, `updated`) VALUES
(4, 'Chief', 1, '2018-10-03 12:24:13', '2018-10-03 12:24:13'),
(5, 'Coordinator', 1, '2018-10-03 12:24:32', '2018-10-03 12:24:32'),
(6, 'Direktur', 1, '2018-10-03 12:24:40', '2018-10-03 12:24:40'),
(7, 'Foreman', 1, '2018-10-03 12:24:46', '2018-10-03 12:24:46'),
(8, 'General Manager', 1, '2018-10-03 12:24:54', '2018-10-03 12:24:54'),
(9, 'Junior Operator', 1, '2018-10-03 12:25:02', '2018-10-03 12:25:02'),
(10, 'Junior Specialist', 1, '2018-10-03 12:25:18', '2018-10-03 12:25:18'),
(11, 'Junior Staff', 1, '2018-10-03 12:25:27', '2018-10-03 12:25:27'),
(12, 'Leader', 1, '2018-10-03 12:25:34', '2018-10-03 12:25:34'),
(13, 'Manager', 1, '2018-10-03 12:25:42', '2018-10-03 12:25:42'),
(14, 'OP Contract', 1, '2018-10-03 12:25:51', '2018-10-03 12:25:51'),
(15, 'Operator', 0, '2018-10-03 12:25:59', '2018-10-03 12:28:50'),
(16, 'President Director', 0, '2018-10-03 12:26:24', '2018-10-03 12:28:53'),
(17, 'Senior Chief', 1, '2018-10-03 12:26:31', '2018-10-03 12:27:23'),
(18, 'Senior Coordinator', 1, '2018-10-03 12:26:38', '2018-10-03 12:26:38'),
(19, 'Senior Foreman', 1, '2018-10-03 12:26:45', '2018-10-03 12:26:45'),
(20, 'Senior Staff', 1, '2018-10-03 12:26:53', '2018-10-03 12:26:53'),
(21, 'Staff', 1, '2018-10-03 12:27:00', '2018-10-03 12:27:00'),
(22, 'Sub Leader', 1, '2018-10-03 12:27:07', '2018-10-03 12:27:07');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
