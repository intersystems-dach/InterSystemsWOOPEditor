const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// read the db.json file and parse it to JSON
let db = readDB();

// handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/", (req, res) => {
  console.log("Hello World!");
  res.send("Hello World!");
});
// checks if the user exists in the db.json file
app.get("/api/woop/checkuser", (req, res) => {
  updateDB();
  for (let user of db.users) {
    if (
      user.userName == req.query.userName &&
      user.password == req.query.password
    ) {
      res.json({ level: user.level, userName: user.userName });
      return;
    }
  }
  res.json({ level: 0, userName: "" });
});
app.get("/api/woop/chapter/get/all", (req, res) => {
  updateDB();
  res.json(db.chapters);
});
// creates a new chapter in the db.json file
app.post("/api/woop/chapter/new", (req, res) => {
  updateDB();
  for (let c of db.chapters) {
    if (c.title == req.body.title) {
      res.json({ ok: false, message: "Chapter already exists" });
      return;
    }
  }

  req.body.verified = false;
  db.chapters.push(req.body);
  saveDB();
  res.json({ ok: true, message: "Chapter saved" });
});

// creates a new chapter in the db.json file
app.post("/api/woop/chapter/update", (req, res) => {
  updateDB();
  for (let i in db.chapters) {
    if (db.chapters[i].title == req.body.title) {
      req.body.verified = false;
      db.chapters[i] = req.body;
      saveDB();
      res.json({ ok: true, message: "Chapter updated" });
      return;
    }
  }
  res.json({ ok: false, message: "Could not find chapter" });
});

// creates a new chapter in the db.json file
app.post("/api/woop/chapter/delete", (req, res) => {
  updateDB();
  for (let i in db.chapters) {
    if (
      db.chapters[i].title == req.body.title &&
      db.chapters[i].config.password == req.body.config.password
    ) {
      db.chapters.splice(i, 1);
      saveDB();
      res.json({ ok: true, message: "Chapter deleted" });
      return;
    }
  }
  res.json({ ok: false, message: "Could not delete chapter" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

function saveDB() {
  fs.writeFileSync("./db.json", JSON.stringify(db));
}

function readDB() {
  return JSON.parse(fs.readFileSync("./db.json"));
}

function updateDB() {
  db = readDB();
}
