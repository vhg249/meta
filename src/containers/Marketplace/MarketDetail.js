import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import moment from "moment";
import { useMedia } from "react-use";
import {
  AlignCenter,
  InfoDetail,
  MarketDetailWrapper,
  MarketLayout,
  SendButton,
  InfoDetailEnd,
  Border,
  Slide,
  LogoImg,
  SlideItem,
  FlexMarketDetail,
  SwapSlide,
  FlexMarketDetailWrap,
  FlexTitle,
  TagCodeDetail,
  CountDownTime,
  ContentRegular,
  OfferButtonGroup,
  PriceContent,
  FlexMarketDetailVoting,
  InfoDetailHeader,
  CountdownDiv,
  FlexCountdown,
  WrapCountdown,
  View,
  WrapperButton,
} from "./StyledMarketplace";
import location from "@Assets/images/location.png";
import profile from "@Assets/images/profile-2user.png";
import total from "@Assets/images/total.png";
import user_tick from "@Assets/images/user-tick.png";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import Button from "@Components/Button";
import sort_icon from "@Assets/images/sort-price.png";
import breakpoints from "@Theme/breakpoints";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import prev_slide from "@Assets/images/prev-slide.png";
import next_slide from "@Assets/images/next-slide.png";
import view_360 from "@Assets/images/360-view.png";
import { contract } from "@Utils/contract";
import { marketplaceServices, nftServices } from "@Services";
import { transactionServices } from "@Services";
import ModelMarketOffer from "./ModelMarketOffer";
import CountDown from "./CountDown";
import InfoDetails from "./InfoDetails";
import TableActivity from "./TableActivity";
import {
  showNotificationSuccess,
  showNotificationError,
  hideNotification,
  showNotificationWarning,
} from "@Redux/actions/notification";
import { loading, unloading } from "@Redux/actions/loading";
import { MarketPlaceContext } from "./Context";
import RegularRule from "./RegularRule";
import MoreMarket from "./MoreMarket";
import TableOffer from "./TableOffer";
import VotingModal from "./VotingModal";
import ConfirmModal from "./VotingModal/ConfirmModal";
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
};

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
};
const PAGE_SIZE = 20;

