const { Configuration, OpenAIApi } = require("openai");
const { CHATGPT_KEY } = require("./config.js");
const config = new Configuration({
    apiKey: CHATGPT_KEY
});
const apiClient = new OpenAIApi(config);
module.exports = apiClient;