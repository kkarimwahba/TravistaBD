const cors = require("cors");

const corsMiddleware = cors({
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

module.exports = corsMiddleware;
