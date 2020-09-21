  CREATE TABLE `courses` (
  `Course_Number` varchar(45) NOT NULL COMMENT 'This is the Primary Key for the Course listings',
  `Course_Name` varchar(45) NOT NULL COMMENT 'This is the Name of the Course listing',
  `Course_Professor_Full_Name` varchar(45) NOT NULL DEFAULT 'Faculty' COMMENT 'This is the Full name of the professor',
  `Course_Semester` varchar(8) NOT NULL COMMENT 'This is the semester that a Course runs durings',
  `Course_Credit` int(11) NOT NULL DEFAULT 0 COMMENT 'This is the Credit amount that a course is worth',
  `Course_Start_Time` time DEFAULT NULL COMMENT 'This is the start time of the Course',
  `Course_End_Time` time DEFAULT NULL COMMENT 'This is the end time of the Course',
  `Course_Room` varchar(45) DEFAULT 'TBD' COMMENT 'This is the Room that the Course will be taught in. E.X. HSH 211',
  `Course_Description` varchar(800) DEFAULT 'None' COMMENT 'This is the simple description about the Course',
  `Course_Department` varchar(45) DEFAULT NULL COMMENT 'This is the Department that the course is based in',
  `Course_Level` int(11) NOT NULL DEFAULT 0 COMMENT 'This is the level that the Course is listed at.',
  PRIMARY KEY (`Course_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;