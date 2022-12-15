/**
 * Keeping mapping for env variables
 */
require("dotenv").config();
const ENV_DATA = {
  EMAIL: process.env["EMAIL"],
  PASSWORD: process.env["PASSWORD"],
};

module.exports = {
  validateEnv: function () {
    let valid = true;
    //this function validates if all the keys present in the ENV files are defined
    Object.keys(ENV_DATA).forEach((key) => {
      if (ENV_DATA[key] == undefined) {
        console.log("failing for ", key);
        valid = false;
      }
    });
    return valid;
  },
  ENV_DATA,
};
