import React from "react";
import {
  BlockButton,
  CloseIcon,
  EditForm,
  Input,
  ModalBox,
  ModalWrapper,
  TextCenter
} from "./StyledAdminAccount";
import close_icon from "@Assets/images/X.png";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import Button from "../../components/Button";

const BlockModal = ({ data = {}, onBlock, ...props }) => {
  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <CloseIcon>
            <img src={close_icon} onClick={props.onCloseModal} />
          </CloseIcon>
          <TextCenter>
            <Text color={colors.text_header} type={"header2"}>
            Block User?
            </Text>
          </TextCenter>
          <EditForm>
            <Text color={colors.text_header} type={"body1"}>
              {data.public_address}
            </Text>
            <BlockButton style={{ marginTop: "16px" }}>
              <Button
                color={"rgba(225, 98, 110, 0.2)"}
                width={"100%"}
                onClick={(e) => {
                  e.preventDefault();
                  onBlock();
                }}
              >
                Agree 
              </Button>
            </BlockButton>
            <div style={{ marginTop: "16px" }}>
              <Button
                color={colors.primary}
                width={"100%"}
                onClick={props.onCloseModal}
              >
                Cancel
              </Button>
            </div>
          </EditForm>
        </ModalBox>
      </ModalWrapper>
    </>
  );
};

export default BlockModal;
