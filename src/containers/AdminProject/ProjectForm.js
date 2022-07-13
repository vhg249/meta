import React, { useEffect, useState } from "react";
import {
  AlignCenter,
  CheckboxPolicy,
  EditForm,
  FileAttach,
  FileAttachGrid,
  FileAttachInput,
  FileInput,
  FileName,
  FilePreview,
  FlexRight,
  FormGroup,
  ImageView,
  TableWrapper,
  Title,
  UploadIcon
} from "./StyledAdminProject";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import ucc_token from "@Assets/images/ucc-token.png";
import upload_icon from "@Assets/images/upload.png";
import unchecked_icon from "@Assets/images/uncheckedbox.png";
import calendar_icon from "@Assets/images/calendar.png";
import checked_icon from "@Assets/images/checkedbox.png";
import preview_img from "@Assets/images/home-preview.png";
import close_icon from "@Assets/images/close-modal.png";
import dots_icon from "@Assets/images/dots.png";
import Button from "@Components/Button";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import moment from "moment";
import { projectServices } from "@Services/projectServices";
import { uploadServices } from "@Services";
import {
  showNotificationSuccess,
  showNotificationError,
  hideNotification
} from "@Redux/actions/notification";
import { useDispatch } from "react-redux";

const ProjectForm = ({ projectData = {}, ...props }) => {
  const belowSM = useMedia(breakpoints.sm);
  const [checkbox, setCheckbox] = useState(false);
  const [imagesAttachment, setImagesAttachment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);
  const [projectDetail, setProjectDetail] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.action === "edit") {
      setProjectDetail(projectData);
    }
  }, [projectData]);

  const onChangeFile = (arr) => {
    const formData = new FormData();
    Object.values(arr).forEach((item) => {
      formData.append("file", item);
    });

    uploadServices
      .upload(formData)
      .then((res) => {
        res.forEach((i) => {
          setImagesUrl((prevState) => [...prevState, i]);
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });

    for (let item of arr) {
      setImagesAttachment((prevState) => [...prevState, item]);
    }
  };

  const removeFile = (file) => {
    let updateList = imagesAttachment.filter((item, index) => index !== file);
    let updateUrl = imagesUrl.filter((item, index) => index !== file);
    setImagesAttachment(updateList);
    setImagesUrl(updateUrl);
  };

  const updateProject = () => {
    if (checkbox) {
      let data = {
        name: projectDetail.name,
        description: projectDetail.description,
        image: projectDetail.image,
        location: projectDetail.location,
        media: projectDetail.media,
        totalArea: projectDetail.totalArea,
        totalInvestment: parseInt(projectDetail.totalInvestment),
        type: projectDetail.type,
        commencementDate: projectDetail.commencementDate,
        finishedDate: projectDetail.finishedDate,
        developmentUnit: projectDetail.developmentUnit,
        investor: projectDetail.investor,
        status: projectDetail.status
      };
      projectServices
        .updateProjectById(projectDetail.id, data)
        .then((res) => {
          console.log(res); // to-do: toast message
          dispatch(showNotificationSuccess("Update success"));
        })
        .catch((err) => {
          console.log(err); // to-do: toast message
          dispatch(showNotificationError("Update fail"));
        });
    } else {
      console.log("accept policy");
    }
  };

  const addNewProject = async () => {
    let data = {
      name: projectDetail.name,
      description: "description",
      image: imagesUrl[0].url,
      location: projectDetail.location,
      media: projectDetail.media,
      totalArea: projectDetail.totalArea,
      totalInvestment: parseInt(projectDetail.totalInvestment),
      type: projectDetail.type,
      commencementDate: projectDetail.commencementDate,
      finishedDate: projectDetail.finishedDate,
      developmentUnit: projectDetail.developmentUnit,
      investor: projectDetail.investor
    };
    projectServices
      .postProject(data)
      .then((res) => {
        console.log(res); // to-do: toast message
        dispatch(showNotificationSuccess("Add new success"));
      })
      .catch((err) => {
        dispatch(showNotificationError("Fail"));
        console.log(err); // to-do: toast message
      });
  };

  return (
    <>
      <TableWrapper>
        <table>
          <tbody>
            {belowSM ? (
              <tr>
                <td>
                  <AlignCenter>
                    <Text color={colors.text_header} type={"body2"}>
                      {projectDetail ? projectDetail.name : "---"}
                    </Text>
                  </AlignCenter>
                </td>
                <td>
                  <Text color={colors.text_header} type={"body2"}>
                    {projectDetail ? projectDetail.investor : "---"}
                  </Text>
                </td>
                <td>
                  <AlignCenter>
                    <img
                      src={ucc_token}
                      alt="meta365"
                      style={{ marginRight: "8px" }}
                    />
                    <Text color={colors.accent} type={"body1"}>
                      {projectDetail ? projectDetail.totalInvestment : "---"}
                    </Text>
                  </AlignCenter>
                </td>
              </tr>
            ) : (
              <tr>
                <td style={{borderTopLeftRadius: "10px"}}>
                  <AlignCenter>
                    <Text color={colors.text_header} type={"button"}>
                      {projectDetail ? projectDetail.name : "---"}
                    </Text>
                  </AlignCenter>
                </td>
                <td>
                  <Text color={colors.text_header} type={"button"}>
                    {projectDetail ? projectDetail.investor : "---"}
                  </Text>
                </td>
                <td>
                  <AlignCenter style={{ justifyContent: "center" }}>
                    <img
                      src={ucc_token}
                      alt="meta365"
                      style={{ marginRight: "8px" }}
                    />
                    <Text color={colors.accent} type={"button"}>
                      {projectDetail ? projectDetail.totalInvestment : "---"}
                    </Text>
                  </AlignCenter>
                </td>
                <td>
                  <Text color={colors.text_header} type={"button"}>
                    {projectDetail ? projectDetail.totalArea : "---"}
                  </Text>
                </td>
                <td style={{borderTopRightRadius: "10px"}}>
                  <AlignCenter>
                    <img src={dots_icon} alt="meta365" />
                  </AlignCenter>
                </td>
              </tr>
            )}

            <tr>
              <td colSpan="5" style={{ padding: "0", textAlign: "left" }}>
                <EditForm>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Project
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter Project"
                      value={(projectDetail && projectDetail.name) || ""}
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          name: e.target.value
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Location 
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter Location"
                      value={(projectDetail && projectDetail.location) || ""}
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          location: e.target.value
                        });
                      }}
                    />
                  </FormGroup>
                  <FileAttach>
                    <Title>Attached Files</Title>
                    <FileAttachGrid>
                      {props.action === "add" ? (
                        <>
                          <FileInput
                            id="attach-images"
                            type="file"
                            multiple
                            onChange={(e) => {
                              onChangeFile(e.target.files);
                            }}
                          />
                          <label htmlFor="attach-images">
                            <FileAttachInput>
                              <UploadIcon>
                                <img src={upload_icon} alt="meta365" />
                              </UploadIcon>
                              <div>
                                <Text color={colors.text_header} type="button">
                                Upload Image
                                </Text>
                                <Text color={colors.accent} type="body1">
                                  JPG, PNG
                                </Text>
                              </div>
                            </FileAttachInput>
                          </label>
                          {imagesAttachment &&
                            imagesAttachment.map((item, index) => {
                              return (
                                <FilePreview key={index}>
                                  <AlignCenter>
                                    <UploadIcon>
                                      <img
                                        className="preview"
                                        src={URL.createObjectURL(item)}
                                        alt="meta365"
                                      />
                                    </UploadIcon>
                                    <div>
                                      <Text
                                        color={colors.text_header}
                                        type="button"
                                      >
                                        <FileName>{item.name}</FileName>
                                      </Text>
                                      <Text color={colors.accent} type="body1">
                                        {item.size / 1000} KB
                                      </Text>
                                    </div>
                                  </AlignCenter>
                                  <img
                                    src={close_icon}
                                    alt="meta365"
                                    onClick={() => {
                                      removeFile(index);
                                    }}
                                  />
                                </FilePreview>
                              );
                            })}
                        </>
                      ) : (
                        <>
                          {/* {projectDetail && projectDetail.image.map((item, index) => {
                            return(
                              <ImageView>
                                <img src={item.url} alt="meta365" />
                              </ImageView>    
                            )
                          })} */}
                          <ImageView>
                            <img
                              src={projectDetail && projectDetail.image}
                              alt="meta365"
                            />
                          </ImageView>
                        </>
                      )}
                    </FileAttachGrid>
                  </FileAttach>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Investor 
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter Investor"
                      value={(projectDetail && projectDetail.investor) || ""}
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          investor: e.target.value
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Developer
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter Developer"
                      value={
                        (projectDetail && projectDetail.developmentUnit) || ""
                      }
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          developmentUnit: e.target.value
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Area 
                    </Text>
                    <input
                      type="number"
                      placeholder="Enter Area "
                      value={(projectDetail && projectDetail.totalArea) || ""}
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          totalArea: e.target.value
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Commencement
                    </Text>
                    <img
                      src={calendar_icon}
                      alt="meta365"
                      className="calendar-icon"
                    />
                    <input
                      type="date"
                      value={
                        (projectDetail &&
                          moment(projectDetail.commencementDate).format(
                            "YYYY-MM-DD"
                          )) ||
                        ""
                      }
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          commencementDate: e.target.value
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Complete Year
                    </Text>
                    <img
                      src={calendar_icon}
                      alt="meta365"
                      className="calendar-icon"
                    />
                    <input
                      type="date"
                      value={
                        (projectDetail &&
                          moment(projectDetail.finishedDate).format(
                            "YYYY-MM-DD"
                          )) ||
                        ""
                      }
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          finishedDate: e.target.value
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Investment 
                    </Text>
                    <input
                      type="number"
                      placeholder="Enter Investment"
                      style={{ color: "#00B67F" }}
                      value={
                        (projectDetail && projectDetail.totalInvestment) || ""
                      }
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          totalInvestment: e.target.value
                        });
                      }}
                    />
                    <div className="icon">
                      <AlignCenter>
                        <img src={ucc_token} alt="meta365" width="26px" />
                      </AlignCenter>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Media
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter media"
                      style={{ color: "#00B67F" }}
                      value={(projectDetail && projectDetail.media) || ""}
                      onChange={(e) => {
                        setProjectDetail({
                          ...projectDetail,
                          media: e.target.value
                        });
                      }}
                    />
                  </FormGroup>
                  <div></div>
                  <AlignCenter>
                    {checkbox ? (
                      <CheckboxPolicy
                        src={checked_icon}
                        alt="meta365"
                        onClick={() => {
                          setCheckbox(false);
                        }}
                      />
                    ) : (
                      <CheckboxPolicy
                        src={unchecked_icon}
                        alt="meta365"
                        onClick={() => {
                          setCheckbox(true);
                        }}
                      />
                    )}
                    <Text color={"#8E8EA1"} type={"body1"}>
                    Agree to terms and conditions of the contract.
                    </Text>
                  </AlignCenter>
                  <div>
                    <Button
                      color={colors.primary}
                      width="100%"
                      onClick={() => {
                        props.action === "edit"
                          ? updateProject()
                          : addNewProject();
                      }}
                    >
                      <Text color={colors.text_header} type={"button"}>
                        Submit
                      </Text>
                    </Button>
                  </div>
                </EditForm>
              </td>
            </tr>
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
};

export default ProjectForm;
