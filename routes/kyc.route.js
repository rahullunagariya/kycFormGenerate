const router = require("express").Router();
const mongoose = require("mongoose");
var nodemailer = require("nodemailer");
const multer = require("multer");

const cors = require("cors");

const Kyc = mongoose.model("kyc");

router.use(cors());

let fileNewName = "";
let orgFileName = "";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/assets/images");
  },
  filename: function (req, file, cb) {
    console.log("filename");

    fileNewName = Date.now() + "*" + file.originalname;
    orgFileName = file.originalname;
    console.log("storage in" + orgFileName);
    //console.log(Date.now() + "-" + file.originalname);
    //fileNewName.push(Date.now() + "-" + file.originalname);

    cb(null, Date.now() + "*" + file.originalname);
  },
});

//var upload = multer({ storage: storage }).single("file");
var upload = multer({ storage: storage });

router.post("/regKyc", upload.single("image"), async function (req, res) {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    const file = req.image;
    const meta = req.body;

    let emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let aadharRegex = /^\d{4}\s\d{4}\s\d{4}$/;
    let pancardRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    if (!emailRegexp.test(meta.email)) {
      res.json({ msg: "Please Enter a valid email!" });
    } else if (!aadharRegex.test(meta.aadhar)) {
      res.json({ msg: "Please Enter a valid Aadhar card Number!" });
    } else if (!pancardRegex.test(meta.pancard)) {
      res.json({ msg: "Please Enter a valid Pan card Number!" });
    } else {
      //const updId = meta.id;
      //console.log(file);
      //console.log(meta);

      var kycData = new Kyc();
      kycData.name = meta.name;
      kycData.address = meta.address;
      kycData.email = meta.email;
      kycData.phone = meta.phone;
      kycData.aadhar = meta.aadhar;
      kycData.pancard = meta.pancard;
      kycData.image = fileNewName;

      Kyc.find({ aadhar: kycData.aadhar }, function (err, dataFind) {
        if (err) return console.log(err);
        //console.log(dataFind);
        if (dataFind.length > 0) {
          res.json({ msg: "Already Added this KycForm!" });
        } else {
          kycData.save();

          res.json({ msg: "success" });
        }
      });
    }
  } catch (error) {
    res.json({ errMsg: "error" });

    console.log("Error : " + error);
  }
});

module.exports = router;
