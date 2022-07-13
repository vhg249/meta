import React, { useContext, useEffect, useState } from "react";
import Text from "../../../components/Text";
import { colors } from "../../../theme/colors";
import styled from "styled-components";
import location from "@Assets/images/location.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loading, unloading } from "@Redux/actions/loading";
import {
  showNotificationSuccess,
  showNotificationError,
} from "@Redux/actions/notification";
import { contract } from "@Utils/contract";
import {
  AlignCenter,
  FormGroup,
  InputBox,
  InputGroup,
  StyledInput,
  Token,
} from "../StyledMyLand";
import { MyLandContext } from "../Context";
import busd from "@Assets/images/busd.png";
import arrow_down from "@Assets/images/arrow-down-img.png";
import ucc from "@Assets/images/ucc-token-o.png";
import List from "./List"
import {
  Wrapper,
  Intro,
  Value,
  Label,
  Button,
  SelectInput,
  Input,
} from "./StyleTab";

const ReverseAuction = () => {
  const navigate = useNavigate();
  const detail = JSON.parse(localStorage.getItem('myLand'))
  const [startingValue, setStartingValue] = useState("");
  const [endingValue, setEndingValue] = useState("");
  const [duration, setDuration] = useState("");
  const [check, setCheck] = useState(false);
  const [chooseBUSD, setChooseBUSD] = useState(true);
  const [isShowStart, setIsShowStart] = useState(false);
  const [isShowEnd, setIsShowEnd] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const getDuration = () => {
    return Date.parse(date + " " + duration);
  };
  useEffect(()=>{

  },[isShowStart,isShowEnd])
  const handleSell = async () => {
    if (!detail.onSale && check) {
      const time = Date.now();
      dispatch(loading());
      const body = {
        nftId: detail.id,
        saleType: "reverseAuction",
        saleData: {
          price: startingValue,
          endedSale: Math.floor(getDuration() / 1000),
          startSale: Math.floor(time / 1000),
          floor: endingValue,
        },
      };
      if (
        startingValue &&
        endingValue &&
        body.saleData.endedSale - body.saleData.startSale > 0 &&
        startingValue > endingValue
      ) {
        await contract
          .sellNFT(
            detail.id,
            chooseBUSD ? contract.BUSD_ADDRESS : contract.TOKEN_ADDRESS,
            startingValue,
            endingValue,
            body.saleData.startSale,
            body.saleData.endedSale - body.saleData.startSale,
            false
          )
          .then(() => {
            dispatch(showNotificationSuccess("Transaction success"));
            dispatch(unloading());
            navigate("/my-land");
          })
          .catch((err) => {
            dispatch(unloading());
            console.log("Transaction failed", err)
            dispatch(showNotificationError("Transaction failed"));
          });
      } else {
        dispatch(unloading());
        dispatch(showNotificationError("Invalid input"));
      }
    } else {
      if (detail.onSale) {
        dispatch(showNotificationError("This land is on sale"));
      }
      if(!check){
        dispatch(showNotificationError("Check Required"));
      }
    }
  };
  return (
    <>
      <Wrapper>
        <Intro>
          <img src={detail.images} alt="" />
          <div>
            <h1>{detail.landCode}</h1>
            <div>
              <img src={location} alt="" />
              <span>{detail.location}</span>
            </div>
          </div>
        </Intro>
        <Value>
          <h1>Original New Land Value</h1>
          <h2>{detail.originalLandPrice} UCC</h2>
        </Value>
        <Value>
          <h1>Current Market Value</h1>
          <h2>{detail.currentMarketPrice} UCC</h2>
        </Value>
        <InputBox>
          <Label style={{ width: "20%" }}>Start Price:</Label>
          <InputGroup>
            <StyledInput
              type="number"
              placeholder="0.00000"
              onChange={(e) => setStartingValue(e.target.value)}
            />
            {chooseBUSD ? (
              <Token
                onClick={() => {
                  setIsShowStart(!isShowStart);
                }}
              >
                <img width="24" height="24" src={busd} alt="busd" />
                <Text color={colors.text_header} type={"header2"}>
                  BUSD
                </Text>
                <img width="20" height="20" src={arrow_down} alt="down" />
              </Token>
            ) : (
              <Token
                onClick={() => {
                  setIsShowStart(!isShowStart);
                }}
              >
                <img width="24" height="24" src={ucc} alt="busd" />
                <Text color={colors.text_header} type={"header2"}>
                  UCC
                </Text>
                <img width="20" height="20" src={arrow_down} alt="down" />
              </Token>
            )}
            {isShowStart && (
              <List setChooseBUSD={setChooseBUSD} setIsShow={setIsShowStart} />
            )}
          </InputGroup>
        </InputBox>
        <InputBox>
          <Label style={{ width: "20%" }}>Ending Price:</Label>
          <InputGroup>
            <StyledInput
              type="number"
              placeholder="0.00000"
              onChange={(e) => setEndingValue(e.target.value)}
            />
            {chooseBUSD ? (
              <Token  
                onClick={() => {
                  setIsShowEnd(!isShowEnd);
                }}
              >
                <img width="24" height="24" src={busd} alt="busd" />
                <Text color={colors.text_header} type={"header2"}>
                  BUSD
                </Text>
                <img width="20" height="20" src={arrow_down} alt="down" />
              </Token>
            ) : (
              <Token
                onClick={() => {
                  setIsShowEnd(!isShowEnd);
                }}
              >
                <img width="24" height="24" src={ucc} alt="busd" />
                <Text color={colors.text_header} type={"header2"}>
                  UCC
                </Text>
                <img width="20" height="20" src={arrow_down} alt="down" />
              </Token>
            )}
            {isShowEnd && (
              <List setChooseBUSD={setChooseBUSD} setIsShow={setIsShowEnd} />
            )}
          </InputGroup>
        </InputBox>
        <InputBox>
          <Label style={{ width: "20%" }}>Time Remaining:</Label>
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
      </Wrapper>
      <Button onClick={handleSell}>SELL</Button>
      <SelectInput>
        <Input type="checkbox" onClick={() => setCheck(!check)} />
        <Label>
          By checking this box, I agree to Meta365’s Terms of Service
        </Label>
      </SelectInput>
    </>
  );
};

export default ReverseAuction;
