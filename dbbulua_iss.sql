-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2022 at 04:07 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbbulua_iss`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblgrade`
--

CREATE TABLE `tblgrade` (
  `grade_id` int(11) NOT NULL,
  `level` varchar(50) DEFAULT NULL,
  `grade` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblgrade`
--

INSERT INTO `tblgrade` (`grade_id`, `level`, `grade`, `name`) VALUES
(11, 'Kindergarten', 1, 'Kinder 1'),
(12, 'Kindergarten', 2, 'Kinder 2'),
(13, 'Elementary', 1, 'Grade 1'),
(14, 'Elementary', 2, 'Grade 2'),
(15, 'Elementary', 3, 'Grade 3'),
(16, 'Elementary', 4, 'Grade 4'),
(17, 'Elementary', 5, 'Grade 5'),
(18, 'Elementary', 6, 'Grade 6');

-- --------------------------------------------------------

--
-- Table structure for table `tblgradexsubject`
--

CREATE TABLE `tblgradexsubject` (
  `x_id` int(11) NOT NULL,
  `subject_id` int(11) DEFAULT NULL,
  `grade_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblgradexsubject`
--

INSERT INTO `tblgradexsubject` (`x_id`, `subject_id`, `grade_id`) VALUES
(81, 16, 13),
(82, 17, 13),
(83, 18, 13),
(84, 19, 13),
(85, 20, 13),
(86, 21, 13),
(87, 22, 13),
(88, 23, 13),
(89, 24, 13),
(90, 25, 13),
(91, 26, 13),
(92, 27, 13),
(93, 16, 11),
(94, 17, 11),
(95, 18, 11),
(96, 19, 11),
(97, 16, 14),
(98, 17, 14),
(99, 18, 14),
(100, 19, 14),
(101, 20, 14),
(102, 21, 14),
(103, 22, 14),
(104, 23, 14),
(105, 24, 14),
(106, 25, 14),
(108, 26, 14),
(109, 27, 14),
(110, 16, 15),
(111, 17, 15),
(112, 18, 15),
(113, 19, 15),
(114, 20, 15),
(115, 21, 15),
(116, 22, 15),
(117, 23, 15),
(118, 24, 15),
(119, 25, 15),
(120, 26, 15),
(121, 27, 15),
(122, 17, 16),
(123, 18, 16),
(124, 19, 16),
(125, 20, 16),
(126, 21, 16),
(127, 28, 16),
(128, 22, 16),
(129, 23, 16),
(130, 24, 16),
(131, 25, 16),
(132, 26, 16),
(133, 27, 16),
(134, 17, 17),
(135, 18, 17),
(136, 19, 17),
(137, 20, 17),
(138, 21, 17),
(139, 28, 17),
(140, 22, 17),
(141, 23, 17),
(142, 24, 17),
(143, 25, 17),
(144, 26, 17),
(145, 27, 17),
(146, 17, 18),
(147, 18, 18),
(148, 19, 18),
(149, 20, 18),
(150, 21, 18),
(151, 28, 18),
(152, 22, 18),
(153, 23, 18),
(154, 24, 18),
(155, 25, 18),
(156, 26, 18),
(157, 27, 18),
(159, 30, 13);

-- --------------------------------------------------------

--
-- Table structure for table `tbllogin`
--

CREATE TABLE `tbllogin` (
  `login_id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `grade_id` int(11) DEFAULT NULL,
  `user_level` varchar(20) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `section_name` varchar(100) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbllogin`
--

INSERT INTO `tbllogin` (`login_id`, `username`, `password`, `grade_id`, `user_level`, `fullname`, `fname`, `lname`, `section_name`, `date_created`) VALUES
(10, 'lurms', '12345', 11, 'Administrator', 'Luremy Abenio', 'Luremy', 'Abenio', 'Magsaysay', '2020-01-25 21:09:25'),
(11, 'jevyies', '12345', 12, 'Mere User', 'Jevy Ababa', 'Jevy', 'Ababa', 'Earth', '2020-01-25 21:14:55'),
(12, 'dave', '12345', 13, 'Mere User', 'Dave Santillan', 'Dave', 'Santillan', 'Venus', '2020-01-25 21:15:48'),
(13, 'reid', '12345', 15, 'Mere User', 'James Reid', 'James', 'Reid', 'Rizal', '2020-02-06 15:25:30');

-- --------------------------------------------------------

--
-- Table structure for table `tblstaticvariables`
--

CREATE TABLE `tblstaticvariables` (
  `var_id` int(11) NOT NULL,
  `principal_name` varchar(50) DEFAULT NULL,
  `position` varchar(25) DEFAULT NULL,
  `school_year_from` varchar(20) DEFAULT NULL,
  `school_year_to` varchar(10) NOT NULL,
  `department_name` varchar(50) DEFAULT NULL,
  `school_name` varchar(50) DEFAULT NULL,
  `division` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblstaticvariables`
--

INSERT INTO `tblstaticvariables` (`var_id`, `principal_name`, `position`, `school_year_from`, `school_year_to`, `department_name`, `school_name`, `division`) VALUES
(2, 'DUQUE', 'Something', '2019', '2020', 'Department of Education-X', 'Bulua Central School', 'Cag. de Oro City');

-- --------------------------------------------------------

--
-- Table structure for table `tblstudent`
--

CREATE TABLE `tblstudent` (
  `student_id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `middlename` varchar(20) DEFAULT NULL,
  `extname` varchar(5) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `guardian` varchar(50) DEFAULT NULL,
  `guardian_address` varchar(50) DEFAULT NULL,
  `guardian_occupation` varchar(100) NOT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `id_no` varchar(50) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `date_of_entrance` date DEFAULT NULL,
  `lrn` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblstudent`
--

INSERT INTO `tblstudent` (`student_id`, `firstname`, `lastname`, `middlename`, `extname`, `dob`, `guardian`, `guardian_address`, `guardian_occupation`, `sex`, `id_no`, `address`, `date_of_entrance`, `lrn`) VALUES
(3, 'Jevy', 'Ababa', 'Lombreno', '', '1998-01-08', 'Jessie Ababa', 'Gusa, CDOC', 'AVON Dealer', 'Male', '2014101026', 'Gusa, CDOC', '2020-02-15', '2014101026'),
(4, 'Dave Laurence', 'Santillan', 'Polestico', '', '1997-10-08', 'Felix Santillan', 'Iponan, CDOC', 'Mediaman', 'Male', '2014101126', 'Iponan, CDOC', '2020-02-15', '2014101126'),
(43, 'Jevy', 'Ababa', 'Lombreno', '', '1998-01-08', 'Jessie Ababa', 'Gusa', 'Housewife', 'Male', '2014101026', 'Gusa', '2020-02-05', '101026789'),
(44, 'Jevy', 'Ababa', 'Lombreno', '', '2009-02-11', 'Jessie Ababa', 'Gusa CDOC', 'Housewife', 'Male', '2014101036', 'Gusa Cagayan de oro', '2020-02-11', '2014101036');

-- --------------------------------------------------------

--
-- Table structure for table `tblstudentattendance`
--

CREATE TABLE `tblstudentattendance` (
  `card_id` int(11) NOT NULL,
  `particulars` varchar(50) DEFAULT NULL,
  `Jun` double DEFAULT NULL,
  `Jul` double DEFAULT NULL,
  `Aug` double DEFAULT NULL,
  `Sep` double DEFAULT NULL,
  `Oct` double DEFAULT NULL,
  `Nov` double DEFAULT NULL,
  `Dec` double DEFAULT NULL,
  `Jan` double DEFAULT NULL,
  `Feb` double DEFAULT NULL,
  `Mar` double DEFAULT NULL,
  `Total` double DEFAULT NULL,
  `history_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblstudentattendance`
--

INSERT INTO `tblstudentattendance` (`card_id`, `particulars`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`, `Jan`, `Feb`, `Mar`, `Total`, `history_id`) VALUES
(16, 'No. of School days', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
(17, 'No. of days present', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
(18, 'No. of days absent', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6),
(22, 'No. of School days', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8),
(23, 'No. of days present', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8),
(24, 'No. of days absent', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8),
(25, 'No. of School days', 29, 30, 30, 30, 30, 30, 30, 30, 28, 30, 297, 9),
(26, 'No. of days present', 29, 30, 30, 30, 30, 30, 30, 30, 25, 30, 294, 9),
(27, 'No. of days absent', 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 9),
(28, 'No. of School days', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10),
(29, 'No. of days present', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10),
(30, 'No. of days absent', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 10);

-- --------------------------------------------------------

--
-- Table structure for table `tblstudentcardfrontleft`
--

CREATE TABLE `tblstudentcardfrontleft` (
  `card_id` int(11) NOT NULL,
  `subject_name` varchar(300) DEFAULT NULL,
  `first_grading` double DEFAULT NULL,
  `second_grading` double DEFAULT NULL,
  `third_grading` double DEFAULT NULL,
  `fourth_grading` double DEFAULT NULL,
  `average` double DEFAULT NULL,
  `remarks` varchar(20) NOT NULL,
  `history_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblstudentcardfrontleft`
--

INSERT INTO `tblstudentcardfrontleft` (`card_id`, `subject_name`, `first_grading`, `second_grading`, `third_grading`, `fourth_grading`, `average`, `remarks`, `history_id`) VALUES
(25, 'Mother Tongue', 90, 90, 90, 90, 90, 'Passed', 6),
(26, 'Filipino', 90, 90, 90, 90, 90, 'Passed', 6),
(27, 'English', 90, 90, 90, 90, 90, 'Passed', 6),
(28, 'Mathematics', 90, 100, 90, 90, 92.5, 'Passed', 6),
(29, 'Araling Panlipunan(AP)', 90, 90, 90, 90, 90, 'Passed', 6),
(30, 'Edukasyon sa Pagpapakatao(EsP)', 90, 90, 90, 90, 90, 'Passed', 6),
(31, 'Mapeh', 90, 90, 90, 90, 90, 'Passed', 6),
(32, 'Music', 90, 90, 90, 90, 90, 'Passed', 6),
(33, 'Art', 90, 90, 90, 90, 90, 'Passed', 6),
(34, 'Physical Education', 90, 90, 90, 90, 90, 'Passed', 6),
(35, 'Health', 90, 90, 90, 90, 90, 'Passed', 6),
(36, 'ALIVE', 90, 90, 90, 90, 90, 'Passed', 6),
(49, 'Mother Tongue', 100, 90, 100, 100, 97.5, 'Passed', 8),
(50, 'Filipino', 100, 90, 100, 100, 97.5, 'Passed', 8),
(51, 'English', 100, 100, 100, 100, 100, 'Passed', 8),
(52, 'Mathematics', 87, 87, 87, 87, 87, 'Passed', 8),
(53, 'Araling Panlipunan(AP)', 87, 87, 88, 88, 87.5, 'Passed', 8),
(54, 'Edukasyon sa Pagpapakatao(EsP)', 99, 98, 98, 98, 98.25, 'Passed', 8),
(55, 'Mapeh', 87, 87, 89, 89, 88, 'Passed', 8),
(56, 'Music', 89, 89, 89, 89, 89, 'Passed', 8),
(57, 'Art', 89, 89, 89, 89, 89, 'Passed', 8),
(58, 'Physical Education', 89, 89, 89, 89, 89, 'Passed', 8),
(59, 'Health', 89, 89, 89, 89, 89, 'Passed', 8),
(60, 'ALIVE', 89, 89, 89, 89, 89, 'Passed', 8),
(61, 'Mother Tongue', 90, 90, 90, 90, 90, 'Passed', 9),
(62, 'Filipino', 89, 98, 98, 89, 93.5, 'Passed', 9),
(63, 'English', 89, 98, 89, 89, 91.25, 'Passed', 9),
(64, 'Mathematics', 99, 99, 99, 99, 99, 'Passed', 9),
(65, 'Araling Panlipunan(AP)', 100, 88, 88, 88, 91, 'Passed', 9),
(66, 'Edukasyon sa Pagpapakatao(EsP)', 88, 88, 88, 88, 88, 'Passed', 9),
(67, 'Mapeh', 88, 88, 88, 88, 88, 'Passed', 9),
(68, 'Music', 98, 89, 98, 98, 95.75, 'Passed', 9),
(69, 'Art', 98, 98, 88, 98, 95.5, 'Passed', 9),
(70, 'Physical Education', 89, 89, 89, 99, 91.5, 'Passed', 9),
(71, 'Health', 89, 89, 89, 89, 89, 'Passed', 9),
(72, 'ALIVE', 89, 89, 89, 88, 88.75, 'Passed', 9),
(73, 'Mother Tongue', 90, 90, 90, 90, 90, 'Passed', 10),
(74, 'Filipino', 90, 90, 90, 90, 90, 'Passed', 10),
(75, 'English', 90, 90, 90, 90, 90, 'Passed', 10),
(76, 'Mathematics', 90, 90, 90, 90, 90, 'Passed', 10);

-- --------------------------------------------------------

--
-- Table structure for table `tblstudentcardfrontright`
--

CREATE TABLE `tblstudentcardfrontright` (
  `card_id` int(11) NOT NULL,
  `MakaDiyosA1` varchar(2) NOT NULL,
  `MakaDiyosA2` varchar(2) NOT NULL,
  `MakaDiyosA3` varchar(2) NOT NULL,
  `MakaDiyosA4` varchar(2) NOT NULL,
  `MakaDiyosB1` varchar(2) NOT NULL,
  `MakaDiyosB2` varchar(2) NOT NULL,
  `MakaDiyosB3` varchar(2) NOT NULL,
  `MakaDiyosB4` varchar(2) NOT NULL,
  `MakaTaoA1` varchar(2) NOT NULL,
  `MakaTaoA2` varchar(2) NOT NULL,
  `MakaTaoA3` varchar(2) NOT NULL,
  `MakaTaoA4` varchar(2) NOT NULL,
  `MakaTaoB1` varchar(2) NOT NULL,
  `MakaTaoB2` varchar(2) NOT NULL,
  `MakaTaoB3` varchar(2) NOT NULL,
  `MakaTaoB4` varchar(2) NOT NULL,
  `Makakalikasan1` varchar(2) NOT NULL,
  `Makakalikasan2` varchar(2) NOT NULL,
  `Makakalikasan3` varchar(2) NOT NULL,
  `Makakalikasan4` varchar(2) NOT NULL,
  `MakaBansaA1` varchar(2) NOT NULL,
  `MakaBansaA2` varchar(2) NOT NULL,
  `MakaBansaA3` varchar(2) NOT NULL,
  `MakaBansaA4` varchar(2) NOT NULL,
  `MakaBansaB1` varchar(2) NOT NULL,
  `MakaBansaB2` varchar(2) NOT NULL,
  `MakaBansaB3` varchar(2) NOT NULL,
  `MakaBansaB4` varchar(2) NOT NULL,
  `history_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblstudentcardfrontright`
--

INSERT INTO `tblstudentcardfrontright` (`card_id`, `MakaDiyosA1`, `MakaDiyosA2`, `MakaDiyosA3`, `MakaDiyosA4`, `MakaDiyosB1`, `MakaDiyosB2`, `MakaDiyosB3`, `MakaDiyosB4`, `MakaTaoA1`, `MakaTaoA2`, `MakaTaoA3`, `MakaTaoA4`, `MakaTaoB1`, `MakaTaoB2`, `MakaTaoB3`, `MakaTaoB4`, `Makakalikasan1`, `Makakalikasan2`, `Makakalikasan3`, `Makakalikasan4`, `MakaBansaA1`, `MakaBansaA2`, `MakaBansaA3`, `MakaBansaA4`, `MakaBansaB1`, `MakaBansaB2`, `MakaBansaB3`, `MakaBansaB4`, `history_id`) VALUES
(6, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 6),
(8, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 8),
(9, '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '4', '3', '4', '4', '4', '4', '4', '4', '3', '4', '4', '4', '3', '4', '4', '4', 9),
(10, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 10);

-- --------------------------------------------------------

--
-- Table structure for table `tblstudenthistory`
--

CREATE TABLE `tblstudenthistory` (
  `history_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `teacher_name` varchar(100) DEFAULT NULL,
  `section_name` varchar(100) NOT NULL,
  `level_name` varchar(20) DEFAULT NULL,
  `sex` varchar(10) NOT NULL,
  `age` varchar(5) NOT NULL,
  `status` varchar(15) DEFAULT NULL,
  `school_year` varchar(15) DEFAULT NULL,
  `school_name` varchar(100) NOT NULL,
  `principal` varchar(100) DEFAULT NULL,
  `grade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblstudenthistory`
--

INSERT INTO `tblstudenthistory` (`history_id`, `student_id`, `teacher_name`, `section_name`, `level_name`, `sex`, `age`, `status`, `school_year`, `school_name`, `principal`, `grade`) VALUES
(6, 43, 'Dave Santillan', 'Venus', 'Grade 1', 'Male', '22', 'PREVIOUS', '2019-2020', 'Bulua Central School', 'DUQUE', 13),
(8, 43, 'CHIO', 'ATIS', 'Grade 2', 'Male', '22', 'PREVIOUS', '2020-2021', 'Iponan Central School', 'DUQUE', 14),
(9, 43, 'James Reid', 'Rizal', 'Grade 3', 'Male', '22', 'ACTIVE', '2019-2020', 'Bulua Central School', 'DUQUE', 15),
(10, 44, 'Luremy Abenio', 'Magsaysay', 'Kinder 1', 'Male', '11', 'ACTIVE', '2019-2020', 'Bulua Central School', 'DUQUE', 11);

-- --------------------------------------------------------

--
-- Table structure for table `tblsubjects`
--

CREATE TABLE `tblsubjects` (
  `subject_id` int(11) NOT NULL,
  `subject_code` varchar(20) DEFAULT NULL,
  `subject_name` varchar(50) DEFAULT NULL,
  `is_detail` varchar(1) NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblsubjects`
--

INSERT INTO `tblsubjects` (`subject_id`, `subject_code`, `subject_name`, `is_detail`) VALUES
(16, 'MoT', 'Mother Tongue', 'N'),
(17, 'Fil10', 'Filipino', 'N'),
(18, 'Eng10', 'English', 'N'),
(19, 'Math', 'Mathematics', 'N'),
(20, 'ArPan', 'Araling Panlipunan(AP)', 'N'),
(21, 'EsP', 'Edukasyon sa Pagpapakatao(EsP)', 'N'),
(22, 'Mapeh', 'Mapeh', 'N'),
(23, 'Music', 'Music', 'Y'),
(24, 'Art', 'Art', 'Y'),
(25, 'PE', 'Physical Education', 'Y'),
(26, 'Health', 'Health', 'Y'),
(27, 'Alive', 'ALIVE', 'Y'),
(28, 'EPP', 'Edukasyong Pantahanan at Pangkabuhayan(EPP)', 'N'),
(30, 'Sci', 'Science', 'N');

-- --------------------------------------------------------

--
-- Table structure for table `tblteacherxstudent`
--

CREATE TABLE `tblteacherxstudent` (
  `x_id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `status` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblteacherxstudent`
--

INSERT INTO `tblteacherxstudent` (`x_id`, `student_id`, `teacher_id`, `status`) VALUES
(5, 43, 12, 'PREVIOUS'),
(6, 43, 12, 'PREVIOUS'),
(7, 43, 13, 'ACTIVE'),
(8, 44, 10, 'ACTIVE');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblgrade`
--
ALTER TABLE `tblgrade`
  ADD PRIMARY KEY (`grade_id`);

--
-- Indexes for table `tblgradexsubject`
--
ALTER TABLE `tblgradexsubject`
  ADD PRIMARY KEY (`x_id`),
  ADD KEY `subject_fk` (`subject_id`),
  ADD KEY `grade_fk` (`grade_id`);

--
-- Indexes for table `tbllogin`
--
ALTER TABLE `tbllogin`
  ADD PRIMARY KEY (`login_id`),
  ADD KEY `grade_teacher_fk` (`grade_id`);

--
-- Indexes for table `tblstaticvariables`
--
ALTER TABLE `tblstaticvariables`
  ADD PRIMARY KEY (`var_id`);

--
-- Indexes for table `tblstudent`
--
ALTER TABLE `tblstudent`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `tblstudentattendance`
--
ALTER TABLE `tblstudentattendance`
  ADD PRIMARY KEY (`card_id`),
  ADD KEY `history_id` (`history_id`);

--
-- Indexes for table `tblstudentcardfrontleft`
--
ALTER TABLE `tblstudentcardfrontleft`
  ADD PRIMARY KEY (`card_id`),
  ADD KEY `history_id` (`history_id`);

--
-- Indexes for table `tblstudentcardfrontright`
--
ALTER TABLE `tblstudentcardfrontright`
  ADD PRIMARY KEY (`card_id`),
  ADD KEY `history_id` (`history_id`);

--
-- Indexes for table `tblstudenthistory`
--
ALTER TABLE `tblstudenthistory`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `grade` (`grade`);

--
-- Indexes for table `tblsubjects`
--
ALTER TABLE `tblsubjects`
  ADD PRIMARY KEY (`subject_id`);

--
-- Indexes for table `tblteacherxstudent`
--
ALTER TABLE `tblteacherxstudent`
  ADD PRIMARY KEY (`x_id`),
  ADD KEY `student_fk` (`student_id`),
  ADD KEY `teacher_fk` (`teacher_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblgrade`
--
ALTER TABLE `tblgrade`
  MODIFY `grade_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tblgradexsubject`
--
ALTER TABLE `tblgradexsubject`
  MODIFY `x_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=160;

--
-- AUTO_INCREMENT for table `tbllogin`
--
ALTER TABLE `tbllogin`
  MODIFY `login_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `tblstaticvariables`
--
ALTER TABLE `tblstaticvariables`
  MODIFY `var_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tblstudent`
--
ALTER TABLE `tblstudent`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `tblstudentattendance`
--
ALTER TABLE `tblstudentattendance`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tblstudentcardfrontleft`
--
ALTER TABLE `tblstudentcardfrontleft`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `tblstudentcardfrontright`
--
ALTER TABLE `tblstudentcardfrontright`
  MODIFY `card_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tblstudenthistory`
--
ALTER TABLE `tblstudenthistory`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tblsubjects`
--
ALTER TABLE `tblsubjects`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tblteacherxstudent`
--
ALTER TABLE `tblteacherxstudent`
  MODIFY `x_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblgradexsubject`
--
ALTER TABLE `tblgradexsubject`
  ADD CONSTRAINT `grade_fk` FOREIGN KEY (`grade_id`) REFERENCES `tblgrade` (`grade_id`),
  ADD CONSTRAINT `subject_fk` FOREIGN KEY (`subject_id`) REFERENCES `tblsubjects` (`subject_id`);

--
-- Constraints for table `tbllogin`
--
ALTER TABLE `tbllogin`
  ADD CONSTRAINT `grade_teacher_fk` FOREIGN KEY (`grade_id`) REFERENCES `tblgrade` (`grade_id`);

--
-- Constraints for table `tblstudentattendance`
--
ALTER TABLE `tblstudentattendance`
  ADD CONSTRAINT `tblstudentattendance_ibfk_1` FOREIGN KEY (`history_id`) REFERENCES `tblstudenthistory` (`history_id`);

--
-- Constraints for table `tblstudentcardfrontleft`
--
ALTER TABLE `tblstudentcardfrontleft`
  ADD CONSTRAINT `tblstudentcardfrontleft_ibfk_2` FOREIGN KEY (`history_id`) REFERENCES `tblstudenthistory` (`history_id`);

--
-- Constraints for table `tblstudentcardfrontright`
--
ALTER TABLE `tblstudentcardfrontright`
  ADD CONSTRAINT `tblstudentcardfrontright_ibfk_1` FOREIGN KEY (`history_id`) REFERENCES `tblstudenthistory` (`history_id`);

--
-- Constraints for table `tblstudenthistory`
--
ALTER TABLE `tblstudenthistory`
  ADD CONSTRAINT `tblstudenthistory_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `tblstudent` (`student_id`),
  ADD CONSTRAINT `tblstudenthistory_ibfk_2` FOREIGN KEY (`grade`) REFERENCES `tblgrade` (`grade_id`);

--
-- Constraints for table `tblteacherxstudent`
--
ALTER TABLE `tblteacherxstudent`
  ADD CONSTRAINT `student_fk` FOREIGN KEY (`student_id`) REFERENCES `tblstudent` (`student_id`),
  ADD CONSTRAINT `teacher_fk` FOREIGN KEY (`teacher_id`) REFERENCES `tbllogin` (`login_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
