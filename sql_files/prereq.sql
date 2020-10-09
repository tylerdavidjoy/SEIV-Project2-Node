CREATE TABLE `course_prereq` (
    `course_id` INT(11) NOT NULL COMMENT 'This is the id of the course that requires prereq classes',
    `prereq_id` INT(11) NOT NULL COMMENT 'This is the id of the rereq class that is required',
    KEY `course_prereq_ibfk_1` (`course_id`),
    KEY `course_prereq_ibfk_2` (`prereq_id`),
    CONSTRAINT `course_prereq_ibfk_1` FOREIGN KEY (`course_id`)
        REFERENCES `courses` (`Course_Id`)
        ON DELETE CASCADE,
    CONSTRAINT `course_prereq_ibfk_2` FOREIGN KEY (`prereq_id`)
        REFERENCES `courses` (`Course_Id`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4 COMMENT='This is the Table for prerequired classes of a class.';