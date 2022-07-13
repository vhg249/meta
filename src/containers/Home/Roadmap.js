import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import { colors } from "@Theme/colors";
import Slider from "react-slick";
import jupiter from "@Assets/images/Jupiter.png";
import mercury from "@Assets/images/Mercury.png";
import { useMedia } from "react-use";

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  @media ${breakpoints.sm} {
    margin-top: 80px;
  }
`;

const Slide = styled.div`
  color: white;
  margin: 50px 0;
`;

const Line = styled.div`
  border-bottom: 1px solid #f5f5f5;
  position: relative;
  margin: 24px 0;
  &:after {
    content: "|";
    position: absolute;
    font-size: 30px;
    height: 32px;
    left: 24px;
    top: -15px;
  }
`;
const Title = styled.span`
  display: block;
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  margin: 24px;
  line-height: 44px;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

const Content = styled.span`
  display: block;
  font-style: normal;
  font-weight: normal;
  margin: 24px;
  font-size: 16px;
  line-height: 20px;
  color: #c0c0c0;
`;

const Icon = styled.img.attrs((props) => ({
  src: props.src,
  alt: "",
}))`
  margin: 24px;
  width: 120px;
  height: 120px;
`;

function ItemNav1(props) {
  const { title, content } = props;
  return (
    <Slide>
      <Title>{title}</Title>
      <Line></Line>
      <Content>{content}</Content>
    </Slide>
  );
}

const dataNav1 = [
  {
    title: "2018",
    content:
      " Metaverse, ecosystem, platform, with community appreciation, economy building, DeFi solutions, NFT collectibles, and a solidteam behind it all.",
  },
  {
    title: "2019",
    content:
      " Metaverse, ecosystem, platform, with community appreciation, economy building, DeFi solutions, NFT collectibles, and a solidteam behind it all.",
  },
  {
    title: "2020",
    content:
      " Metaverse, ecosystem, platform, with community appreciation, economy building, DeFi solutions, NFT collectibles, and a solidteam behind it all.",
  },
  {
    title: "2021",
    content:
      " Metaverse, ecosystem, platform, with community appreciation, economy building, DeFi solutions, NFT collectibles, and a solidteam behind it all.",
  },
  {
    title: "2022",
    content:
      " Metaverse, ecosystem, platform, with community appreciation, economy building, DeFi solutions, NFT collectibles, and a solidteam behind it all.",
  },
  {
    title: "2023",
    content:
      " Metaverse, ecosystem, platform, with community appreciation, economy building, DeFi solutions, NFT collectibles, and a solidteam behind it all.",
  },
];

const dataNav2 = [
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
  {
    src: jupiter,
  },
  {
    src: mercury,
  },
];
const Roadmap = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  return (
    <ContainerWrapper>
      <div className="container">
        <Text color={colors.text_header} type={"header3"}>
          Roadmap
        </Text>
        <Text color={colors.text_body} type={"body"}>
          We are at the very beginning of a major metaverse project. With these
          steps, an ecosystem is created which will develop into a global
          digital platform on which businesses can thrive.
        </Text>
        <Text color={colors.accent} type={"body"}>
          Get involved at the very beginning. Be an early adopter!
        </Text>
        {!belowSM && (
          <div>
            <Slider
              arrows={false}
              draggable={false}
              slidesToShow={2}
              speed={900}
              asNavFor={nav2}
              ref={(slider1) => setNav1(slider1)}
            >
              {dataNav2.map((item, index) => (
                <div key={index}>
                  <Icon src={item.src} alt=""></Icon>
                </div>
              ))}
            </Slider>
            <Slider
              asNavFor={nav1}
              ref={(slider2) => setNav2(slider2)}
              slidesToShow={2}
              swipeToSlide={true}
              autoplay={true}
              focusOnSelect={true}
              arrows={false}
            >
              {dataNav1.map((item, index) => (
                <ItemNav1
                  title={item.title}
                  content={item.content}
                  key={index}
                />
              ))}
            </Slider>
          </div>
        )}
        {belowSM &&
          dataNav1.map((item, index) => (
            <ItemNav1 title={item.title} content={item.content} key={index} />
          ))}
      </div>
    </ContainerWrapper>
  );
};

export default Roadmap;
