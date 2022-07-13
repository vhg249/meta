import React, { useEffect, useRef } from "react";
import {
  BannerContent,
  BannerImg,
  BannerWrapper,
  ContentWrap,
  NewsCard,
  NewsGrid,
  NewsImg,
  NewsWrapper,
  Content,
  Slide,
  ImgSlide,
  SwapSlide,
  HeaderNews,
  ContentWrapHeader,
  ContentHeader,
} from "./StyledNews";
import house from "@Assets/images/house.png";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import { useState } from "react";
import { Link } from "react-router-dom";
import { articleServices } from "@Services";
import NewsDetail from "./NewsDetail";
import moment from "moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const NewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [newsDataHeader, setNewsDataHeader] = useState();
  const belowSM = useMedia(breakpoints.sm);
  const [activeSlide, setActiveSlide] = useState(0);
  const convertHTML = (data) => {
    if (data.indexOf("&lt;") != -1 || data.indexOf("&gt;") != -1) {
      data = data.replaceAll("&gt;", ">");
      data = data.replaceAll("&lt;", "<");
      return data;
    } else {
      return data;
    }
  };
  const fetchArticle = () => {
    articleServices.getArticles().then((res) => {
      setNewsData(res.results);
      setNewsDataHeader(res.results[activeSlide]);
    });
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (current) => {
      setActiveSlide(current);
      if (newsData) {
        let newData = newsData[activeSlide];
        newData.content = slideContent(newsData[activeSlide].content);
        setNewsDataHeader(newData);
      }
    },
  };
  useEffect(() => {
    fetchArticle();
  }, []);
  function slideContent(data) {
    let index;
    data = convertHTML(data);
    if (data.indexOf("</p>") != -1) {
      index = data.indexOf("</p>");
      data = data.slice(0, index);
    } else {
      data = data.slice(0, data.length);
    }
    return data;
  }
  function getImageFromContent(data) {
    let index = data.indexOf("src=");
    let indexEnd = data.indexOf("style", index);
    data = data.slice(index + 5, indexEnd - 2);
    return data;
  }

  return (
    <>
      <NewsWrapper>
        <div className="container">
          <BannerWrapper>
            <Link to={`/news/${newsDataHeader ? newsDataHeader._id : ""}`}>
              <HeaderNews>
                <SwapSlide>
                  <Slide>
                    <Slider {...settings}>
                      <div>
                        <ImgSlide src={house} />
                      </div>
                      <div>
                        <ImgSlide src={house} />
                      </div>
                      <div>
                        <ImgSlide src={house} />
                      </div>
                    </Slider>
                  </Slide>
                </SwapSlide>

                <ContentWrapHeader>
                  <Text color={colors.sub_text} type={"body2"}>
                    {newsDataHeader
                      ? moment(newsDataHeader.updatedAt).format(
                          "DD/MM/YYYY, h:mm a"
                        )
                      : "23 Sep 2021"}
                  </Text>
                  <Text color={colors.text} type={"header2"}>
                    {newsDataHeader ? newsDataHeader.title : ""}
                  </Text>
                  <ContentHeader
                    id="ContentDetail"
                    dangerouslySetInnerHTML={{
                      __html: newsDataHeader ? slideContent(newsDataHeader.content)  : "",
                    }}
                  ></ContentHeader>
                  <Text color={colors.new_primary} type={"button"}>
                    Read more
                  </Text>
                </ContentWrapHeader>
              </HeaderNews>
            </Link>
            <BannerContent></BannerContent>
          </BannerWrapper>
          <NewsGrid>
            {newsData.map((item, index) => {
              let content = slideContent(item.content);
              return (
                <Link
                  to={`/news/${item._id}`}
                  key={index}
                >
                  <NewsCard key={index}>
                    {belowSM && <NewsImg src={house} />}

                    <ContentWrap style={{ padding: "0" }}>
                      <Text color={colors.sub_text} type={"body2"}>
                        {moment(item.updatedAt).format("DD/MM/YYYY, h:mm a")}
                      </Text>
                      <Text color={colors.text} type={"button"}>
                        {item.title}
                      </Text>
                      <Content
                        dangerouslySetInnerHTML={{ __html: content }}
                      ></Content>
                      <Text color={colors.new_primary} type={"body"}>
                        Read more
                      </Text>
                    </ContentWrap>
                    {!belowSM && <NewsImg src={house} />}
                  </NewsCard>
                </Link>
              );
            })}
          </NewsGrid>
        </div>
      </NewsWrapper>
    </>
  );
};

export default NewsList;
