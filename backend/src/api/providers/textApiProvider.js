const axios = require("axios");

const baseUrl = "https://loripsum.net/api";

exports.getRandomText = async () => {
    let response = await axios.get(baseUrl + "/plaintext", {responseType: "text"});
    return response.data;
}