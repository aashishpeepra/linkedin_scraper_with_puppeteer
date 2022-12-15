const fs = require("fs");

function writeJsonToFile(data, fileName) {
  fs.writeFileSync(fileName, JSON.stringify(data));
}

function readJsonFromFile(fileName) {
  return JSON.parse(fs.readFileSync(fileName));
}
module.exports = {
  writeJsonToFile,
  readJsonFromFile
};