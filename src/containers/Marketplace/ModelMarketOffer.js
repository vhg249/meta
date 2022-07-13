import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMedia } from "react-use";
import Text from "../../components/Text";
import styled from "styled-components";
import { colors } from "../../theme/colors";
import breakpoints from "@Theme/breakpoints";
import close_icon from "@Assets/images/X.png";
import house from "@Assets/images/house.png";
import Button from "../../components/Button";
import location from "@Assets/images/location.png";
import checkBox from "@Assets/images/checkedbox.png";
import uncheckBox from "@Assets/images/uncheckedbox.png";
import CountDown from "./CountDown";
import { contract } from "@Utils/contract";
import { marketplaceServices } from "@Services/marketplaceServices";
import { loading, unloading } from "@Redux/actions/loading";

import {
  showNotificationSuccess,
  showNotificationError,
  hideNotification,
  showNotificationWarning,
} from "@Redux/actions/notification";

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ModalBoxTest = styled.div`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(59px);
  padding: 24px 32px;
  width: 606px;
  animation: fadein 0.2s linear forwards;
  transition: all 2s;
  transform: translate(0, 500px);

  @media ${breakpoints.xs} {
    width: 375px;
  }
  @keyframes fadein {
    from {
      opacity: 0;
      transform: translate(0, 500px);
    }
    to {
      opacity: 1;
      transform: translate(0, 0px);
    }
  }
`;
export const OfferLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-left:-33px;
  @media ${breakpoints.sm} {
    grid-template-columns: 1fr;
    grid-gap: 32px;
  }
`;
export const TextHeader = styled.div`
  display: flex;
  justify-content: space-between;
  @media ${breakpoints.xs} {
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 10px;
  }
  p {
    padding-bottom: 20px;
  }
`;
export const ImgLeft = styled.img`
  height: 80px;
  width: 80px;
  /* width: 100%; */
  aspect-ratio: 1/1;
  object-fit: cover;
  margin-bottom: 26px;
`;
export const OfferLayoutLeft = styled.div`
  display: flex;
  justify-content: center;
  gap: 17px;
`;
export const OfferLayoutRight = styled.div``;
export const InfoDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0px;
  }
`;
export const AlignCenter = styled.div`
  display: flex;
  align-items: center;
`;
export const InfoDetailEnd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 10px;
  p {
    margin: 0px;
  }
`;
export const InputOffer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid ${colors.primary};
  margin-bottom: 25px ;
  p {
    margin: 14px 10px 0px 0px;
  }
`;
export const Input = styled.input`
  padding: 16px 12px;
  box-sizing: border-box;
  border: unset;
  font-size: 18px;
  font-family: "Open Sans";
  background-color: transparent;
  width: 100%;
  color: ${colors.accent};
  &:focus {
    border: none;
    outline: none;
  }
`;
export const EndModel = styled.div`
  display: flex;
  justify-content: left;
  gap: 3px;
  margin-top: 10px;
  p {
    margin: 0px;
  }
`;

