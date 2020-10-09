CREATE TABLE `student_user` (
  `user_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `stu_id` (`stu_id`),
  CONSTRAINT `student_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `student_user_ibfk_2` FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;