-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 17, 2018 at 09:28 AM
-- Server version: 5.6.35
-- PHP Version: 7.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ympi-mis`
--

-- --------------------------------------------------------

--
-- Table structure for table `app_config`
--

DROP TABLE IF EXISTS `app_config`;
CREATE TABLE `app_config` (
  `setting` char(26) NOT NULL,
  `value` varchar(12000) NOT NULL,
  `sortorder` int(5) DEFAULT NULL,
  `category` varchar(25) NOT NULL,
  `type` varchar(15) NOT NULL,
  `description` varchar(140) DEFAULT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `app_config`
--

INSERT INTO `app_config` (`setting`, `value`, `sortorder`, `category`, `type`, `description`, `required`) VALUES
('active_email', 'Your new account is now active! Click this link to log in!', 27, 'Messages', 'text', 'Email message when account is verified', 1),
('active_msg', 'Your account has been verified!', 26, 'Messages', 'text', 'Display message when account is verified', 1),
('admin_email', 'bayuhafiz@hotmail.com', 31, 'Website', 'text', 'Site administrator email address', 1),
('admin_verify', 'false', 21, 'Security', 'boolean', 'Require admin verification', 1),
('avatar_dir', '/user/avatars', 6, 'Website', 'text', 'Directory where user avatars should be stored inside of base site directory. Do not include base_dir path.', 1),
('base_dir', '/Users/bayoe/Projects/YMPI-MIS/HRIS', 2, 'Website', 'hidden', 'Base directory of website in filesystem. \"C:\\...\" in windows, \"/...\" in unix systems', 1),
('base_url', 'http://localhost', 3, 'Website', 'url', 'Base URL of website. Example: \"http://sitename.com\"', 1),
('cookie_expire_seconds', '2592000', 19, 'Security', 'number', 'Cookie expiration (in seconds)', 1),
('curl_enabled', 'false', 29, 'Website', 'boolean', 'Enable curl for various processes such as background email sending', 1),
('email_working', 'true', 30, 'Mailer', 'hidden', 'Indicates if email settings are correct and can connect to a mail server', 1),
('from_email', 'bayu.hafiz', 13, 'Mailer', 'email', 'From email address. Should typically be the same as \"mail_user\" email.', 1),
('from_name', 'YMPI MIS App', 14, 'Mailer', 'text', 'Name that shows up in \"from\" field of emails', 1),
('htmlhead', '<!DOCTYPE html><html lang=\'en\'><head><meta charset=\'utf-8\'><meta name=\'viewport\' content-width=\'device-width\', initial-scale=\'1\', shrink-to-fit=\'no\'>', 4, 'Website', 'textarea', 'Main HTML header of website (without login-specific includes and script tags). Do not close <html> tag! Will break application functionality', 1),
('jwt_secret', 'php-login', 20, 'Security', 'text', 'Secret for JWT for tokens (Can be anything)', 1),
('login_timeout', '300', 18, 'Security', 'number', 'Cooloff time for too many failed logins (in seconds)', 1),
('mail_port', '587', 12, 'Mailer', 'number', 'Mail port. Common settings are 465 for ssl, 587 for tls, 25 for other', 1),
('mail_pw', '6f2OPyfeuiodo8Td', 10, 'Mailer', 'password', 'Email password to authenticate mailer', 1),
('mail_security', 'tls', 11, 'Mailer', 'text', 'Mail security type. Possible values are \"ssl\", \"tls\" or leave blank', 1),
('mail_server', 'smtp-mail.outlook.com', 8, 'Mailer', 'text', 'Mail server address. Example: \"smtp.email.com\"', 1),
('mail_server_type', 'smtp', 7, 'Mailer', 'text', 'Type of email server. SMTP is most typical. Other server types untested.', 1),
('mail_user', 'bayuhafiz@hotmail.com', 9, 'Mailer', 'email', 'Email user', 1),
('mainlogo', 'ympi_logo.png', 5, 'Website', 'url', 'URL of main site logo. Example \"http://sitename.com/logo.jpg\"', 1),
('max_attempts', '5', 17, 'Security', 'number', 'Maximum login attempts', 1),
('password_min_length', '6', 16, 'Security', 'number', 'Minimum password length if \"password_policy_enforce\" is set to true', 1),
('password_policy_enforce', 'true', 15, 'Security', 'boolean', 'Require a mixture of upper and lowercase letters and minimum password length (set by \"password_min_length\")', 1),
('reset_email', 'Click the link below to reset your password', 28, 'Messages', 'text', 'Email message when user wants to reset their password', 1),
('signup_requires_admin', 'Thank you for signing up! Before you can login, your account needs to be activated by an administrator.', 23, 'Messages', 'text', 'Message displayed when user signs up, but requires admin approval', 1),
('signup_thanks', 'Thank you for signing up! You will receive an email shortly confirming the verification of your account.', 22, 'Messages', 'text', 'Message displayed when user signs up and can verify themselves via email', 1),
('site_name', 'YMPI MIS', 1, 'Website', 'text', 'Website name', 1),
('timezone', 'Asia/Jakarta', 32, 'Website', 'timezone', 'Server time zone', 1),
('token_validity', '24', 33, 'Security', 'number', 'Token validity in Hours (default 24 hours)', 1),
('verify_email_admin', 'Thank you for signing up! Your account will be reviewed by an admin shortly', 24, 'Messages', 'text', 'Email message when account requires admin verification', 1),
('verify_email_noadmin', 'Click this link to verify your new account!', 25, 'Messages', 'text', 'Email message when user can verify themselves', 1);

-- --------------------------------------------------------

--
-- Table structure for table `cookies`
--

DROP TABLE IF EXISTS `cookies`;
CREATE TABLE `cookies` (
  `cookieid` char(23) NOT NULL,
  `userid` char(23) NOT NULL,
  `tokenid` char(25) NOT NULL,
  `expired` tinyint(1) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cookies`
