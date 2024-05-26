import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./components/buyer/home/Home.jsx";
import Products from "./components/buyer/products/Products.jsx";
import Cart from "./components/buyer/cart/Cart.jsx";
import SingleProduct from "./components/buyer/single-product/SingleProduct.jsx";
import Register from "./components/register/Register.jsx";
import AccountDetails from "./components/buyer/Account/details/AccountDetails.jsx";
import CustomShirtEditor from "./components/buyer/shirt-editor/CustomShirtEditor.jsx";
import Checkout from "./components/buyer/Checkout/Checkout.jsx";

import LayoutBuyer from "./components/LayoutBuyer.jsx";
import LayoutSeller from "./components/LayoutSeller.jsx";
import Dashboard from "./components/seller/dashboard/Dashboard.jsx";
import UserProvider from "./context/user-context/UserContextProvider.jsx";
import GlobalStyle from "./GlobalStyles.js";
import StyleProvider from "./context/style-context/StyleContextProvider.jsx";
import Orders from "./components/buyer/orders/Orders.jsx";
import Modal from "./components/modal/Modal.jsx";
import { SnackbarProvider } from "notistack";
import { CartProvider } from "./context/cart-context/CartContextProvider.jsx";
import { FilterProvider } from "./context/filter-context/FilterContext.jsx";
import ProductProvider from "./context/product-context/ProductContextProvider.jsx";
import ProductForm from "./components/seller/add-product/ProductForm.jsx";
import ProductFormProvider from "./context/product-form/ProductFormProvider.jsx";
import IVProvider from "./context/image-verification/ImageVerificationContextProvider.jsx";
import Payment from "./components/buyer/payment-status/Payment.jsx";


const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
  },
  // {
  //   path: "/modal",
  //   element: <Modal openModal={true}/>,
  // },
  {
    path: "/buyer",
    element: <LayoutBuyer />,
    children: [
      {
        path: "/buyer/home",
        element: <Home />,
      },
      {
        path: "/buyer/products",
        element: <Products />,
      },
      {
        path: "/buyer/account-details",
        element: <AccountDetails />,
      },
      {
        path: "/buyer/singleproduct/:product-id",
        element: <SingleProduct />,
      },
      {
        path: "/buyer/cart",
        element: <Cart />,
      },
      {
        path: "/buyer/checkout",
        element: <Checkout />,
      },
      {
        path: "/buyer/orders",
        element: <Orders />,
      },
      {
        path: "/buyer/singleproduct/customize/:product-id",
        element: <CustomShirtEditor />,
      },
      {
        path: "/buyer/payment/:payment_status",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/seller",
    element: <LayoutSeller />,
    children: [
      {
        path: "/seller/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/seller/account-details",
        element: <AccountDetails />,
      },
      {
        path: "/seller/dashboard/add-product",
        element: <ProductForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
        <ProductFormProvider>
          <CartProvider>
            <FilterProvider>
              <IVProvider>
                <StyleProvider>
                  <GlobalStyle />
                  <SnackbarProvider>
                    <RouterProvider router={router} />
                    <Modal openModal={false} />
                  </SnackbarProvider>
                </StyleProvider>
              </IVProvider>
            </FilterProvider>
          </CartProvider>
        </ProductFormProvider>
      </ProductProvider>
    </UserProvider>
  </React.StrictMode>
);
