const express = require("express");
const cors = require("cors");
const path = require("path");
const { PORT } = require("./config");
const dbConnect = require("./config/db/database");
const routes = require("./routes");

const app = express();

// db connection
dbConnect();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api", routes);

// deployment
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
