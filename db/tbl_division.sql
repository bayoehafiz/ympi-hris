-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 03, 2018 at 04:57 PM
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
-- Dumping data for table `tbl_division`
--

INSERT INTO `tbl_division` (`id`, `nama`, `kode`, `active`, `created`, `updated`) VALUES
(1, 'Finance', 'FNC', 1, '2018-10-02 09:35:45', '2018-10-03 05:21:51'),
(2, 'HRGA', 'HRG', 1, '2018-10-02 09:47:47', '0000-00-00 00:00:00'),
(3, 'Production', 'PRD', 1, '2018-10-02 09:48:15', '0000-00-00 00:00:00'),
(4, 'Production Engineering', 'PEN', 1, '2018-10-02 09:48:41', '0000-00-00 00:00:00'),
(5, 'Production Support', 'PSU', 1, '2018-10-02 09:48:57', '0000-00-00 00:00:00'),
(6, 'President Director', 'PDR', 1, '2018-10-02 09:50:18', '0000-00-00 00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
