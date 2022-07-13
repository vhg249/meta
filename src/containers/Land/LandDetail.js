import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import { useNavigate, Link, useParams } from "react-router-dom";

import {
  WrapperLandDetail,
  Img,
  LandDetailHeader,
  LandDetailContent,
  LandDetailTable,
  LandDetailTableLeft,
  LandDetailTableRight,
  LandDetailTableRow,
  LandDetailTableRowRight,
  LandDetailTableRowLeft,
  ButtonGroup,
  WrapImg,
  LandWrapperFrame,
  LandWrapperFlex,
  ImgDetail,
  LandDetailTableRowUnit,
  Scroll,
  LandDetailTableRowLegal,
} from "./StyledLand";
import background from "@Assets/images/background.png";
import Button from "@Components/Button";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import { landServices } from "../../services/landServices";
import moment from "moment";

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

const LandDetail = () => {
  const belowSM = useMedia(breakpoints.sm);
  const navigate = useNavigate();
  let { projectPath, landName } = useParams();

  const [landDetail, setLandDetails] = useState();
  let style = {
    position: "relative",
  };
  useEffect(() => {
    getLandDetailsByProject(projectPath, landName);
  }, [projectPath, landName]);
  const getLandDetailsByProject = (projectPath, landCode) => {
    landServices
      .getLandByProject(projectPath, landCode)
      .then((res) => {
        if (res.code === 400) {
          navigate("/page-not-found");
        } else {
          setLandDetails(res);
        }
      })
      .catch((err) => {
        navigate("/page-not-found");
        console.log(err);
      });
  };

  return (
    <div style={{ backgroundImage: `url(${background})`, width: "100vw" }}>
      {landDetail && (
        <>
          <div style={style}>
            <div>
              <Img src={landDetail ? landDetail.thumbnail : ""} />
            </div>
            <LandWrapperFlex>
              <LandWrapperFrame>
                <LandDetailHeader>
                  <Text
                    color={colors.accent}
                    type={!belowSM ? "header3" : "header2"}
                  >
                    {landDetail.projectName}
                  </Text>
                </LandDetailHeader>
                <LandDetailContent>
                  <div>
                    <Text
                      color={colors.text_body}
                      type={!belowSM ? "header2" : "body"}
                    >
                      The family graveyard covers an area of 48m2 to 295m2,
                      specifically:
                    </Text>
                    <ul>
                      <Text
                        color={colors.text_body}
                        type={!belowSM ? "header2" : "body"}
                      >
                        <li>
                          Family graveyard of 48m2 has the maximum of 8 graves.
                        </li>
                      </Text>
                      <Text
                        color={colors.text_body}
                        type={!belowSM ? "header2" : "body"}
                      >
                        <li>
                          Family graveyard of 95m2-159m2 has the maximum of 12
                          graves.
                        </li>
                      </Text>
                      <Text
                        color={colors.text_body}
                        type={!belowSM ? "header2" : "body"}
                      >
                        <li>
                          Family graveyard of 195m2-295m2 has the maximum of 16
                          graves.
                        </li>
                      </Text>
                    </ul>
                  </div>
                </LandDetailContent>
                <LandDetailTable>
                  <Scroll>
                    <LandDetailTableLeft>
                      <LandDetailTableRowLeft>
                        <Text type="body3" color={colors.text_body}>
                          Token ID
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.nftId : ""}
                        </Text>
                      </LandDetailTableRowLeft>
                      <LandDetailTableRowLeft>
                        <Text type="body3" color={colors.text_body}>
                          Created
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {moment(landDetail.startDate).format("DD/MM/YYYY")}
                        </Text>
                      </LandDetailTableRowLeft>
                      <LandDetailTableRowLeft>
                        <Text type="body3" color={colors.text_body}>
                          Direction
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.direction : ""}
                        </Text>
                      </LandDetailTableRowLeft>
                      <LandDetailTableRowLeft>
                        <Text type="body3" color={colors.text_body}>
                          Area
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.squares : ""}m2
                        </Text>
                      </LandDetailTableRowLeft>
                    </LandDetailTableLeft>
                    <LandDetailTableRight>
                      <LandDetailTableRowRight>
                        <Text type="body3" color={colors.text_body}>
                          Rate
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.ratio : ""}
                        </Text>
                      </LandDetailTableRowRight>
                      <LandDetailTableRowRight>
                        <Text type="body3" color={colors.text_body}>
                          Issued on
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail
                            ? moment(landDetail.ownershipCerDate).format(
                                "DD/MM/YYYY"
                              )
                            : ""}
                        </Text>
                      </LandDetailTableRowRight>
                      <LandDetailTableRowUnit>
                        <Text type="body3" color={colors.text_body}>
                          Unit
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.ownershipCerProvider : ""}
                        </Text>
                      </LandDetailTableRowUnit>
                      <LandDetailTableRowLegal>
                        <Text type="body3" color={colors.text_body}>
                          Legal document
                        </Text>
                        <Text type="body3" color={colors.text_header}>
                          {landDetail ? landDetail.legal : ""}
                        </Text>
                      </LandDetailTableRowLegal>
                    </LandDetailTableRight>
                  </Scroll>
                </LandDetailTable>
                <ButtonGroup>
                  <Button width={"100%"} color={colors.primary}>
                    <Text type={"button"} color={colors.text_header}>
                      Purchase
                    </Text>
                  </Button>
                  <Button
                    width={"100%"}
                    color={colors.accent}
                    onClick={(e) => {
                      e.preventDefault();
                      window.top.location.href = `${baseUrl}/marketplace?landCode=${landDetail.landCode}`;
                    }}
                  >
                    <Text type={"button"} color={colors.text_header}>
                      MARKETPLACE
                    </Text>
                  </Button>
                </ButtonGroup>
              </LandWrapperFrame>
            </LandWrapperFlex>
          </div>

          <WrapperLandDetail>
            <div
              style={
                !belowSM ? { width: "70%", margin: "auto" } : { width: "auto" }
              }
              className="container"
            >
              <WrapImg>
                {landDetail ? (
                  landDetail.images.map((item, index) => {
                    return <ImgDetail key={index} src={item} />;
                  })
                ) : (
                  <></>
                )}
              </WrapImg>
            </div>
          </WrapperLandDetail>
        </>
      )}
    </div>
  );
};

export default LandDetail;
