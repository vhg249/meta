import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Text from "../../components/Text";
import { colors } from "../../theme/colors";
import {
  CopyIcon,
  Input,
  ModalBox,
  ModalHeader,
  ModalWrapper,
  ProfileInfo,
} from "./StyledBlog";
import close_icon from "@Assets/images/X.png";
import photo_icon from "@Assets/images/photo.png";
import { AlignCenter } from "../../components/AdminTable/StyledAdminTable";
import avatar from "@Assets/images/avatar.png";
import copy_icon from "@Assets/images/copy.png";
import Button from "../../components/Button";
import EditorBlog from "./EditorBlog";
import { set } from "draft-js/lib/DefaultDraftBlockRenderMap";



const EditBlog = ({ onUpdate, ...props }) => {
  const account = useSelector((state) => state.account);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [changeTitle, setChangeTitle] = useState(false);
  
  return (
    <>
      <ModalWrapper>
        <ModalBox>
          <ModalHeader>
            <Text color={colors.text_header} type={"header2"}>
              Edit post
            </Text>
            <img
              src={close_icon}
              height="28px"
              style={{ cursor: "pointer" }}
              onClick={props.onCloseModal}
            />
          </ModalHeader>
          <ProfileInfo>
            <img src={avatar} />
            <div>
              <Text color={colors.accent} type={"body1"}>
                Account #1
              </Text>
              <AlignCenter>
                <Text color={colors.text_header} type={"body1"}>
                  {account.address}
                </Text>
                <CopyIcon src={copy_icon} />
              </AlignCenter>
            </div>
          </ProfileInfo>
          <form>
            <Input
              type="text"
              placeholder="Title"
              required
              defaultValue={
                props.articleDetail ? props.articleDetail.title : ""
              }
              onChange={(e) => {
                setChangeTitle(true);
                setTitle(e.target.value);
              }}
            />
            <EditorBlog
              onTyping={(value) => {
                setContent(value);
              }}
              data={props.articleDetail ? props.articleDetail.content : ""}
            />
            <Button
              width={"100%"}
              color={colors.primary}
              onClick={(e) => {
                e.preventDefault();
                if (props.articleDetail)
                  if (changeTitle) {
                    onUpdate({ id: props.articleDetail.id, title, content });
                  } else {
                    onUpdate({
                      id: props.articleDetail.id,
                      title: props.articleDetail.title,
                      content,
                    });
                  }
              }}
            >
              Confirm
            </Button>
          </form>
        </ModalBox>
      </ModalWrapper>
    </>
  );
};

export default EditBlog;
