import React, { useState } from "react";
import moment from "moment";
import {
  AlignCenter,
  ButtonGroup,
  Center,
  Checkbox,
  DeleteTag,
  DraftTag,
  EditForm,
  FileInput,
  FileInputLabel,
  FlexRight,
  FormFooter,
  FormGroup,
  Price,
  PriceLabel,
  ShowIcon,
  StatusTag,
} from "./StyledAdminLand";
import Badges from "@Components/Badges";
import Button from "@Components/Button";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import ucc_token from "@Assets/images/ucc-token.png";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import ActionSelect from "@Components/ActionSelect";
import { useEffect } from "react";
import { landServices } from "../../services/landServices";

const MarketItem = ({ landData = {}, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const [landDetail, setLandDetail] = useState(landData);
  const [nftData, setNftData] = useState([]);
  const [showAllNft, setShowAllNft] = useState(false);

  useEffect(() => {
    getLandNft();
  }, []);
  useEffect(() => {
    setLandDetail(landData);
  }, [landData]);

  const getLandNft = () => {
    landServices.getNftsByLand(landData.id).then((res) => {
      setNftData(res.results)
    }).catch((err) => {
      console.log(err);
    })
  }
  
  return (
    <>
      {belowSM ? (
        <>
          <tr style={showAllNft ? {backgroundColor: "#171735"} : {backgroundColor: "#1E2027"}}>
            <td onClick={() => {setShowAllNft(!showAllNft)}}>
              <>
                <AlignCenter>
                  <Text color={colors.text_header} type={"body2"}>
                    {landDetail.projectName}
                  </Text>
                </AlignCenter>
                <Text color={colors.text_body} type={"body2"}>
                  {landDetail.landCode}
                </Text>
              </>
            </td>
            <td onClick={() => {setShowAllNft(!showAllNft)}}>
              <AlignCenter>
                <StatusTag>Published</StatusTag>
                {landDetail.status === 1 && (
                  <StatusTag>Published</StatusTag>
                )}
                {landDetail.status === 2 && (
                  <DeleteTag>Deleted</DeleteTag>
                )}
                {landDetail.status === 3 && <DraftTag>Drafted</DraftTag>}
              </AlignCenter>
            </td>
            <td onClick={() => {setShowAllNft(!showAllNft)}}>
              <AlignCenter>
                <img
                  src={ucc_token}
                  alt="meta365"
                  style={{ marginRight: "8px" }}
                />
                <Text color={colors.text_header} type={"body1"}>
                  {landDetail.price}
                </Text>
              </AlignCenter>
            </td>
            <td>
              <FlexRight>
                <ActionSelect id={landDetail.id} hasVoting={true} voteData={landDetail} />
              </FlexRight>
            </td>
          </tr>
          {showAllNft && (
            <tr className="subitem">
              <td colSpan={5} style={{display: "table-cell"}}>
                <div>
                  <table>
                    <tbody>
                      {nftData && nftData.map((item, index) => {
                        return(
                          <tr key={index}>
                            <td>
                                <Text color={colors.text_header} type={"body2"}>
                                  {item.id}
                                </Text>
                                <Text color={colors.text_body} type={"body2"}>
                                  {item.rank}
                                </Text>
                            </td>
                            <td>
                              <Center>
                                <StatusTag>Published</StatusTag>
                              </Center>
                            </td>
                            <td><Center><Text color="#DAD8D8" type="body2">{item.owner.slice(0, 5)+"..."+item.owner.slice(item.id.length - 5)}</Text></Center></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>  
                </div>
              </td>
            </tr>  
          )}
            
        </>
      ) : (
        <>
          <tr style={showAllNft ? {backgroundColor: "#171735"} : {backgroundColor: "#1E2027"}}>
            <td onClick={() => {setShowAllNft(!showAllNft)}}>
              <AlignCenter>
                <Checkbox type="checkbox" />
                <Text color={colors.text_header} type={"body1"}>
                  {landDetail.projectName}
                </Text>
              </AlignCenter>
            </td>
            <td onClick={() => {setShowAllNft(!showAllNft)}}>
              <AlignCenter>
                <Text color={colors.text_body} type={"body1"}>
                  {landDetail.landCode}
                </Text>
              </AlignCenter>
            </td>
            <td onClick={() => {setShowAllNft(!showAllNft)}}>
              <AlignCenter>
                <img
                  src={ucc_token}
                  alt="meta365"
                  style={{ marginRight: "8px" }}
                />
                <Text color={colors.accent} type={"body1"}>
                  {landDetail.price}
                </Text>
              </AlignCenter>
            </td>
            <td onClick={() => {setShowAllNft(!showAllNft)}}>
              <AlignCenter>
                <Text color={colors.text_header} type={"body1"}>
                  {moment(landDetail.createdAt).format("DD/MM/YYYY")}
                </Text>
              </AlignCenter>
            </td>
            <td onClick={() => {setShowAllNft(!showAllNft)}}>
              <Center>
                {landDetail.status === 1 && (
                  <StatusTag>Published</StatusTag>
                )}
                {landDetail.status === 2 && (
                  <DeleteTag>Deleted</DeleteTag>
                )}
                {landDetail.status === 3 && <DraftTag>Drafted</DraftTag>}
              </Center>
            </td>
            <td>
              <Center>
                <ActionSelect id={landDetail.id} hasVoting={true} voteData={landDetail} />
              </Center>
            </td>
          </tr>
          {showAllNft && (
            <tr className="subitem">
              <td colSpan={5} style={{display: "table-cell"}}>
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th style={{width: "25%"}}><Text color={colors.white} type="body2">#</Text></th>
                        <th style={{width: "15%"}}><Text color={colors.white} type="body2">NFT Code</Text></th>
                        {/* <th style={{width: "15%"}}><Text color={colors.white} type="body2">Price</Text></th> */}
                        <th style={{width: "20%"}}><Text color={colors.white} type="body2">Owner address</Text></th>
                        <th style={{width: "15%"}}><Center><Text color={colors.white} type="body2">Status</Text></Center></th>
                      </tr>
                    </thead>
                    <tbody>
                      {nftData && nftData.map((item, index) => {
                        return(
                          <tr key={index}>
                            <td><Text color="#DAD8D8" type="body2">{item.rank}</Text></td>
                            <td><Text color="#DAD8D8" type="body2">{item.id}</Text></td>
                            {/* <td>
                              <Center>
                                <img
                                  src={ucc_token}
                                  alt="meta365"
                                  style={{ marginRight: "8px" }}
                                />
                                <Text color={colors.accent} type={"body2"}>
                                  50,036
                                </Text>
                              </Center>
                            </td> */}
                            <td><Text color="#DAD8D8" type="body2">{item.owner}</Text></td>
                            <td>
                              <Center>
                                {item.status ? (
                                  <StatusTag>Verified</StatusTag>
                                ):(
                                  <DraftTag>Unverified</DraftTag>
                                )}
                                
                              </Center>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>  
                </div>
              </td>
              <td></td>
            </tr>    
          )}
        </>
      )}
    </>
  );
};

export default MarketItem;
