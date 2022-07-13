import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMedia } from "react-use";
import Button from "@Components/Button";
import Table from "@Components/Table";
import Text from "@Components/Text";
import breakpoints from "@Theme/breakpoints";
import {
  AlignCenter,
  DetailImg,
  InfoDetail,
  InputGroup,
  MyLandDetailWrapper,
  MyLandLayout,
  Navigation,
  SendButton,
  StyledInput,
  Label,
  TableCover,
  Token,
  InputBox,
  Border,
  FormGroup,
} from "../StyledMyLand";
import house from "@Assets/images/house.png";
import eye from "@Assets/images/eye.png";
import location from "@Assets/images/location.png";
import sort_icon from "@Assets/images/sort-price.png";
import { colors } from "@Theme/colors";
import { nftServices } from "@Services/nftServices";
import { marketplaceServices } from "@Services/marketplaceServices";
import { contract } from "@Utils/contract";
import { useSelector, useDispatch } from "react-redux";
import {
  showNotificationSuccess,
  showNotificationError,
} from "@Redux/actions/notification";
import moment from "moment";
import { MyLandContext } from "../Context";

import { loading, unloading } from "@Redux/actions/loading";

const RegularAction = () => {
  const {myLand} = useContext(MyLandContext)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const belowSM = useMedia(breakpoints.sm);
  const [land, setLand] = useState(null);
  const detail = [
    {
      title: "Created",
      value: land ? moment(land.landCreatedAt).format("DD/MM/YYYY") : "",
    },
    {
      title: "Direction",
      value: land ? land.direction : "",
    },
    {
      title: "Area",
      value: land ? land.squares : "",
    },
    {
      title: "Rate",
      value: land ? land.rate : "",
    },
    {
      title: "Issued on",
      value: land ? moment(land.ownershipCerDate).format("DD/MM/YYYY") : "",
    },
    {
      title: "Unit",
      value: land ? land.ownershipCerProvider : "",
    },
    {
      title: "Legal document",
      value: land ? land.legal : "",
    },
  ];
  const current = [
    {
      title: "Current Owner",
      value: land ? land.nftOwner : "",
    },
    {
      title: "Current Market Value",
      value: `${land ? land.currentMarketPrice : "0"} UCC`,
    },
    {
      title: "Original New Land Value",
      value: `${land ? land.originalLandPrice : "0"} UCC`,
    },
  ];
  const [startingValue, setStartingValue] = useState("");
  const [endingValue, setEndingValue] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState("");
  const nftId = useParams();
  useEffect(() => {
    setLand(myLand)
  }, []);
  const getDuration = () => {
    return Date.parse(date + " " + duration);
  };
  const handleSell = async () => {
    if (!land.onSale) {
      dispatch(loading());
      const time = Date.now();
      const body = {
        nftId: land.id,
        saleType: "auction",
        saleData: {
          ceil: endingValue,
          endedSale: Math.floor(getDuration() / 1000),
          startSale: Math.floor(time / 1000),
          floor: startingValue,
        },
      };
      if (
        startingValue &&
        endingValue &&
        body.saleData.endedSale - body.saleData.startSale > 0 &&
        startingValue < endingValue
      ) {
        const tx = await contract.sellNFT(
          land.id,
          startingValue,
          endingValue,
          body.saleData.startSale,
          body.saleData.endedSale - body.saleData.startSale,
          false
        );
        if (tx) {
          dispatch(showNotificationSuccess("Transaction success"));
          dispatch(unloading());
          navigate("/my-land");
        } else {
          dispatch(unloading());
          dispatch(showNotificationError("Transaction failed"));
        }
      } else {
        dispatch(unloading());
        dispatch(showNotificationError("Invalid input"));
      }
    } else {
      dispatch(showNotificationError("Land is on sale"));
    }
  };
  return (
    <>
      <MyLandDetailWrapper>
        <div className="container">
          <Navigation>
            <Link to="/my-land">
              <Text type={"body"} color={colors.accent}>
                Regular Auction/
                <span style={{ color: `${colors.text_body}` }}>
                  {land ? land.landCode : ""}
                </span>
              </Text>
            </Link>
          </Navigation>
          <MyLandLayout>
            <div>
              <DetailImg src={land ? land.images[0] : house} />

              {!belowSM && (
                <div>
                  <Text type={"header2"} color={colors.text_header}>
                    Detail
                  </Text>
                  <br />
                  {detail.map((item, index) => (
                    <InfoDetail key={index}>
                      <Text type={"body1"} color={colors.text_body}>
                        {item.title}
                      </Text>
                      <div
                        style={{ display: "inline-block", textAlign: "right" }}
                      >
                        <Text type={"body1"} color={colors.text_header}>
                          {item.value}
                        </Text>
                      </div>
                    </InfoDetail>
                  ))}
                </div>
              )}
            </div>
            <div>
              <InfoDetail>
                <Text type={"header2"} color={colors.text_header}>
                  {land ? land.landCode : ""}
                </Text>
                <AlignCenter>
                  <img src={eye} style={{ marginRight: "10px" }} />
                  <Text color={colors.accent} type={"button"}>
                    See on Meta365 Land
                  </Text>
                </AlignCenter>
              </InfoDetail>
              <AlignCenter style={{ marginBottom: "20px" }}>
                <img src={location} style={{ marginRight: "5px" }} />
                <Text type={"body1"} color={colors.text_body}>
                  {land ? land.location : ""}
                </Text>
              </AlignCenter>
              <Border>
                {current.map((item, index) => (
                  <InfoDetail key={index}>
                    <Text type={"body1"} color={colors.text_body}>
                      {item.title}
                    </Text>
                    <div
                      style={{ display: "inline-block", textAlign: "right" }}
                    >
                      <Text type={"body1"} color={colors.text_header}>
                        {item.value}
                      </Text>
                    </div>
                  </InfoDetail>
                ))}
              </Border>

              <InputBox>
                <Label>Open Price:</Label>
                <InputGroup>
                  <StyledInput
                    type="number"
                    placeholder="0.00000"
                    onChange={(e) => setStartingValue(e.target.value)}
                  />
                  <Token>
                    <Text color={colors.accent} type={"header2"}>
                      UCC
                    </Text>
                  </Token>
                </InputGroup>
              </InputBox>

              <InputBox>
                <Label>End Price:</Label>
                <InputGroup>
                  <StyledInput
                    type="number"
                    placeholder="0.00000"
                    onChange={(e) => setEndingValue(e.target.value)}
                  />
                  <Token>
                    <Text color={colors.accent} type={"header2"}>
                      UCC
                    </Text>
                  </Token>
                </InputGroup>
              </InputBox>

              <InputBox>
                <Label>Time Remaining:</Label>
                <AlignCenter className="flex">
                  <FormGroup className="time">
                    <input
                      type="time"
                      placeholder="Time"
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="date">
                    <input
                      type="date"
                      placeholder="Date"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </FormGroup>
                </AlignCenter>
              </InputBox>
              <div style={{ marginTop: "16px" }}>
                <span
                  style={{
                    color: "#b2b2b2",
                    fontSize: "12px",
                    marginTop: "16px",
                  }}
                >
                  <span style={{ color: "red" }}>* </span>Deduction times will
                  be adjusted in accordance with the time to bid, starting and
                  ending prices.
                </span>
              </div>
              <SendButton>
                <Button
                  width={"100%"}
                  color={colors.primary}
                  onClick={handleSell}
                >
                  <Text type={"button"} color={colors.text_header}>
                    SELL
                  </Text>
                </Button>
              </SendButton>
              <TableCover>
                <Table title={"Offers"}>
                  <thead>
                    <tr>
                      <th>
                        <Text color={colors.text_body} type="button">
                          Address
                        </Text>
                      </th>
                      {!belowSM && (
                        <th>
                          <Text color={colors.text_body} type="button">
                            Hash
                          </Text>
                        </th>
                      )}
                      <th>
                        <AlignCenter>
                          <Text color={colors.text_body} type="button">
                            Price
                          </Text>
                          <img src={sort_icon} alt="sort" />
                        </AlignCenter>
                      </th>
                      {!belowSM && (
                        <th>
                          <Text color={colors.text_body} type="button">
                            Time
                          </Text>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody></tbody>
                </Table>
              </TableCover>
            </div>
          </MyLandLayout>
        </div>
      </MyLandDetailWrapper>
    </>
  );
};

export default RegularAction;
