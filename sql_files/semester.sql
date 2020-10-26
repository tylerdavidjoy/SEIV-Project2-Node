CREATE TABLE `semester` (
  `semester_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'The id of the semester',
  `plan_id` int(11) NOT NULL,
  `semester_type` varchar(45) DEFAULT NULL COMMENT 'the type of semester that is available',
  `year` int(11) DEFAULT NULL COMMENT 'The Year for the semester',
  PRIMARY KEY (`semester_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COMMENT='This is the table for a semester of a plan';
