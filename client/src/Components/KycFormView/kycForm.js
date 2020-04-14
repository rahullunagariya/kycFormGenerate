import React from "react";
import { connect } from "react-redux";
import {
  inputChangeHandlar,
  getFileHandlar,
  kycFormSubmitInfoHandlar,
} from "../../myActions/kycFormAction";
import "../../assets/css/kycForm.scss";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class KycForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errMsg: "", fileCheck: "" };
  }

  formValidationHandlar() {
    let nameRegex = /^[a-zA-z ]+$/;
    let mobileregex = /^[0-9]{10}$/;
    let emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let aadharRegex = /^\d{4}\s\d{4}\s\d{4}$/;
    let pancardRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;

    // 1234 1324 1324 - test adhar no
    //CEQPK4956K - test pan no

    if (this.props.name === "" || !nameRegex.test(this.props.name)) {
      this.setState({ errMsg: "Invalid name!" });
      return false;
    } else if (this.props.address === "") {
      this.setState({ errMsg: "Please enter address!" });
      return false;
    } else if (this.props.email === "" || !emailRegexp.test(this.props.email)) {
      this.setState({ errMsg: "Please enter valid Email Id!" });
      return false;
    } else if (this.props.phone === "" || !mobileregex.test(this.props.phone)) {
      this.setState({ errMsg: "Invalid phone number!" });
      return false;
    } else if (
      this.props.aadhar === "" ||
      !aadharRegex.test(this.props.aadhar)
    ) {
      this.setState({ errMsg: "Invalid aadhar number!" });
      return false;
    } else if (
      this.props.pancard === "" ||
      !pancardRegex.test(this.props.pancard)
    ) {
      this.setState({ errMsg: "Invalid pancard number!" });
      return false;
    } else if (this.state.fileCheck !== "") {
      //this.setState({ errMsg: this.state.fileCheck });
      return false;
    } else {
      this.setState({ errMsg: "" });

      return true;
    }
  }

  kycFormSubmitHandlar = () => {
    //console.log("caall");
    let kycData = new FormData();

    let newImages = this.props.image;
    kycData.append("image", newImages);
    kycData.append("name", this.props.name);
    kycData.append("address", this.props.address);
    kycData.append("email", this.props.email);
    kycData.append("phone", this.props.phone);
    kycData.append("aadhar", this.props.aadhar);
    kycData.append("pancard", this.props.pancard);

    if (this.formValidationHandlar()) {
      this.props.kycFormSubmitInfoHandlar(kycData);
    }
  };

  checkMimeType = (event) => {
    // gettting file object
    let files = event.target.files;

    // define message container

    let err = "";

    //list allow mime type

    const types = ["image/png", "image/jpeg", "image/gif"];

    // loop access array
    for (let x = 0; x < files.length; x++) {
      // compare file type doesn't match

      if (types.every((type) => files[x].type !== type))
        // create err msg and assign to container
        err += files[x].type + " is not supported formate \n\n  ";
      // Assign msg to error
    }

    if (err !== "") {
      // if message is not same old massage that mean has error

      event.target.value = null;
      //console.log(err);
      this.setState({ fileCheck: err });

      return false;
    } else {
      this.setState({ fileCheck: "" });
    }

    return true;
  };

  getFileTypecheck = (event) => {
    if (this.checkMimeType(event)) {
      this.props.getFileHandlar(event);
    }
  };

  render() {
    return (
      <div className="main-div">
        <div className="row">
          <div className="col s12 m6">
            <div className="card white-grey darken-1">
              <div className="card-content white-text">
                <div className="col s12 m8 offset-m2 l6 offset-l3 head-main">
                  <div className="card-panel grey lighten-5 z-depth-1">
                    <div className="row valign-wrapper">
                      <div className="col s10">
                        <span className="black-text">KYC Form</span>
                      </div>
                    </div>
                  </div>
                </div>
                <form method="post" className="col s12" id="kycfrm">
                  <div className="row">
                    <div className="input-field col s6">
                      <i className="material-icons prefix inputIcon">
                        account_circle
                      </i>
                      <input
                        id="icon_prefix"
                        type="text"
                        className="validate"
                        name="name"
                        onChange={this.props.inputChangeHandlar}
                      />
                      <label htmlFor="icon_prefix">Name</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s6">
                      <i className="material-icons prefix inputIcon">home</i>
                      <textarea
                        id="textarea2"
                        className="materialize-textarea"
                        data-length="120"
                        name="address"
                        onChange={this.props.inputChangeHandlar}
                      ></textarea>
                      <label htmlFor="textarea2">Address</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix inputIcon">email</i>
                      <input
                        id="email"
                        type="email"
                        className="validate"
                        name="email"
                        onChange={this.props.inputChangeHandlar}
                      />
                      <label htmlFor="email">Email Id</label>
                      <span
                        className="helper-text"
                        data-error="wrong"
                        data-success="right"
                      >
                        Ex. abc@gmail.com
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix inputIcon">phone</i>
                      <input
                        id="icon_telephone"
                        type="tel"
                        name="phone"
                        type="number"
                        maxLength="10"
                        minLength="10"
                        className="validate"
                        onChange={this.props.inputChangeHandlar}
                      />
                      <label htmlFor="icon_telephone">Phone Number</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix inputIcon">
                        chrome_reader_mode
                      </i>
                      <input
                        id="icon_chrome_reader_mode"
                        name="aadhar"
                        type="tel"
                        className="validate"
                        onChange={this.props.inputChangeHandlar}
                      />
                      <label htmlFor="icon_chrome_reader_mode">Aaadhar</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <i className="material-icons prefix inputIcon">
                        credit_card
                      </i>
                      <input
                        id="icon_credit_card"
                        name="pancard"
                        type="tel"
                        className="validate"
                        onChange={this.props.inputChangeHandlar}
                      />
                      <label htmlFor="icon_credit_card">PAN Card</label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="file-field input-field col s12">
                      <div className="btn">
                        <span>File</span>
                        <input
                          type="file"
                          name="image"
                          onChange={this.getFileTypecheck}
                        />
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="errmsg">
                      {this.state.errMsg}
                      {this.state.fileCheck}
                    </span>
                  </div>
                  <div className="row right">
                    <button
                      className="btn waves-effect waves-light "
                      onClick={this.kycFormSubmitHandlar}
                      name="sendKyc"
                      type="button"
                    >
                      Submit
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <ToastContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.kyc.name,
    address: state.kyc.address,
    email: state.kyc.email,
    phone: state.kyc.phone,
    aadhar: state.kyc.aadhar,
    pancard: state.kyc.pancard,
    image: state.kyc.image,
    imgErr: state.kyc.imgErr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    inputChangeHandlar: (event) => {
      dispatch(inputChangeHandlar(event));
    },
    getFileHandlar: (event) => {
      dispatch(getFileHandlar(event));
    },
    kycFormSubmitInfoHandlar: (data) => {
      dispatch(kycFormSubmitInfoHandlar(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KycForm);
