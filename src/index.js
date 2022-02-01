//#region imports
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const axios = require("axios").default;
//#endregion imports

//#region create app and dbS
const app = express();
app.use(express.static("./public"));
app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

//#endregion create app and db
const _NAME = "Twexdo";
const _TAG = "EUNE";
const fetchMMR = async (version, region, name, tag) => {
  return axios
    .get(
      `https://api.henrikdev.xyz/valorant/${version}/mmr/${region}/${name}/${tag}`
    )
    .then((response) => response.data.data);
};

const getAccount = async (name, tag) => {
  return axios
    .get(
      `https://api.henrikdev.xyz/valorant/v1/account/${encodeURI(
        name
      )}/${encodeURI(tag)}`
    )
    .then((response) => response.data.data);
};

app.get("/getAccount", async (req, res) => {
  const account = await getAccount(_NAME, _TAG);
  res.send(account);
});
app.get("/getPlayerMMR", async (req, res) => {
  const mmr = await fetchMMR("v1", "eu", _NAME, _TAG);
  res.send(mmr);
});
const port = 8081;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
