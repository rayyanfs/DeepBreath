const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const dareRoutes = require("./routes/questions");
app.use(cors());
require("./connection");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
app.use(express.json());
app.use("/api", authRoutes);
// login and register api
app.use("/api/dares", dareRoutes);
// gives us the dares
// bascially saying anything starting with /api sned to authroutes

app.use("/api", userRoutes);
// gettign and updating points

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
