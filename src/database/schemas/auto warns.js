const { model, Schema } = require("mongoose");

const E = new Schema({  }, { strict: false });

module.exports = model("auto warns", E);