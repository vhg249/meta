import React, { useState } from "react";
import { colors } from "../../theme/colors";
import { ConfirmModal, ModalWrapper, StopTitle } from "./StyledModal";
import close_icon from "@Assets/images/close-modal.png";
import Button from "../Button";
import { contract } from "@Utils/contract";
import {
  showNotificationSuccess,
  showNotificationError,
} from "@Redux/actions/notification";
import { useDispatch } from "react-redux";
import { loading, unloading } from "@Redux/actions/loading";
const ConfirmVotingModal = (props) => {
  const dispatch = useDispatch();
  const deleteVoting = (input) => {
    dispatch(loading());

    contract
      .delVoting(input)
      .then((res) => {
        dispatch(unloading());
        dispatch(showNotificationSuccess("Success"));
        props.onCloseModal("");
      })
      .catch((err) => {
        dispatch(unloading());
        dispatch(showNotificationError("Fail"));
        props.onCloseModal("");
      });
  };
  const stopVoting = (parentId) => {
    dispatch(loading());

    contract
      .stopVoting(parentId, [0])
      .then((res) => {
        dispatch(unloading());
        dispatch(showNotificationSuccess("Success"));
        props.onCloseModal("");
      })
      .catch((err) => {
        dispatch(unloading());
        dispatch(showNotificationError("Fail"));
        props.onCloseModal("");
      });
  };
  return (
    <>
      <ModalWrapper>
        <ConfirmModal>
          <div className="header">
            <div />
            <Text color={colors.text_header} type="subtitle">
              Voting
            </Text>
            <img
              src={close_icon}
              alt="close"
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.onCloseModal("");
              }}
            />
          </div>
          <StopTitle>
            <Text color="#D95C74" type="header2">
              {props.isDelete ? "Delete voting?" : "Stop voting?"}
            </Text>
          </StopTitle>
          {props.isDelete ? (
            <Button
              color={colors.new_primary}
              width="100%"
              onClick={() => {
                deleteVoting([props.data.delegate]);
              }}
            >
              Confirm
            </Button>
          ) : (
            <Button
              color={colors.new_primary}
              width="100%"
              onClick={() => {
                stopVoting([props.data.delegate]);
              }}
            >
              Confirm
            </Button>
          )}
          <Button
            color={colors.background2}
            width="100%"
            onClick={() => {
              props.onCloseModal("voting");
            }}
          >
            Cancel
          </Button>
        </ConfirmModal>
      </ModalWrapper>
    </>
  );
};

export default ConfirmVotingModal;
