-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 10, 2018 at 06:39 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `department`
--

TRUNCATE TABLE `department`;
--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `nama`, `kode`, `parent`, `active`, `created`, `updated`) VALUES
(1, 'Secretary', 'SEC', 1, 1, '2018-10-03 07:37:25', '2018-10-03 07:37:25'),
(2, 'Accounting', 'ACC', 1, 1, '2018-10-03 07:37:37', '2018-10-03 07:37:37'),
(3, 'HRGA', 'HRG', 2, 1, '2018-10-03 07:37:55', '2018-10-03 07:37:55'),
(4, 'MIS', 'MIS', 4, 1, '2018-10-03 07:46:30', '2018-10-03 07:46:30'),
(5, 'Maintenance', 'MNT', 4, 1, '2018-10-03 07:46:45', '2018-10-03 07:46:45'),
(6, 'PE', 'PPE', 4, 1, '2018-10-03 07:47:28', '2018-10-03 07:47:28'),
(7, 'Logistics', 'LOG', 5, 1, '2018-10-03 07:47:46', '2018-10-03 07:47:46'),
(8, 'Production Control', 'PCO', 5, 1, '2018-10-03 07:48:07', '2018-10-03 07:48:07'),
(9, 'Purchasing', 'PUR', 5, 1, '2018-10-03 07:48:31', '2018-10-03 07:48:31'),
(10, 'Parts Process', 'WIP', 3, 1, '2018-10-03 07:49:13', '2018-10-03 07:49:13'),
(11, 'Japan Staf', 'JPS', 3, 1, '2018-10-03 07:49:32', '2018-10-03 07:49:32'),
(12, 'Welding-Surface Treatment', 'WST', 3, 1, '2018-10-03 07:49:53', '2018-10-03 07:49:53'),
(13, 'Assembling', 'WIA', 3, 1, '2018-10-03 07:50:12', '2018-10-03 07:50:12'),
(14, 'Educational INstrument', 'EDI', 3, 1, '2018-10-03 07:52:03', '2018-10-03 07:52:03'),
(15, 'Quality Assurance', 'QAS', 3, 1, '2018-10-03 07:52:20', '2018-10-03 07:52:20'),
(16, 'Test Department', 'TDP', 29, 1, '2018-10-09 09:28:58', '2018-10-09 09:28:58');

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

DROP TABLE IF EXISTS `division`;
CREATE TABLE `division` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `division`
--

TRUNCATE TABLE `division`;
--
-- Dumping data for table `division`
--

INSERT INTO `division` (`id`, `nama`, `kode`, `active`, `created`, `updated`) VALUES
(1, 'Finance', 'FNC', 1, '2018-10-02 09:35:45', '2018-10-08 08:29:16'),
(2, 'HRGA', 'HRG', 1, '2018-10-02 09:47:47', '2018-10-08 08:29:17'),
(3, 'Production', 'PRD', 1, '2018-10-02 09:48:15', '2018-10-08 08:32:08'),
(4, 'Production Engineering', 'PEN', 1, '2018-10-02 09:48:41', '2018-10-02 09:48:41'),
(5, 'Production Support', 'PSU', 1, '2018-10-02 09:48:57', '2018-10-02 09:48:57'),
(6, 'President Director', 'PDR', 0, '2018-10-02 09:50:18', '2018-10-08 08:33:06'),
(29, 'Test Division', 'TDV', 1, '2018-10-09 09:27:59', '2018-10-09 09:28:41');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `nik` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `pin` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tgl_masuk` varchar(255) DEFAULT NULL,
  `jenis_kelamin` varchar(255) DEFAULT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tgl_lahir` varchar(255) DEFAULT NULL,
  `agama` varchar(255) DEFAULT NULL,
  `alamat_lengkap` varchar(255) DEFAULT NULL,
  `alamat_domisili` varchar(255) DEFAULT NULL,
  `status_keluarga` varchar(255) DEFAULT NULL,
  `pendidikan` varchar(255) DEFAULT NULL,
  `sekolah_universitas` varchar(255) DEFAULT NULL,
  `jurusan` varchar(255) DEFAULT NULL,
  `no_ktp` varchar(255) NOT NULL,
  `no_telepon` varchar(255) DEFAULT NULL,
  `no_bpjstk` varchar(255) DEFAULT NULL,
  `no_bpjskes` varchar(255) DEFAULT NULL,
  `no_npwp` varchar(255) DEFAULT NULL,
  `no_jp` varchar(255) DEFAULT NULL,
  `rekening` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT 'assets/img/avatars/avatar.jpg',
  `division` int(11) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `section` int(11) DEFAULT NULL,
  `sub_section` int(11) DEFAULT NULL,
  `group` int(11) DEFAULT NULL,
  `jabatan` int(11) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `penugasan` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `grade`
