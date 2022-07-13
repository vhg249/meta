import React, { useEffect, useState } from "react";
import {
  AlignCenter,
  Amount,
  InfoDetail,
  InfoHeader,
  MarketGrid,
  MarketplaceWrapper,
  SearchWrap,
} from "./StyledMarketLand";
import { useSelector, useDispatch } from "react-redux";
import Card from "@Components/Card";
import house from "@Assets/images/house.png";
import star from "@Assets/images/star.png";
import Button from "@Components/Button";
import { colors } from "@Theme/colors";
import { ButtonFilter, Main } from "../MyLand/StyledMyLand";
import Text from "@Components/Text";
import { landServices } from "@Services/landServices";
import { useDebounce, useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import { NoData } from "../Marketplace/StyledMarketplace";
import { Link } from "react-router-dom";
import Filter from "../MyLand/Filter";
import { projectServices } from "@Services/projectServices";
import Search from "@Components/Search";
import filter from "@Assets/images/filter.png";
import { changeLand } from "../../redux/actions/land";

const MarketLand = () => {
  const [landData, setLandData] = useState(null);
  const belowSM = useMedia(breakpoints.sm);
  const [projectsData, setProjectsData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [landType, setLandType] = useState("");
  const [land, setLand] = useState('')
  const dispatch = useDispatch();
  const sortList = [
    {name: "Oldest", sortField: "startDate:asc"},
    {name: "New", sortField: "startDate:desc"},
  ]
  const dataFilter = [
    {
      id: "single",
      name: "Single lands",
    },
    {
      id: "bundle",
      name: "Bundles",
    },
    {
      id: "voting",
      name: "Voting",
    },
  ];
  const [debouncedValue, setDebouncedValue] = useState("");
  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(searchValue);
    },
    500,
    [searchValue]
  );

  useEffect(() => {
    fetchAllProjects();
  }, []);

  useEffect(() => {
    onSearchName();
  }, [debouncedValue]);

  const fetchLands = (filter) => {
    landServices
      .getLands(filter)
      .then((res) => {
        setLandData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchAllProjects = (filter = {}) => {
    projectServices
      .getProjects(filter)
      .then((res) => {
        setProjectsData(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filterProjects = (arr) => {
    let searchQuery = {};
    if (arr.length > 0) {
      let projects = "";
      for (let item of arr) {
        projects += item + ",";
      }
      projects = projects.slice(0, projects.length - 1);
      searchQuery = { projectIds: projects };
      fetchLands(searchQuery);
    } else {
      fetchLands();
    }
  };
  const sortLands = (field) => {
    const sortQuery = { sortBy: field };
    fetchLands(sortQuery);
  };
  const onSearchName = async () => {
    let searchQuery = { landCode: debouncedValue };
    if (debouncedValue !== "") fetchLands(searchQuery);
    else fetchLands();
  };

  useEffect(() => {
    landType !== "" && fetchLands({ type: landType });
  }, [landType]);

  return (
    <>
      <MarketplaceWrapper>
        <div
          style={
            belowSM && !showFilter ? { display: "none" } : { display: "block" }
          }
        >
          <Filter
            filterByProject={true}
            filterByPrice={false}
            filterByStatus={true}
            projectsData={projectsData}
            filterProjects={filterProjects}
            onClose={setShowFilter}
            data={dataFilter}
            handleClick={(type) => setLandType(type)}
            name="land"
          />
        </div>

        <Main>
          <SearchWrap>
            <Search
              search={true}
              sort={true}
              val={searchValue}
              onSearch={setSearchValue}
              onSort={sortLands}
              sortList={sortList}
            />
          </SearchWrap>

          {belowSM && (
            <ButtonFilter onClick={() => setShowFilter(!showFilter)}>
              <div>
                <img src={filter} alt="" />
              </div>
              <span>Filter</span>
            </ButtonFilter>
          )}
          {landData && landData.length > 0 ? (
            <MarketGrid>
              {landData &&
                landData.map((item, index) => {
                  return (
                    <Card image={item.thumbnail} key={index}>
                      <InfoHeader>
                        <Text type={"button"} color={colors.text_header}>
                          {`${item.landCode}`}
                        </Text>
                        <Amount>
                          <Text type={"body2"} color={colors.accent}>
                            {item.numOfNft + "NFT"}
                          </Text>
                        </Amount>
                      </InfoHeader>
                      <InfoDetail>
                        <Text type={"body2"} color={colors.sub_text}>
                          Price
                        </Text>
                        <Text type={"body2"} color={colors.text}>
                          {item.price}
                        </Text>
                      </InfoDetail>
                      <InfoDetail>
                        <Text type={"body2"} color={colors.sub_text}>
                          Project
                        </Text>
                        <Text type={"body2"} color={colors.text}>
                          {item.projectName}
                        </Text>
                      </InfoDetail>
                      {/* <InfoDetail>
                      <Text type={"body2"} color={colors.text}>
                        Voting starts in
                      </Text>
                      <AlignCenter>
                        <img src={star} alt="star" />
                        <Text type={"body2"} color={colors.secondary}>
                        23:21:56
                        </Text>
                      </AlignCenter>
                    </InfoDetail> */}
                      <Link
                        to={`/marketplace`}
                        style={{ marginTop: "6px" }}
                      >
                        <Button
                          width={"100%"}
                          style={{ marginTop: "20px" }}
                          color={colors.new_button}
                          onClick={() => dispatch(changeLand({ name: item.landCode }))}
                        >
                          SHOW NFTS
                        </Button>
                      </Link>
                    </Card>
                  );
                })}
            </MarketGrid>
          ) : (
            <NoData>
              <Text color={colors.text_header} type="button">
                No NFT left
              </Text>
            </NoData>
          )}
        </Main>
      </MarketplaceWrapper>
    </>
  );
};

export default MarketLand;
