import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  BrowserRouter as Router,
  createBrowserRouter,
} from "react-router-dom";

import App from "./App.jsx";
import UserProvider from "./context/user-context/UserContextProvider.jsx";
import GlobalStyle from "./GlobalStyles.js";
import StyleProvider from "./context/style-context/StyleContextProvider.jsx";
import Modal from "./components/modal/Modal.jsx";
import { SnackbarProvider } from "notistack";
import { CartProvider } from "./context/cart-context/CartContextProvider.jsx";
import { FilterProvider } from "./context/filter-context/FilterContext.jsx";
import ProductProvider from "./context/product-context/ProductContextProvider.jsx";
import ProductFormProvider from "./context/product-form/ProductFormProvider.jsx";
import IVProvider from "./context/image-verification/ImageVerificationContextProvider.jsx";

import SellerNavigationProvider from "./context/seller-navigation/SellerNavigationContext.jsx";
import SellerActionsProvider from "./context/seller-context/SellerContextProvider";
import { CheckoutProvider } from "./context/checkout/CheckoutContext";
import { QueryClient, QueryClientProvider } from "react-query";


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <ProductProvider>
              <ProductFormProvider>
                <CartProvider>
                  <FilterProvider>
                    <IVProvider>
                      <CheckoutProvider>
                        <SellerActionsProvider>
                          <SellerNavigationProvider>
                            <StyleProvider>
                              <GlobalStyle />
                              {/* <RouterProvider router={router} /> */}
                              <App />

                              <Modal openModal={false} />
                            </StyleProvider>
                          </SellerNavigationProvider>
                        </SellerActionsProvider>
                      </CheckoutProvider>
                    </IVProvider>
                  </FilterProvider>
                </CartProvider>
              </ProductFormProvider>
            </ProductProvider>
          </UserProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </Router>
  </React.StrictMode>
);
