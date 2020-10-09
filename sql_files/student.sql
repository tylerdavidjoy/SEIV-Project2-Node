CREATE TABLE `student` (
  `stu_id` int(11) NOT NULL AUTO_INCREMENT,
  `major_id` varchar(45) NOT NULL,
  `plan_id` varchar(45) NOT NULL,
  `adv_id` varchar(45) NOT NULL,
  `stu_gpa` float DEFAULT NULL,
  `stu_name` varchar(60) DEFAULT NULL,
  `stu_hrs_taken` int(11) DEFAULT NULL,
  `stu_grad_date` datetime DEFAULT NULL,
  `stu_hrs_not_taken` int(11) DEFAULT NULL,
  `stu_classification` varchar(45) DEFAULT NULL,
  `stu_hrs_enrolled` int(11) DEFAULT NULL,
  PRIMARY KEY (`stu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
