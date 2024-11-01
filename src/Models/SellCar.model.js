const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    enum: ['Karachi', 'Lahore', 'Islamabad', 'Other'], 
  },
  cityArea: {
    type: String,
    required: true,
  },
  registerIn: {
    type: String,
    required: true,
    enum: ['Punjab', 'Sindh', 'KPK', 'Balochistan'], 
  },
  modelYear: {
    type: Number,
    required: true,
    min: 1900, 
    max: new Date().getFullYear(),
  },
  make: {
    type: String,
    required: true,
    enum: ['Toyota', 'Honda', 'Suzuki', 'Other'],
  },
  model: {
    type: String,
    required: true,
  },
  exteriorColor: {
    type: String,
    required: true,
  },
  engineType: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'], 
  },
  engineCapacity: {
    type: Number,
    required: true,
    min: 0, 
  },
  assembly: {
    type: String,
    required: true,
    enum: ['Local', 'Imported'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  mileageDriven: {
    type: Number,
    required: true,
    min: 0,
  },
  transmission: {
    type: String,
    required: true,
    enum: ['Automatic', 'Manual'],
  },
  features: {
    airBags: { type: Boolean, default: false },
    abs: { type: Boolean, default: false },
    alloyRim: { type: Boolean, default: false },
  },
  adDescription: {
    type: String,
    required: true,
  },
  contactInformation: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: String,
      required: true,
    },
  ],
}, { timestamps: true });


module.exports = mongoose.model('Sell_Cars', carSchema);
