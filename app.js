const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.options("*", cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

const fetchApiResponse = async (symbol) => {
  const response = await axios.get(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol.toUpperCase()}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.PRIVATE_KEY,
      },
    }
  );
  return response.data;
};

app.get("/api/token/:tokenId", async (req, res, next) => {
  const resp = await fetchApiResponse(req.params.tokenId);
  res.send(resp);
});

module.exports = app;
