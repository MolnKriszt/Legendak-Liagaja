
  # insert the lanes
INSERT INTO lanes
  (id, lane)
  VALUES
  (1,'Top'),(2,'Jungle'),(3,'Mid'),(4,'Adc'),(5,'Support');

  # insert the ranks
INSERT INTO ranks
  (id, rank)
  VALUES
  (1,'Iron'),(2,'Bronz'),(3,'Silver'),(4,'Gold'),(5,'Platinum'),(6,'Diamond'),(7,'Master'),(8,'Grandmaster'),(9,'Challenger'),(10,'Unranked');

  #insert the teams
INSERT INTO teams
  (id, TeamName)
  VALUES
  (1,'EDG'),
  (2,'T1'),
  (3,'RNG'),
  (4,'G2 ESPORTS'),
  (5,'DWG KIA'),
  (6,'Tic-Tac Tac-Tic-ai Hadjárat');

  #insert the players
INSERT INTO players
  (Name,laneid,teamid,rankid)
  VALUES
    #T1
  ('Zeus',1,2,9),('Oner',2,2,9),('Faker',3,2,9),('Gumayusi',4,2,9),('Keria',5,2,8),
    #EDG
  ('Ale',1,1,8),('Jiejie',2,1,8),('FoFo',3,1,7),('Leave',4,1,10),('Meiko',5,1,9),
    #RNG
  ('Breathe',1,3,8),('Wei',2,3,6),('Angel',3,3,9),('GALA',4,3,6),('Ming',5,3,6),
    #G2 ESPORTS
  ('BrokenBlade',1,4,9),('Yike',2,4,8),('Caps',3,4,9),('Hans Sama',4,4,9),('Mikyx',5,4,9),
    #DWG KIA
  ('Canna',1,5,8),('Canyon',2,5,9),('ShowMaker',3,5,9),('Deft',4,5,8),('Kellin',5,5,9),
    #Tic-Tac Tac-Tic-ai Hadjárat
  ('Simp For Komi',1,6,2),('Hide on Poloska',2,6,2),('Simp for Uzaki',3,6,2),('Blady7',4,6,3),('imbence54',5,6,2);

  #Selects
SELECT * FROM lanes;
SELECT * FROM teams;
SELECT * FROM ranks;
SELECT * FROM players;

SELECT p.Name,l.lane,r.rank,t.TeamName FROM players as p
  INNER JOIN lanes l on p.laneid = l.id
  INNER JOIN ranks r on p.rankid = r.id
  INNER JOIN teams t on p.teamid = t.id;