--

INSERT INTO `cookies` (`cookieid`, `userid`, `tokenid`, `expired`, `timestamp`) VALUES
('5b9de2d2a06da', '921665705b9de00c1d118', 't_5b9de2d2a067a9.53372412', 0, '2018-09-16 04:57:54');

-- --------------------------------------------------------

--
-- Table structure for table `deleted_members`
--

DROP TABLE IF EXISTS `deleted_members`;
CREATE TABLE `deleted_members` (
  `id` char(23) NOT NULL,
  `username` varchar(65) NOT NULL DEFAULT '',
  `password` varchar(65) NOT NULL DEFAULT '',
  `email` varchar(65) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `mod_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `login_attempts`
--

DROP TABLE IF EXISTS `login_attempts`;
CREATE TABLE `login_attempts` (
  `ID` int(11) NOT NULL,
  `Username` varchar(65) DEFAULT NULL,
  `IP` varchar(20) NOT NULL,
  `Attempts` int(11) NOT NULL,
  `LastLogin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login_attempts`
--

INSERT INTO `login_attempts` (`ID`, `Username`, `IP`, `Attempts`, `LastLogin`) VALUES
(24, 'developer', '::1', 1, '2018-09-16 11:51:55');

-- --------------------------------------------------------

--
-- Table structure for table `mail_log`
--

DROP TABLE IF EXISTS `mail_log`;
CREATE TABLE `mail_log` (
  `id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'generic',
  `status` varchar(45) DEFAULT NULL,
  `recipient` varchar(5000) DEFAULT NULL,
  `response` mediumtext NOT NULL,
  `isread` tinyint(1) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` char(23) NOT NULL,
  `username` varchar(65) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(65) NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `banned` tinyint(1) NOT NULL DEFAULT '0',
  `mod_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `username`, `password`, `email`, `verified`, `banned`, `mod_timestamp`) VALUES
('921665705b9de00c1d118', 'developer', '$2y$10$dKzK/p91273cSffvKt/kX.KlFDF9qNHFkwawjSb/ZLR8AuUwUr9b2', 'bayu.hafiz@gmail.com', 1, 0, '2018-09-16 04:48:20');

--
-- Triggers `members`
--
DROP TRIGGER IF EXISTS `assign_default_role`;
DELIMITER $$
CREATE TRIGGER `assign_default_role` AFTER INSERT ON `members` FOR EACH ROW BEGIN
	SET @default_role = (SELECT ID FROM `roles` WHERE `default_role` = 1 LIMIT 1);
    INSERT INTO `member_roles` (`member_id`, `role_id`) VALUES (NEW.id, @default_role);
END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `move_to_deleted_members`;
DELIMITER $$
CREATE TRIGGER `move_to_deleted_members` AFTER DELETE ON `members` FOR EACH ROW BEGIN
      DELETE FROM deleted_members WHERE deleted_members.id = OLD.id;
      INSERT INTO deleted_members ( id, username, password, email, verified) VALUES ( OLD.id, OLD.username, OLD.password, OLD.email, OLD.verified );
    END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `prevent_deletion_of_superadmin`;
