import React, { useEffect, useState } from "react";
import {
  FilterGroup,
  ApplyButton,
  Option,
  OptionList,
  SearchGroup,
  SearchIcon,
  SearchInput,
  Selected,
  SelectedAction,
  SelectGroup,
  TableFilter,
} from "./StyledAdminFilter";
import search_icon from "@Assets/images/icon-search.png";
import down_icon from "@Assets/images/icon-plus.png";
import Text from "@Components/Text";

const AdminFilter = ({ onSearch, placeholder = "Search", ...props }) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [selectAction, setSelectAction] = useState(false);
  const [selectFilter, setSelectFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filter")

  useEffect(() => {
    window.addEventListener("click", function (e) {
      if (!e.target.closest(".filter-btn")) {
        setSelectFilter(false);
      }
      if (!e.target.closest(".apply-btn")) {
        setSelectAction(false);
      }
    });
  }, [])

  return (
    <>
      <TableFilter>
        <SearchGroup>
          <SearchInput
            placeholder={placeholder}
            type="text"
            onChange={onSearch}
          />
          <SearchIcon src={search_icon} />
        </SearchGroup>
        <FilterGroup>
          <SelectGroup>
            <Selected onClick={() => {setSelectFilter(!selectFilter)}}>
              <Text color={"rgba(192, 192, 192, 0.5)"} type={"body1"}>
              {selectedFilter}
              </Text>
              <img className="filter-btn" src={down_icon} style={{cursor: "pointer"}} />
            </Selected>
            {selectFilter && (
              <OptionList>
                <Option onClick={() => {setSelectedFilter("All")}}>All</Option>
                <Option onClick={() => {setSelectedFilter("Voting")}}>Voting</Option>
                <Option onClick={() => {setSelectedFilter("Pending")}}>Pending</Option>
              </OptionList>  
            )}
            
          </SelectGroup>

          <SelectGroup>
            <SelectedAction>
              <Text color={"rgba(192, 192, 192, 0.5)"} type={"body2"}>
                {selectedAction === "" ? "Select action" : selectedAction}
              </Text>
              <ApplyButton
                className="apply-btn"
                onClick={() => {
                  setSelectAction(!selectAction);
                }}
              >
                Apply
              </ApplyButton>
            </SelectedAction>
            {selectAction && (
              <OptionList>
                <Option
                  onClick={() => {
                    setSelectedAction("Delete");
                  }}
                >
                  Delete
                </Option>
                <Option
                  onClick={() => {
                    setSelectedAction("Draft");
                  }}
                >
                  Draft
                </Option>
                <Option
                  onClick={() => {
                    setSelectedAction("Pin to");
                  }}
                >
                  Pin to
                </Option>
              </OptionList>
            )}
          </SelectGroup>
        </FilterGroup>
      </TableFilter>
    </>
  );
};

export default AdminFilter;
