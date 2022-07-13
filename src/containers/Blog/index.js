import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import AdminTable from "@Components/AdminTable";
import Badges from "@Components/Badges";
import Button from "@Components/Button";
import Text from "@Components/Text";
import Notification from "@Components/Notification";
import { colors } from "@Theme/colors";
import {
  AlignCenter,
  Checkbox,
  FlexRight,
  Icon,
  TabItem,
  Title,
  Center,
  StatusTag,
  TextTitle,
} from "./StyledBlog";
import more_icon from "@Assets/images/dots.png";
import ban_icon from "@Assets/images/ban.png";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import AddNewBlog from "./AddNewBlog";
import ActionSelect from "@Components/ActionSelect";
import AdminFilter from "@Components/AdminFilter";
import { articleServices } from "@Services";
import EditorBlog from "./EditBlog";
import {
  showNotificationSuccess,
  showNotificationError,
} from "@Redux/actions/notification";

const PAGE_SIZE = 20;

const Blog = () => {
  const belowSM = useMedia(breakpoints.sm);
  const dispatch = useDispatch();
  const [articleData, setArticleData] = useState([]);
  const [articleDetail, setArticleDetail] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogQuery, setBlogQuery] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const notification = useSelector((state) => state.notification);
  const { isShow } = notification;
  const fetchArticles = (filter = {}) => {
    setLoading(true);

    articleServices
      .getArticles({ limit: PAGE_SIZE, ...filter })
      .then((res) => {
        const { totalPages, page, results } = res;
        setTotalPages(totalPages);
        setPage(page);
        setArticleData(results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchArticles();
    if (articleDetail && isDelete) {
      deleteBlog(articleDetail.id);
    }
  }, [isDelete]);

  const changePage = (page) => {
    fetchArticles({ page });
    setPage(page);
  };
  const onSearchArticle = async (e) => {
    const searchQuery = e.target.value
      ? {
          title: e.target.value,
        }
      : {};

    setBlogQuery(searchQuery);
    fetchArticles(searchQuery);
  };

  const publicBlog = async (data) => {
    await articleServices
      .postArticle(data)
      .then((res) => {
        dispatch(showNotificationSuccess("Add article success"));
      })
      .catch((error) => {
        dispatch(showNotificationError("Add article failed"));
      });
    setShowModal(false);
    fetchArticles();
  };
  const updateBlog = async (data) => {
    let dataUpdate = {
      title: data.title,
      content: data.content,
      updatedAt: new Date().now,
    };
    await articleServices
      .updateArticleById(data.id, dataUpdate)
      .then((res) => {
        dispatch(showNotificationSuccess("Update success"));
      })
      .catch((error) => {
        dispatch(showNotificationError("Update failed"));
      });
    setShowModalEdit(false);
    fetchArticles();
  };
  const deleteBlog = async (id) => {
    await articleServices
      .deleteArticleById(id)
      .then((res) => {
        dispatch(showNotificationSuccess("Delete success"));
        setIsDelete(false);
      })
      .catch((error) => {
        dispatch(showNotificationError("Delete failed"));
      });
    fetchArticles();
  };

  return (
    <>
      <AlignCenter style={{ marginBottom: "32px", marginTop: "30px" }}>
        <Title>Page</Title>
        <div style={{ marginTop: "5px" }}>
          {isShow && <Notification />}
          {/* <Link to="add"> */}
          <Button
            width={"112px"}
            color={colors.primary}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add new
          </Button>
          {/* </Link> */}
        </div>
      </AlignCenter>
      <AdminFilter onSearch={onSearchArticle} />
      <AdminTable pages={totalPages} activePage={page} pageChange={changePage}>
        <table>
          <thead>
            <tr>
              <th>
                <AlignCenter>
                  <Checkbox type="checkbox" />
                  <Text color={colors.text_header} type={"button"}>
                    Title
                  </Text>
                </AlignCenter>
              </th>
              <th>
                <AlignCenter>
                  <Text color={colors.text_header} type={"button"}>
                    Author
                  </Text>
                </AlignCenter>
              </th>
              <th>
                <AlignCenter>
                  <Text color={colors.text_header} type={"button"}>
                    Date
                  </Text>
                </AlignCenter>
              </th>
              <th style={{ textAlign: "center" }}>
                {/* <AlignCenter> */}
                <Text color={colors.text_header} type={"button"}>
                  Status
                </Text>
                {/* </AlignCenter> */}
              </th>
              <th>
                {/* <Center>
                  <img src={more_icon} alt="meta365" />
                </Center> */}
              </th>
            </tr>
          </thead>
          <tbody>
            {articleData.map((article, index) => {
              if (belowSM)
                return (
                  <tr key={index}>
                    <td>
                      <AlignCenter>
                        <TextTitle>
                          <Text color={colors.text_header} type={"body1"}>
                            {article.title}
                          </Text>
                        </TextTitle>
                      </AlignCenter>
                      <Text color={colors.text_body} type={"body2"}>
                        {moment(article.updatedAt).format("DD/MM/YYYY")}
                      </Text>
                    </td>
                    <td>
                      <Center>
                        <StatusTag>Published</StatusTag>
                      </Center>
                    </td>
                    <td>
                      <Text color={colors.accent} type={"body2"}>
                        {article.author ?? "ADMIN"}
                      </Text>
                    </td>

                    <td>
                      <FlexRight
                        onClick={() => {
                          setArticleDetail(article);
                        }}
                      >
                        <ActionSelect
                          isBlog={true}
                          setIsEdit={setIsEdit}
                          setIsDelete={setIsDelete}
                          show={showModal}
                          setShowModal={() => {
                            setShowModalEdit(true);
                          }}
                        />
                      </FlexRight>
                    </td>
                  </tr>
                );
              return (
                <tr key={index}>
                  <td>
                    <AlignCenter>
                      <Checkbox type="checkbox" />
                      <TextTitle>
                        <Text color={colors.text_header} type={"body1"}>
                          {article.title}
                        </Text>
                      </TextTitle>

                      {/* <Badges type={"draft"}>Nháp</Badges> */}
                    </AlignCenter>
                  </td>
                  <td>
                    <Text color={colors.text_header} type={"body1"}>
                      {article.author ?? "ADMIN"}
                    </Text>
                  </td>
                  <td>
                    <Text color={colors.text_header} type={"body1"}>
                      Last Modified <br />
                      {moment(article.updatedAt).format("DD/MM/YYYY, h:mm a")}
                    </Text>
                  </td>
                  <td>
                    <Center>
                      <StatusTag>Published</StatusTag>
                    </Center>
                  </td>
                  <td>
                    <FlexRight
                      onClick={() => {
                        setArticleDetail(article);
                      }}
                    >
                      <ActionSelect
                        isBlog={true}
                        setIsEdit={setIsEdit}
                        setIsDelete={setIsDelete}
                        setShowModal={() => {
                          setShowModalEdit(true);
                        }}
                      />
                    </FlexRight>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </AdminTable>
      {showModal && (
        <AddNewBlog
          show={showModal}
          onCloseModal={() => {
            setShowModal(false);
          }}
          onSave={publicBlog}
        />
      )}
      {showModalEdit && (
        <EditorBlog
          articleDetail={articleDetail}
          show={showModal}
          onCloseModal={() => {
            setShowModalEdit(false);
          }}
          onUpdate={updateBlog}
        />
      )}
    </>
  );
};

export default Blog;