DELIMITER $$
CREATE TRIGGER `prevent_deletion_of_superadmin` BEFORE DELETE ON `members` FOR EACH ROW BEGIN
  	IF
    (SELECT count(m.id)
  	FROM `members` m
  	INNER JOIN `member_roles` mr on mr.member_id = m.id
  	INNER JOIN `roles` r on mr.role_id = r.id
  	WHERE
  	 m.verified = 1
  	AND m.banned = 0
  	AND r.name = 'Superadmin'
      AND m.id = OLD.id) > 0
    THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete superadmin user';
    END IF;
  END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `member_info`
--

DROP TABLE IF EXISTS `member_info`;
CREATE TABLE `member_info` (
  `userid` char(23) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(55) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address1` varchar(45) DEFAULT NULL,
  `address2` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `bio` varchar(20000) DEFAULT NULL,
  `userimage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member_info`
--

INSERT INTO `member_info` (`userid`, `firstname`, `lastname`, `phone`, `address1`, `address2`, `city`, `state`, `country`, `bio`, `userimage`) VALUES
('921665705b9de00c1d118', 'Super', 'Admin', '', '', '', 'Surabaya', 'Jawa Timur', 'Indonesia', '', 'http://localhost/user/avatars/921665705b9de00c1d118.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `member_jail`
--

DROP TABLE IF EXISTS `member_jail`;
CREATE TABLE `member_jail` (
  `id` int(11) NOT NULL,
  `user_id` char(23) NOT NULL,
  `banned_hours` float NOT NULL DEFAULT '24',
  `reason` varchar(2000) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `member_roles`
--

DROP TABLE IF EXISTS `member_roles`;
CREATE TABLE `member_roles` (
  `id` int(11) NOT NULL,
  `member_id` char(23) NOT NULL,
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `member_roles`
--

INSERT INTO `member_roles` (`id`, `member_id`, `role_id`) VALUES
(1, '921665705b9de00c1d118', 1);

--
-- Triggers `member_roles`
--
DROP TRIGGER IF EXISTS `at_least_one_superadmin_assigned`;
DELIMITER $$
CREATE TRIGGER `at_least_one_superadmin_assigned` BEFORE DELETE ON `member_roles` FOR EACH ROW BEGIN
			IF ((old.role_id = 1)) && (SELECT COUNT(id) from `member_roles` where role_id = 1) <= 1 THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'There must be at least one Superadmin assigned';
		END IF;
	END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `category` varchar(50) NOT NULL DEFAULT 'General',
  `required` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `description`, `category`, `required`) VALUES
(1, 'Verify Users', 'Administration permission allowing for the verification of new users', 'Users', 1),
(2, 'Delete Unverified Users', 'Administration permission allowing the deletion of unverified users', 'Users', 1),
(3, 'Ban Users', 'Moderation permission allowing the banning of users', 'Users', 1),
(4, 'Assign Roles to Users', 'Administration permission allowing the assignment of roles to users', 'Users', 1),
(5, 'Assign Users to Roles', 'Administration permission allowing the assignment of users to roles', 'Roles', 1),
(6, 'Create Roles', 'Administration permission allowing for the creation of new roles', 'Roles', 1),
(7, 'Delete Roles', 'Administration permission allowing for the deletion of roles', 'Roles', 1),
(8, 'Create Permissions', 'Administration permission allowing for the creation of new permissions', 'Permissions', 1),
(9, 'Delete Permissions', 'Administration permission allowing for the deletion of permissions', 'Permissions', 1),
(10, 'Assign Permissions to Roles', 'Administration permission allowing the assignment of permissions to roles', 'Roles', 1),
(11, 'Edit Site Config', 'Administration permission allowing the editing of core site configuration (dangerous)', 'Administration', 1),
(12, 'View Permissions', 'Administration permission allowing the viewing of all permissions', 'Permissions', 1),
(13, 'View Roles', 'Administration permission allowing for the viewing of all roles', 'Roles', 1),
(14, 'View Users', 'Administration permission allowing for the viewing of all users', 'Users', 1),
(15, 'Delete Users', 'Administration permission allowing for the deletion of users', 'Users', 1);

--
-- Triggers `permissions`
--
DROP TRIGGER IF EXISTS `prevent_deletion_of_required_perms`;
DELIMITER $$
CREATE TRIGGER `prevent_deletion_of_required_perms` BEFORE DELETE ON `permissions` FOR EACH ROW BEGIN
    IF OLD.required = 1 THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete required permissions';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `default_role` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `required`, `default_role`) VALUES
(1, 'Superadmin', 'Master administrator of site', 1, NULL),
(2, 'Admin', 'Site administrator', 1, NULL),
(3, 'Standard User', 'Default site role for standard users', 1, 1);

--
-- Triggers `roles`
--
DROP TRIGGER IF EXISTS `prevent_deletion_of_required_roles`;
DELIMITER $$
CREATE TRIGGER `prevent_deletion_of_required_roles` BEFORE DELETE ON `roles` FOR EACH ROW BEGIN
      IF OLD.required = 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete required roles';
      END IF;
  END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role_permissions`
--

INSERT INTO `role_permissions` (`id`, `role_id`, `permission_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6),
(7, 1, 7),
(8, 1, 8),
(9, 1, 9),
(10, 1, 10),
(11, 1, 11),
(12, 1, 12),
(13, 1, 13),
(14, 1, 14),
(15, 1, 15),
(16, 2, 1),
(17, 2, 2),
(18, 2, 3),
(19, 2, 4),
(20, 2, 5),
(21, 2, 12),
(22, 2, 13),
(23, 2, 14),
(24, 2, 15);

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
CREATE TABLE `tokens` (
  `tokenid` char(25) NOT NULL,
  `userid` char(23) NOT NULL,
  `expired` tinyint(1) NOT NULL DEFAULT '0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `app_config`
--
ALTER TABLE `app_config`
  ADD PRIMARY KEY (`setting`),
  ADD UNIQUE KEY `setting_UNIQUE` (`setting`);

--
-- Indexes for table `cookies`
--
ALTER TABLE `cookies`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `deleted_members`
--
ALTER TABLE `deleted_members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `login_attempts`
--
ALTER TABLE `login_attempts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `mail_log`
--
ALTER TABLE `mail_log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- Indexes for table `member_info`
--
ALTER TABLE `member_info`
  ADD UNIQUE KEY `userid_UNIQUE` (`userid`),
  ADD KEY `fk_userid_idx` (`userid`);

--
-- Indexes for table `member_jail`
--
ALTER TABLE `member_jail`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  ADD KEY `fk_userid_idx` (`user_id`);

--
-- Indexes for table `member_roles`
--
ALTER TABLE `member_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_unique_idx` (`member_id`,`role_id`),
  ADD KEY `member_id_idx` (`member_id`),
  ADD KEY `fk_role_id_idx` (`role_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`),
  ADD UNIQUE KEY `default_role_UNIQUE` (`default_role`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Role_Id_idx` (`role_id`),
  ADD KEY `fk_Permission_Id_idx` (`permission_id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`tokenid`),
  ADD UNIQUE KEY `tokenid_UNIQUE` (`tokenid`),
  ADD UNIQUE KEY `userid_UNIQUE` (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `login_attempts`
--
ALTER TABLE `login_attempts`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `mail_log`
--
ALTER TABLE `mail_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `member_jail`
--
ALTER TABLE `member_jail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `member_roles`
--
ALTER TABLE `member_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cookies`
--
ALTER TABLE `cookies`
  ADD CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `member_info`
--
ALTER TABLE `member_info`
  ADD CONSTRAINT `fk_userid` FOREIGN KEY (`userid`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `member_jail`
--
ALTER TABLE `member_jail`
  ADD CONSTRAINT `fk_userid_jail` FOREIGN KEY (`user_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `member_roles`
--
ALTER TABLE `member_roles`
  ADD CONSTRAINT `fk_member_id` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `fk_Permission_Id` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Role_Id_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `userid_t` FOREIGN KEY (`userid`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$
--
-- Events
--
DROP EVENT `cleanupOldDeleted`$$
CREATE DEFINER=`root`@`localhost` EVENT `cleanupOldDeleted` ON SCHEDULE EVERY 1 DAY STARTS '2017-03-20 18:33:40' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'Removes deleted records older than 30 days.' DO BEGIN DELETE FROM deleted_members WHERE mod_timestamp < DATE_SUB(NOW(), INTERVAL 30 DAY); END$$

DROP EVENT `unbanUsers`$$
CREATE DEFINER=`root`@`localhost` EVENT `unbanUsers` ON SCHEDULE EVERY 5 MINUTE STARTS '2018-09-16 11:48:20' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    DELETE FROM `vw_banned_users` where hours_remaining < 0;
    UPDATE `members` m SET m.banned = 0 where m.banned = 1 AND m.id not in (select v.user_id from `vw_banned_users` v);
END$$

DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
