const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/deppbreath")
  .then(() => console.log("connected"))
  .catch((err) => console.error("error in mongodb connection"));
