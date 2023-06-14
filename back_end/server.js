require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();
const sanitizeHtml = require("sanitize-html");
const cors = require("cors"); 

const pool = require("./config/database.js");
const {
  sendingGet,
  sendingGetError,
  sendingGetById,
  sendingPost,
  sendingPut,
  sendingDelete,
  sendingInfo,
} = require("./config/sending.js");

//#region middlewares
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
//#endregion middlewares

//#region players
app.get("/players", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = `SELECT p.id,p.Name,l.lane,r.id as rankid,r.rank,t.TeamName FROM players as p
    INNER JOIN lanes l on p.laneid = l.id
    INNER JOIN ranks r on p.rankid = r.id
    INNER JOIN teams t on p.teamid = t.id;`;
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});
//#region oderby
  //oder by name
  app.get("/OrByName", (req, res) => {
    pool.getConnection(function (error, connection) {
      if (error) {
        sendingInfo(res, 0, "server error", [], 403)
        return;
      }
      const sql = `SELECT p.id,p.Name,l.lane,r.rank,t.TeamName FROM players as p
      INNER JOIN lanes l on p.laneid = l.id
      INNER JOIN ranks r on p.rankid = r.id
      INNER JOIN teams t on p.teamid = t.id;
      ORDER by p.Name`;
      connection.query(sql, (error, results, fields) => {
        sendingGet(res, error, results);
      });
      connection.release();
    });
  });
//#endregion orderby


app.get("/player/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = `
    SELECT p.Name,l.lane,r.rank,t.TeamName FROM players as p
  INNER JOIN lanes l on p.laneid = l.id
  INNER JOIN ranks r on p.rankid = r.id
  INNER JOIN teams t on p.teamid = t.id
  WHERE p.id = ?

  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/players", (req, res) => {
  console.log(req.body);
  const newR = {
    Name: mySanitizeHtml(req.body.Name),
    laneid: mySanitizeHtml(req.body.laneid),
    teamid: +mySanitizeHtml(req.body.teamid),
    rankid: +mySanitizeHtml(req.body.rankid)
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT INTO players
      (Name, laneid, teamid, rankid)
      VALUES
      (?, ?, ?, ?)
    `;
    connection.query(
      sql,
      [newR.Name, newR.laneid, newR.teamid, newR.rankid],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/players/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    Name: mySanitizeHtml(req.body.Name),
    laneid: mySanitizeHtml(req.body.laneid),
    teamid: +mySanitizeHtml(req.body.teamid),
    rankid: +mySanitizeHtml(req.body.rankid)
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE players SET
    Name = ?,
    laneid = ?,
    teamid = ?,
    rankid = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.Name, newR.laneid, newR.teamid, newR.rankid, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/players/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    DELETE from players
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

//#endregion players

//#region teams
app.get("/teams", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = "SELECT * FROM teams";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/teams/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = `
    SELECT * FROM teams
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/teams", (req, res) => {
  console.log(req.body);
  const newR = {
    id: mySanitizeHtml(req.body.id),
    TeamName: mySanitizeHtml(req.body.TeamName)
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }
    const sql = `
    INSERT INTO teams
    (TeamName)
    VALUES
    (?)
    `;
    connection.query(
      sql,
      [newR.id, newR.TeamName],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/teams/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    id: mySanitizeHtml(req.body.id),
    TeamName: mySanitizeHtml(req.body.TeamName)
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    UPDATE teams SET
    id = ?,
    TeamName = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.id, newR.TeamName, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/teams/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403);
      return;
    }

    const sql = `
    DELETE from teams
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

//#endregion trips

//#region lanes
app.get("/lanes", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "server error", [], 403)
      return;
    }
    const sql = "SELECT * FROM lanes";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});
//#endregion lanes

function mySanitizeHtml(data) {
  return sanitizeHtml(data, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
