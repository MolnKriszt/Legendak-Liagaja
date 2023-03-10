--
-- Script was generated by Devart dbForge Studio 2019 for MySQL, Version 8.1.22.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 2023. 03. 09. 18:01:32
-- Server version: 5.5.5-10.4.27-MariaDB
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

DROP DATABASE IF EXISTS leagueoflegends;

CREATE DATABASE IF NOT EXISTS leagueoflegends
	CHARACTER SET utf8
	COLLATE utf8_hungarian_ci;

--
-- Set default database
--
USE leagueoflegends;

--
-- Create table `teams`
--
CREATE TABLE IF NOT EXISTS teams (
  id INT(11) NOT NULL AUTO_INCREMENT,
  TeamName VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 7,
AVG_ROW_LENGTH = 2730,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create table `ranks`
--
CREATE TABLE IF NOT EXISTS ranks (
  id INT(11) NOT NULL AUTO_INCREMENT,
  rank VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 11,
AVG_ROW_LENGTH = 1638,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create table `lanes`
--
CREATE TABLE IF NOT EXISTS lanes (
  id INT(11) NOT NULL AUTO_INCREMENT,
  lane VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 6,
AVG_ROW_LENGTH = 3276,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create table `players`
--
CREATE TABLE IF NOT EXISTS players (
  id INT(11) NOT NULL AUTO_INCREMENT,
  Name VARCHAR(50) NOT NULL,
  laneid INT(11) NOT NULL,
  teamid INT(11) NOT NULL,
  rankid INT(11) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 125,
AVG_ROW_LENGTH = 546,
CHARACTER SET utf8,
COLLATE utf8_hungarian_ci;

--
-- Create foreign key
--
ALTER TABLE players 
  ADD CONSTRAINT FK_players_lanes_id FOREIGN KEY (laneid)
    REFERENCES lanes(id);

--
-- Create foreign key
--
ALTER TABLE players 
  ADD CONSTRAINT FK_players_ranks_id FOREIGN KEY (rankid)
    REFERENCES ranks(id);

--
-- Create foreign key
--
ALTER TABLE players 
  ADD CONSTRAINT FK_players_teams_id FOREIGN KEY (teamid)
    REFERENCES teams(id) ON DELETE NO ACTION;

DELIMITER $$

--
-- Create procedure `GenTables`
--
CREATE DEFINER = 'localhost'@'root'
PROCEDURE GenTables()
BEGIN
#delete
DELETE
  FROM players;
DELETE
  FROM lanes;
DELETE
  FROM ranks;
DELETE
  FROM teams;

#insert the lanes
INSERT INTO lanes (id, lane)
  VALUES (1, 'Top'), (2, 'Jungle'), (3, 'Mid'), (4, 'Adc'), (5, 'Support');

# insert the ranks
INSERT INTO ranks (id, rank)
  VALUES (1, 'Iron'), (2, 'Bronz'), (3, 'Silver'), (4, 'Gold'), (5, 'Platinum'), (6, 'Diamond'), (7, 'Master'), (8, 'Grandmaster'), (9, 'Challenger'), (10, 'Unranked');

#insert the teams
INSERT INTO teams (id, TeamName)
  VALUES (1, 'EDG'),
  (2, 'T1'),
  (3, 'RNG'),
  (4, 'G2 ESPORTS'),
  (5, 'DWG KIA'),
  (6, 'Tic-Tac Tac-Tic-ai Hadjárat');

#insert the players
INSERT INTO players (Name, laneid, teamid, rankid)
  VALUES
  #T1
  ('Zeus', 1, 2, 9), ('Oner', 2, 2, 9), ('Faker', 3, 2, 9), ('Gumayusi', 4, 2, 9), ('Keria', 5, 2, 8),
  #EDG
  ('Ale', 1, 1, 8), ('Jiejie', 2, 1, 8), ('FoFo', 3, 1, 7), ('Leave', 4, 1, 10), ('Meiko', 5, 1, 9),
  #RNG
  ('Breathe', 1, 3, 8), ('Wei', 2, 3, 6), ('Angel', 3, 3, 9), ('GALA', 4, 3, 6), ('Ming', 5, 3, 6),
  #G2 ESPORTS
  ('BrokenBlade', 1, 4, 9), ('Yike', 2, 4, 8), ('Caps', 3, 4, 9), ('Hans Sama', 4, 4, 9), ('Mikyx', 5, 4, 9),
  #DWG KIA
  ('Canna', 1, 5, 8), ('Canyon', 2, 5, 9), ('ShowMaker', 3, 5, 9), ('Deft', 4, 5, 8), ('Kellin', 5, 5, 9),
  #Tic-Tac Tac-Tic-ai Hadjárat
  ('Simp For Komi', 1, 6, 2), ('Hide on Poloska', 2, 6, 2), ('Simp for Uzaki', 3, 6, 2), ('Blady7', 4, 6, 3), ('imbence54', 5, 6, 2), ('X3yley', 2, 3, 1);

SELECT
  *
FROM lanes;
SELECT
  *
FROM teams;
SELECT
  *
FROM ranks;
SELECT
  *
FROM players;

SELECT
  p.Name,
  l.lane,
  r.rank,
  t.TeamName
FROM players AS p
  INNER JOIN lanes l
    ON p.laneid = l.id
  INNER JOIN ranks r
    ON p.rankid = r.id
  INNER JOIN teams t
    ON p.teamid = t.id;

END
$$

DELIMITER ;

-- 
-- Dumping data for table teams
--
INSERT INTO teams VALUES
(1, 'EDG'),
(2, 'T1'),
(3, 'RNG'),
(4, 'G2 ESPORTS'),
(5, 'DWG KIA'),
(6, 'Tic-Tac Tac-Tic-ai Hadjárat');

-- 
-- Dumping data for table ranks
--
INSERT INTO ranks VALUES
(1, 'Iron'),
(2, 'Bronz'),
(3, 'Silver'),
(4, 'Gold'),
(5, 'Platinum'),
(6, 'Diamond'),
(7, 'Master'),
(8, 'Grandmaster'),
(9, 'Challenger'),
(10, 'Unranked');

-- 
-- Dumping data for table lanes
--
INSERT INTO lanes VALUES
(1, 'Top'),
(2, 'Jungle'),
(3, 'Mid'),
(4, 'Adc'),
(5, 'Support');

-- 
-- Dumping data for table players
--
INSERT INTO players VALUES
(94, 'Zeus', 1, 2, 9),
(95, 'Oner', 2, 2, 9),
(96, 'Faker', 3, 2, 9),
(97, 'Gumayusi', 4, 2, 9),
(98, 'Keria', 5, 2, 8),
(99, 'Ale', 1, 1, 8),
(100, 'Jiejie', 2, 1, 8),
(101, 'FoFo', 3, 1, 7),
(102, 'Leave', 4, 1, 10),
(103, 'Meiko', 5, 1, 9),
(104, 'Breathe', 1, 3, 8),
(105, 'Wei', 2, 3, 6),
(106, 'Angel', 3, 3, 9),
(107, 'GALA', 4, 3, 6),
(108, 'Ming', 5, 3, 6),
(109, 'BrokenBlade', 1, 4, 9),
(110, 'Yike', 2, 4, 8),
(111, 'Caps', 3, 4, 9),
(112, 'Hans Sama', 4, 4, 9),
(113, 'Mikyx', 5, 4, 9),
(114, 'Canna', 1, 5, 8),
(115, 'Canyon', 2, 5, 9),
(116, 'ShowMaker', 3, 5, 9),
(117, 'Deft', 4, 5, 8),
(118, 'Kellin', 5, 5, 9),
(119, 'Simp For Komi', 1, 6, 2),
(120, 'Hide on Poloska', 2, 6, 2),
(121, 'Simp for Uzaki', 3, 6, 2),
(122, 'Blady7', 4, 6, 3),
(123, 'imbence54', 5, 6, 2),
(124, 'X3yley', 2, 3, 1);

-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;