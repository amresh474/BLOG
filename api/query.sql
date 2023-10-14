
-- connect to mysql 
 mysql -u root -p 

-- create database 
CREATE DATABASE blog


Show Database

-- table details 
Describe <table> 

 -- use database 
 USE blog

-- show table from db 
 SHOW TABLES;

 -- show column name from table 
 SHOW COLUMNS FROM blog.users;

-- show hostname of sql
select @@hostname;

-- processlist 
show processlist;

-- create user tbale 
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(225) NOT NULL,
  `password` varchar(225) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- create table 
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(225) NOT NULL,
  `desc` varchar(1225) DEFAULT NULL,
  `img` varchar(225) DEFAULT NULL,
  `cat` varchar(45) NOT NULL,
  `date` datetime DEFAULT NULL,
  `uid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_idx` (`uid`),
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;





--- doker command ----
docker build -f Dockerfile.dev -t stylerhun/multi-server .
docker run -it -p 4003:5000 stylerhun/multi-server   