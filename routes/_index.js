const config = require("../config");
const jwt = require("jsonwebtoken");
const express = require("express");

const app = express.Router();

app.use("/files/", require("./files"));

app.post("/auth/", (req, res) => {
  const body = req.body;
  const auth = config.authentication;

  if (body.username == auth.username && body.password == auth.password) {
    const token = jwt.sign({ admin: true }, config.api_key, {
      expiresIn: "12h",
    });
    res
      .status(200)
      .send({ message: "Ingreso correctamente", token: token, access: true });
  } else {
    res
      .status(403)
      .send({ message: "Credenciales incorrectas", access: false });
  }
});

app.use(function (req, res, next) {
  res.status(404).send({
    success: false,
    message: "Not found",
  });
});

module.exports = app;
