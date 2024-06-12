const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_ADD_ADDRESS":
      console.log("addAddress is ", action.payload);
      const temp = action.payload;
      return {
        ...state,
        // addAddress: true,
        addAddress: temp,
      };

    case "SET_PAYMENT_TYPE":
      console.log("paymentType is ", action.payload);
      return {
        ...state,
        paymentType: action.payload,
      };

    case "SET_ADDRESS":
      const tempAddress = action.payload; // address: array of object
      return {
        ...state,
        address: [...tempAddress],
      };

    case "SET_SELECTED_ADDRESS":
        const tempId = action.payload;
        return {
            ...state,
            selectedAddress: tempId,
        }
    // Add other cases if needed

    default:
      return state;
  }
};

export default filterReducer;
