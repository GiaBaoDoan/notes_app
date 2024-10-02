const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./connect.js");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes.js");
const noteRoutes = require("./routes/note.routes.js");
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


// routes
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// run port
app.listen(PORT, () => {
  connectDB();
  console.log(`App is running on ${PORT}`);
});
