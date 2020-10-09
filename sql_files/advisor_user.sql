CREATE TABLE `advisor_user` (
  `user_id` int(11) NOT NULL,
  `adv_id` int(11) NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `stu_id` (`stu_id`),
  CONSTRAINT `advisor_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `advisor_user_ibfk_2` FOREIGN KEY (`adv_id`) REFERENCES `advisor` (`adv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
