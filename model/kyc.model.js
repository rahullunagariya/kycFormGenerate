const mongoose = require("mongoose");

const kyc = new mongoose.Schema(
  {
    name: { type: String, required: "name is Required!" },
    address: { type: String, required: "address is Required!" },
    email: { type: String, required: "address is Required!" },
    phone: { type: Number, required: "phone is Required!" },
    aadhar: { type: String, required: "aadhar is Required!" },
    pancard: { type: String, required: "pancard is Required!" },
    image: { type: String, required: "image is Required!" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("kyc", kyc);
