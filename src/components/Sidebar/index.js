import React, { useEffect, useState } from "react";
import {
  Actived,
  AlignCenter,
  BackgroundBlur,
  CopyIcon,
  Header,
  LogoImg,
  MenuIcon,
  MenuItem,
  MenuList,
  Notice,
  ProfileInfo,
  ProfileMenu,
  ProfileMenuItem,
  ShowIcon,
  ShowMenuIcon,
  SidebarHeader,
  SidebarWrapper,
  SpaceBetween,
  SubmenuItem,
  Title,
} from "./StyledSidebar";
import logo from "@Assets/images/logo.png";
import Text from "../Text";
import { colors } from "@Theme/colors";
import menu_icon from "@Assets/images/menu-toggle.png";
import blog_icon from "@Assets/images/blog.png";
import global_icon from "@Assets/images/global.png";
import shop_icon from "@Assets/images/shop.png";
import profile_icon from "@Assets/images/profile-circle.png";
import bubble_icon from "@Assets/images/bubble.png";
import down_icon from "@Assets/images/dropdown.png";
import { Link } from "react-router-dom";
import avatar from "@Assets/images/avatar.png";
import copy_icon from "@Assets/images/copy.png";
import wallet_icon from "@Assets/images/wallet.png";
import dashboard_icon from "@Assets/images/dashboard.png";
import logout_icon from "@Assets/images/logout.png";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import bar_icon from "@Assets/images/menu.png";
import { useDispatch, useSelector } from "react-redux";
import { hideSidebar } from "@Redux/actions/menu";
import { useLocation } from "react-router-dom";
import { sessionServices } from "@Services/sessionServices";
import { handleLogout } from "@Services/loginServices";
import { logoutSuccess, updateAddress } from "@Redux/actions/account";
import { sidebar } from "./sidebar";

const Sidebar = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [showAccount, setShowAccount] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLand, setShowLand] = useState(false);
  const [pageActive, setPageActive] = useState(1);
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const location = useLocation();

  const getActiveTab = () => {
    switch (location.pathname) {
      case "/admin":
        setPageActive(0);
        break;
      case "/admin/project":
        setPageActive(1);
        break;
      case "/admin/land":
        setPageActive(2);
        break;
      case "/admin/account":
        setPageActive(3);
        break;
      default:
        setPageActive(0);
        break;
    }
  };

  const logout = async () => {
    const refreshToken = await sessionServices.getRefreshToken();
    await handleLogout({ refreshToken: refreshToken });
    dispatch(updateAddress({ address: "" }));
    dispatch(logoutSuccess());
  };

  useEffect(() => {
    getActiveTab();
  }, []);

  return (
    <>
      {menu.showSidebar && (
        <BackgroundBlur
          onClick={() => {
            dispatch(hideSidebar());
          }}
        />
      )}
      
      <SidebarWrapper
        style={
          belowSM && !menu.showSidebar
            ? { transform: "translateX(100%)" }
            : { transform: "translateX(0%)" }
        }
      >
        <div>
          <SidebarHeader>
            <SpaceBetween>
              <AlignCenter>
                <Link to="/">
                  <LogoImg src={logo} />
                </Link>
                <div>
                  <Title>META365</Title>
                  <Text color={colors.white} type={"body2"}>
                    Admin
                  </Text>
                </div>
              </AlignCenter>
              <ShowMenuIcon
                src={menu_icon}
                onClick={() => {
                  dispatch(hideSidebar());
                }}
              />
            </SpaceBetween>
          </SidebarHeader>
          <MenuList>
            {sidebar.map((item, index) => {
              return (
                <div key={index}>
                  <Link to={item.link}>
                    <MenuItem
                      onClick={() => {
                        item.children && item.showChildren
                          ? (item.showChildren = false)
                          : (item.showChildren = true);
                        setPageActive(index);
                      }}
                    >
                      <AlignCenter>
                        <MenuIcon src={item.icon} />
                        <Text color={colors.white} type={"body1"}>
                          {item.name}
                        </Text>
                      </AlignCenter>
                      <AlignCenter>
                        {item.children && <ShowIcon src={down_icon} />}
                        <Actived
                          style={
                            pageActive === index
                              ? { visibility: "visible" }
                              : { visibility: "hidden" }
                          }
                        />
                      </AlignCenter>
                    </MenuItem>
                  </Link>
                  {item.children &&
                    item.showChildren &&
                    item.children.map((child, i) => {
                      return (
                        <div key={i}>
                          <Link to={child.link}>
                            <SubmenuItem
                              onClick={() => {
                                setPageActive(index);
                              }}
                            >
                              <Text color={colors.text_body} type={"body2"}>
                                {child.name}
                              </Text>
                            </SubmenuItem>
                          </Link>
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </MenuList>
        </div>

        <ProfileMenu>
          <ProfileInfo
            onClick={() => {
              setShowProfile(!showProfile);
            }}
          >
            <img src={avatar} />
            <div>
              <Text color={colors.accent} type={"body1"}>
                Account #1
              </Text>
              <AlignCenter>
                <Text color={colors.text_header} type={"body1"}>
                  000cds...jk4
                </Text>
                <CopyIcon src={copy_icon} />
              </AlignCenter>
            </div>
          </ProfileInfo>
          {showProfile && (
            <div style={{ borderTop: "1px solid #C0C0C0" }}>
              <Link to="/my-land">
                <ProfileMenuItem>
                  <img src={wallet_icon} />
                  <Text color={colors.text_header}>My land</Text>
                </ProfileMenuItem>
              </Link>
              <Link to="/dashboard">
                <ProfileMenuItem>
                  <img src={dashboard_icon} />
                  <Text color={colors.text_header}>Dashboard</Text>
                </ProfileMenuItem>
              </Link>
              <Link to="/profile">
                <ProfileMenuItem>
                  <img src={profile_icon} />
                  <Text color={colors.text_header}>Profile</Text>
                </ProfileMenuItem>
              </Link>
              <ProfileMenuItem
                onClick={() => {
                  logout();
                }}
              >
                <img src={logout_icon} />
                <Text color={colors.text_header}>Log out</Text>
              </ProfileMenuItem>
            </div>
          )}
        </ProfileMenu>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
