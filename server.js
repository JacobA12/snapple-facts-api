require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

//client options provided by MongoDB
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

//connect to MongoDB database
mongoose
  .connect(process.env.MONGO_URI, clientOptions)
  .then(() => {
    console.log("Connected to MongoDB");

    //Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("mongoDB connection error:", err);
  });

app.use(express.json());
app.use("/api/facts", require("./routes/facts"));
