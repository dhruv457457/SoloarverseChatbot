const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Function to make a request to the external API
async function fetchAIResponse(userQuery) {
    const payload = {
        messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userQuery } // User's question from frontend
        ]
    };

    try {
        const response = await axios.post(
            'https://michaelyuan.gaianet.network/v1/chat/completions', // API endpoint
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    // 'Authorization': 'Bearer YOUR_API_KEY' // Uncomment if you need to use an API key
                }
            }
        );
        // Return the AI's response from the API
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching AI response:', error);
        return 'An error occurred while fetching the response from the AI.';
    }
}

// Endpoint to handle user chat requests
app.post('/api/chat', async (req, res) => {
    const userQuery = req.body.query; // Get the user's message from the request body
    const aiResponse = await fetchAIResponse(userQuery); // Get the AI's response
    res.json({ reply: aiResponse }); // Send the AI's response back to the client
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
