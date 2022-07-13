import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalWrapper,
  ModalHeader,
  ModalBody,
  Flex,
  LandImage,
  VotingDetail,
  Info,
  VotingWrapper,
  TotalProgress,
  ProgressWrapper,
  ProgressValue,
  CountdownWrapper,
  Title,
  CountdownBox,
  CountdownTime,
  GroupButton,
  FormWrapper,
} from "./StyledVoting";
import { colors } from "@Theme/colors";
import breakpoints from "@Theme/breakpoints";
import close_icon from "@Assets/images/close-modal.png";
import house from "@Assets/images/house.png";
import Button from "../../../components/Button";
import VoteRules from "./VoteRules";
import { votingServices } from "@Services";
const VotingModal = ({ data, ...props }) => {
  const details = [
    { field: "Map Code", content: data.landCode },
    { field: "Project", content: "" },
    {
      field: "Investor",
      content: "",
    },
    {
      field: "Address",
      content: data.location,
    },
  ];
  const [isVoted, setIsVoted] = useState(false);
  const [voteData, setVoteData] = useState({});
  const fetchVote = async () => {
    const res = await votingServices.getVote(data.delegate);
    console.log(res)
    setVoteData(res);
  };
  useEffect(async() => {
    if (data) {
      fetchVote();
    }
    console.log(data);
  }, []);

  return (
    <>
      <ModalWrapper>
        <Modal>
          <ModalHeader>
            <Text color={colors.text_header} type="header2">
              Vote
            </Text>
            <img
              src={close_icon}
              alt="close"
              onClick={() => {
                props.onCloseModal("");
              }}
            />
          </ModalHeader>
          <ModalBody>
            <Flex>
              <LandImage src={data.thumbnail} alt="land" />
              <div>
                <Text color={colors.text_header} type="button">
                  {data.landCode}
                </Text>
                <VotingDetail>
                  {details.map((item, index) => {
                    return (
                      <Info key={index}>
                        <Text color={colors.sub_text} type="body2">
                          {item.field}
                        </Text>
                        <Text color={colors.text_header} type="body2">
                          {item.content}
                        </Text>
                      </Info>
                    );
                  })}
                </VotingDetail>
              </div>
            </Flex>
            <VotingWrapper>
              <Info>
                <Text color={colors.new_primary} type="body1">
                  Agreed 65%
                </Text>
                <Text color={"#D95C74"} type="body1">
                  Disagreed 35%
                </Text>
              </Info>
              <ProgressWrapper>
                <TotalProgress value="65" min="0" max="100" />
                <ProgressValue>
                  <Text color="#EEEEEE" type="body1">
                    130/200
                  </Text>
                </ProgressValue>
              </ProgressWrapper>
              <CountdownWrapper>
                <Title>Voting starts in</Title>
                <CountdownBox>
                  <CountdownTime>
                    02
                    <Text color={colors.text} type="body2">
                      HOURS
                    </Text>
                  </CountdownTime>
                  <CountdownTime>:</CountdownTime>
                  <CountdownTime>
                    00
                    <Text color={colors.text} type="body2">
                      DAYS
                    </Text>
                  </CountdownTime>
                  <CountdownTime>:</CountdownTime>
                  <CountdownTime>
                    00
                    <Text color={colors.text} type="body2">
                      MINUTES
                    </Text>
                  </CountdownTime>
                  <CountdownTime>:</CountdownTime>
                  <CountdownTime>
                    00
                    <Text color={colors.text} type="body2">
                      SECONDS
                    </Text>
                  </CountdownTime>
                </CountdownBox>
              </CountdownWrapper>
            </VotingWrapper>
            <FormWrapper>
              <VoteRules />
              <Info>
                <Text color={colors.sub_text} type="body">
                  Purchase price
                </Text>
                <Text
                  color={colors.text_header}
                  type="body"
                  customStyle="font-weight: 700;"
                >
                  {data.recentPrice} UCC
                </Text>
              </Info>
              <Info>
                <Text color={colors.sub_text} type="body">
                  Cashback
                </Text>
                <Text
                  color={colors.accent}
                  type="body"
                  customStyle="font-weight: 700;"
                >
                  {voteData? voteData.cashback : 0} UCC
                </Text>
              </Info>
              <GroupButton>
                {isVoted ? (
                  <Button color={colors.new_button} disabled={true}>
                    Voted
                  </Button>
                ) : (
                  <>
                    <Button
                      color={colors.background2}
                      className="disagree"
                      onClick={() => {
                        props.onCloseModal("disagree");
                      }}
                    >
                      Disagree
                    </Button>
                    <Button
                      color={colors.new_button}
                      onClick={() => {
                        props.onCloseModal("agree");
                      }}
                    >
                      Agree
                    </Button>
                  </>
                )}
              </GroupButton>
            </FormWrapper>
          </ModalBody>
        </Modal>
      </ModalWrapper>
    </>
  );
};

export default VotingModal;
