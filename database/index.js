const connectDB = require("./config/db");

// Load models
require("./models/User");
require("./models/Resource");
require("./models/Allocation");

// Connect database
connectDB();

console.log("Database initialized successfully");