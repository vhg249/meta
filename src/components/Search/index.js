import React, { useState, useEffect } from "react";

import search_icon from "@Assets/images/search.png";
import arrow_down from "@Assets/images/arrow-down.png";
import arrow_up from "@Assets/images/arrow-up.png";
import Text from "@Components/Text";

import {
  GroupInput,
  HideMobile,
  Icon,
  SearchButton,
  SearchInput,
  StyledSearch,
  Img,
  SearchWrap,
  SortText,
  SortSelect,
  SortOption,
} from "./StyledSearch";
import { colors } from "@Theme/colors";
const Search = ({ val, onSearch, onSort, sortList, ...props }) => {
  const [showSort, setShowSort] = useState(false);
  const [sortItem, setSortItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All items");

  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (!e.target.closest(".sort")) {
        setShowSort(false);
      }
    });
  }, []);
  return (
    <StyledSearch>
      {props.search && (
        <GroupInput>
          <Icon src={search_icon} />
          <SearchInput
            value={val}
            onChange={(e) => {
              onSearch(e.target.value);
            }}
            placeholder={props.placeholder ? props.placeholder : "Search..."}
          />
        </GroupInput>
      )}

      {props.sort && (
        <SearchWrap>
          <SearchButton
            className="sort"
            onClick={() => {
              setShowSort(!showSort);
            }}
          >
            <SortText>Sort by</SortText>
            <Img src={arrow_down} />
            {showSort && (
              <SortSelect>
                {sortList &&
                  sortList.map((item, index) => {
                    return (
                      <SortOption key={index}
                        onClick={() => {
                          onSort(item.sortField);
                        }}
                      >
                        <Text color={colors.text} type="body1">
                          {item.name}
                        </Text>
                      </SortOption>
                    );
                  })}
              </SortSelect>
            )}
          </SearchButton>
        </SearchWrap>
      )}
    </StyledSearch>
  );
};

export default Search;
