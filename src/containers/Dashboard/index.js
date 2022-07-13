import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import {
  DashboardGrid,
  DashboardWrapper,
  InfoCard,
  Selected,
  SelectGroup,
  SelectWrapper,
  OptionGroup,
  Option
} from "./StyledDashboard";
import down_icon from "@Assets/images/green-down.png";
import bnb_token from "@Assets/images/bnb-token.png";
import busd from "@Assets/images/busd.png";
import ucctokeno from "@Assets/images/ucc-token-o.png";
import usdt from "@Assets/images/usdt.png";
import { WEB3_PROVIDER, TESTNET, MAINNET } from "@Constants/blockchain";
import { contract } from "@Utils/contract";

const bcConfig = TESTNET;

const Dashboard = () => {
  const [selectProject, setSelectProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectStatus, setSelectStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [balance, setBalance] = useState({ ucc: 0, usdt: 0, bnb: 0, busd: 0 });
  const account = useSelector((state) => state.account);


  let provider;
  if (window.ethereum) {
    provider = WEB3_PROVIDER;
  } else {
    if (account.chainId === 97) provider = bcConfig.PROVIDER;
    else provider = MAINNET.PROVIDER;
  }
  const read = new ethers.Contract(
    contract.TOKEN_ADDRESS,
    contract.UCC_ABI,
    provider
  );
  const readBusd = new ethers.Contract(
    contract.BUSD_ADDRESS,
    contract.BUSD_ABI,
    provider
  );
  const readUsdt = new ethers.Contract(
    contract.USDT_ADDRESS,
    contract.USDT_ABI,
    provider
  );
  const getBalance = async () => {
    if (account.address) {
      const resBusd = await readBusd.balanceOf(account.address);
      const resUsdt = await readUsdt.balanceOf(account.address);
      const resUCC = await read.balanceOf(account.address);
      const signer = await provider.getSigner();
      const res = await signer.getBalance();

      setBalance({
        ...balance,
        ucc: Number(resUCC) / 1e18,
        bnb: Number(res) / 1e18,
        usdt: Number(resUsdt) / 1e18,
        busd: Number(resBusd) / 1e18
      });
    }
  };
  useEffect(() => {
    getBalance();
  }, [account.address]);

  return (
    <>
      <DashboardWrapper>
        <div className="container">
          <Text color={colors.text_header} type={"header2"}>
            Balance
          </Text>
          <DashboardGrid>
            <InfoCard>
              <img src={ucctokeno} />
              <div>
                <Text color={colors.text_header} type={"header2"}>
                  {balance.ucc} UCC
                </Text>
              </div>
            </InfoCard>
            <InfoCard>
              <img src={busd} />
              <div>
                <Text color={colors.text_header} type={"header2"}>
                  {balance.busd} BUSD
                </Text>
              </div>
            </InfoCard>

            <InfoCard>
              <img src={bnb_token} />
              <div>
                <Text color={colors.text_header} type={"header2"}>
                  {balance.bnb} BNB
                </Text>
              </div>
            </InfoCard>
            <InfoCard>
              <img src={usdt} />
              <div>
                <Text color={colors.text_header} type={"header2"}>
                  {balance.usdt} USDT
                </Text>
              </div>
            </InfoCard>
          </DashboardGrid>
        </div>
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;
