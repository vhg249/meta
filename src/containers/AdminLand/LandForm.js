import React, { useEffect, useState } from "react";
import {
  AlignCenter,
  Center,
  CheckboxPolicy,
  DeleteTag,
  DraftTag,
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
  StatusTag,
  TableWrapper,
  Title,
  UploadIcon,
} from "./StyledAdminLand";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import ucc_token from "@Assets/images/ucc-token.png";
import upload_icon from "@Assets/images/upload.png";
import unchecked_icon from "@Assets/images/uncheckedbox.png";
import calendar_icon from "@Assets/images/calendar.png";
import checked_icon from "@Assets/images/checkedbox.png";
import preview_img from "@Assets/images/home-preview.png";
import close_icon from "@Assets/images/close-modal.png";
import Button from "@Components/Button";
import moment from "moment";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import { projectServices } from "@Services/projectServices";
import { landServices } from "@Services/landServices";
import { uploadServices } from "@Services";
import {
  showNotificationSuccess,
  showNotificationError,
  hideNotification,
} from "@Redux/actions/notification";
import { useDispatch } from "react-redux";

const LandForm = ({ landData = {}, ...props }) => {
  const [checkbox, setCheckbox] = useState(false);
  const [imagesAttachment, setImagesAttachment] = useState([]);
  const [landDetail, setLandDetail] = useState({});
  const [allProjects, setAllProjects] = useState(null);
  const [landProject, setLandProject] = useState(null);
  const belowSM = useMedia(breakpoints.sm);
  const [loading, setLoading] = useState(false);
  const [imagesUrl, setImagesUrl] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.action === "edit") {
      setLandDetail(landData);
      if (allProjects) {
        let project = allProjects.filter((item) => {
          return item.id === landData.projectId;
        });
        setLandProject(project[0]);
      }
    }
  }, [landData]);

  useEffect(() => {
    getAllProjects();
  }, []);

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
  const getAllProjects = async () => {
    projectServices
      .getProjects()
      .then((res) => {
        setAllProjects(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateLand = async () => {
    if (checkbox) {
      let data = {
        direction: landDetail.direction,
        squares: landDetail.squares,
        ratio: landDetail.ratio,
        location: landDetail.location,
        ownershipCerDate: landDetail.ownershipCerDate,
        startDate: landDetail.startDate,
        ownershipCerProvider: landDetail.ownershipCerProvider,
        landUseTerm: landDetail.landUseTerm,
        landUseType: landDetail.landUseType,
        landUsePurpose: landDetail.landUsePurpose,
        landUseOriginal: landDetail.landUseOriginal,
        legal: landDetail.legal,
        price: landDetail.price,
        author: landDetail.author,
        status: landDetail.status,
      };
      landServices
        .updateLandById(landDetail.id, data)
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
  const addLand = async () => {
    if (checkbox) {
      let data = {
        projectId: landDetail.projectId,
        direction: landDetail.direction,
        landCode: landDetail.landCode,
        landBlockCode: landDetail.landBlockCode,
        squares: landDetail.squares,
        ratio: landDetail.ratio,
        location: landDetail.location,
        images: imagesUrl,
        thumbnail: "thumbnail",
        ownershipCerDate: landDetail.ownershipCerDate,
        startDate: landDetail.startDate,
        ownershipCerProvider: landDetail.ownershipCerProvider,
        landUseTerm: landDetail.landUseTerm,
        landUseType: landDetail.landUseType,
        landUsePurpose: landDetail.landUsePurpose,
        landUseOriginal: landDetail.landUseOriginal,
        legal: landDetail.legal,
        price: landDetail.price,
        author: landDetail.author,
        status: 1,
        numOfNft: landDetail.numOfNft,
        type: landDetail.numOfNft > 1 ? 2 : 1,
      };
      landServices
        .postLand(data)
        .then((res) => {
          console.log(res); // to-do: toast message
          dispatch(showNotificationSuccess("Add new success"));
        })
        .catch((err) => {
          console.log(err); // to-do: toast message
          dispatch(showNotificationError("Fail"));
        });
    }
  };

  return (
    <>
      <TableWrapper>
        <table>
          <thead>
            <tr>
              <th>
                <AlignCenter>
                  <Text color={colors.text_header} type={"button"}>
                  Project
                  </Text>
                </AlignCenter>
              </th>
              <th>
                <Text color={colors.text_header} type={"button"}>
                Land Code
                </Text>
              </th>
              <th>
                <Text color={colors.text_header} type={"button"}>
                Starting Price
                </Text>
              </th>
              <th>
                <Text color={colors.text_header} type={"button"}>
                Date of Commencement
                </Text>
              </th>
              <th>
                <Text color={colors.text_header} type={"button"}>
                Status
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {belowSM ? (
              <tr>
                <td>
                  <>
                    <AlignCenter>
                      <Text color={colors.text_header} type={"body2"}>
                        ---
                      </Text>
                    </AlignCenter>
                    <Text color={colors.text_body} type={"body2"}>
                      {landDetail ? landDetail.landCode : "---"}
                    </Text>
                  </>
                </td>
                <td>
                  {landDetail ? (
                    <>
                      <Center>
                        {landDetail.status === 1 && (
                          <StatusTag>Published</StatusTag>
                        )}
                        {landDetail.status === 2 && (
                          <DeleteTag>Deleted</DeleteTag>
                        )}
                        {landDetail.status === 3 && <DraftTag>Drafted</DraftTag>}
                      </Center>
                    </>
                  ) : (
                    <Text color={colors.text_header} type={"button"}>
                      ---
                    </Text>
                  )}
                </td>
                <td>
                  <AlignCenter>
                    <img
                      src={ucc_token}
                      alt="meta365"
                      style={{ marginRight: "8px" }}
                    />
                    <Text color={colors.accent} type={"body1"}>
                      {landDetail ? landDetail.price : "---"}
                    </Text>
                  </AlignCenter>
                </td>
              </tr>
            ) : (
              <tr>
                <td>
                  <AlignCenter>
                    <Text color={colors.text_header} type={"button"}>
                      {landProject ? landProject.name : "---"}
                    </Text>
                  </AlignCenter>
                </td>
                <td>
                  <Text color={colors.text_header} type={"button"}>
                    {landDetail ? landDetail.landCode : "---"}
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
                      {landDetail ? landDetail.price : "---"}
                    </Text>
                  </AlignCenter>
                </td>
                <td>
                  <Text color={colors.text_header} type={"button"}>
                    {landDetail
                      ? moment(landDetail.createdAt).format("DD/MM/YYYY")
                      : "---"}
                  </Text>
                </td>
                <td>
                  {landDetail ? (
                    <>
                      <Center>
                        {landDetail.status === 1 && (
                          <StatusTag>Published</StatusTag>
                        )}
                        {landDetail.status === 2 && (
                          <DeleteTag>Deleted</DeleteTag>
                        )}
                        {landDetail.status === 3 && <DraftTag>Drafted</DraftTag>}
                      </Center>
                    </>
                  ) : (
                    <Text color={colors.text_header} type={"button"}>
                      ---
                    </Text>
                  )}
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
                    <select
                      disabled={props.action === "edit" ? true : false}
                      value={(landDetail && landDetail.projectId) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          projectId: e.target.value,
                        });
                      }}
                    >
                      <option value="">Choose project</option>
                      {allProjects &&
                        allProjects.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Land Code
                    </Text>
                    <input
                      type="text"
                      placeholder="#123-456789"
                      disabled={props.action === "edit" ? true : false}
                      value={(landDetail && landDetail.landCode) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landCode: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FileAttach>
                    <Title>Attach File</Title>
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
                                  <AlignCenter style={{ gap: "24px" }}>
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
                          {/* {landDetail && landDetail.image.map((item, index) => {
                            return(
                              <ImageView>
                                <img src={item.url} alt="meta365" />
                              </ImageView>    
                            )
                          })} */}
                          <ImageView>
                            <img
                              src={landDetail && landDetail.image}
                              alt="meta365"
                            />
                          </ImageView>
                        </>
                      )}
                    </FileAttachGrid>
                  </FileAttach>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Starting Price
                    </Text>
                    <input
                      type="number"
                      placeholder="0.00"
                      style={{ color: "#00B67F" }}
                      value={(landDetail && landDetail.price) || ""}
                      onChange={(e) => {
                        setLandDetail({ ...landDetail, price: e.target.value });
                      }}
                    />
                    <div className="icon">
                      <AlignCenter>
                        <img src={ucc_token} alt="meta365" />
                        <Text color={colors.text_header} type="button">
                          UCC
                        </Text>
                      </AlignCenter>
                    </div>
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
                        (landDetail &&
                          moment(landDetail.startDate).format("YYYY-MM-DD")) ||
                        ""
                      }
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          startDate: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Address
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter address"
                      value={(landDetail && landDetail.location) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          location: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Direction
                    </Text>
                    <select
                      value={(landDetail && landDetail.direction) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          direction: e.target.value,
                        });
                      }}
                    >
                      <option value="">Select direction</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="South">South</option>
                      <option value="North">North</option>
                      <option value="Northeast">Northeast</option>
                      <option value="Southeast">Southeast</option>
                      <option value="Northwest">Northwest</option>
                      <option value="Southwest">Southwest</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Area
                    </Text>
                    <input
                      type="number"
                      placeholder="Enter area"
                      value={(landDetail && landDetail.squares) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          squares: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Rate
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter rate"
                      value={(landDetail && landDetail.ratio) || ""}
                      onChange={(e) => {
                        setLandDetail({ ...landDetail, ratio: e.target.value });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Land Parcel Code
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter land parcel Code"
                      value={(landDetail && landDetail.landBlockCode) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landBlockCode: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Legal Document
                    </Text>
                    <select
                      value={(landDetail && landDetail.legal) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          legal: e.target.value,
                        });
                      }}
                    >
                      <option value="">Legal foundation</option>
                      <option value="Land Use Rights Certificate">Land Use Rights Certificate</option>
                      <option value="House ownership certificate">House ownership certificate</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Issued on
                    </Text>
                    <img
                      src={calendar_icon}
                      alt="meta365"
                      className="calendar-icon"
                    />
                    <input
                      type="date"
                      value={
                        (landDetail &&
                          moment(landDetail.ownershipCerDate).format(
                            "YYYY-MM-DD"
                          )) ||
                        ""
                      }
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          ownershipCerDate: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Issued at
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter issue department"
                      value={
                        (landDetail && landDetail.ownershipCerProvider) || ""
                      }
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          ownershipCerProvider: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Form of Use
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter form of use here"
                      value={(landDetail && landDetail.landUseType) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landUseType: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Time of Use
                    </Text>
                    <img
                      src={calendar_icon}
                      alt="meta365"
                      className="calendar-icon"
                    />
                    <input
                      type="date"
                      value={
                        (landDetail &&
                          moment(landDetail.landUseTerm).format(
                            "YYYY-MM-DD"
                          )) ||
                        ""
                      }
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landUseTerm: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Land Use Purpose
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter land use purpose"
                      value={(landDetail && landDetail.landUsePurpose) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landUsePurpose: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                    Land Use Origin
                    </Text>
                    <input
                      type="text"
                      placeholder="Enter origin of land use"
                      value={(landDetail && landDetail.landUseOriginal) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          landUseOriginal: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Text color={colors.text_header} type={"body1"}>
                      Number of NFTs
                    </Text>
                    <input
                      type="number"
                      placeholder="Enter number of NFTs"
                      disabled={props.action === "edit" ? true : false}
                      value={(landDetail && landDetail.numOfNft) || ""}
                      onChange={(e) => {
                        setLandDetail({
                          ...landDetail,
                          numOfNft: e.target.value,
                        });
                      }}
                    />
                  </FormGroup>
                  <div/>
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
                        props.action === "edit" ? updateLand() : addLand();
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

export default LandForm;
