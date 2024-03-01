const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  Buyer_Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Buyer Id give mandatory"],
  },
  country: {
    type: String,
    required: [true, "Country give mandatory"]
  },
  state: {
    type: String,
    required: [true, "State give mandatory"]
  },
  district: {
    type: String,
    required: [true, "District give mandatory"]
  },
  postCode: {
    type: String,
    required: [true, "postCode give mandatory"]
  },
  city: {
    type: String,
    required: [true, "City give mandatory"]
  },

  street: {
    type: String,
    required: [true, "Street give mandatory"]
  },
  additionalInfo: {
    type: String
  }
});

const Address = mongoose.model('DeliveryAddress', addressSchema);

module.exports = Address;
