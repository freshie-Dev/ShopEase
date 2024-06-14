import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import styled from "styled-components";
import { useSellerActionsContext } from "../../../../context/seller-context/SellerContextProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const {chartData} = useSellerActionsContext();
  const navigate = useNavigate()
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

  return (
    <DIV className="flex-grow p-2 md:p-6 bg-color3 text-white ">
      <h3 className="font-semibold border-b-[.2rem] border-color1 my-4 pb-0">
        DashBoard
      </h3>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-2  ">
        <div  onClick={()=> {navigate('/seller/dashboard/inventory')}} className="card cursor-pointer  bg-green-400">
          <p>Products</p>
          <BsFillArchiveFill className="card_icon" />
        </div>

        {/* <div className="card col-span-1">
          <BsFillGrid3X3GapFill className="card_icon" />
        </div> */}
        <div className="card  bg-blue-400">
          <p>Customers</p>
          <BsPeopleFill className="card_icon" />
        </div>
      </div>
      <h3 className="font-semibold border-b-[.2rem] border-color1 my-4 pb-0 ">
        Statistics & Graphical Data
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-color5">
        <div className="col-span-1 ">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#ac7c61" />
              <Bar dataKey="uv" fill="#8a775d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-1">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#b16437"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#866e4d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DIV>
  );
};

export default Home;
const DIV = styled.div`
  .card {
    height: 100px;
    column-span: 1;
    border-radius: 1rem;
    padding: 1.3rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;
