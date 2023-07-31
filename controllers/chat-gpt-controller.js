const axios = require("axios"); // Import axios
const bodyParser = require('body-parser')

const postChatGPTResponse = async (req, res, next) => {
  const { data } = req.body;

  try {
    // Assuming you have set the API key in a .env file as CHATGPT_API_KEY
    const apiKey = process.env.CHATGPT_API_KEY;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    // Make a POST request to the ChatGPT API endpoint
    const chatGptResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: data,
          },
        ],
      },
      { headers }
    );

    // Extracting the chatGptResponse data and sending it back to the frontend
    res.json({ response: chatGptResponse.data.choices[0].message.content });
  } catch (error) {
    console.error("Error communicating with ChatGPT API:", error.message);
    res.status(500).json({ error: "Error processing the request" });
  }
};
exports.postChatGPTResponse = postChatGPTResponse;
