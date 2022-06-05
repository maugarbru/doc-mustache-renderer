const express = require("express");
const jwt = require("jsonwebtoken");

const config = require("../config");
const app = express.Router();
const service = require("../services/files");

const rutasProtegidas = express.Router();

rutasProtegidas.use((req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, config.api_key, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(403).send({ message: "Token inválido" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Token no incluido" });
  }
});

app.post("/read/", rutasProtegidas, (req, res) => {
  const file = req.files.file;
  service
    .readTemplate(file)
    .then((response) => {
      res
        .status(201)
        .send({ message: "Read Template correcto", info: response });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ message: "Error render", info: error });
    });
});

app.post("/render/", rutasProtegidas, (req, res) => {
  const body = req.body;
  const file = req.files.file;
  service
    .renderTemplate(body, file)
    .then((response) => {
      res
        .status(201)
        .send({ message: "Render correcto", info: response });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ message: "Error render", info: error });
    });
});

module.exports = app;
