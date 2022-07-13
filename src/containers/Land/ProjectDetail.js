import React, { useContext, useEffect } from "react";
import Iframe from "react-iframe";
import { LandDetailWrapper } from "./StyledLand";
import { ProjectContext } from "./context/ProjectContext";

const ProjectDetail = () => {
  const { project } = useContext(ProjectContext);
  return (
    <>
      <LandDetailWrapper>
        <Iframe
          url={`${project.media}`}
          width="100%"
          height="831px"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          scrolling="auto"
          allowFullScreen="true"
          position="relative"
        />
      </LandDetailWrapper>
    </>
  );
};

export default ProjectDetail;
