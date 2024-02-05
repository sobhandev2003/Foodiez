const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    Buyer_Id:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String
  }
});

const Address = mongoose.model('DeliveryAddress', addressSchema);

module.exports = Address;
