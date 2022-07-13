import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMedia } from "react-use";
import {
  BannerImg,
  ContentWrap,
  DetailContent,
  NewsCard,
  NewsGrid,
  NewsImg,
  NewsWrapper,
  SuggestionCard,
  SuggestionGrid,
  SuggestionNews,
  Content,
  ContentDetail,
} from "./StyledNews";
import news_img from "@Assets/images/news.png";
import house from "@Assets/images/house.png";
import breakpoints from "@Theme/breakpoints";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import { articleServices } from "@Services";
import { NewsContext } from "./NewsContext";

const NewsDetail = () => {
  const { newData } = useContext(NewsContext);
  let { newsId } = useParams();
  const belowSM = useMedia(breakpoints.sm);
  const navigate = useNavigate();
  const [checkedNoData, setCheckedNoData] = useState(false);
  const [articleDetail, setArticleDetail] = useState({});
  const [article, setArticle] = useState();

  const [srcImg, setSrcImg] = useState();
  const convertHTML = (data) => {
    if (data) {
      if (data.indexOf("&lt;") != -1 || data.indexOf("&gt;") != -1) {
        data = data.replaceAll("&gt;", ">");
        data = data.replaceAll("&lt;", "<");
        return data;
      } else {
        return data;
      }
    }
  };
  function getImageFromContent(data) {
    let index = data.indexOf("src=");
    let indexEnd = data.indexOf("width", index);
    data = data.slice(index + 5, indexEnd - 2);
    return data;
  }
  const fetchArticleById = (id) => {
    articleServices
      .getArticleDetails(id)
      .then((res) => {
        res.content = convertHTML(res.content);
        let Img = getImageFromContent(res.content);
        setSrcImg(Img);
        setArticleDetail(res);
      })
      .catch((error) => {
        setCheckedNoData(true);
        navigate("/no-data");
      });
  };
  const fetchArticle = (limit) => {
    articleServices.getArticles({ limit }).then((res) => {
      res.content = convertHTML(res.content);
      setArticle(res.results);
    });
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchArticleById(newsId);
    fetchArticle(2);
  }, [newsId]);
  function slideContent(data) {
    let index;
    data = convertHTML(data);
    if (data) {
      if (data.indexOf("</p>") != -1) {
        index = data.indexOf("</p>");
        data = data.slice(0, index);
      } else {
        data = data.slice(0, data.length);
      }
    }
    return data;
  }
  return (
    <>
      <NewsWrapper>
        <div className="container">
          <BannerImg src={news_img} />
          <DetailContent>
            <Text color={colors.sub_text} type={"body2"}>
              {articleDetail
                ? moment(articleDetail.updatedAt).format("DD/MM/YYYY, h:mm a")
                : ""}
            </Text>
            <Text color={colors.text} type={"header2"}>
              {articleDetail ? articleDetail.title : ""}
            </Text>
            <ContentDetail
              // id="ContentDetail"
              dangerouslySetInnerHTML={{
                __html: articleDetail
                  ? slideContent(articleDetail.content)
                  : "",
              }}
            />
          </DetailContent>
          <Text color={colors.text} type={"header2"}>
            Maybe you will like
          </Text>
          <SuggestionNews>
            <SuggestionGrid>
              {article &&
                article.map((item, index) => {
                  let content = slideContent(item.content);
                  return (
                    <Link to={`/news/${item._id}`} key={index}>
                      <SuggestionCard>
                        {belowSM && <NewsImg src={house} />}

                        <ContentWrap style={{ padding: "0" }}>
                          <Text color={colors.sub_text} type={"body2"}>
                            {moment(item.updatedAt).format(
                              "DD/MM/YYYY, h:mm a"
                            )}
                          </Text>
                          <Text color={colors.text} type={"button"}>
                            {item.title}
                          </Text>
                          <br />
                          <Content
                            dangerouslySetInnerHTML={{
                              __html: content,
                            }}
                          ></Content>
                          <br />
                          <Text color={colors.new_primary} type={"body"}>
                            Read more
                          </Text>
                        </ContentWrap>
                        {!belowSM && <NewsImg src={house} />}
                      </SuggestionCard>
                    </Link>
                  );
                })}
            </SuggestionGrid>
          </SuggestionNews>
        </div>
      </NewsWrapper>
    </>
  );
};

export default NewsDetail;
