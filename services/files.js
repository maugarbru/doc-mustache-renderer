const config = require("../config");
const Mustache = require("mustache");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const readTemplate = async (file) => {
  const buffer = fs.readFileSync(file.tempFilePath);
  const data = await pdfParse(buffer);

  return Mustache.parse(data.text)
    .filter((tag) => tag[0] === "name")
    .map((v) => v[1]);
};

const renderTemplate = async (data, file) => {
  console.log(data);
  console.log(file);
};

module.exports = {
  readTemplate,
  renderTemplate,
};
