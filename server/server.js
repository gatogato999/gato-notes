const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// notes and users
const authRoutes = require("./authRoutes");
const noteRoutes = require("./noteRoutes");

require("dotenv").config();
const app = express();

// middle ware
app.use(morgan("combined"));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", noteRoutes);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
