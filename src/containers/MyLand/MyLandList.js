import React, { useEffect, useState, useRef, useContext } from "react";
import {
  Flex,
  Grid,
  MyLandWrapper,
  TabItem,
  Tab,
  SwapWrapper,
  FlexStart,
  Main,
  ButtonFilter,
  Header,
} from "./StyledMyLand";
import Search from "@Components/Search";
import { nftServices } from "@Services/nftServices";
import { useSelector } from "react-redux";
import breakpoints from "@Theme/breakpoints";
import { useMedia } from "react-use";
import Filter from "./Filter";
import filter from "@Assets/images/filter.png";
import ModelSell from "./ModalSell";
import NoNFT from "./NoData";
import CardDetail from "./Card";
import LoadingCard from "./LoadingCard";
import { projectServices } from "@Services/projectServices";
import { contract } from "@Utils/contract";

const MyLandList = () => {
  const dataFilter = [
    {
      id: "holding",
      name: "Holding",
    },
    {
      id: "marketSale",
      name: "Market",
    },
    {
      id: "auction",
      name: "Regular Auction",
    },
    {
      id: "reverseAuction",
      name: "Reverse Auction",
    },
    {
      id: "voting",
      name: "Voting",
    },
  ];
  const belowSM = useMedia(breakpoints.sm);
  const [myLandData, setMyLandData] = useState([]);
  const account = useSelector((state) => state.account);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const [selectedType, setSelectedType] = useState("holding");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [landQuery, setLandQuery] = useState({});
  const [projectsData, setProjectsData] = useState(null);
  const sortList = [
    // { name: "Price: Low to High", sortField: "price:asc" },
    // { name: "Price: High to Low", sortField: "price:desc" },
    { name: "Oldest", sortField: "updatedAt:asc" },
    { name: "New", sortField: "updatedAt:desc" },
  ];

  useEffect(() => {
    if (selectedType === "holding") fetchOwnedDataScroll({ page: pageNum });
    else if (selectedType === "voting")
      fetchOwnedDataScroll({ page: pageNum, inVoting: true });
    else fetchDataSellingScroll({ saleType: selectedType, page: pageNum });
  }, [account, pageNum]);

  useEffect(() => {
    setMyLandData([]);
  }, [selectedType]);

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const fetchDataSelling = (filter = {}) => {
    setLoading(true);
    nftServices
      .getNFTOnSale({ limit: 20, ...filter })
      .then((res) => {
        setMyLandData(res.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const fetchDataSellingScroll = (filter = {}) => {
    setLoading(true);
    nftServices
      .getNFTOnSale({ limit: 20, ...filter })
      .then((res) => {
        let all = new Set([...myLandData, ...res.results]);
        setMyLandData([...all]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const fetchOwnedData = (filter = {}) => {
    setLoading(true);
    nftServices
      .getOwnNFTs({ limit: 20, ...filter })
      .then((res) => {
        setMyLandData(res.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const fetchOwnedDataScroll = (filter = {}) => {
    setLoading(true);
    nftServices
      .getOwnNFTs({ limit: 20, ...filter })
      .then((res) => {
        let all = new Set([...myLandData, ...res.results]);
        setMyLandData([...all]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  const sortByPrice = (field) => {
    let sortQuery = { sortBy: field };
    if (selectedType === "holding") {
      fetchOwnedData(sortQuery);
    } else if (selectedType === "voting")
      fetchOwnedData({ ...sortQuery, inVoting: true });
    else {
      sortQuery = { sortBy: field, saleType: selectedType };
      fetchDataSelling(sortQuery);
    }
  };
  const handleMinMax = () => {
    const query = {
      ...landQuery,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
    };
    if (selectedType === "holding") {
      fetchOwnedData(query);
    } else if (selectedType === "voting")
      fetchOwnedData({ ...query, inVoting: true });
    else {
      fetchDataSelling({ saleType: selectedType, ...query });
    }
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
      fetchOwnedData(searchQuery);
    } else {
      fetchOwnedData();
    }
  };
  const filterAll = async (arr) => {
    let query;
    if (arr.length > 0) {
      let projects = "";
      for (let item of arr) {
        projects += item + ",";
      }
      projects = projects.slice(0, projects.length - 1);
      query = {
        ...landQuery,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        projectIds: projects,
      };
    } else {
      query = {};
      query = {
        ...landQuery,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
      };
    }
    if (selectedType === "holding") {
      fetchOwnedData(query);
    } else if (selectedType === "voting")
      fetchOwnedData({ ...query, inVoting: true });
    else {
      fetchDataSelling({ saleType: selectedType, ...query });
    }
    setLandQuery(query);
  };
  return (
    <>
      <MyLandWrapper>
        <div
          style={
            belowSM && !showFilter ? { display: "none" } : { display: "block" }
          }
        >
          <Filter
            filterByProject={true}
            filterByPrice={true}
            filterByStatus={true}
            name="my-land"
            data={dataFilter}
            handleMin={setMinPrice}
            handleMax={setMaxPrice}
            filterPrice={handleMinMax}
            filterProjects={filterProjects}
            filterAll={filterAll}
            onClose={setShowFilter}
            handleClick={(filter) => {
              filter.saleType === ""
                ? setSelectedType("holding")
                : setSelectedType(filter.saleType);
              if (filter.saleType === "");
              else if (filter.saleType === "holding") fetchOwnedData();
              else if (filter.saleType === "voting") fetchOwnedData({inVoting: true});
              else fetchDataSelling(filter);
            }}
            projectsData={projectsData}
          />
        </div>
        <Main>
          <Header>
            <span>My Land</span>
            <div>
              <Search
                sort={true}
                search={true}
                onSort={sortByPrice}
                sortList={sortList}
              />
            </div>
          </Header>

          {belowSM && (
            <ButtonFilter onClick={() => setShowFilter(!showFilter)}>
              <div>
                <img src={filter} alt="" />
              </div>
              <span>Filter</span>
            </ButtonFilter>
          )}
          {myLandData && myLandData.length > 0 ? (
            <Grid>
              {myLandData &&
                myLandData.map((item, i) => {
                  return (
                    <CardDetail
                      key={i}
                      buttonName="DETAILS"
                      data={item}
                      id={i}
                    />
                  );
                })}
              {myLandData.length % 20 === 0 &&
                [...Array(10)].map((x, i) =>
                  i === 9 ? (
                    <div ref={setLastElement} key={i}>
                      <LoadingCard i={i} />
                    </div>
                  ) : (
                    <div key={i}>
                      <LoadingCard i={i} />
                    </div>
                  )
                )}
            </Grid>
          ) : (
            <NoNFT />
          )}
        </Main>
      </MyLandWrapper>
    </>
  );
};

export default MyLandList;
