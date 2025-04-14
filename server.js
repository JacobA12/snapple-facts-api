const express = require("express");
const app = express();
const factsRoutes = require("./routes/facts");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/facts", factsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

