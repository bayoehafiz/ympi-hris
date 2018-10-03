-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 03, 2018 at 08:01 PM
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
-- Table structure for table `tbl_department`
--

DROP TABLE IF EXISTS `tbl_department`;
CREATE TABLE `tbl_department` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_division`
--

DROP TABLE IF EXISTS `tbl_division`;
CREATE TABLE `tbl_division` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employee`
--

DROP TABLE IF EXISTS `tbl_employee`;
CREATE TABLE `tbl_employee` (
  `id` int(11) NOT NULL,
  `nik` varchar(255) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `ktp` varchar(255) NOT NULL,
  `tgl_masuk` date DEFAULT NULL,
  `jenis_kelamin` set('L','P') DEFAULT NULL,
  `tempat_lahir` varchar(255) DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `rt_rw` varchar(255) DEFAULT NULL,
  `kelurahan` varchar(255) DEFAULT NULL,
  `kecamatan` varchar(255) DEFAULT NULL,
  `kota` varchar(255) DEFAULT NULL,
  `alamat_domisili` varchar(255) DEFAULT NULL,
  `rt_rw_domisili` varchar(255) DEFAULT NULL,
  `kelurahan_domisili` varchar(255) DEFAULT NULL,
  `kecamatan_domisili` varchar(255) DEFAULT NULL,
  `kota_domisili` varchar(255) DEFAULT NULL,
  `sekolah_universitas` varchar(255) DEFAULT NULL,
  `jurusan` varchar(255) DEFAULT NULL,
  `rekening` varchar(255) DEFAULT NULL,
  `no_bpjstk` varchar(255) DEFAULT NULL,
  `no_bpjskes` varchar(255) DEFAULT NULL,
  `npwp` varchar(255) DEFAULT NULL,
  `no_jp` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT 'assets/img/avatars/avatar13.jpg',
  `id_division` int(11) DEFAULT NULL,
  `id_department` int(11) DEFAULT NULL,
  `id_section` int(11) DEFAULT NULL,
  `id_sub_section` int(11) DEFAULT NULL,
  `id_group` int(11) DEFAULT NULL,
  `id_jabatan` int(11) DEFAULT NULL,
  `id_grade` int(11) DEFAULT NULL,
  `id_penugasan` int(11) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_grade`
--

DROP TABLE IF EXISTS `tbl_grade`;
CREATE TABLE `tbl_grade` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_group`
--

DROP TABLE IF EXISTS `tbl_group`;
CREATE TABLE `tbl_group` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_jabatan`
--

DROP TABLE IF EXISTS `tbl_jabatan`;
CREATE TABLE `tbl_jabatan` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_penugasan`
--

DROP TABLE IF EXISTS `tbl_penugasan`;
CREATE TABLE `tbl_penugasan` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_section`
--

DROP TABLE IF EXISTS `tbl_section`;
CREATE TABLE `tbl_section` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sub_section`
--

DROP TABLE IF EXISTS `tbl_sub_section`;
CREATE TABLE `tbl_sub_section` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_department`
--
ALTER TABLE `tbl_department`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_idxfk` (`parent`);

--
-- Indexes for table `tbl_division`
--
ALTER TABLE `tbl_division`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_division_idxfk` (`id_division`),
  ADD KEY `id_department_idxfk` (`id_department`),
  ADD KEY `id_section_idxfk` (`id_section`),
  ADD KEY `id_sub_section_idxfk` (`id_sub_section`),
  ADD KEY `id_group_idxfk` (`id_group`),
  ADD KEY `id_jabatan_idxfk` (`id_jabatan`),
  ADD KEY `id_grade_idxfk` (`id_grade`),
  ADD KEY `id_penugasan_idxfk` (`id_penugasan`);

--
-- Indexes for table `tbl_grade`
--
ALTER TABLE `tbl_grade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_group`
--
ALTER TABLE `tbl_group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_idxfk_3` (`parent`);

--
-- Indexes for table `tbl_jabatan`
--
ALTER TABLE `tbl_jabatan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_penugasan`
--
ALTER TABLE `tbl_penugasan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_section`
--
ALTER TABLE `tbl_section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_idxfk_1` (`parent`);

--
-- Indexes for table `tbl_sub_section`
--
ALTER TABLE `tbl_sub_section`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_idxfk_2` (`parent`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_department`
--
ALTER TABLE `tbl_department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `tbl_division`
--
ALTER TABLE `tbl_division`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_grade`
--
ALTER TABLE `tbl_grade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `tbl_group`
--
ALTER TABLE `tbl_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT for table `tbl_jabatan`
--
ALTER TABLE `tbl_jabatan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `tbl_penugasan`
--
ALTER TABLE `tbl_penugasan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `tbl_section`
--
ALTER TABLE `tbl_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `tbl_sub_section`
--
ALTER TABLE `tbl_sub_section`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_department`
--
ALTER TABLE `tbl_department`
  ADD CONSTRAINT `tbl_department_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `tbl_division` (`id`);

--
-- Constraints for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  ADD CONSTRAINT `tbl_employee_ibfk_1` FOREIGN KEY (`id_division`) REFERENCES `tbl_division` (`id`),
  ADD CONSTRAINT `tbl_employee_ibfk_2` FOREIGN KEY (`id_department`) REFERENCES `tbl_department` (`id`),
  ADD CONSTRAINT `tbl_employee_ibfk_3` FOREIGN KEY (`id_section`) REFERENCES `tbl_section` (`id`),
  ADD CONSTRAINT `tbl_employee_ibfk_4` FOREIGN KEY (`id_sub_section`) REFERENCES `tbl_sub_section` (`id`),
  ADD CONSTRAINT `tbl_employee_ibfk_5` FOREIGN KEY (`id_group`) REFERENCES `tbl_group` (`id`),
  ADD CONSTRAINT `tbl_employee_ibfk_6` FOREIGN KEY (`id_jabatan`) REFERENCES `tbl_jabatan` (`id`),
  ADD CONSTRAINT `tbl_employee_ibfk_7` FOREIGN KEY (`id_grade`) REFERENCES `tbl_grade` (`id`),
  ADD CONSTRAINT `tbl_employee_ibfk_8` FOREIGN KEY (`id_penugasan`) REFERENCES `tbl_penugasan` (`id`);

--
-- Constraints for table `tbl_group`
--
ALTER TABLE `tbl_group`
  ADD CONSTRAINT `tbl_group_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `tbl_sub_section` (`id`);

--
-- Constraints for table `tbl_section`
--
ALTER TABLE `tbl_section`
  ADD CONSTRAINT `tbl_section_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `tbl_department` (`id`);

--
-- Constraints for table `tbl_sub_section`
--
ALTER TABLE `tbl_sub_section`
  ADD CONSTRAINT `tbl_sub_section_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `tbl_section` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
