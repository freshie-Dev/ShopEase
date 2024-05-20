const reducer = (state, action) => {
  const key = action.type;
  switch (key) {
    case "FETCH_ALL_PRODUCTS":
        console.log(action.payload)
      return {
        ...state,
        allProducts: action.payload,
      };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        singleProduct: action.payload
      }

    case "SET_LOADING_TRUE":
      
      return {
        ...state,
        isLoading: true,
      };

    case "SET_LOADING_FALSE":
      
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
