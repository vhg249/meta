import React from "react";
import styled from "styled-components";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import logo1 from "@Assets/images/logo1.png";
import logo2 from "@Assets/images/logo2.png";
import logo3 from "@Assets/images/logo3.png";
import logo4 from "@Assets/images/logo4.png";
import prev_slide from "@Assets/images/prev-slide.png";
import next_slide from "@Assets/images/next-slide.png";
import { useMedia } from "react-use";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  @media ${breakpoints.sm} {
    margin-top: 80px;
  }
`;
const TextCenter = styled.div`
  text-align: center;
  @media ${breakpoints.sm} {
    text-align: start;
  }
`;
const Slide = styled.div`
  width: 100%;
  @media ${breakpoints.sm} {
    display: flex;
    justify-content: center;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${breakpoints.sm} {
    display: none;
  }
`;
const LogoImg = styled.img`
  @media ${breakpoints.sm} {
    width: 80%;
  }
`;
const SlideItem = styled.div`
  display: flex !important;
  justify-content: center;
`;

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{ ...style, display: "" }}
      onClick={onClick}
      src={next_slide}
      alt="next"
    />
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <img
      className={className}
      style={{ ...style }}
      onClick={onClick}
      src={prev_slide}
      alt="next"
    />
  );
}
const Support = () => {
  const belowSM = useMedia(breakpoints.sm);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <ContainerWrapper>
      <div className="container">
        <TextCenter>
          <Text color={colors.text_header} type={"header3"}>
          Backer & Partner
          </Text>
        </TextCenter>
        <Slide>
          {belowSM ? (
            <div style={{width: "85vw"}}>
            <Slider {...settings}>
              <SlideItem>
                <LogoImg src={logo1} />
              </SlideItem>
              <SlideItem>
                <LogoImg src={logo2} />
              </SlideItem>
              <SlideItem>
                <LogoImg src={logo4} />
              </SlideItem>
            </Slider>
            </div>
          ) : (
            <Logo>
              <LogoImg src={logo1} />
              <LogoImg src={logo2} />
              <LogoImg src={logo3} />
              <LogoImg src={logo4} />
            </Logo>
          )}
        </Slide>
      </div>
    </ContainerWrapper>
  );
};

export default Support;
