import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  AlignCenter,
  ButtonGroup,
  Center,
  Checkbox,
  DeleteTag,
  DraftTag,
  EditForm,
  FlexRight,
  FormFooter,
  FormGroup,
  PendingTag,
  StatusTag,
} from "./StyledAdminProject";
import Badges from "@Components/Badges";
import Button from "@Components/Button";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import ActionSelect from "@Components/ActionSelect";
import { PROJECT_STATUS } from "@Constants/admin/project";
import ucc_token from "@Assets/images/ucc-token.png";

const LandItem = ({ add, itemData = {}, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const [showDetail, setShowDetail] = useState(false);
  const [project, setProjectData] = useState({});

  useEffect(() => {
    if (add) setShowDetail(true);
  }, []);
  return (
    <>
      {belowSM ? (
        <tr>
          <td>
            <AlignCenter>
              <Text color={colors.text_body} type={"body2"}>
                {itemData.name}
              </Text>
            </AlignCenter>
            <Text color={colors.text_body} type={"body2"}>
              {itemData.investor}
            </Text>
          </td>
          <td>
            <Center>
              {itemData.status === 1 && <PendingTag>Pending</PendingTag>}
              {itemData.status === 2 && <StatusTag>Published</StatusTag>}
              {itemData.status === 3 && <DeleteTag>Deleted</DeleteTag>}
              {itemData.status === 4 && <DraftTag>Drafted</DraftTag>}
            </Center>
          </td>
          <td>
            <AlignCenter>
              <img
                src={ucc_token}
                alt="meta365"
                style={{ marginRight: "8px" }}
              />
              <Text color={colors.accent} type={"body2"}>
              {itemData.totalInvestment}
              </Text>
            </AlignCenter>
          </td>
          <td>
            <FlexRight>
              <ActionSelect showEdit={() => setShowDetail(true)} />
            </FlexRight>
          </td>
        </tr>
      ) : (
        <tr>
          <td>
            <AlignCenter>
              <Checkbox type="checkbox" />
              <Text color={colors.text_header} type={"body1"}>
                {itemData.name}
              </Text>
              {/* <Badges type={`${PROJECT_STATUS[itemData.status]}`}>
                {PROJECT_STATUS[itemData.status]}
              </Badges> */}
            </AlignCenter>
          </td>
          <td>
            <AlignCenter>
              <Text color={colors.text_header} type={"body1"}>
                {add ? "---" : `${itemData.investor}`}
              </Text>
            </AlignCenter>
          </td>
          <td>
            <AlignCenter>
              <img
                src={ucc_token}
                alt="meta365"
                style={{ marginRight: "8px" }}
              />
              <Text color={colors.text_header} type={"body1"}>
                {itemData.totalInvestment}
              </Text>
            </AlignCenter>
          </td>
          <td>
            <Center>
              {itemData.status === 1 && <PendingTag>Pending</PendingTag>}
              {itemData.status === 2 && <StatusTag>Published</StatusTag>}
              {itemData.status === 3 && <DeleteTag>Deleted</DeleteTag>}
              {itemData.status === 4 && <DraftTag>Drafted</DraftTag>}
            </Center>
          </td>
          <td>
            <Center>
              <ActionSelect id={itemData.id} />
            </Center>
          </td>
        </tr>
      )}
    </>
  );
};

export default LandItem;