--

DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `grade`
--

TRUNCATE TABLE `grade`;
--
-- Dumping data for table `grade`
--

INSERT INTO `grade` (`id`, `nama`, `kode`, `active`, `created`, `updated`) VALUES
(1, 'Japan Staff', '-', 1, '2018-10-03 12:30:11', '2018-10-03 13:05:50'),
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

-- --------------------------------------------------------

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
CREATE TABLE `group` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `group`
--

TRUNCATE TABLE `group`;
--
-- Dumping data for table `group`
--

INSERT INTO `group` (`id`, `nama`, `parent`, `active`, `created`, `updated`) VALUES
(1, 'Accounting', 1, 1, '2018-10-03 09:30:54', '2018-10-03 09:31:00'),
(2, 'Assembly Process', 4, 1, '2018-10-03 09:32:01', '2018-10-03 09:32:01'),
(3, 'Case', 3, 1, '2018-10-03 09:32:10', '2018-10-03 09:32:10'),
(4, 'Edc. Inst.', 58, 1, '2018-10-03 09:32:21', '2018-10-03 09:32:21'),
(5, 'Maintenance', 58, 1, '2018-10-03 09:32:30', '2018-10-03 09:32:30'),
(6, 'B-Pro', 58, 1, '2018-10-03 09:32:38', '2018-10-03 09:32:38'),
(7, 'WST Process', 58, 1, '2018-10-03 09:34:23', '2018-10-03 09:34:23'),
(8, 'Security', 20, 1, '2018-10-03 09:35:16', '2018-10-03 09:35:16'),
(9, 'General Services', 20, 1, '2018-10-03 09:35:25', '2018-10-03 09:35:25'),
(10, 'GA', 20, 1, '2018-10-03 09:35:49', '2018-10-03 09:35:49'),
(11, 'Kantin', 20, 1, '2018-10-03 09:35:57', '2018-10-03 09:35:57'),
(12, 'Driver', 20, 1, '2018-10-03 09:36:06', '2018-10-03 09:36:06'),
(13, 'HR', 21, 1, '2018-10-03 09:36:41', '2018-10-03 09:36:41'),
(14, 'IR', 21, 1, '2018-10-03 09:36:54', '2018-10-03 09:36:54'),
(15, 'C & B', 21, 1, '2018-10-03 09:37:52', '2018-10-03 09:37:52'),
(16, 'T & D', 21, 1, '2018-10-03 09:38:00', '2018-10-03 09:38:00'),
(17, 'Japan Staf', 23, 1, '2018-10-03 09:38:10', '2018-10-03 09:38:10'),
(18, 'Reed plate', 62, 1, '2018-10-03 09:38:19', '2018-10-03 09:38:19'),
(19, 'Warehouse', 24, 1, '2018-10-03 09:38:28', '2018-10-03 09:38:28'),
(20, 'Logistic', 24, 1, '2018-10-03 09:38:37', '2018-10-03 09:38:37'),
(21, 'Leader', 25, 1, '2018-10-03 09:38:50', '2018-10-03 09:38:50'),
(22, 'WWT', 25, 1, '2018-10-03 09:38:59', '2018-10-03 09:38:59'),
(23, 'Mesin', 25, 1, '2018-10-03 09:39:07', '2018-10-03 09:39:07'),
(24, 'Utility', 25, 1, '2018-10-03 09:39:15', '2018-10-03 09:39:15'),
(25, 'MIS', 41, 1, '2018-10-03 09:40:01', '2018-10-03 09:40:01'),
(26, 'Mouthpiece', 53, 1, '2018-10-03 09:40:13', '2018-10-03 09:40:13'),
(27, 'Molding Maintenance', 43, 1, '2018-10-03 09:40:22', '2018-10-03 09:40:22'),
(28, 'PE', 43, 1, '2018-10-03 09:40:31', '2018-10-03 09:40:31'),
(29, 'Workshop', 43, 1, '2018-10-03 09:40:38', '2018-10-03 09:40:38'),
(30, 'Pianica', 45, 1, '2018-10-03 09:40:52', '2018-10-03 09:40:52'),
(31, 'Pianica Reed Plate', 47, 1, '2018-10-03 09:41:03', '2018-10-03 09:41:03'),
(32, 'EI Control', 42, 1, '2018-10-03 09:41:13', '2018-10-03 09:41:13'),
(33, 'PP Control', 42, 1, '2018-10-03 09:41:27', '2018-10-03 09:41:27'),
(34, 'Production Control', 48, 1, '2018-10-03 09:41:42', '2018-10-03 09:41:42'),
(36, 'Purchasing', 49, 1, '2018-10-03 09:42:56', '2018-10-03 09:42:56'),
(37, 'PCR', 50, 1, '2018-10-03 09:43:08', '2018-10-03 09:43:08'),
(38, 'Inputor', 50, 1, '2018-10-03 09:43:18', '2018-10-03 09:43:18'),
(39, 'Chm', 50, 1, '2018-10-03 09:43:28', '2018-10-03 09:43:28'),
(41, 'IQC', 50, 1, '2018-10-03 09:47:21', '2018-10-03 09:47:21'),
(43, 'Chemical', 50, 1, '2018-10-03 09:48:09', '2018-10-03 09:48:09'),
(44, 'Quality Assurance', 50, 1, '2018-10-03 09:48:30', '2018-10-03 09:48:30'),
(45, 'Recorder', 51, 1, '2018-10-03 09:48:44', '2018-10-03 09:48:44'),
(46, 'All', 26, 1, '2018-10-03 09:48:53', '2018-10-03 09:48:53'),
(47, 'CL', 79, 1, '2018-10-03 09:49:13', '2018-10-03 09:49:13'),
(48, 'Sax Tenor', 78, 1, '2018-10-03 09:49:28', '2018-10-03 09:49:28'),
(49, 'Sekretariat', 56, 1, '2018-10-03 09:49:39', '2018-10-03 09:49:39'),
(50, 'Interpreter', 56, 1, '2018-10-03 09:49:53', '2018-10-03 09:49:53'),
(51, 'Standardization', 57, 0, '2018-10-03 09:50:01', '2018-10-04 03:42:14'),
(52, 'Flute', 11, 1, '2018-10-03 09:50:09', '2018-10-03 09:50:09'),
(53, 'Surface Treatment Process', 63, 1, '2018-10-03 09:50:34', '2018-10-03 09:50:34'),
(54, 'Sax', 5, 1, '2018-10-03 09:50:43', '2018-10-03 09:50:43'),
(55, 'Venova', 55, 1, '2018-10-03 09:50:56', '2018-10-03 09:50:56'),
(56, 'WST - Office', 66, 1, '2018-10-03 09:52:13', '2018-10-03 09:52:13'),
(57, 'WSTA Office', 6, 1, '2018-10-03 09:52:32', '2018-10-03 09:52:32'),
(58, 'sajod;sada', 28, 1, '2018-10-03 18:34:31', '2018-10-03 18:34:31');

