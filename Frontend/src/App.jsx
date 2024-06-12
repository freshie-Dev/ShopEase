import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import BuyerRoutes from "./utils/BuyerRoutes";
import SellerRoutes from "./utils/SellerRoutes";
import BuyerHome from "./pages/BuyerHome";
import SellerHome from "./pages/SellerHome";
import Register from "./components/register/Form";
import Heropage from "./components/buyer/home/Heropage";
import Products from "./components/buyer/products/Products";
import AccountDetails from "./components/buyer/Account/details/AccountDetails";
import SingleProduct from "./components/buyer/single-product/SingleProduct";
import Cart from "./components/buyer/cart/Cart";
import Checkout from "./components/buyer/Checkout/Checkout";
import Orders from "./components/seller/dashboard/orders/Orders";
import CustomShirtEditor from "./components/buyer/shirt-editor/CustomShirtEditor";
import Payment from "./components/buyer/payment-status/Payment";
import Home from "./components/seller/dashboard/home/Home";
import ProductForm from "./components/seller/dashboard/add-product/ProductForm";
import ImageVerification from "./components/seller/dashboard/Image-verification/ImageVerification";

function App() {
  return (
    <Routes>
      //! Public Routes
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      //! 404 Route
      <Route path="*" element={<h1>404</h1>} />
      //! Buyer Routes
      <Route element={<BuyerRoutes />}>
        <Route path="/buyer/home" element={<Heropage />} />
        <Route path="/buyer/products" element={<Products />} />
        <Route path="/buyer/account-details" element={<AccountDetails />} />
        <Route
          path="/buyer/singleproduct/:product-id"
          element={<SingleProduct />}
        />
        <Route path="/buyer/cart" element={<Cart />} />
        <Route path="/buyer/checkout" element={<Checkout />} />
        <Route path="/buyer/orders" element={<Orders />} />
        <Route
          path="/buyer/singleproduct/customize/:product-id"
          element={<CustomShirtEditor />}
        />
        <Route path="/buyer/payment/:paymentStatus" element={<Payment />} />
      </Route>
      //! Seller Routes
      <Route element={<SellerRoutes />}>
        <Route path="/seller/dashboard/home" element={<Home />} />
        <Route path="/seller/account-details" element={<AccountDetails />} />
        <Route path="/seller/dashboard/add-product" element={<ProductForm />} />
        <Route
          path="/seller/dashboard/image-verification"
          element={<ImageVerification />}
        />
        <Route path="/seller/dashboard/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default App;
