import React, { useContext, useState } from "react";
import Card from "@Components/Card";
import house from "@Assets/images/house.png";
import { Address, Badge, Flex, Title } from "./style";
import location from "@Assets/images/location.png";
import ModelSell from "../ModalSell";
import Button from "@Components/Button";
import { colors } from "../../../theme/colors";
import { MyLandContext } from "../Context";
import { Link } from "react-router-dom";
import { InfoHeader } from "../../Marketplace/StyledMarketplace";
import Text from "../../../components/Text";
import { InfoDetail } from "../StyledMyLand";

const CardDetail = (props) => {
  const { setMyLand } = useContext(MyLandContext);
  const { buttonName, data, id } = props;
  const [showModal, setShowModal] = useState(false);
  const [idItem, setIdItem] = useState(1);

  return (
    <>
      <Card image={data.thumbnail} id={data.nftId}>
        <Badge>
          <span>{data.rank}</span>
        </Badge>
        <InfoHeader>
          <Text type={"body2"} color={colors.text_header}>
            {`${data.landCode}-${data.nftId}`}
          </Text>
          <Text type={"body1"} color={colors.accent}>
            {data.originalLandPrice!==undefined ? data.originalLandPrice : data.price } UCC
          </Text>
        </InfoHeader>
        <InfoDetail>
          <Text type={"body1"} color={colors.text_body}>
            Direction
          </Text>
          <Text type={"body1"} color={colors.text_header}>
            {data.direction}
          </Text>
        </InfoDetail>
        <InfoDetail style={{ marginBottom: "6px" }}>
          <Text type={"body1"} color={colors.text_body}>
            Area
          </Text>
          <Text type={"body1"} color={colors.text_header}>
            {data.squares}
          </Text>
        </InfoDetail>
        {data.onSale ? (
          <Link to={`/detail/${data.marketSaleId}`}>
            <Button
              color={colors.primary}
              width="100%"
              onClick={() => {
                setIdItem(1);
                setMyLand(data);
                localStorage.setItem("myLand", JSON.stringify(data));
              }}
            >
              {buttonName}
            </Button>
          </Link>
        ) : (
          <Link to={`/my-land/${data.nftId}`}>
            <Button
              color={colors.primary}
              width="100%"
              onClick={() => {
                setIdItem(1);
                setMyLand(data);
                localStorage.setItem("myLand", JSON.stringify(data));
              }}
            >
              {buttonName}
            </Button>
          </Link>
        )}
      </Card>
    </>
  );
};

export default CardDetail;
