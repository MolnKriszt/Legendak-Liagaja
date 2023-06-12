
#auto gen tables
CALL GenTables();

  #Selects
SELECT * FROM lanes;
SELECT * FROM teams;
SELECT * FROM ranks;
SELECT * FROM players;

SELECT p.id,p.Name,l.lane,r.rank,t.TeamName FROM players as p
  INNER JOIN lanes l on p.laneid = l.id
  INNER JOIN ranks r on p.rankid = r.id
  INNER JOIN teams t on p.teamid = t.id
  WHERE p.id = 94;


INSERT INTO players
  (Name,laneid,teamid,rankid)
  VALUES
  ()

SELECT * FROM players
  WHERE id = 1;


  