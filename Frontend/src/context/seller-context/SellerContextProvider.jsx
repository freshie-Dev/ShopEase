import axios from "axios";
import { createContext, useContext, useState } from "react";

const SellerActionsContext = createContext();

const SellerActionsProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
  const pythonBackendBaseUrl = import.meta.env.PYTHON_BACKEND_API_BASE_URL;

  const [fetchedOrders, setFetchedOrders] = useState(null);
  const chartData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const fetchOrders = async () => {
    try {
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      const response = await axios.get(`${baseUrl}auth/seller_orders`, config);

      setFetchedOrders(response.data.fetchedOrders);
      console.log(response.data.fetchedOrders);
      setFetchedOrders(response.data.fetchedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (orderId, statusValue) => {
    try {
      const response = await axios.put(
        `${baseUrl}auth/update_order_status/${orderId}`,
        { status: statusValue }
      );
      if (response.status === 200) {
        return { result: true, message: "Order Status Updated!" };
        // You can add any additional logic here to update the UI or fetch new data
      }
    } catch (error) {
      console.error("Error updating order status", error);
      return { result: false, message: "Order Status Failed to Update" };
    }
  };

  return (
    <SellerActionsContext.Provider
      value={{
        chartData,
        fetchOrders,
        fetchedOrders,
        updateStatus,
      }}
    >
      {children}
    </SellerActionsContext.Provider>
  );
};

const useSellerActionsContext = () => {
  return useContext(SellerActionsContext);
};

export default SellerActionsProvider;
export { useSellerActionsContext };
