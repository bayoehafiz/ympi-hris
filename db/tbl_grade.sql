-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 03, 2018 at 07:42 PM
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
-- Dumping data for table `tbl_grade`
--

INSERT INTO `tbl_grade` (`id`, `nama`, `kode`, `active`, `created`, `updated`) VALUES
(1, 'Japan Staff', '-', 0, '2018-10-03 12:30:11', '2018-10-03 12:33:40'),
(2, 'Expert', 'D3', 1, '2018-10-03 12:30:25', '2018-10-03 12:30:25'),
(3, 'OP Contract', 'E0', 1, '2018-10-03 12:30:38', '2018-10-03 12:30:38'),
(4, 'Junior Operator', 'E1', 1, '2018-10-03 12:30:48', '2018-10-03 12:30:48'),
(5, 'Junior Operator', 'E2', 1, '2018-10-03 12:30:58', '2018-10-03 12:30:58'),
(6, 'Junior Operator', 'E3', 1, '2018-10-03 12:31:09', '2018-10-03 12:31:09'),
(7, 'Junior Operator', 'E4', 1, '2018-10-03 12:31:13', '2018-10-03 12:31:13'),
(8, 'Operator', 'E5', 1, '2018-10-03 12:31:23', '2018-10-03 12:31:23'),
(9, 'Operator', 'E6', 1, '2018-10-03 12:31:32', '2018-10-03 12:31:32'),
(10, 'Senior Staff', 'E7', 1, '2018-10-03 12:31:41', '2018-10-03 12:31:41'),
(11, 'Senior Staff', 'E8', 1, '2018-10-03 12:31:47', '2018-10-03 12:31:47'),
(12, 'Coordinator', 'L1', 1, '2018-10-03 12:32:26', '2018-10-03 12:32:26'),
(13, 'Coordinator', 'L2', 1, '2018-10-03 12:32:30', '2018-10-03 12:32:30'),
(14, 'Senior Coordinator', 'L3', 1, '2018-10-03 12:32:42', '2018-10-03 12:32:42'),
(15, 'Senior Coordinator', 'L4', 1, '2018-10-03 12:32:46', '2018-10-03 12:32:46'),
(16, 'Junior Specialist', 'M1', 1, '2018-10-03 12:32:59', '2018-10-03 12:32:59'),
(17, 'Junior Specialist', 'M2', 1, '2018-10-03 12:33:07', '2018-10-03 12:33:07'),
(18, 'Junior Specialist', 'M3', 1, '2018-10-03 12:33:11', '2018-10-03 12:33:11'),
(19, 'Specialist', 'M4', 1, '2018-10-03 12:33:21', '2018-10-03 12:33:21');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
