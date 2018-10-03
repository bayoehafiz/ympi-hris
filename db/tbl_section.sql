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
-- Dumping data for table `tbl_section`
--

INSERT INTO `tbl_section` (`id`, `nama`, `kode`, `parent`, `active`, `created`, `updated`) VALUES
(2, 'Accounting', 'ACC', 2, 1, '2018-10-03 07:59:15', '0000-00-00 00:00:00'),
(3, 'Assembly Process', 'ASP', 13, 1, '2018-10-03 08:05:25', '0000-00-00 00:00:00'),
(4, 'Educational Instrument', 'EDI', 14, 1, '2018-10-03 08:06:11', '0000-00-00 00:00:00'),
(5, 'Pianica Reed Plate', 'PRP', 14, 1, '2018-10-03 08:06:29', '0000-00-00 00:00:00'),
(6, 'Pianica', 'PNC', 14, 1, '2018-10-03 08:06:49', '0000-00-00 00:00:00'),
(7, 'Recorder', 'REC', 14, 1, '2018-10-03 08:07:05', '0000-00-00 00:00:00'),
(8, 'HR', 'HRE', 3, 1, '2018-10-03 08:07:33', '0000-00-00 00:00:00'),
(9, 'HRGA', 'HRG', 3, 1, '2018-10-03 08:07:49', '0000-00-00 00:00:00'),
(10, 'GA', 'GAF', 3, 1, '2018-10-03 08:07:57', '0000-00-00 00:00:00'),
(11, 'Japan Staf', 'JPS', 11, 1, '2018-10-03 08:08:32', '0000-00-00 00:00:00'),
(12, 'Logistic', 'LOG', 7, 1, '2018-10-03 08:08:45', '0000-00-00 00:00:00'),
(13, 'Maintenance', 'MNT', 5, 1, '2018-10-03 08:09:05', '0000-00-00 00:00:00'),
(14, 'MIS', 'MIS', 4, 1, '2018-10-03 08:09:32', '0000-00-00 00:00:00'),
(15, 'Material Process', 'MPR', 10, 1, '2018-10-03 08:09:52', '0000-00-00 00:00:00'),
(16, 'Body Process', 'BPR', 10, 1, '2018-10-03 08:10:12', '0000-00-00 00:00:00'),
(17, 'Parts Process', 'PPR', 10, 1, '2018-10-03 08:10:29', '0000-00-00 00:00:00'),
(18, 'PE', 'PPE', 6, 1, '2018-10-03 08:11:05', '0000-00-00 00:00:00'),
(19, 'Production Control', 'PRC', 8, 1, '2018-10-03 08:11:28', '0000-00-00 00:00:00'),
(20, 'Purchasing', 'PUR', 9, 1, '2018-10-03 08:11:40', '0000-00-00 00:00:00'),
(21, 'Standardization', 'STA', 15, 1, '2018-10-03 08:12:30', '0000-00-00 00:00:00'),
(22, 'Chemical', 'CHE', 15, 1, '2018-10-03 08:12:44', '0000-00-00 00:00:00'),
(23, 'Quality Assurance', 'QAS', 15, 1, '2018-10-03 08:13:01', '0000-00-00 00:00:00'),
(24, 'Special Job', 'SPJ', 1, 1, '2018-10-03 08:13:22', '0000-00-00 00:00:00'),
(25, 'Welding Process', 'WPR', 12, 1, '2018-10-03 08:14:22', '0000-00-00 00:00:00'),
(26, 'Welding-Surface Treatment', 'WST', 12, 1, '2018-10-03 08:14:39', '0000-00-00 00:00:00'),
(27, 'Surface Treatment', 'SUT', 12, 1, '2018-10-03 08:14:57', '0000-00-00 00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
