const axios = require('axios');

app.get("/input", async (req, res) => {
  try {
    const enteredQuery = req.query.sendInput;

    // Make an HTTP request to the Python service
    const response = await axios.post('http://python-service-url/predict', {
      input: enteredQuery
    });

    const prediction = response.data.prediction;

    // Send the prediction as the response
    res.json({ prediction });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
});