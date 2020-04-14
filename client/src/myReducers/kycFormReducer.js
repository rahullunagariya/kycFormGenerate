const iState = {
  name: "",
  address: "",
  email: "",
  phone: "",
  aadhar: "",
  pancard: "",
  imgErr: "",
  image: null,
  createNewKYC: false,
};

const kycFromReduceer = (state = iState, action) => {
  switch (action.type) {
    case "GET_IMAGE":
      return {
        ...state,
        image: action.payload,
      };

    case "KYC_ADDED":
      return {
        ...state,
        createNewKYC: action.payload,
      };

    case "GET_FORM":
      return {
        ...state,
        [action.payload.name]: action.payload.val,
      };

    case "IMAGE_ERR":
      return {
        ...state,
        imgErr: action.payload,
      };

    default:
      return state;
  }
};

export default kycFromReduceer;
