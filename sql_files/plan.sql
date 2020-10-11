CREATE TABLE `plan` (
  `plan_id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_id` int(11) NOT NULL,
  PRIMARY KEY (`plan_id`),
  KEY `stu_id` (`stu_id`),
  CONSTRAINT `plan_ibfk_1` FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
