// index.js
const express = require('express');
const cors = require('cors');
const morgan = require("morgan")
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const db = require("./config/db");

// Importing the routes
const userRoutes = require("./routes/useRoutes");
const attRoutes = require("./routes/attendanceRoute")

// Frontend for cors
const localfrontend = "http://localhost:3000"
// cors
const corsOptions = {
  origin: localfrontend,
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("tiny"));
app.use(cors(corsOptions));
app.use(express.json()); // for server to accept json data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

// Define your routes here
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/att",attRoutes);


app.get("/home",(req,res)=>{
  console.log("reached home");
  res.send("Reached home");
})

// calling db and then running the server
db.sync()
  .then(() => {
    console.log('Database models synchronized');
    // Start the server after the database is synced
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error synchronizing database models:', err);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // You can perform cleanup tasks here if needed

  // Terminate the application gracefully
  process.exit(1); // 1 indicates an error, you can use a different exit code if desired
});


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'Reason:', reason);
  // You can perform cleanup tasks here if needed
});
