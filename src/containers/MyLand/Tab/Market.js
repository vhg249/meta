import React, { useContext, useState } from "react";
import Text from "../../../components/Text";
import { colors } from "../../../theme/colors";
import location from "@Assets/images/location.png";
import styled from "styled-components";
import { MyLandContext } from "../Context";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loading, unloading } from "@Redux/actions/loading";
import busd from "@Assets/images/busd.png";
import arrow_down from "@Assets/images/arrow-down-img.png";
import ucc from "@Assets/images/ucc-token-o.png";

import {
  showNotificationSuccess,
  showNotificationError,
} from "@Redux/actions/notification";
import { contract } from "@Utils/contract";
import List from "./List"
import {
  AlignCenter,
  FormGroup,
  InputBox,
  InputGroup,
  StyledInput,
  Token,
} from "../StyledMyLand";

import {
  Wrapper,
  Intro,
  Value,
  Label,
  Button,
  SelectInput,
  Input,
  ListAllItems,
  ListAllItem,
} from "./StyleTab";

const Market = () => {
  const navigate = useNavigate();
  const detail = JSON.parse(localStorage.getItem("myLand"));
  const [inputValue, setInputValue] = useState("");
  const [check, setCheck] = useState(false);
  const [chooseBUSD, setChooseBUSD] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();
  let styleFilter = {
    background: "rgba(66, 133, 244, 0.1)",
  };
  const handleSell = async () => {
    if (inputValue && !detail.onSale && check) {
      const time = Date.now();
      dispatch(loading());
      const body = {
        nftId: detail.id,
        saleType: "marketSale",
        saleData: {
          price: inputValue,
          endedSale: Math.floor(time / 1000),
          startSale: Math.floor(time / 1000),
          floor: inputValue,
        },
      };
      try {
        await contract
          .sellNFT(
            detail.id,
            chooseBUSD ? contract.BUSD_ADDRESS : contract.TOKEN_ADDRESS,
            inputValue,
            inputValue,
            body.saleData.startSale,
            0,
            true
          )
          .then(() => {
            dispatch(showNotificationSuccess("Transaction success"));
            dispatch(unloading());
            navigate("/my-land");
          })
          .catch(() => {
            dispatch(unloading());
            dispatch(showNotificationError("Transaction failed"));
          });
      } catch (err) {
        console.log(err);
        if (err.data.code === 3) {
          dispatch(showNotificationError("You are not the owner"));
        }
        dispatch(unloading());
      }
    } else {
      if (detail.onSale) {
        dispatch(showNotificationError("This land is on sale"));
      }
      if(inputValue===""){
        dispatch(showNotificationError("Invalid Input"));
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
        <div style={{ margin: "30px 0" }}>
          <InputGroup>
            <StyledInput
              type="number"
              placeholder="Input Price"
              onChange={(e) => setInputValue(e.target.value)}
            />
            {chooseBUSD ? (
              <Token
                onClick={() => {
                  setIsShow(!isShow);
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
                  setIsShow(!isShow);
                }}
              >
                <img width="24" height="24" src={ucc} alt="busd" />
                <Text color={colors.text_header} type={"header2"}>
                  UCC
                </Text>
                <img width="20" height="20" src={arrow_down} alt="down" />
              </Token>
            )}
            {isShow && (
              <List setChooseBUSD={setChooseBUSD} setIsShow={setIsShow} />
            )}
          </InputGroup>
        </div>
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

export default Market;
