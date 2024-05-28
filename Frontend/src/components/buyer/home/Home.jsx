import React from "react";
import styled from "styled-components";
import Heropage from "./Heropage.jsx";
import Recommendations from "./Recommendations.jsx";

const Home = () => {
  return (
    <LocalStyles>
      <div className="main flex-col    ">
        <Heropage />
        <Recommendations />
      </div>
    </LocalStyles>
  );
};

export default Home;

const LocalStyles = styled.div`
  /* div > * {
    margin: 0.7rem 0;
  } */
`;
