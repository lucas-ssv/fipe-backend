const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  precoMinimo: {
    type: String,
    require: false,
  },
  precoMedio: {
    type: String,
    require: false,
  },
  precoMaximo: {
    type: String,
    require: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Price', PriceSchema);