const express = require("express");
const fs = require("fs");
const app = express();

// read the db.json file and parse it to JSON
const db = JSON.parse(fs.readFileSync("./db.json"));

// handling CORS
/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); */

// route for handling requests from the Angular client
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello GEEKS FOR GEEKS Folks from the Express server!" });
});
app.get("/api/checkUser", (req, res) => {
  for (let user of db.users) {
    if (
      user.username == req.query.username &&
      user.password == req.query.password
    ) {
      res.json({ message: "success" });
      return;
    }
  }
  res.json({ message: "fail" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
