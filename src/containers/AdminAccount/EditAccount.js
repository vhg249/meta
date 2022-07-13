import React from "react";
import {
  AlignCenter,
  BlockButton,
  CloseIcon,
  CopyIcon,
  EditForm,
  FormGroup,
  Input,
  ModalBox,
  ModalWrapper,
  TextCenter,
} from "./StyledAdminAccount";
import close_icon from "@Assets/images/X.png";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import copy_icon from "@Assets/images/copy.png";
import Checkbox from "@Components/Checkbox";
import Button from "../../components/Button";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";

const EditAccount = ({ data = {}, onUpdate, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <CloseIcon>
            <img src={close_icon} onClick={props.onCloseModal} />
          </CloseIcon>
          <TextCenter>
            <Text color={colors.text_header} type={"header2"}>
              Ronald Richards
            </Text>
          </TextCenter>
          <TextCenter>
            <Text color={colors.text_header} type={"body1"}>
              {data.public_address}
            </Text>
            <CopyIcon src={copy_icon} />
          </TextCenter>
          <EditForm>
            <Text color={"rgba(250, 252, 254, 0.75)"} type={"body1"}>
            Access
            </Text>
            <FormGroup>
              <AlignCenter>
                <Checkbox>
                  <Text color={colors.text_header} type={"body"}>
                    Admin
                  </Text>
                </Checkbox>
              </AlignCenter>
              <Text color={colors.primary} type={"body1"}>
                24
              </Text>
            </FormGroup>
            <FormGroup>
              <AlignCenter>
                <Checkbox>
                  <Text color={colors.text_header} type={"body"}>
                    Maintainer
                  </Text>
                </Checkbox>
              </AlignCenter>
              <Text color={colors.primary} type={"body1"}>
                24
              </Text>
            </FormGroup>
            <FormGroup>
              <AlignCenter>
                <Checkbox>
                  <Text color={colors.text_header} type={"body"}>
                  Editor
                  </Text>
                </Checkbox>
              </AlignCenter>
              <Text color={colors.primary} type={"body1"}>
                24
              </Text>
            </FormGroup>
            <FormGroup>
              <AlignCenter>
                <Checkbox>
                  <Text color={colors.text_header} type={"body"}>
                    User
                  </Text>
                </Checkbox>
              </AlignCenter>
              <Text color={colors.primary} type={"body1"}>
                24
              </Text>
            </FormGroup>
            <div style={{ marginTop: "24px" }}>
              <Button
                color={colors.primary}
                width={"100%"}
                onClick={(e) => {
                  e.preventDefault();
                  onUpdate();
                }}
              >
                save
              </Button>
            </div>
            {belowSM && (
              <BlockButton
                style={{ marginTop: "16px" }}
                onClick={props.isBlock}
              >
                <Button color={"rgba(225, 98, 110, 0.2)"} width={"100%"}>
                  BLOCK
                </Button>
              </BlockButton>
            )}
          </EditForm>
        </ModalBox>
      </ModalWrapper>
    </>
  );
};

export default EditAccount;
