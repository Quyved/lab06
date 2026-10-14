const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  calories: {
    type: Number,
    default: 0,
    min: [0, "Calories không được âm"],
  },
});

module.exports = mongoose.model("Food", foodSchema);