export const OfferLayoutLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: -57px;
`;

const ModelMarketOffer = ({ data = {}, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const [valueOffer, setValueOffer] = useState();
  const [checkedBox, setCheckedBox] = useState(false);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.account.isLogin);

  const onChange = (e) => {
    setValueOffer(e.target.value);
  };
  const setOffer = async () => {
    if (valueOffer) {
      const tx = await contract.sendOffer(
        data.nftId,
        valueOffer,
        Date.now(),
        60 * 60
      );
      if (tx) {
        dispatch(showNotificationSuccess("Transaction success"));
        props.onCloseModal(true);
        props.isSetOfferModal(true);
      } else {
        dispatch(showNotificationError("Transaction failed"));
        props.onCloseModal(true);
        props.isSetOfferModal(true);
      }
    }
  };
  const onCheck = () => {
    setCheckedBox(!checkedBox);
  };
  const handleOffer = async () => {
    if (!isLogin) return dispatch(showNotificationError("Login first"));
    if (!checkedBox) return dispatch(showNotificationError("Accept Policy"));
    if (!valueOffer) return dispatch(showNotificationError("Input Price"));
    dispatch(loading());
    const time = Date.now();
    contract
      .sendOffer(
        data.nftId,
        valueOffer,
        Math.floor(time / 1000),
        Math.floor(data.endedSale)
      )
      .then(() => {
        dispatch(unloading());
        dispatch(showNotificationSuccess("Transaction success"));
        props.onCloseModal(true);
        props.isSetOfferModal(true);
      })
      .catch((err) => {
        dispatch(unloading());
        dispatch(showNotificationError("Transaction failed"));
        props.onCloseModal(true);
        props.isSetOfferModal(true);
      });
  };
  return (
    <>
      <ModalWrapper>
        <ModalBoxTest>
          <TextHeader>
            <Text type={"header2"} color={colors.text_header}>
              Make an offer
            </Text>
            <img
              src={close_icon}
              height="28px"
              style={{ cursor: "pointer" }}
              onClick={props.onCloseModal}
            />
          </TextHeader>
          <OfferLayout>
            <OfferLayoutLeft>
              <ImgLeft src={data.thumbnail} />
              {belowSM && (
                <OfferLayoutLeftContent>
                  <InfoDetail>
                    <Text type={"header2"} color={colors.text_header}>
                      {data.landCode}
                    </Text>
                  </InfoDetail>
                  <AlignCenter>
                    <img src={location} style={{ marginRight: "5px" }} />
                    <Text type={"body1"} color={colors.text_body}>
                      {data.location}
                    </Text>
                  </AlignCenter>
                </OfferLayoutLeftContent>
              )}
            </OfferLayoutLeft>
            <OfferLayoutRight>
              {!belowSM && (
                <>
                  <InfoDetail>
                    <Text type={"header2"} color={colors.text_header}>
                      {data.landCode}
                    </Text>
                  </InfoDetail>
                  <AlignCenter>
                    <img src={location} style={{ marginRight: "5px" }} />
                    <Text type={"body1"} color={colors.text_body}>
                      {data.location}
                    </Text>
                  </AlignCenter>
                </>
              )}
            </OfferLayoutRight>
            </OfferLayout>

              <InfoDetail>
                <Text type={"body1"} color={colors.text_body}>
                Original New Land Value
                </Text>
                <Text type={"body1"} color={colors.text_header}>
                  {data.nftId}
                </Text>
              </InfoDetail>
              <InfoDetail>
                <Text type={"body1"} color={colors.text_body}>
                Current Market Value
                </Text>
                <Text type={"body1"} color={colors.text_header}>
                  {data.originalLandPrice} UCC
                </Text>
              </InfoDetail>
              <InfoDetailEnd>
                <Text type={"body3"} color={colors.text_header}>
                  Count down
                </Text>
                <Text type={"body3"} color={colors.text_header}>
                  Recent Bid
                </Text>
              </InfoDetailEnd>
              <InfoDetailEnd>
                <Text type={"header2"} color={colors.accent}>
                  <CountDown timeTillDate={data.endedSale} />
                </Text>
                <Text type={"header2"} color={colors.accent}>
                  {data.recentPrice} UCC
                </Text>
              </InfoDetailEnd>
              <InputOffer>
                <Input placeholder="Input Price" onChange={onChange} />
                <Text type={"header2"} color={colors.accent}>
                  UCC
                </Text>
              </InputOffer>
          <Button width={"100%"} color={colors.primary} onClick={handleOffer}>
            <Text type={"button"} color={colors.text_header}>
              OFFER
            </Text>
          </Button>
          <EndModel>
            <img
              width="16"
              height="16"
              src={!checkedBox ? uncheckBox : checkBox}
              alt="image checked"
              onClick={onCheck}
            />
            <Text type="body2" color={colors.text_body}>
              By checking this box, I agree to Meta365’s Terms of Service
            </Text>
          </EndModel>
        </ModalBoxTest>
      </ModalWrapper>
    </>
  );
};
export default ModelMarketOffer;
