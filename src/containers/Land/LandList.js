import React, { useState, useEffect, useContext } from "react";
import Search from "@Components/Search";
import { LandWrapper, LandGrid, LandFlex, Card } from "./StyledLand";
import { Link } from "react-router-dom";
import Text from "@Components/Text";
import { colors } from "@Theme/colors";
import Button from "@Components/Button";
import Pagination from "@Components/Pagination";
import { projectServices } from "@Services";
import { ProjectContext } from "./context/ProjectContext";

const LandList = () => {
  const [page, setPage] = useState(1);
  const [landData, setLandData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { project, setProject } = useContext(ProjectContext);

  useEffect(() => {
    setLoading(true);

    projectServices
      .getProjects()
      .then((res) => {
        const { totalPages, page, results } = res;
        setTotalPages(totalPages);
        setPage(page);
        setLandData(results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  const onSearchName = async (e) => {
    setLoading(true);
    const searchQuery = e.target.value
      ? {
          name: e.target.value
        }
      : {};
    const { results, totalPages, page } = await projectServices.getProjects(
      searchQuery
    );
    setTotalPages(totalPages);
    setPage(page);
    setLandData(results);

    setLoading(false);
  };

  return (
    <>
      <LandWrapper>
        <div className="container">
          <Search sort={false} onSearch={onSearchName} />
          <LandGrid>
            {landData &&
              landData.map((prj, index) => {
                return (
                  <Link
                    to={`/land/${prj.path}`}
                    key={index}
                    onClick={() => {
                      setProject(prj);
                      localStorage.setItem("selectedProject", JSON.stringify(prj));
                    }}
                  >
                    <Card>
                      <img src={prj.image} alt="meta365" />
                      <LandFlex className="detail">
                        <div>
                          <Text type={"header2"} color={colors.text_header}>
                            {prj.name}
                          </Text>
                          <Text type={"button"} color={colors.text_body}>
                            {prj.description}
                          </Text>
                        </div>
                      </LandFlex>
                    </Card>
                  </Link>
                );
              })}
          </LandGrid>
          <Pagination
            pages={totalPages}
            activePage={page}
            pageChange={setPage}
          />
        </div>
      </LandWrapper>
    </>
  );
};

export default LandList;
