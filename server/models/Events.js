const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String
  },
  _id: {
    type: String
  },
  images: {
    type: String
  },
  // price_range: {
  //   type: Number,
  //   required: true,
  //   min: 0.99
  // },
  // quantity: {
  //   type: Number,
  //   min: 0,
  //   default: 0
  // }

});

const Events = mongoose.model('Events', eventSchema);

module.exports = Events;
