CREATE TABLE `student_user` (
  `user_id` int(11) NOT NULL,
  `stu_id` int(11) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;