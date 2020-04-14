import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import serverPath from "../serverpath";
import axios from "axios";

export const inputChangeHandlar = (event) => {
  return (dispatch) => {
    console.log("innn");
    let name = event.target.name;
    let val = event.target.value;

    let formValue = { name: name, val: val };
    console.log(formValue);
    dispatch({ type: "GET_FORM", payload: formValue });
  };
};

export const getFileHandlar = (event) => {
  return (dispatch) => {
    let image = event.target.files[0];
    dispatch({ type: "GET_IMAGE", payload: image });
  };
};

export const kycFormSubmitInfoHandlar = (data) => {
  return async (dispatch) => {
    const res = await axios.post(serverPath + "/kyc/regKyc", data);
    const result = await res.data.msg;

    if (result === "success") {
      toast.success("KYC form submit Successfully!");
      dispatch({ type: "KYC_ADDED", payload: true });
    } else {
      toast.error(result);
    }
  };
};
