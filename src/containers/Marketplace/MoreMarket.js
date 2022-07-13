import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import {
  ContentRegular,
  TagCode,
  DetailHeader,
  MarketGridDetail,
  ButtonShowMore,
  InfoHeader,
  InfoDetail,
  MarketGridDetailScroll,
  SwapSlide,
} from "./StyledMarketplace";
import { colors } from "@Theme/colors";
import Card from "@Components/Card";
import Button from "@Components/Button";

import { marketplaceServices } from "@Services";
import CountDown from "./CountDown";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";

const PAGE_SIZE = 20;

const MoreMarket = () => {
  const belowSM = useMedia(breakpoints.sm);
  const marketSaleType = useSelector((state) => state.market.saleType);
  const [marketData, setMarketData] = useState([]);
  const fetchMarketplace = (filter = {}) => {
    marketplaceServices
      .getMarketplaces({ chainId: 97, limit: PAGE_SIZE, ...filter })
      .then((res) => {
        setMarketData(res.results);
      });
  };
  const fetchRegularAuction = (filter = {}) => {
    marketplaceServices
      .getMarketAuctions({ chainId: 97, limit: PAGE_SIZE, ...filter })
      .then((res) => {
        setMarketData(res.results);
      });
  };
  const fetchReverseAuction = (filter = {}) => {
    marketplaceServices
      .getReverseAuctions({ chainId: 97, limit: PAGE_SIZE, ...filter })
      .then((res) => {
        setMarketData(res.results);
      });
  };
  useEffect(() => {
    
    if (marketSaleType == "auction") {
      fetchRegularAuction({limit:4});
    }
    if (marketSaleType == "reverse-auction") {
      fetchReverseAuction({limit:4});
    }
    else{
        fetchMarketplace({limit:4});
    }
    return () => {
      setMarketData([]);
      
    };
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <DetailHeader>
      <div style={{ marginBottom: "10px" }}>
        <Text type={"header2"} color={colors.text_header}>
          More From This Collection
        </Text>
      </div>
      {belowSM && (
        <Slider {...settings}>
          {marketData &&
            marketData.map((item, index) => {
              return (
                <Card image={item.thumbnail} key={index}>
                  <TagCode>{item.rank}</TagCode>
                  <InfoHeader>
                    <Text type={"body2"} color={colors.text_header}>
                      {`${item.landCode}-${item.nftId}`}
                    </Text>
                    <Text type={"body1"} color={colors.accent}>
                      {item.price + " UCC"}
                    </Text>
                  </InfoHeader>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Direction
                    </Text>
                    <Text type={"body1"} color={colors.text_body}>
                      {item.direction}
                    </Text>
                  </InfoDetail>
                  <InfoDetail style={{ marginBottom: "6px" }}>
                    <Text type={"body1"} color={colors.text_body}>
                      Area
                    </Text>
                    <Text type={"body1"} color={colors.text_body}>
                      {item.squares}
                    </Text>
                  </InfoDetail>
                  {marketSaleType == "reverse-auction" ||
                    (marketSaleType == "auction" && (
                      <InfoDetail>
                        <Text type={"body1"} color={colors.text_body}>
                          Count down
                        </Text>
                        <Text type={"body1"} color={colors.accent}>
                          <CountDown timeTillDate={item.endedSale} />
                        </Text>
                      </InfoDetail>
                    ))}

                  <Link to={`/detail/${item.id}`} key={index}>
                  <Button
                    width={"100%"}
                    style={{ marginTop: "20px" }}
                    color={colors.new_button}
                  >
                    DETAILS
                  </Button>
                  </Link>
                </Card>
              );
            })}
        </Slider>
      )}

      <MarketGridDetailScroll>
        {marketData &&
          marketData.map((item, index) => {
            return (
              <Card image={item.thumbnail} key={index}>
                <TagCode>{item.rank}</TagCode>
                <InfoHeader>
                  <Text type={"body2"} color={colors.text_header}>
                    {`${item.landCode}-${item.nftId}`}
                  </Text>
                  <Text type={"body1"} color={colors.accent}>
                    {item.price + " UCC"}
                  </Text>
                </InfoHeader>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Direction
                  </Text>
                  <Text type={"body1"} color={colors.text_body}>
                    {item.direction}
                  </Text>
                </InfoDetail>
                <InfoDetail style={{ marginBottom: "6px" }}>
                  <Text type={"body1"} color={colors.text_body}>
                    Area
                  </Text>
                  <Text type={"body1"} color={colors.text_body}>
                    {item.squares}
                  </Text>
                </InfoDetail>
                {marketSaleType == "reverse-auction" ||
                  (marketSaleType == "auction" && (
                    <InfoDetail>
                      <Text type={"body1"} color={colors.text_body}>
                        Count down
                      </Text>
                      <Text type={"body1"} color={colors.accent}>
                        <CountDown timeTillDate={item.endedSale} />
                      </Text>
                    </InfoDetail>
                  ))}

                <Link to={`/detail/${item.id}`} key={index}>
                  <Button
                    width={"100%"}
                    style={{ marginTop: "20px" }}
                    color={colors.new_button}
                  >
                    DETAILS
                  </Button>
                </Link>
              </Card>
            );
          })}
      </MarketGridDetailScroll>
      <Link to="/marketplace">
        <ButtonShowMore>
          <Button width={"100%"} color={colors.primary}>
            SHOW MORE
          </Button>
        </ButtonShowMore>
      </Link>
    </DetailHeader>
  );
};
export default MoreMarket;
