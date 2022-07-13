import React, { useEffect, useState } from "react";
import { colors } from "@Theme/colors";
import Button from "../Button";
import { Option, OptionList, SelectWrapper, ShowIcon } from "./StyledSelected";
import more_icon from "@Assets/images/more.png";
import dots_icon from "@Assets/images/dots.png";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import { Link } from "react-router-dom";
import SetVoteModal from "../SetVoteModal";
import ConfirmVotingModal from "../SetVoteModal/ConfirmVotingModal";

const ActionSelect = (props) => {
  const [showAction, setShowAction] = useState(false);
  const belowSM = useMedia(breakpoints.sm);
  const [showVoting, setShowVoting] = useState("");
  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (!e.target.closest(".action-btn")) {
        setShowAction(false);
      }
    });
    return () => {
      setShowAction(false);
    };
  }, []);

  return (
    <>
      <SelectWrapper>
        <div className="action-btn">
          {belowSM ? (
            <ShowIcon
              src={more_icon}
              onClick={() => setShowAction(!showAction)}
            />
          ) : (
            <ShowIcon
              src={dots_icon}
              onClick={() => setShowAction(!showAction)}
            />
          )}
        </div>

        {showAction && (
          <OptionList>
            {props.isBlog ? (
              <Option
                onClick={(() => props.setIsEdit(true), props.setShowModal)}
              >
                Edit
              </Option>
            ) : (
              <Link to={`edit/${props.id}`}>
                <Option>Edit</Option>
              </Link>
            )}
            {props.isBlog ? (
              <Option onClick={() => props.setIsDelete(true)}>Delete</Option>
            ) : (
              <Option>Delete</Option>
            )}
            <Option>Draft</Option>

            <Option>Pin to</Option>
            {props.hasVoting && (
              <Option
                onClick={() => {
                  setShowVoting("voting");
                }}
              >
                Voting
              </Option>
            )}
          </OptionList>
        )}

        {showVoting === "voting" && (
          <SetVoteModal onCloseModal={setShowVoting} data={props.voteData} />
        )}
        {showVoting === "delete" && (
          <ConfirmVotingModal onCloseModal={setShowVoting} isDelete={true} data={props.voteData} />
        )}
        {showVoting === "stop" && (
          <ConfirmVotingModal onCloseModal={setShowVoting} isDelete={false} data={props.voteData} />
        )}
      </SelectWrapper>
    </>
  );
};

export default ActionSelect;
