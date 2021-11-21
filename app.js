require("dotenv").config({ path: "./config.env" });
const express = require("express");
const path = require("path");
const app = express();
const hostname = "127.0.0.1";
//const port = process.env.PORT || 5000;
require("./src/db/conn");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use Router
app.use(require("./src/router/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api Running...");
  });
}

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
