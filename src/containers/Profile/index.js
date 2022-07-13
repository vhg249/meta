import React, { useEffect, useState } from "react";
import Button from "@Components/Button";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import {
  Input,
  InputGroup,
  InputLabel,
  LogoImg,
  ProfileForm,
  ProfileLayout,
  ProfileWrapper,
} from "./StyledProfile";
import logo_bg from "@Assets/images/logo-bg.png";
import { userServices } from "@Services";

const Profile = () => {
  const [userData, setUserData] = useState({ email: "", fullName: "" });
  const [invalid, setInvalid] = useState(false);
  useEffect(() => {
    userServices
      .getMe()
      .then((res) => {
        const user = {
          email: res.email,
          fullName: res.fullName,
        };
        setUserData(user);
      })
      .catch((error) => {});
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(userData.email)) {
      const result = await userServices.updateMe(userData);
      const user = {
        email: result.email,
        fullName: result.fullName,
      };
      setUserData(user);
      setInvalid(false);
    } else {
      setInvalid(true);
      // Notify email is invalid
    }
  };
  return (
    <>
      <ProfileWrapper>
        <div className="container">
          <ProfileLayout>
            <div>
              <Text color={colors.text_header} type={"header2"}>
                Profile
              </Text>
              <ProfileForm>
                <InputGroup>
                  <Input
                    placeholder="User name"
                    type="text"
                    value={userData.fullName ?? ""}
                    onChange={(e) => {
                      setUserData({ ...userData, fullName: e.target.value });
                    }}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    placeholder="Your e-mail"
                    type="email"
                    value={userData.email ?? ""}
                    onChange={(e) => {
                      setUserData({ ...userData, email: e.target.value });
                    }}
                  />
                  {invalid && <Text color={"red"}>Invalid email</Text>}
                </InputGroup>
                <Button
                  color={colors.new_button}
                  width={"100%"}
                  onClick={(e) => {
                    onSubmit(e);
                  }}
                  disabled={!userData.email || !userData.fullName ? true : false}
                >
                  SAVE
                </Button>
              </ProfileForm>
            </div>
            <LogoImg>
              <img src={logo_bg} width="100%" />
            </LogoImg>
          </ProfileLayout>
        </div>
      </ProfileWrapper>
    </>
  );
};

export default Profile;
