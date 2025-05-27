// Add this with your other route imports
const favoriteRoutes = require("./routes/favoriteRoutes");

// Add this with your other app.use statements
app.use("/api/favorites", favoriteRoutes);