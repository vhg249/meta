import React, { useEffect, useState } from "react";
import {
  Avatar,
  AvatarWrapper,
  CloseIcon,
  CopyIcon,
  FlexMiddle,
  HeaderContainer,
  Logo,
  MenuIcon,
  MenuItem,
  MenuList,
  Notice,
  ProfileInfo,
  ProfileMenu,
  ProfileMenuItem,
  Wrapper
} from "./StyledHeader";
import logo from "@Assets/images/logo.png";
import menu_icon from "@Assets/images/menu.png";
import bell_icon from "@Assets/images/bell.png";
import avatar from "@Assets/images/avatar.png";
import wallet_icon from "@Assets/images/wallet.png";
import dashboard_icon from "@Assets/images/dashboard.png";
import profile_icon from "@Assets/images/profile.png";
import logout_icon from "@Assets/images/logout.png";
import copy_icon from "@Assets/images/copy.png";
import close_icon from "@Assets/images/close.png";
import { Link, NavLink } from "react-router-dom";
import Button from "../Button";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import whitepaper from "@Assets/whitepaper.pdf";
import { useDispatch, useSelector } from "react-redux";
import { showSidebar, hideSidebar } from "@Redux/actions/menu";
import { ethers } from "ethers";
import { utils } from "../../utils";
import { showNotificationSuccess, showNotificationError,hideNotification } from "@Redux/actions/notification";
import { nav } from "./nav";
import { loginRequest, logoutRequest } from "@Redux/actions/account";
import Notification from "../Notification/index";


