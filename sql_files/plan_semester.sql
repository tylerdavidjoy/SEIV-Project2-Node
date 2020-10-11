CREATE TABLE `plan_semester` (
  `plan_id` int(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  KEY `plan_id` (`plan_id`),
  KEY `semester_id` (`semester_id`),
  CONSTRAINT `plan_semester_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `plan` (`plan_id`),
  CONSTRAINT `plan_semester_ibfk_2` FOREIGN KEY (`semester_id`) REFERENCES `semester` (`semester_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;