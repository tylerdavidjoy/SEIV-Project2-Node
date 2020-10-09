CREATE TABLE `semester` (
  `semester_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'The id of the semester',
  `semester_type` varchar(45) DEFAULT NULL COMMENT 'the type of semester that is available',
  PRIMARY KEY (`semester_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='This is the table for a semester of a plan';