const Header = (props) => {
  const belowSM = useMedia(breakpoints.sm);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [contentNotice, setContentNotice] = useState({
    content: "You have to download Metamask!"
  })
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const notification = useSelector((state) => state.notification);
  const { isShow } = notification;

  useEffect(() => {
    const authListener = async () => {
      let checked = false;
      if (window.ethereum) {
        const checkExpired = async () => {
          if (!checked) {
            checked = true;
            return await utils.isTokenExpired();
          }
        };
        const test = await checkExpired();
        if (test) {
          dispatch(logoutRequest());
        }
        if (!(await window.ethereum._metamask.isUnlocked())) {
          logout();
        }
        window.ethereum.on("accountsChanged", function (accounts) {
          if (account.isLogin) {
            logout();
          }
        });
        window.ethereum.on("chainChanged", function (accounts) {
          logout();
        });
        return () => {
          checked = true;
          window.ethereum.removeListener("accountsChanged");
          window.ethereum.removeListener("chainChanged");
        };
      } else {
        // Notify metamask is not installed
      }
    };
    authListener();
  }, []);
  let provider;
  if (account.address) {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  } else {
    provider = new ethers.providers.JsonRpcProvider(
      "https://bsc-dataseed.binance.org/"
    );
  }

  
  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (!e.target.closest(".avatar")) {
        setShowProfileMenu(false);
      }
      if (!e.target.closest(".menu-icon")) {
        setShowMenu(false);
        dispatch(hideSidebar());
      }
    });
    if (!window.ethereum) {
      dispatch(showNotificationError(contentNotice.content));
      setTimeout(setTimeNotice, 5000);
    }
  }, [])

  const setTimeNotice = () => {
    dispatch(hideNotification());
  }

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const address = accounts[0];
      if (address) {
        provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      }
      let network = await provider.getNetwork();
      let body = {
        publicAddress: address,
        chainId: network.chainId.toString()
      };
      dispatch(loginRequest(body));
    } catch (error) {
      console.log("connect", error);
    }
  };

  const logout = async () => {
    dispatch(logoutRequest());
  };
  const copyTextToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
  };
  return (
    <Wrapper>
      <HeaderContainer className="container">
        <FlexMiddle>
          {(!props.isAdmin || belowSM) && (
            <NavLink to="/">
              <Logo src={logo} />
            </NavLink>
          )}

          {!props.isAdmin && (
            <MenuList
              style={
                belowSM && !showMenu
                  ? { transform: "translateX(100%)" }
                  : { transform: "translateX(0%)" }
              }
            >
              {belowSM && (
                <CloseIcon
                  onClick={() => {
                    setShowMenu(false);
                  }}
                >
                  <img src={close_icon} />
                </CloseIcon>
              )}
              {nav.map((item, index) => {
                return (
                  <NavLink
                    key={index}
                    style={({ isActive }) => (!belowSM ? {
                      color: isActive ? "#4285F4" : "#F5F5F5",
                      borderBottom: `3px solid ${isActive ?  "#4285F4" : "transparent"}`,
                    } : {
                      color: isActive ? "#F6F9FF" : "#7683B6",
                    })}
                    to={item.link}
                    target={item.name === "Whitepapers" ? "_blank" : ""}
                    key={index}
                  >
                    <MenuItem>{item.name}</MenuItem>
                  </NavLink>
                );
              })}
            </MenuList>
          )}
        </FlexMiddle>
        {isShow && <Notification />}

        <FlexMiddle>
          {account.isLogin ? (
            <FlexMiddle>
              {/* <Notice src={bell_icon} /> */}
              {!props.isAdmin && (
                <AvatarWrapper>
                  <Avatar
                    src={avatar}
                    className="avatar"
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                    }}
                  />
                  {showProfileMenu && (
                    <ProfileMenu>
                      <ProfileInfo>
                        <img src={avatar} />
                        <div>
                          <Text color={colors.accent} type={"body1"}>
                            Account #1
                          </Text>
                          <FlexMiddle>
                            <Text color={colors.text_header} type={"body1"}>
                              {account.address.slice(0, 4) +
                                "..." +
                                account.address.slice(
                                  account.address.length - 4
                                )}
                            </Text>
                            <CopyIcon
                              src={copy_icon}
                              onClick={() =>
                                copyTextToClipboard(account.address)
                              }
                            />
                          </FlexMiddle>
                        </div>
                      </ProfileInfo>
                      <div>
                        <Link to="my-land">
                          <ProfileMenuItem>
                            <img src={wallet_icon} />
                            <Text color={colors.text_header}>My land</Text>
                          </ProfileMenuItem>
                        </Link>
                        <Link to="dashboard">
                          <ProfileMenuItem>
                            <img src={dashboard_icon} />
                            <Text color={colors.text_header}>Dashboard</Text>
                          </ProfileMenuItem>
                        </Link>
                        <Link to="profile">
                          <ProfileMenuItem>
                            <img src={profile_icon} />
                            <Text color={colors.text_header}>Profile</Text>
                          </ProfileMenuItem>
                        </Link>
                        {account.role === "godAccount" && (
                          <Link to="/admin">
                            <ProfileMenuItem>
                              <img src={profile_icon} />
                              <Text color={colors.text_header}>
                                Go to Admin
                              </Text>
                            </ProfileMenuItem>
                          </Link>
                        )}
                        <ProfileMenuItem style={{borderRadius: "0 0 16px 16px"}}
                          onClick={() => {
                            logout();
                          }}
                        >
                          <img src={logout_icon} />
                          <Text color={colors.text_header}>Log out</Text>
                        </ProfileMenuItem>
                      </div>
                    </ProfileMenu>
                  )}
                </AvatarWrapper>
              )}
            </FlexMiddle>
          ) : belowSM ? (
            <Button
              color={colors.new_button}
              width={"92px"}
              size={"sm"}
              onClick={() => {
                connect();
              }}
            >
              Connect
            </Button>
          ) : (
            <Button
              color={colors.new_button}
              width={"144px"}
              size={"sm"}
              onClick={() => {
                connect();
              }}
            >
              Connect Wallet
            </Button>
          )}

          <MenuIcon
            className="menu-icon"
            src={menu_icon}
            onClick={() => {
              props.isAdmin ? dispatch(showSidebar()) : setShowMenu(true);
            }}
          />
        </FlexMiddle>
      </HeaderContainer>
    </Wrapper>
  );
};

export default Header;
