import React, { useState } from "react";
import { colors } from "../../../theme/colors";
import { ConfirmModalContainer, ModalWrapper, StopTitle } from "./StyledVoting";
import { contract } from "@Utils/contract";
import { showNotificationSuccess, showNotificationError } from "@Redux/actions/notification";
import { useDispatch } from "react-redux";
import close_icon from "@Assets/images/close-modal.png";
import Button from "@Components/Button";

const ConfirmModal = (props) => {
    const [parentId, setParentId] = useState([]);
    const dispatch = useDispatch();

    const vote = (input) => {
        console.log(props, input)
        contract.vote(input).then((res) => {
            console.log(res);
            dispatch(showNotificationSuccess("Success"));
            props.onCloseModal("");
        }).catch((err) => {
            console.log(err);
            dispatch(showNotificationError("Fail"));
            props.onCloseModal("");
        })
    }
    const protest = (input) => {
        contract.protest(input).then((res) => {
            dispatch(showNotificationSuccess("Success"));
            props.onCloseModal("");
        }).catch((err) => {
            console.log(err);
            dispatch(showNotificationError("Fail"));
            props.onCloseModal("");
        })
    }
    return(
        <>
            <ModalWrapper>
                <ConfirmModalContainer>
                    <div className="header">
                        <div/>
                        <Text color={colors.text_header} type="subtitle">Voting</Text>
                        <img src={close_icon} alt="close" style={{cursor: "pointer"}}
                            onClick={() => {
                                props.onCloseModal("");
                            }}
                        />
                    </div>
                    <StopTitle>
                        {props.isAgree ? 
                            <Text color={colors.accent} type="header2">Agree</Text> 
                            : <Text color="#D95C74" type="header2">Disagree</Text>}
                    </StopTitle>
                    {props.isAgree ? (
                        <Button color={colors.new_primary} width="100%" onClick={() => {vote(props.data.delegate)}}>Confirm</Button>
                    ) : (
                        <Button color={colors.new_primary} width="100%" onClick={() => {protest(props.data.delegate)}}>Confirm</Button>
                    )}
                    <Button color={colors.background2} width="100%" onClick={() => {props.onCloseModal("voting")}}>Cancel</Button>
                </ConfirmModalContainer>
            </ModalWrapper>
        </>
    )
}

export default ConfirmModal;