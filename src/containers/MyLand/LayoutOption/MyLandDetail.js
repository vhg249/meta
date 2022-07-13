import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
// import Button from "@Components/Button";
import Table from "@Components/Table";
import Text from "@Components/Text";
import sort_icon from "@Assets/images/sort-price.png";
import breakpoints from "@Theme/breakpoints";
import {
  AlignCenter,
  Background,
  DetailImg,
  Flex,
  Icon,
  IconGroup,
  InfoDetail,
  InputGroup,
  MyLandDetailWrapper,
  MyLandLayout,
  Navigation,
  SendButton,
  StyledInput,
  TableCover,
  Button,
  Token,
  FlexStart,
  Badge,
  HeaderDetail,
} from "../StyledMyLand";
import house from "@Assets/images/house.png";
import eye from "@Assets/images/eye.png";
import location from "@Assets/images/location.png";
import { colors } from "@Theme/colors";
import { nftServices } from "@Services/nftServices";
import { marketplaceServices } from "@Services/marketplaceServices";
import { contract } from "@Utils/contract";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { loading, unloading } from "@Redux/actions/loading";
import { MyLandContext } from "../Context";
import profile from "@Assets/images/profile-2user.png";
import total from "@Assets/images/total.png";
import user_tick from "@Assets/images/user-tick.png";
import {
  showNotificationSuccess,
  showNotificationError,
  hideNotification,
  showNotificationWarning,
} from "@Redux/actions/notification";
import ModelSell from "../ModalSell";
import {
  CountdownDiv,
  CountDownTime,
  FlexCountdown,
  WrapCountdown,
  FlexMarketDetailVoting,
} from "../../Marketplace/StyledMarketplace";
import InfoDetails from "../../Marketplace/InfoDetails";
import TableActivity from "../../Marketplace/TableActivity";
import MoreMarket from "../../Marketplace/MoreMarket";
import MoreMyLand from "../MoreMyLand";
import { getItem } from "localforage";
import TableOffer from "../TableOffer";
const MyLandDetail = () => {
  const { myLand } = useContext(MyLandContext);
  const [loading, setLoading] = useState(false);
  const belowSM = useMedia(breakpoints.sm);
  const [land, setLand] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [activity, setActivity] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const isLogin = useSelector((state) => state.account.isLogin);
  const userAddress = useSelector((state) => state.account.address);
  if (!isLogin) {
    navigate("/home");
  }
  const tableFields = ["From", "To", "Price", "Date"];
  const nftId = useParams();
  const [tableData, setTableData] = useState([
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: 120,
      date: "9 days ago",
    },
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: 120,
      date: "9 days ago",
    },
  ]);

  const getNFTActivity = (id) => {
    setLoading(true);
    nftServices
      .getNFTActivity(id)
      .then((res) => {
        setActivity(res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLand(myLand);
    console.log(myLand);
    getNFTActivity(myLand.id);
  }, []);

  const CheckTypePrice = (data) => {
    if (contract.BUSD_ADDRESS == data) return "BUSD";
    else return "UCC";
  };
  return (
    <>
      <MyLandDetailWrapper>
        <div className="container">
          <MyLandLayout>
            <div>
              <DetailImg src={land ? land.images[0] : house} />
              {!belowSM && (
                <Background>
                  <Text type={"header2"} color={colors.text_header}>
                    Details
                  </Text>
                  <br />
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Created
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land
                        ? moment(land.landCreatedAt).format("DD/MM/YYYY")
                        : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Direction
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land ? land.direction : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Area
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land ? land.squares + "m2" : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Rate
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land ? land.rate : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Issued on
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land
                        ? moment(land.ownershipCerDate).format("DD/MM/YYYY")
                        : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Unit
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land ? land.ownershipCerProvider : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Legal document
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land ? land.legal : ""}
                    </Text>
                  </InfoDetail>
                </Background>
              )}
            </div>
            <div>
              <HeaderDetail>
                <FlexStart>
                  <Text type={"header2"} color={colors.text_header}>
                    {land ? land.landCode : ""}
                  </Text>
                  <Badge>{land ? land.rank : ""}</Badge>
                </FlexStart>
              </HeaderDetail>
              <Background>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Token ID
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land ? land.nftId : ""}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Address
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land ? land.location : "location"}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Original New Land Value
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land ? land.originalLandPrice : "0"} {"UCC"}
                  </Text>
                </InfoDetail>
                <InfoDetail>
                  <Text type={"body1"} color={colors.text_body}>
                    Owned address
                  </Text>
                  <Text type={"body1"} color={colors.text_header}>
                    {land
                      ? land.nftOwner.slice(0, 5) +
                        "..." +
                        land.nftOwner.slice(land.nftOwner.length - 5)
                      : "owned address"}
                  </Text>
                </InfoDetail>
              </Background>
              <Flex>
                <Text type={"body1"} color={colors.text_header}>
                  Current Market Value
                </Text>
                <Text type={"header2"} color={colors.accent}>
                  123 UCC
                </Text>
              </Flex>
              <Button
                width={"100%"}
                color={colors.primary}
                onClick={() => setShowModal(true)}
              >
                <Text type={"button"} color={colors.text_header}>
                  SELL NOW
                </Text>
              </Button>
              {belowSM && (
                <Background>
                  <Text type={"header2"} color={colors.text_header}>
                    Details
                  </Text>
                  <br />
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Created
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land
                        ? moment(land.landCreatedAt).format("DD/MM/YYYY")
                        : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Direction
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land ? land.direction : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Area
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land ? land.squares + "m2" : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Rate
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land ? land.rate : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Issued on
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land
                        ? moment(land.ownershipCerDate).format("DD/MM/YYYY")
                        : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Unit
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land ? land.ownershipCerProvider : ""}
                    </Text>
                  </InfoDetail>
                  <InfoDetail>
                    <Text type={"body1"} color={colors.text_body}>
                      Legal document
                    </Text>
                    <Text type={"body1"} color={colors.text_header}>
                      {land ? land.legal : ""}
                    </Text>
                  </InfoDetail>
                </Background>
              )}
              <TableOffer land={land} />
            </div>
          </MyLandLayout>
          <TableActivity data={activity} />
          <MoreMyLand />
          {showModal && <ModelSell onCloseModal={() => setShowModal(false)} />}
        </div>
      </MyLandDetailWrapper>
    </>
  );
};

export default MyLandDetail;
