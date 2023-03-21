const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
    apiKey: "#########",
    // organization: "Personal",
});
const apiClient = new OpenAIApi(config);
module.exports=apiClient;