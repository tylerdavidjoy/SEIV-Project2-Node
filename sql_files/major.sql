CREATE TABLE `major` (
  `major_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'The id for a major',
  `major_name` varchar(45) NOT NULL COMMENT 'The name of a major',
  `major_total_hrs` int(11) NOT NULL COMMENT 'the total hours that a major requires for graduation',
  PRIMARY KEY (`major_id`),
  UNIQUE KEY `major_name` (`major_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COMMENT='This is the Major the student has';