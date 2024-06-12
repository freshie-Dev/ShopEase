import { maxStock } from "../helpers/helpers";

export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const {
        id,
        userId,
        color,
        size,
        quantity,
        product,
        customizedImage,
        customSize,
      } = action.payload;
      // localStorage.setItem('cart', action.payload)
      console.log(action.payload);

      let tempItem;
      if (customizedImage) {
        console.log("customized image exists in reducer");
        tempItem = state.cart.find((item) => item.id === id + customSize);
      } else {
        console.log("customized image does not exist in reducer");
        tempItem = state.cart.find((item) => item.id === id + color + size);
      }

      if (tempItem) {
        console.log("exists", tempItem);
      } else {
        console.log("not exists");
      }

      if (!tempItem && customizedImage) {
        const tempCartProduct = {
          _id: id,
          userId,
          id: id + customSize,
          title: product.title,
          quantity,
          customizedImage,
          price: product.price,
          image: product.imageUrl,
          size: customSize,
        };
        return {
          ...state,
          cart: [...state.cart, tempCartProduct],
        };
      } else if (tempItem && !customizedImage) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color + size) {
            let newQuantity = cartItem.quantity + quantity;
            if (newQuantity > cartItem.max) {
              newQuantity = cartItem.max;
            }
            return { ...cartItem, quantity: newQuantity };
          } else {
            return cartItem;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const tempCartProduct = {
          _id: id,
          userId,
          id: id + color + size,
          title: product.title,
          color,
          quantity,
          price: product.price,
          image: product.imageUrl,
          size: size,
          max: maxStock(color, size, product),
          // brand: product.brand,
        };
        return {
          ...state,
          cart: [...state.cart, tempCartProduct],
        };
      }
      break;

    case "ADD_TO_CART_FROM_LOCALSTORAGE":
      const cart = action.payload;

      return {
        ...state,
        cart,
      };

    case "CART_TOTAL_ITEMS":
      const cartLength = state.cart.length;
      console.log(cartLength);

      return {
        ...state,
        totalItems: cartLength,
      };

    case "CART_TOTAL_PRICE":
      let itemsPrice = state.cart.reduce((inititalVal, product) => {
        let { quantity, price } = product;
        inititalVal = inititalVal + quantity * price;
        return inititalVal;
      }, 0);
      let total = itemsPrice + state.shippingFee;

      return {
        ...state,
        totalPrice: itemsPrice,
        orderTotal: total,
      };

    case "INCREASE_QUANTITY":
      let updatedCart1 = state.cart.map((product) => {
        if (product.id === action.payload) {
          let newQuantity = product.quantity + 1;

          if (product.quantity >= product.max) {
            newQuantity = product.max;
          }

          return {
            ...product,
            quantity: newQuantity,
          };
        } else {
          return product;
        }
      });
      return {
        ...state,
        cart: updatedCart1,
      };
      break;

    case "DECREASE_QUANTITY":
      let updatedCart = state.cart.map((product) => {
        if (product.id === action.payload) {
          let newQuantity = product.quantity - 1;
          if (product.quantity <= 1) {
            newQuantity = 1;
          }
          return {
            ...product,
            quantity: newQuantity,
          };
        } else {
          return product;
        }
      });
      return {
        ...state,
        cart: updatedCart,
      };
      break;

    case "REMOVE_CART_ITEM":
      const tempCartItems = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return { ...state, cart: tempCartItems };
      break;

    case "EMPTY_CART":
      return { ...state, cart: new Array() };
    // case 'ADD_TO_CART':
    //     const { id, color, quantity, product } = action.payload;

    //     const tempItem = state.cart.find((item) => item.id === id + color);
    //     if (tempItem) {
    //         const tempCart = state.cart.map((cartItem) => {
    //             if (cartItem.id === id + color) {
    //                 let newQuantity = cartItem.quantity + quantity;
    //                 if (newQuantity > cartItem.max) {
    //                     newQuantity = cartItem.max;
    //                 }
    //                 return { ...cartItem, quantity: newQuantity };
    //             } else {
    //                 return cartItem;
    //             }
    //         });
    //         return { ...state, cart: tempCart };
    //     } else {
    //         const tempCartProduct = {
    //             _id: id,
    //             id: id + color,
    //             name: product.name,
    //             color,
    //             quantity,
    //             price: product.price,
    //             image: product.imageUrl,
    //             max: product.stock,
    //             brand: product.brand,
    //         };
    //         return {
    //             ...state,
    //             cart: [...state.cart, tempCartProduct],
    //         };
    //     }
    // case 'CLEAR_CART':
    //     return {
    //         ...state,
    //         cart: [],
    //     };

    // case 'REMOVE_CART_ITEM':
    //     //~ action.payload is "id" of an item
    //     const tempCartItems = state.cart.filter((item) => item.id !== action.payload);
    //     return { ...state, cart: tempCartItems };

    //     case "CART_LOGO_VALUE":
    //         let newVal = state.cart.reduce ((initialValue, product) => {
    //             let {quantity} = product;
    //             initialValue = initialValue + quantity;
    //             return initialValue;
    //         }, 0);

    //         return {
    //             ...state,
    //             totalItems: newVal,
    //         }

    //         case "GET_CART_TOTAL_PRICE":
    //             let itemsPrice = state.cart.reduce ((inititalVal, product) =>{
    //                 let {quantity, price} = product;
    //                 inititalVal = inititalVal + (quantity * price)
    //                 return inititalVal;
    //             }, 0);
    //             let total = itemsPrice + state.shippingFee;

    //             return {
    //                 ...state,
    //                 totalPrice: itemsPrice,
    //                 orderTotal: total
    //             }
    default:
      return state;
  }
}