-- --------------------------------------------------------

--
-- Table structure for table `group_shift`
--

DROP TABLE IF EXISTS `group_shift`;
CREATE TABLE `group_shift` (
  `id` int(11) NOT NULL,
  `id_employee` int(11) DEFAULT NULL,
  `id_shift` int(11) DEFAULT NULL,
  `tanggal` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `group_shift`
--

TRUNCATE TABLE `group_shift`;
-- --------------------------------------------------------

--
-- Table structure for table `jabatan`
--

DROP TABLE IF EXISTS `jabatan`;
CREATE TABLE `jabatan` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `jabatan`
--

TRUNCATE TABLE `jabatan`;
--
-- Dumping data for table `jabatan`
--

INSERT INTO `jabatan` (`id`, `nama`, `active`, `created`, `updated`) VALUES
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
(15, 'Operator', 1, '2018-10-03 12:25:59', '2018-10-03 13:05:34'),
(16, 'President Director', 1, '2018-10-03 12:26:24', '2018-10-03 13:05:39'),
(17, 'Senior Chief', 1, '2018-10-03 12:26:31', '2018-10-03 12:27:23'),
(18, 'Senior Coordinator', 1, '2018-10-03 12:26:38', '2018-10-03 12:26:38'),
(19, 'Senior Foreman', 1, '2018-10-03 12:26:45', '2018-10-03 12:26:45'),
(20, 'Senior Staff', 1, '2018-10-03 12:26:53', '2018-10-03 12:26:53'),
(21, 'Staff', 1, '2018-10-03 12:27:00', '2018-10-03 12:27:00'),
(22, 'Sub Leader', 1, '2018-10-03 12:27:07', '2018-10-03 12:27:07');

-- --------------------------------------------------------

--
-- Table structure for table `penugasan`
--

DROP TABLE IF EXISTS `penugasan`;
CREATE TABLE `penugasan` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `penugasan`
--

TRUNCATE TABLE `penugasan`;
--
-- Dumping data for table `penugasan`
--

INSERT INTO `penugasan` (`id`, `nama`, `active`, `created`, `updated`) VALUES
(1, 'Chief', 1, '2018-10-03 12:34:37', '2018-10-03 12:34:37'),
(2, 'Direktur', 1, '2018-10-03 12:35:43', '2018-10-03 12:35:43'),
(3, 'Foreman', 1, '2018-10-03 12:35:50', '2018-10-03 12:35:50'),
(4, 'General Manager', 1, '2018-10-03 12:35:58', '2018-10-03 12:35:58'),
(5, 'Leader', 1, '2018-10-03 12:36:06', '2018-10-03 12:36:06'),
(6, 'Manager', 1, '2018-10-03 12:36:12', '2018-10-03 12:36:12'),
(7, 'President Director', 1, '2018-10-03 12:36:20', '2018-10-03 13:05:54'),
(8, 'Senior Chief', 1, '2018-10-03 12:36:26', '2018-10-03 12:36:26'),
(9, 'Senior Foreman', 1, '2018-10-03 12:36:33', '2018-10-03 12:36:33'),
(10, 'Sub Leader', 1, '2018-10-03 12:36:39', '2018-10-03 12:36:39');

-- --------------------------------------------------------

--
-- Table structure for table `presensi`
--

DROP TABLE IF EXISTS `presensi`;
CREATE TABLE `presensi` (
  `id` int(11) NOT NULL,
  `tanggal` varchar(255) DEFAULT NULL,
  `jenis_absen` varchar(255) DEFAULT NULL,
  `id_employee` int(11) DEFAULT NULL,
  `id_shift` int(11) DEFAULT NULL,
  `jam_masuk` varchar(255) DEFAULT NULL,
  `jam_keluar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `presensi`
--

TRUNCATE TABLE `presensi`;
-- --------------------------------------------------------

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
CREATE TABLE `section` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `section`
--

TRUNCATE TABLE `section`;
--
-- Dumping data for table `section`
--

INSERT INTO `section` (`id`, `nama`, `kode`, `parent`, `active`, `created`, `updated`) VALUES
(2, 'Accounting', 'ACC', 2, 1, '2018-10-03 07:59:15', '2018-10-03 07:59:15'),
(3, 'Assembly Process', 'ASP', 13, 1, '2018-10-03 08:05:25', '2018-10-03 08:05:25'),
(4, 'Educational Instrument', 'EDI', 14, 1, '2018-10-03 08:06:11', '2018-10-03 08:06:11'),
(5, 'Pianica Reed Plate', 'PRP', 14, 1, '2018-10-03 08:06:29', '2018-10-03 08:06:29'),
(6, 'Pianica', 'PNC', 14, 1, '2018-10-03 08:06:49', '2018-10-03 08:06:49'),
(7, 'Recorder', 'REC', 14, 1, '2018-10-03 08:07:05', '2018-10-03 08:07:05'),
(8, 'HR', 'HRE', 3, 1, '2018-10-03 08:07:33', '2018-10-03 08:07:33'),
(9, 'HRGA', 'HRG', 3, 1, '2018-10-03 08:07:49', '2018-10-03 08:07:49'),
(10, 'GA', 'GAF', 3, 1, '2018-10-03 08:07:57', '2018-10-03 08:07:57'),
(11, 'Japan Staf', 'JPS', 11, 1, '2018-10-03 08:08:32', '2018-10-03 08:08:32'),
(12, 'Logistic', 'LOG', 7, 1, '2018-10-03 08:08:45', '2018-10-03 08:08:45'),
(13, 'Maintenance', 'MNT', 5, 1, '2018-10-03 08:09:05', '2018-10-03 08:09:05'),
(14, 'MIS', 'MIS', 4, 1, '2018-10-03 08:09:32', '2018-10-03 08:09:32'),
(15, 'Material Process', 'MPR', 10, 1, '2018-10-03 08:09:52', '2018-10-03 08:09:52'),
(16, 'Body Process', 'BPR', 10, 1, '2018-10-03 08:10:12', '2018-10-03 08:10:12'),
(17, 'Parts Process', 'PPR', 10, 1, '2018-10-03 08:10:29', '2018-10-03 08:10:29'),
(18, 'PE', 'PPE', 6, 1, '2018-10-03 08:11:05', '2018-10-03 08:11:05'),
(19, 'Production Control', 'PRC', 8, 1, '2018-10-03 08:11:28', '2018-10-03 08:11:28'),
(20, 'Purchasing', 'PUR', 9, 1, '2018-10-03 08:11:40', '2018-10-04 03:45:27'),
(21, 'Standardization', 'STA', 15, 1, '2018-10-03 08:12:30', '2018-10-03 08:12:30'),
(22, 'Chemical', 'CHE', 15, 1, '2018-10-03 08:12:44', '2018-10-03 08:12:44'),
(23, 'Quality Assurance', 'QAS', 15, 1, '2018-10-03 08:13:01', '2018-10-03 08:13:01'),
(24, 'Special Job', 'SPJ', 1, 1, '2018-10-03 08:13:22', '2018-10-03 08:13:22'),
(25, 'Welding Process', 'WPR', 12, 1, '2018-10-03 08:14:22', '2018-10-03 08:14:22'),
(26, 'Welding-Surface Treatment', 'WST', 12, 1, '2018-10-03 08:14:39', '2018-10-03 08:14:39'),
(27, 'Surface Treatment', 'SUT', 12, 1, '2018-10-03 08:14:57', '2018-10-04 03:45:30');

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
CREATE TABLE `shift` (
  `id` int(11) NOT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `hari_efektif` varchar(255) DEFAULT NULL,
  `jam_masuk` varchar(255) DEFAULT NULL,
  `jam_keluar` varchar(255) DEFAULT NULL,
  `awal_scan_masuk` varchar(255) DEFAULT NULL,
  `akhir_scan_masuk` varchar(255) DEFAULT NULL,
  `awal_scan_keluar` varchar(255) DEFAULT NULL,
  `akhir_scan_keluar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `shift`
--

TRUNCATE TABLE `shift`;
--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`id`, `kode`, `nama`, `hari_efektif`, `jam_masuk`, `jam_keluar`, `awal_scan_masuk`, `akhir_scan_masuk`, `awal_scan_keluar`, `akhir_scan_keluar`) VALUES
(1, NULL, 'hjfkdshjkfdshjkfds', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sub_section`
--

DROP TABLE IF EXISTS `sub_section`;
CREATE TABLE `sub_section` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncate table before insert `sub_section`
--

TRUNCATE TABLE `sub_section`;
--
-- Dumping data for table `sub_section`
--

INSERT INTO `sub_section` (`id`, `nama`, `parent`, `active`, `created`, `updated`) VALUES
(1, 'Accounting', 2, 1, '2018-10-03 08:17:39', '2018-10-03 08:17:39'),
(2, 'Assy', 3, 1, '2018-10-03 08:19:17', '2018-10-03 08:19:17'),
(3, 'Case', 3, 1, '2018-10-03 08:32:17', '2018-10-03 08:32:17'),
(4, 'Assembly Process', 3, 1, '2018-10-03 08:32:27', '2018-10-03 08:32:27'),
(5, 'Tanpo', 3, 1, '2018-10-03 08:32:41', '2018-10-03 08:32:41'),
(6, 'WSTA', 3, 1, '2018-10-03 08:46:05', '2018-10-03 08:46:05'),
(11, 'Sub Assy', 3, 1, '2018-10-03 09:01:45', '2018-10-03 09:01:45'),
(12, 'CL BODY', 3, 1, '2018-10-03 09:02:03', '2018-10-03 09:02:03'),
(13, 'Assy KD', 3, 1, '2018-10-03 09:02:13', '2018-10-03 09:02:13'),
(14, 'AS BODY', 16, 1, '2018-10-03 09:02:33', '2018-10-03 09:02:33'),
(15, 'AS BELL', 16, 1, '2018-10-03 09:02:54', '2018-10-03 09:02:54'),
(16, 'FL BODY - FOOT', 16, 1, '2018-10-03 09:04:28', '2018-10-03 09:04:28'),
(17, 'FL HEAD JOINT', 16, 1, '2018-10-03 09:04:38', '2018-10-03 09:04:38'),
(18, 'AS/TS NECK', 16, 1, '2018-10-03 09:04:48', '2018-10-03 09:04:48'),
(19, 'AS BOW', 16, 1, '2018-10-03 09:04:57', '2018-10-03 09:04:57'),
(20, 'GA', 10, 1, '2018-10-03 09:05:07', '2018-10-03 09:05:07'),
(21, 'HR', 8, 1, '2018-10-03 09:05:16', '2018-10-03 09:05:16'),
(22, 'HRGA', 9, 1, '2018-10-03 09:05:28', '2018-10-03 09:05:28'),
(23, 'Japan Staf', 11, 1, '2018-10-03 09:05:52', '2018-10-03 09:05:52'),
(24, 'Logistic', 12, 1, '2018-10-03 09:06:01', '2018-10-03 09:06:01'),
(25, 'Maintenance', 13, 1, '2018-10-03 09:06:10', '2018-10-03 09:06:10'),
(26, 'Senban', 15, 1, '2018-10-03 09:06:23', '2018-10-03 09:06:23'),
(27, 'FL KEYPOST PLATE', 15, 1, '2018-10-03 09:06:32', '2018-10-03 09:06:32'),
(28, 'AS KEYPOST', 15, 1, '2018-10-03 09:06:41', '2018-10-03 09:06:41'),
(29, 'Service', 15, 1, '2018-10-03 09:06:49', '2018-10-03 09:06:49'),
(30, 'Mizushumashi', 15, 1, '2018-10-03 09:07:00', '2018-10-03 09:07:00'),
(31, 'Press', 15, 1, '2018-10-03 09:07:26', '2018-10-03 09:07:26'),
(32, 'CL KEYPOST', 15, 1, '2018-10-03 09:07:38', '2018-10-03 09:07:38'),
(33, 'Lotting', 15, 1, '2018-10-03 09:07:50', '2018-10-03 09:07:50'),
(34, 'SND T-PRO', 15, 1, '2018-10-03 09:08:02', '2018-10-03 09:08:02'),
(35, 'Washing', 15, 1, '2018-10-03 09:08:10', '2018-10-03 09:08:10'),
(36, 'Nukisasi', 15, 1, '2018-10-03 09:08:20', '2018-10-03 09:08:20'),
(37, 'CL KEYPOST PLATE', 15, 1, '2018-10-03 09:08:29', '2018-10-03 09:08:29'),
(38, 'Machining', 15, 1, '2018-10-03 09:08:38', '2018-10-03 09:08:38'),
(39, 'FL KEYPOST', 15, 1, '2018-10-03 09:08:48', '2018-10-03 09:08:48'),
(40, 'Inputor', 15, 1, '2018-10-03 09:08:58', '2018-10-03 09:08:58'),
(41, 'MIS', 14, 1, '2018-10-03 09:09:06', '2018-10-03 09:09:06'),
(42, 'PPEI', 17, 1, '2018-10-03 09:09:22', '2018-10-03 09:09:22'),
(43, 'PE', 18, 1, '2018-10-03 09:10:03', '2018-10-03 09:10:03'),
(44, 'Material Control', 6, 1, '2018-10-03 09:10:18', '2018-10-03 09:10:18'),
(45, 'Pianica Initial', 6, 1, '2018-10-03 09:10:31', '2018-10-03 09:10:31'),
(46, 'Pianica Final', 6, 1, '2018-10-03 09:10:45', '2018-10-03 09:10:45'),
(47, 'Pianica Reed Plate', 5, 1, '2018-10-03 09:10:57', '2018-10-03 09:10:57'),
(48, 'Production Control', 19, 1, '2018-10-03 09:11:07', '2018-10-03 09:11:07'),
(49, 'Purchasing', 20, 1, '2018-10-03 09:11:18', '2018-10-03 09:11:18'),
(50, 'Quality Assurance', 23, 1, '2018-10-03 09:11:28', '2018-10-03 09:11:28'),
(51, 'Recorder Assy', 7, 1, '2018-10-03 09:12:58', '2018-10-03 09:12:58'),
(52, 'Recorder Injection', 7, 1, '2018-10-03 09:13:08', '2018-10-03 09:13:08'),
(53, 'MP Project', 7, 1, '2018-10-03 09:13:17', '2018-10-03 09:13:17'),
(54, 'Venova Injection', 7, 1, '2018-10-03 09:13:27', '2018-10-03 09:13:27'),
(55, 'Venova Assy', 7, 1, '2018-10-03 09:13:38', '2018-10-03 09:13:38'),
(56, 'Special Job', 24, 1, '2018-10-03 09:13:49', '2018-10-03 09:13:49'),
(57, 'Standardization', 21, 1, '2018-10-03 09:13:59', '2018-10-03 09:13:59'),
(58, 'Foreman', 27, 1, '2018-10-03 09:14:08', '2018-10-03 09:14:08'),
(59, 'Buffing Body', 27, 1, '2018-10-03 09:14:19', '2018-10-03 09:14:19'),
(60, 'Plating body', 27, 1, '2018-10-03 09:14:28', '2018-10-03 09:14:28'),
(61, 'Tumbling', 27, 1, '2018-10-03 09:14:37', '2018-10-03 09:14:37'),
(62, 'LCQ Body', 27, 1, '2018-10-03 09:14:45', '2018-10-03 09:14:45'),
(63, 'Surface Treatment', 27, 1, '2018-10-03 09:14:59', '2018-10-03 09:14:59'),
(64, 'LCQ', 27, 1, '2018-10-03 09:15:08', '2018-10-03 09:15:08'),
(65, 'Plating', 27, 1, '2018-10-03 09:15:17', '2018-10-03 09:15:17'),
(66, 'WST - Office', 27, 1, '2018-10-03 09:15:26', '2018-10-03 09:15:26'),
(68, 'SOLDER FL KEYPOST', 25, 1, '2018-10-03 09:16:18', '2018-10-03 09:16:18'),
(69, 'Solder-other', 25, 1, '2018-10-03 09:16:27', '2018-10-03 09:16:27'),
(70, 'HTS AS BODY', 25, 1, '2018-10-03 09:16:37', '2018-10-03 09:16:37'),
(71, 'HTS FL BODY', 25, 1, '2018-10-03 09:16:46', '2018-10-03 09:16:46'),
(72, 'Solder-other ( Mizusumashi )', 25, 1, '2018-10-03 09:16:58', '2018-10-03 09:16:58'),
(73, 'SOLDER CL KEYPOST', 25, 1, '2018-10-03 09:17:39', '2018-10-03 09:17:39'),
(74, 'SOLDER AS KEY', 25, 1, '2018-10-03 09:17:47', '2018-10-03 09:17:47'),
(75, 'HTS TS BODY', 25, 1, '2018-10-03 09:18:05', '2018-10-03 09:18:05'),
(76, 'SOLDER AS KEYPOST', 25, 1, '2018-10-03 09:18:13', '2018-10-03 09:18:13'),
(77, 'SND FL', 25, 1, '2018-10-03 09:18:22', '2018-10-03 09:18:22'),
(78, 'SOLDER TS KEY', 25, 1, '2018-10-03 09:18:31', '2018-10-03 09:18:31'),
(79, 'SOLDER CL KEY', 25, 1, '2018-10-03 09:18:40', '2018-10-03 09:18:40'),
(80, 'SND SAX', 25, 1, '2018-10-03 09:18:50', '2018-10-03 09:18:50'),
(81, 'SOLDER FL KEY', 25, 1, '2018-10-03 09:18:59', '2018-10-03 09:18:59'),
(82, 'Buffing', 25, 1, '2018-10-03 09:19:07', '2018-10-03 09:19:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_idxfk` (`parent`);

--
-- Indexes for table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_division_idxfk` (`division`),
  ADD KEY `id_department_idxfk` (`department`),
  ADD KEY `id_section_idxfk` (`section`),
  ADD KEY `id_sub_section_idxfk` (`sub_section`),
  ADD KEY `id_group_idxfk` (`group`),
  ADD KEY `id_jabatan_idxfk` (`jabatan`),
  ADD KEY `id_grade_idxfk` (`grade`),
  ADD KEY `id_penugasan_idxfk` (`penugasan`);

--
-- Indexes for table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_idxfk_3` (`parent`);

--
-- Indexes for table `group_shift`
--
ALTER TABLE `group_shift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jabatan`
--
ALTER TABLE `jabatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penugasan`
--
ALTER TABLE `penugasan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `presensi`
--
ALTER TABLE `presensi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_idxfk_1` (`parent`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_section`
--
ALTER TABLE `sub_section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_idxfk_2` (`parent`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `division`
--
ALTER TABLE `division`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `grade`
--
ALTER TABLE `grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `group`
--
ALTER TABLE `group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `group_shift`
--
ALTER TABLE `group_shift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `jabatan`
--
ALTER TABLE `jabatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `penugasan`
--
ALTER TABLE `penugasan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `presensi`
--
ALTER TABLE `presensi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `sub_section`
--
ALTER TABLE `sub_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `division` (`id`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`division`) REFERENCES `division` (`id`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`department`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`section`) REFERENCES `section` (`id`),
  ADD CONSTRAINT `employee_ibfk_4` FOREIGN KEY (`sub_section`) REFERENCES `sub_section` (`id`),
  ADD CONSTRAINT `employee_ibfk_5` FOREIGN KEY (`group`) REFERENCES `group` (`id`),
  ADD CONSTRAINT `employee_ibfk_6` FOREIGN KEY (`jabatan`) REFERENCES `jabatan` (`id`),
  ADD CONSTRAINT `employee_ibfk_7` FOREIGN KEY (`grade`) REFERENCES `grade` (`id`),
  ADD CONSTRAINT `employee_ibfk_8` FOREIGN KEY (`penugasan`) REFERENCES `penugasan` (`id`);

--
-- Constraints for table `group`
--
ALTER TABLE `group`
  ADD CONSTRAINT `group_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `sub_section` (`id`);

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `department` (`id`);

--
-- Constraints for table `sub_section`
--
ALTER TABLE `sub_section`
  ADD CONSTRAINT `sub_section_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `section` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
