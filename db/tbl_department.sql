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
-- Dumping data for table `tbl_department`
--

INSERT INTO `tbl_department` (`id`, `nama`, `kode`, `parent`, `active`, `created`, `updated`) VALUES
(1, 'Secretary', 'SEC', 1, 1, '2018-10-03 07:37:25', '0000-00-00 00:00:00'),
(2, 'Accounting', 'ACC', 1, 1, '2018-10-03 07:37:37', '0000-00-00 00:00:00'),
(3, 'HRGA', 'HRG', 2, 1, '2018-10-03 07:37:55', '0000-00-00 00:00:00'),
(4, 'MIS', 'MIS', 4, 1, '2018-10-03 07:46:30', '0000-00-00 00:00:00'),
(5, 'Maintenance', 'MNT', 4, 1, '2018-10-03 07:46:45', '0000-00-00 00:00:00'),
(6, 'PE', 'PPE', 4, 1, '2018-10-03 07:47:28', '0000-00-00 00:00:00'),
(7, 'Logistics', 'LOG', 5, 1, '2018-10-03 07:47:46', '0000-00-00 00:00:00'),
(8, 'Production Control', 'PCO', 5, 1, '2018-10-03 07:48:07', '0000-00-00 00:00:00'),
(9, 'Purchasing', 'PUR', 5, 1, '2018-10-03 07:48:31', '0000-00-00 00:00:00'),
(10, 'Parts Process', 'WIP', 3, 1, '2018-10-03 07:49:13', '0000-00-00 00:00:00'),
(11, 'Japan Staf', 'JPS', 3, 1, '2018-10-03 07:49:32', '0000-00-00 00:00:00'),
(12, 'Welding-Surface Treatment', 'WST', 3, 1, '2018-10-03 07:49:53', '0000-00-00 00:00:00'),
(13, 'Assembling', 'WIA', 3, 1, '2018-10-03 07:50:12', '0000-00-00 00:00:00'),
(14, 'Educational INstrument', 'EDI', 3, 1, '2018-10-03 07:52:03', '0000-00-00 00:00:00'),
(15, 'Quality Assurance', 'QAS', 3, 1, '2018-10-03 07:52:20', '0000-00-00 00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
