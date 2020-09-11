const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  modelo: {
    type: String,
    require: true,
  },
  ano: {
    type: String,
    require: true,
  },
  versao: {
    type: String,
    require: true,
  },
  estado: {
    type: String,
    require: true,
  },
  precos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Price',
    },
  ],
  imagemUrl: {
    type: String,
    require: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);