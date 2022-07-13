import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  MarketplaceWrapper,
  NoData,
  SwapWrapper,
  Tab,
  TabItem,
  SearchWrap,
  MarketGrid,
} from "./StyledMarketplace";
import Search from "@Components/Search";
import { marketplaceServices } from "@Services";
import Market from "./Market";
import RegularAuction from "./RegularAuction";
import ReverseAuction from "./ReverseAuction";
import { ButtonFilter, Grid, Main } from "../MyLand/StyledMyLand";
import breakpoints from "@Theme/breakpoints";
import NoNFT from "../MyLand/NoData";
import { useDebounce, useMedia } from "react-use";
import Filter from "../MyLand/Filter";
import MyLandSelling from "../MyLand/MyLandSelling";
import filter from "@Assets/images/filter.png";
import ModelSell from "../MyLand/ModalSell";
import { colors } from "../../theme/colors";
import { changeSaleType } from "../../redux/actions/market";
import { MarketPlaceContext } from "./Context";
import { nftServices } from "../../services/nftServices";
import LoadingCard from "../MyLand/LoadingCard";
import CardDetail from "../MyLand/Card";

const PAGE_SIZE = 20;

// to-do: correct chain Id following user login

const MarketList = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [page, setPage] = useState(1);
  const [marketData, setMarketData] = useState([]);
  const [regularAuctionData, setRegularAuctionData] = useState([]);
  const [reverseAuctionData, setReverseAuctionData] = useState([]);
  const [holdingData, setHoldingData] = useState([]);
  const market = useSelector((state) => state.market);
  const [selectedType, setSelectedType] = useState("");
  const [checkOnLoad, setCheckOnLoad] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [marketQuery, setMarketQuery] = useState({});
  const [activeTab, setActiveTab] = useState(1);
  const land = useSelector((state) => state.land);
  const [time, setTime] = useState({});
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  const [pageNum, setPageNum] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const [NftData, setNftData] = useState([]);
  const dataFilter = [
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
      id: "holding",
      name: "Holding",
    },
  ];
  const dataPrice = [
    {
      id: "BUSD",
      name: "BUSD",
    },
    {
      id: "UCC",
      name: "UCC",
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
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const dispatch = useDispatch();
  const sortList = [
    // { name: "Price: Low to High", sortField: "price:asc" },
    // { name: "Price: High to Low", sortField: "price:desc" },
    // { name: "Ending soon", sortField: "endedSale:desc" },
    { name: "Oldest", sortField: "updatedAt:asc" },
    { name: "New", sortField: "updatedAt:desc" },
  ];

  useEffect(() => {
    onSearchName();
  }, [debouncedValue]);

  const fetchMarketplaceAll = (filter = {}) => {
    setLoading(true);
    marketplaceServices
      .getMarketPlaceAll({
        chainId: 97,
        limit: PAGE_SIZE,
        name: land.name,
        ...filter,
      })
      .then((res) => {
        const { totalPages, page, results } = res;
        setTotalPages(totalPages);
        setPage(page);
        let all = new Set([...marketData, ...results]);
        setMarketData([...all]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const fetchMarketplace = (filter = {}) => {
    setLoading(true);
    marketplaceServices
      .getMarketPlaceAll({
        chainId: 97,
        limit: PAGE_SIZE,
        name: land.name,
        ...filter,
      })
      .then((res) => {
        const { totalPages, page, results } = res;
        setTotalPages(totalPages);
        setPage(page);
        setMarketData(results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setMarketData([])
  }, [selectedType]);

  useEffect(() => {
    if (land.name) {
      let searchQuery = {
        ...marketQuery,
        page: pageNum,
      };
      setSearchValue(land.name);
      if (selectedType === "") {
        fetchMarketplaceAll(searchQuery);
      } else {
        fetchMarketplaceAll({ ...searchQuery, types: selectedType });
      }
    } else {
      let query = {
        page: pageNum,
      };
      if (selectedType === "") {
        fetchMarketplaceAll(query);
      } else {
        fetchMarketplaceAll({ ...query, types: selectedType });
      }
    }
  }, [pageNum]);

  const onSearchName = async (e) => {
    let searchQuery = {
      ...marketQuery,
      name: debouncedValue,
    };
    if (debouncedValue === "") searchQuery = {};

    if (selectedType === "") {
      fetchMarketplace(searchQuery);
    } else {
      fetchMarketplace({ ...searchQuery, types: selectedType });
    }
    setMarketQuery(searchQuery);
  };

  const sortByPrice = (type) => {
    const sortQuery = {
      ...marketQuery,
      sortBy: type,
    };
    if (selectedType === "") {
      fetchMarketplace(sortQuery);
    } else {
      fetchMarketplace({ ...sortQuery, types: selectedType });
    }
  };

  const handleMinMax = () => {
    const query = {
      ...marketQuery,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
    };
    if (selectedType === "") {
      fetchMarketplace(query);
    } else {
      fetchMarketplace({ ...query, types: selectedType });
    }
  };

  // const renderMarket = () => {
  //   switch (selectedType) {
  //     case "":
  //       return <Market data={marketData}></Market>;
  //     case "marketSale":
  //       return <Market data={marketData}></Market>;
  //     case "auction":
  //       return <ReverseAuction data={marketData}></ReverseAuction>;
  //     case "reverseAuction":
  //       return <ReverseAuction data={marketData}></ReverseAuction>;
  //     case "holding":
  //       return <Market data={marketData}></Market>;
  //   }
  // };

  const observer = useRef(
    new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPageNum((no) => no + 1);
      }
    })
  );

  const onSearchProject = (arr) => {
    let searchQuery = {};
    if (arr.length > 0) {
      let projects = "";
      for (let item of arr) {
        projects += item + ",";
      }
      projects = projects.slice(0, projects.length - 1);
      searchQuery = {
        ...marketQuery,
        projectIds: projects,
      };
    }
    if (selectedType === "") {
      fetchMarketplace(searchQuery);
    } else {
      fetchMarketplace({ ...searchQuery, types: selectedType });
    }
    setMarketQuery(searchQuery);
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
        ...marketQuery,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        projectIds: projects,
      };
    } else {
      query = {};
      query = {
        ...marketQuery,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
      };
    }
    if (selectedType === "") {
      fetchMarketplace(query);
    } else {
      fetchMarketplace({ ...query, types: selectedType });
    }
    setMarketQuery(query);
  };

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

  const handleSaleType = (type) => {
    let types = "";
    for(let item of type){
      types += item + ",";
    }
    types = types.slice(0, types.length - 1);
    setSelectedType(types);
    if(type==="") fetchMarketplace()
    else fetchMarketplace({types: types})
    dispatch(changeSaleType({ saleType: type }));
  };

  return (
    <>
      <MarketplaceWrapper>
        <div
          style={
            belowSM && !showFilter ? { display: "none" } : { display: "block" }
          }
        >
          <Filter
            filterByProject={false}
            filterByPrice={true}
            filterByStatus={true}
            filterByUnits={true}
            name="marketplace"
            data={dataFilter}
            dataPrice={dataPrice}
            handleMin={setMinPrice}
            handleMax={setMaxPrice}
            filterPrice={handleMinMax}
            filterProjects={onSearchProject}
            filterAll={filterAll}
            onClose={setShowFilter}
            handleClick={(type) => {
              handleSaleType(type);
            }}
          />
        </div>

        <Main>
          <SearchWrap>
            <Search
              search={true}
              sort={true}
              val={searchValue}
              onSearch={setSearchValue}
              onSort={sortByPrice}
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
          {marketData && marketData.length > 0 ? (
            <>
              <Market data={marketData} />
              <div style={{marginTop: "20px"}}>
                <MarketGrid>
                { marketData.length % 20 === 0 &&
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
              </MarketGrid>
              </div>
              
            </>
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

export default MarketList;
