const cors = require("cors");

const corsMiddleware = cors({
  origin: "https://travista.vercel.app:3000", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

module.exports = corsMiddleware;
