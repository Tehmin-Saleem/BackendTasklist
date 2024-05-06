// config/cors.js
const cors = require("cors");

// Define whitelist of allowed origins
const whitelist = ["http://localhost:5173", "http://localhost:3000","http://localhost:3000/api/notifications",
"http://localhost:3000/api/tasks"
];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed HTTP methods
  
};

module.exports = cors(corsOptions);
