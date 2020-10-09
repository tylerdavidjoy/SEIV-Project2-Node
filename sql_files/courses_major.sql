CREATE TABLE `courses_major` (
  `courses_id` int(11) NOT NULL COMMENT 'id of the course',
  `major_id` int(11) NOT NULL COMMENT 'id for the major that has courses associated with it',
  KEY `courses_id` (`courses_id`),
  KEY `major_id` (`major_id`),
  CONSTRAINT `courses_major_ibfk_1` FOREIGN KEY (`courses_id`) REFERENCES `courses` (`Course_Id`),
  CONSTRAINT `courses_major_ibfk_2` FOREIGN KEY (`major_id`) REFERENCES `major` (`major_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='This is a linking table that creates the many to many relationship between a major and the courses for that major';