const MarketDetail = () => {
  var { marketPlace } = useContext(MarketPlaceContext);
  const dispatch = useDispatch();
  const belowSM = useMedia(breakpoints.sm);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [allowance, setAllowance] = useState(0);
  const { detailId } = useParams();
  const [land, setLand] = useState([]);
  const [activity, setActivity] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [allItem, setAllItem] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isSetOffer, setIsSetOffer] = useState(false);
  const isLogin = useSelector((state) => state.account.isLogin);
  const account = useSelector((state) => state.account);
  const marketSaleType = useSelector((state) => state.market.saleType);
  const [marketSaleTypes, setMarketSaleTypes] = useState("");
  const [hasOffer, setHasOffer] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  const [tableData, setTableData] = useState([
    {
      from: "0x0000...000000",
      to: "0x0000...000000",
      price: "120 UCC",
      date: "Dec 8, 2021, 10:36",
    },
  ]);
  const [showVotingModal, setShowVotingModal] = useState(false);
  useEffect(async () => {
    setAllowance(await contract.checkAllowance(account.address));
  }, []);

  const handleApprove = async () => {
    if (!isLogin) return dispatch(showNotificationError("Please login"));
    setLoading(true);
    contract
      .approveBUSD()
      .then(() => {})
      .catch((err) => console.log(err));
  };
  const getMarketDetail = (id) => {
    setLoading(true);
    marketplaceServices
      .getMarketDetail(id)
      .then((res) => {
        setLand(res);
        // if(res.code==400) navigate("/no-data");
        getMarketActivity(res.nftId);
        setLoading(false);
      })
      .catch((error) => {
        navigate("/no-data");
        setLoading(false);
      });
  };

  const getMarketActivity = (id) => {
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
    getMarketDetail(detailId);

    return () => {
      getMarketDetail([]);
      getMarketActivity([]);
    };
  }, []);
  const handleBid = () => {
    if (!isLogin) return dispatch(showNotificationError("Please login"));
    setLoading(true);
    contract
      .buyNFT(land.nftId)
      .then(() => {
        // Transaction successful
        dispatch(unloading());
        dispatch(showNotificationSuccess("Transaction success"));
        navigate("/marketplace");
      })
      .catch((error) => {
        dispatch(unloading());
        dispatch(showNotificationError("Transaction failed"));
      });
  };
  const handleBuy = async () => {
    if (!isLogin) return dispatch(showNotificationError("Please login"));
    setLoading(true);
    contract
      .buyNFT(land.nftId)
      .then(() => {
        setLoading(FontFaceSetLoadEvent);
        dispatch(showNotificationSuccess("Transaction success"));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        dispatch(showNotificationError("Transaction fail"));
      });
  };
  const isSetOfferModal = (value) => {
    setIsSetOffer(value);
    setHasOffer(true);
  };
  const CheckTypePrice = (data) => {
    if (contract.BUSD_ADDRESS.toLowerCase() == data) return "BUSD";
    else return "UCC";
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    setLand(marketPlace);
    setMarketSaleTypes(marketSaleType);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (land) {
      if (account.address === land.nftOwner) setIsOwner(true);
      if (land.nftId) {
        let newTable = [];
        if (land.length) {
          for (let item of land) {
            newTable.push({
              who:
                item.buyer.slice(0, 5) +
                "..." +
                item.buyer.slice(item.buyer.length - 5),
              id:
                item.id.slice(0, 5) + "..." + item.id.slice(item.id.length - 5),
              offersPrice: item.price + " UCC",
              timestamp: moment(item.endedSale).format("HH:mm:ss DD/MM/YYYY"),
            });
          }
        }
        setTableData(newTable);
      }
    }
  }, [land]);
  return (
    <MarketDetailWrapper>
      <div className="container">
        <Text type={"body"} color={colors.accent}>
          Market/
          <span style={{ color: `${colors.text_body}` }}>
            {land ? land.landCode : ""}
          </span>
        </Text>
        <MarketLayout>
          <div>
            <SwapSlide>
              <Slide>
                <Slider {...settings}>
                  {land &&
                    land.images &&
                    land.images.map((img, i) => {
                      return (
                        <div key={i}>
                          <LogoImg src={img} />
                        </div>
                      );
                    })}
                </Slider>
                <View
                  onClick={() => {
                    window.open(`${land ? land.media : ""}`);
                  }}
                >
                  <img width="32" height="32" src={view_360} />
                </View>{" "}
              </Slide>
            </SwapSlide>
          </div>
          <div>
            <InfoDetailHeader>
              <FlexTitle>
                <Text type={"header2"} color={colors.text_header}>
                  {land ? land.landCode : ""}
                </Text>
                <TagCodeDetail>{land ? land.rank : ""}</TagCodeDetail>
              </FlexTitle>
              {!belowSM && (
                <FlexMarketDetailVoting
                  onClick={() => {
                    setShowVotingModal("voting");
                  }}
                >
                  <Text type={"body3"} color={"#2C375B"}>
                    Voting start in{" "}
                  </Text>
                  <CountDown
                    timeTillDate={land ? land.endedSale : ""}
                    timeTypeObject={true}
                  />
                </FlexMarketDetailVoting>
              )}
            </InfoDetailHeader>

            <FlexMarketDetailWrap>
              <FlexMarketDetail>
                <AlignCenter
                  style={{ marginBottom: "20px", marginRight: "30px" }}
                >
                  <img src={profile} style={{ marginRight: "5px" }} />
                  <Text type={"body1"} color={"#7683B6"}>
                    {land && land.totalOwner} owners
                  </Text>
                </AlignCenter>
                <AlignCenter
                  style={{ marginBottom: "20px", marginRight: "30px" }}
                >
                  <img src={total} style={{ marginRight: "5px" }} />
                  <Text type={"body1"} color={"#7683B6"}>
                    {land && land.totalNft} Total
                  </Text>
                </AlignCenter>{" "}
                <AlignCenter style={{ marginBottom: "20px" }}>
                  <img src={user_tick} style={{ marginRight: "5px" }} />
                  <Text type={"body1"} color={"#7683B6"}>
                    You own {land && land.myNft}
                  </Text>
                </AlignCenter>
              </FlexMarketDetail>
            </FlexMarketDetailWrap>
            {belowSM && (
              <WrapCountdown style={{ background: "rgba(255, 255, 255, 0.1)" }}>
                {" "}
                <FlexMarketDetailVoting>
                  <Text type={"body"} color={"#2C375B"}>
                    Voting start in{" "}
                  </Text>

                  <CountDown
                    timeTillDate={land ? land.endedSale : ""}
                    timeTypeObject={true}
                  />
                </FlexMarketDetailVoting>{" "}
              </WrapCountdown>
            )}
            <Border>
              <InfoDetail>
                <Text type={"body"} color={"#7683B6"}>
                  Token ID
                </Text>
                <Text type={"body"} color={colors.text_header}>
                  {land ? land.nftId : ""}
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body"} color={"#7683B6"}>
                  Address
                </Text>
                <AlignCenter>
                  <img src={location} style={{ marginRight: "5px" }} />
                  <Text type={"body"} color={colors.text_header}>
                    {land ? land.location : ""}
                  </Text>
                </AlignCenter>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body"} color={"#7683B6"}>
                  Original New Land Value
                </Text>
                <Text type={"body"} color={colors.text_header}>
                  {land ? land.originalLandPrice : ""} {"UCC"}
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body"} color={"#7683B6"}>
                  Owned address
                </Text>
                <Text type={"body"} color={colors.text_header}>
                  {land && land.nftOwner
                    ? land.nftOwner.slice(0, 5) +
                      "..." +
                      land.nftOwner.slice(land.nftOwner.length - 5)
                    : "owned address"}
                </Text>
              </InfoDetail>
            </Border>

            {marketSaleTypes !== "auction" &&
              marketSaleTypes !== "reverse-auction" && (
                <>
                  <InfoDetailEnd>
                    <Text type={"header2"} color={colors.text_header}>
                      Current Market Value
                    </Text>
                    <Text type={"header3"} color={colors.accent}>
                      {land ? land.recentPrice : ""} {"UCC"}
                    </Text>
                  </InfoDetailEnd>

                  {!isOwner && (
                    <SendButton>
                      {land && CheckTypePrice(land.unit) === "BUSD" ? (
                        <WrapperButton>
                          <Button
                            width={"50%"}
                            color={colors.new_button}
                            onClick={handleApprove}
                            disabled={allowance}
                          >
                            <Text type={"button"} color={colors.text_header}>
                              Approve
                            </Text>
                          </Button>
                          <Button
                            width={"50%"}
                            color={colors.new_button}
                            onClick={handleBuy}
                            disabled={!allowance}
                          >
                            <Text type={"button"} color={colors.text_header}>
                              Buy Now
                            </Text>
                          </Button>
                        </WrapperButton>
                      ) : (
                        <Button
                          width={"100%"}
                          color={colors.new_button}
                          onClick={handleBuy}
                        >
                          <Text type={"button"} color={colors.text_header}>
                            Buy Now
                          </Text>
                        </Button>
                      )}
                    </SendButton>
                  )}
                </>
              )}
            {marketSaleTypes == "auction" && (
              <>
                <InfoDetailEnd>
                  <Text type={"header2"} color={colors.text_header}>
                    Count down
                  </Text>
                  <Text type={"header2"} color={colors.text_header}>
                    Recent Bid
                  </Text>
                </InfoDetailEnd>
                <InfoDetailEnd>
                  <Text type={"header2"} color={colors.accent}>
                    <CountDown timeTillDate={land ? land.endedSale : ""} />
                  </Text>
                  <Text type={"header2"} color={colors.accent}>
                    {land ? land.recentPrice : ""} {"UCC"}
                  </Text>
                </InfoDetailEnd>
                <SendButton>
                  {!hasOffer ? (
                    <Button
                      width={"100%"}
                      color={colors.primary}
                      onClick={() => {
                        setShowModal(!showModal);
                      }}
                    >
                      <Text type={"button"} color={colors.text_header}>
                        OFFER
                      </Text>
                    </Button>
                  ) : (
                    <>
                      <OfferButtonGroup>
                        <Button
                          width={"100%"}
                          color={colors.primary}
                          onClick={() => {
                            setShowModal(!showModal);
                          }}
                        >
                          <Text type={"button"} color={colors.text_header}>
                            NEW OFFER
                          </Text>
                        </Button>
                      </OfferButtonGroup>
                      {/* <PriceContent>
                        <Text
                          type={belowSM ? "body" : "header2"}
                          color={colors.text_body}
                        >
                          My Bidding Amount:
                        </Text>
                        <Text
                          type={belowSM ? "body" : "header2"}
                          color={colors.text_header}
                        >
                          200 UCC
                        </Text>
                      </PriceContent> */}
                    </>
                  )}
                </SendButton>{" "}
              </>
            )}
            {marketSaleTypes == "reverse-auction" && (
              <>
                <InfoDetailEnd>
                  <Text type={"header2"} color={colors.text_header}>
                    Count down
                  </Text>
                  <Text type={"header2"} color={colors.text_header}>
                    Recent Bid
                  </Text>
                </InfoDetailEnd>
                <InfoDetailEnd>
                  <Text type={"header2"} color={colors.accent}>
                    <CountDown timeTillDate={land ? land.endedSale : ""} />
                  </Text>
                  <Text type={"header2"} color={colors.accent}>
                    {land ? land.recentPrice : ""} {"UCC"}
                  </Text>
                </InfoDetailEnd>
                <SendButton>
                  {!isOwner && (
                    <Button
                      width={"100%"}
                      color={colors.primary}
                      onClick={handleBid}
                    >
                      <Text type={"button"} color={colors.text_header}>
                        BID NOW
                      </Text>
                    </Button>
                  )}
                </SendButton>
              </>
            )}
            {belowSM && <InfoDetails data={land} />}
          </div>
        </MarketLayout>
        <MarketLayout>
          {!belowSM && <InfoDetails data={land} />}
          <TableOffer land={land} />
        </MarketLayout>
        <RegularRule />
        <TableActivity data={activity} />
        <MoreMarket></MoreMarket>
      </div>
      {showModal && (
        <ModelMarketOffer
          onCloseModal={() => {
            setShowModal(false);
          }}
          isSetOfferModal={isSetOfferModal}
          data={land}
        />
      )}
      {showVotingModal === "voting" && (
        <VotingModal onCloseModal={setShowVotingModal} data={land} />
      )}
      {showVotingModal === "agree" && (
        <ConfirmModal
          isAgree={true}
          onCloseModal={setShowVotingModal}
          data={land}
        />
      )}
      {showVotingModal === "disagree" && (
        <ConfirmModal
          isAgree={false}
          onCloseModal={setShowVotingModal}
          data={land}
        />
      )}
    </MarketDetailWrapper>
  );
};

export default MarketDetail;
