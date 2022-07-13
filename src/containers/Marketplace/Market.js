import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import {
  Flex,
  MarketGrid,
  TextHeader,
  AlignCenter,
  InfoDetail,
  InfoHeader,
  TagCode,
  NoData,
} from "./StyledMarketplace";
import { colors } from "@Theme/colors";
import { Link } from "react-router-dom";
import Card from "@Components/Card";
import Text from "@Components/Text";
import location from "@Assets/images/location.png";
import Button from "@Components/Button";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import { contract } from "@Utils/contract";
import { marketplaceServices } from "@Services";
import LoadingCard from "../MyLand/LoadingCard";
import { MarketPlaceContext } from "./Context";
import {
  showNotificationSuccess,
  showNotificationError,
  hideNotification,
  showNotificationWarning,
} from "@Redux/actions/notification";
import { loading, unloading } from "@Redux/actions/loading";
const MarketList = ({ data = [] }) => {
  const { marketPlace, setMarketPlace } = useContext(MarketPlaceContext);
  const belowSM = useMedia(breakpoints.sm);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.account.isLogin);
  const userAddress = useSelector((state) => state.account.userAddress);

  const setLocal = (data) => {
    localStorage.getItem("marketDetail", JSON.stringify(data));
  };
  return (
    <>
      <MarketGrid>
        {data &&
          data.map((item, index) => {
            return (
              <Card image={item.thumbnail} key={index}>
                <TagCode>#{item.rank}</TagCode>
                <InfoHeader>
                  <Text type={"body2"} color={colors.text_header}>
                    {`${item.landCode}-${item._id}`}
                  </Text>
                  <Text type={"body1"} color={colors.accent}>
                    {item.price !== undefined
                      ? item.price
                      : item.currentMarketPrice}{" "}
                    UCC
                  </Text>
                </InfoHeader>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Direction
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {item.direction}
                  </Text>
                </InfoDetail>
                <InfoDetail style={{ marginBottom: "6px" }}>
                  <Text type={"body1"} color={colors.text_body}>
                    Area
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {item.squares}
                  </Text>
                </InfoDetail>
                {item.marketplaceId !== undefined ? (
                  <Link to={`/detail/${item.marketplaceId}`} key={index}>
                    <Button
                      width={"100%"}
                      style={{ marginTop: "20px" }}
                      color={colors.new_button}
                      onClick={() => {
                        setMarketPlace(item);
                        localStorage.setItem(
                          "marketPlace",
                          JSON.stringify(item)
                        );
                      }}
                    >
                      DETAILS
                    </Button>
                  </Link>
                ) : (
                  <Link to={`/my-land/${item.id}`} key={index}>
                    <Button
                      width={"100%"}
                      style={{ marginTop: "20px" }}
                      color={colors.new_button}
                      onClick={() => {
                        setMarketPlace(item);
                        localStorage.setItem(
                          "marketPlace",
                          JSON.stringify(item)
                        );
                      }}
                    >
                      DETAILS
                    </Button>
                  </Link>
                )}
              </Card>
            );
          })}
      </MarketGrid>
    </>
  );
};

export default MarketList;
