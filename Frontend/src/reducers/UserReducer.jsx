const reducer = (state, action) => {
    const key = action.type;
    switch (key) {
      case "SAVE_USER_INFO":
  
        const { _id, username, email, usertype, cart, orders, address, token } = action.payload;
        
  
        localStorage.setItem(
          "userinfo",
          JSON.stringify({ _id, username, email, usertype, cart, orders, address })
        );
        localStorage.setItem("token", token);

        return {
          ...state,
          loggedInUserInfo: {
            username,
            email,
            usertype,
            cart,
            address,
            orders,
          },
        };
        break;

      case "UPDATE_USER_INFO":
        const storedUserData = JSON.parse(localStorage.getItem("userinfo"));
        storedUserData.username = action.payload.username;
        localStorage.setItem("userinfo", JSON.stringify(storedUserData));
  
        return {
          ...state,
          loggedInUserInfo: {
            ...state.loggedInUserInfo,
            username: action.payload.username
          }
        };
  
      default:
        return state;
    }
  };
  
export default reducer;