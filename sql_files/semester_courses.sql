CREATE TABLE `semester_courses` (
  `semester_id` int(11) DEFAULT NULL COMMENT 'The id of the semester',
  `course_id` int(11) DEFAULT NULL COMMENT 'the type of semester that is available',
  KEY `semester_id` (`semester_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `semester_courses_ibfk_1` FOREIGN KEY (`semester_id`) REFERENCES `semester` (`semester_id`),
  CONSTRAINT `semester_courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`Course_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='This is the table for a semester of a plan';