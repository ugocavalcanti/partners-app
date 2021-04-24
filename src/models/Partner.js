const mongoose = require("mongoose");

const partnerModel = new mongoose.Schema({
    tradingName: {
        type: String
    },
    ownerName: {
        type: String
    },
    document: {
        type: String,
        unique: true
    },
    coverageArea: {
        type: {
            type: String,
            enum: ["MultiPolygon"],
            required: true
          },
          coordinates: {
            type: [[[[Number]]]],
            required: true
          }
      },
    address: {
        type: {
          type: String,
          enum: ["Point"],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

partnerModel.index({
  coverageArea: "2dsphere"
});
partnerModel.index({
  address: "2dsphere"
})

module.exports = mongoose.model("partners", partnerModel);