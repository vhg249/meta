import React, { useEffect, useState, useCallback } from "react";
import AdminTable from "@Components/AdminTable";
import Button from "@Components/Button";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import { AlignCenter, Center, Checkbox, NoData, Title } from "./StyledAdminLand";
import more_icon from "@Assets/images/dots.png";
import ban_icon from "@Assets/images/ban.png";
import { useMedia } from "react-use";
import breakpoints from "@Theme/breakpoints";
import LandItem from "./LandItem";
import { landServices } from "@Services";
import { Link } from "react-router-dom";
import AdminFilter from "@Components/AdminFilter";

const AllLand = () => {
  const belowSM = useMedia(breakpoints.sm);
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddNFT, setShowAddNFT] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = (filter = {}) => {
    setLoading(true);
    landServices
      .getLands(filter)
      .then((res) => {
        const { totalPages, page, results } = res;
        setTotalPages(totalPages);
        setPage(page);
        setTableData(results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const changePage = (page) => {
    fetchLands({ page });
    setPage(page);
  };

  const renderTable = useCallback(() => {
    return (
      <AdminTable pages={totalPages} activePage={page} pageChange={changePage}>
        <table>
          <thead>
            <tr>
              <th style={{width: "25%"}}>
                <AlignCenter>
                  <Checkbox type="checkbox" />
                  <Text color={colors.text_header} type={"button"}>
                  Project
                  </Text>
                </AlignCenter>
              </th>
              <th style={{width: "15%"}}>
                <Text color={colors.text_header} type={"button"}>
                Land Code
                </Text>
              </th>
              <th style={{width: "15%"}}>
                <Text color={colors.text_header} type={"button"}>
                Starting Price
                </Text>
              </th>
              <th style={{width: "20%"}}>
                <Text color={colors.text_header} type={"button"}>
                Date of Commencement
                </Text>
              </th>
              <th style={{width: "15%"}}>
                <Center>
                  <Text color={colors.text_header} type={"button"}>
                  Status
                  </Text>  
                </Center>
                
              </th>
              <th>
                <Center>
                  <img src={more_icon} alt="meta365" />
                </Center>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((item, index) => {
                return <LandItem key={index} add={false} landData={item} />;
              })
            ) : (
              <tr>
                <td colSpan="6">
                  <NoData>
                    <img src={ban_icon} alt="met365" />
                    <Text color={colors.text_body} type="button">
                      No data
                    </Text>
                  </NoData>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminTable>
    );
  }, [showAddNFT, tableData, totalPages]);

  const onSearchLand = (e) => {
    const searchQuery = e.target.value
      ? {
          landCode: e.target.value
        }
      : {};

      fetchLands(searchQuery)
  };

  return (
    <>
      <AlignCenter style={{ marginBottom: "30px" }}>
        <Title>Page</Title>
        <div style={{marginTop:"30px"}}>
        
        <Link to="add">
          <Button width={"112px"} color={colors.primary}>
            Add new
          </Button>
        </Link>
        </div>
      </AlignCenter>

      <AdminFilter onSearch={onSearchLand} placeholder={'search by land code'} />
      {renderTable()}
    </>
  );
};

export default AllLand;
