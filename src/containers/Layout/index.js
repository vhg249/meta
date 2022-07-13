import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "@Components/Footer";
import Header from "@Components/Header";
import { colors } from "@Theme/colors";
import background from "@Assets/images/new-background.png";
import ball8 from "@Assets/images/ball8.png";
import ball9 from "@Assets/images/ball9.png";
import ball10 from "@Assets/images/ball10.png";
import ball11 from "@Assets/images/ball11.png";
import ball12 from "@Assets/images/ball12.png";
import breakpoints from "@Theme/breakpoints";

const Wrapper = styled.div`
  background-image: url(${ball8}), url(${ball9}), url(${ball10}), url(${ball11}),
    url(${ball12}), linear-gradient(113.49deg, #062c69 -30.3%, #181e41 75.64%);
  background-size: initial;
  background-repeat: no-repeat;
  background-position: 60% top,left 40vh,right 60vh,40% 110vh,right 155vh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media ${breakpoints.sm} {
      background: linear-gradient(113.49deg, #062c69 -30.3%, #181e41 75.64%);
  }
`;

const Layout = () => {
  return (
    <Wrapper>
      <Header isAdmin={false} />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

export default Layout;
