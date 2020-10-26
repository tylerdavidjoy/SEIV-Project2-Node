CREATE TABLE `advisor_user` (
  `user_id` int(11) NOT NULL,
  `adv_id` int(11) NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  FOREIGN KEY (`adv_id`) REFERENCES `advisor` (`adv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
