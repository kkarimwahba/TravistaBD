// controllers/packagesController.js
const axios = require("axios");

// Controller function to fetch packages from Odoo API
const listPackages = async (req, res) => {
  try {
    // Make a POST request to the Odoo API
    const response = await axios.post(
      "http://82.129.226.164:8069/api/list_crm_pacakge",
      {
        // If the API expects a request body, include it here
        // For example, if the API requires some data like an ID or filter
        // data: req.body  // Uncomment this if you are passing data from the request
      },
      {
        headers: {
          Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with your actual token
          "Content-Type": "application/json", // Adjust if needed by the API
        },
      }
    );

    // Return the fetched data as a JSON response
    return res.status(200).json(response.data);
  } catch (error) {
    // Log detailed error information
    console.error("Error details:", error);

    // Check if the error is due to a network or server issue
    if (error.response) {
      // The server responded with a status other than 200
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Error request:", error.request);
      return res.status(500).json({ error: "No response from Odoo API" });
    } else {
      // Something went wrong in setting up the request
      console.error("Error message:", error.message);
      return res
        .status(500)
        .json({ error: "Error in making request to Odoo API" });
    }
  }
};

module.exports = { listPackages };
