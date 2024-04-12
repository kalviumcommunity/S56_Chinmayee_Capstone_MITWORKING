require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use("/", routes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, (err) => {
    if (err) console.error(err);
    else console.log(`server running on PORT: ${PORT}`);
  });
}

mongoose
  .connect(
    process.env.MONGO_DB
  )
  .then(() => app.listen(PORT, () => console.log("listening"))).catch((error)=>console.log(error))
