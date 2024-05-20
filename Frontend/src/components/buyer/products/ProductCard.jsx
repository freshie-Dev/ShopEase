import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import custom_shirt_image from "../../../assets/custom.jpg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";



const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const cardStyles = {
    maxWidth: 345,
    backgroundColor: "hsla(0, 100%, 50%, 0)",
    backgroundImage: `
          radial-gradient(at 100% ${
            hover ? "50%" : "0%"
          }, hsla(29, 56%, 64%, 0.61) 0px, transparent 50%),
          radial-gradient(at  ${
            hover ? "70%" : "44%"
          } 77%, hsla(87, 0%, 0%, 1) 0px, transparent 50%),
          radial-gradient(at 8% 95%, hsla(29, 56%, 64%, 0.37) 0px, transparent 50%),
          radial-gradient(at 13% 22%, hsla(26, 0%, 0%, 1) 0px, transparent 50%)
        `,
    border: "1px solid #d9a470",
    color: "#d9a470",
    fontFamily: `'Dancing Script', cursive`,
    transition: "background-color 0.7s ease-in-out", // Add transition here
  };

  return (
    <LocalStyles>
      <Card
        className=""
        onClick={()=> navigate(`/buyer/singleproduct/${product._id}`)}
        // onClick={()=> navigate(`/buyer/singleproduct/${product.id}`)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={cardStyles}
      >
        
        <CardMedia
          sx={{ height: 280 }}
          image={!product.customizable === "true" || !product.customizable === true ? product.imageUrl : custom_shirt_image}
          // image={product.images[0]}
          title="Product Image"
        />
        <CardContent>
          <Typography
            className="flex justify-between items-center"
            gutterBottom
            variant="h5"
            component="div"
          >
            <p className=" cursive font-bold">{product.title}</p>
            <p className="cursive text-lg">{product.price} Rs.</p>
          </Typography>
          <Typography variant="body2">
            <p className=" m-0 p-0 cursive font-bold text-[15px]">
              {product.description.substring(0, 100) + "..."}
            </p>
          </Typography>
        </CardContent>
        <CardActions>
          <div className="flex justify-center items-center w-full">
            <div className="flex justify-center items-center px-3 bg-black h-[20px] rounded-full border-[1px] border-[#d9a470]">
              {product.attributes.map((obj) => {
                return (
                  <div
                    key={obj.id}
                    className={`bg-[${(obj.colorName)}]  inline-block mx-1 min-w-[10px] h-[10px] rounded-full`}
                    style={{backgroundColor: obj.colorName, border: "0.5px solid gray"}}
                  ></div>
                );
              })}
            </div>
          </div>
        </CardActions>
        <CardActions>
          <button onClick={()=> navigate(`/buyer/singleproduct/${product._id}`)} className="hoverButton">SEE MORE</button>
          {/* <button onClick={()=> navigate(`/buyer/singleproduct/${product.id}`)} className="hoverButton">SEE MORE</button> */}
        </CardActions>
      </Card>
    </LocalStyles>
  );
};

export default ProductCard;

const LocalStyles = styled.div`
  .hoverButton {
    font-size: 15px;
    height: 35px;
    width: 100%;
  }
`;
