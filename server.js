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
app.get("/api/woop/user/check", (req, res) => {
  updateDB();
  for (let user of db.users) {
    if (
      user.userName == req.query.userName &&
      user.password == req.query.password
    ) {
      res.json({
        level: user.level,
        userName: user.userName,
        darkmode: user.darkmode,
      });
      return;
    }
  }
  res.json({ level: 0, userName: "" });
});

app.post("/api/woop/user/setdarkmode", (req, res) => {
  updateDB();
  for (let user of db.users) {
    if (user.userName == req.body.userName) {
      user.darkmode = req.body.darkmode;
      saveDB();
      res.json({ ok: true });
      return;
    }
  }
  res.json({ ok: false });
});

app.get("/api/woop/chapter/get/all", (req, res) => {
  updateDB();
  res.json(db.chapters);
});
app.get("/api/woop/chapter/verify", (req, res) => {
  updateDB();
  console.log(req.query.title);
  console.log(req.query.password);
  for (let i in db.chapters) {
    if (
      db.chapters[i].title == req.query.title &&
      db.chapters[i].config.password == req.query.password
    ) {
      console.log("chapter verified");
      res.json({ ok: true, message: "Chapter verified" });
      return;
    }
  }
  console.log("chapter not verified");
  res.json({ ok: false, message: "Could not verify chapter" });
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
