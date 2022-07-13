import React, { useState } from "react";
import { Title } from "./StyledAdminLand";

import LandForm from "./LandForm";

const AddLand = () => {
  return (
    <>
      <Title>Add NFTs</Title>
      <LandForm action="add" />
    </>
  );
};

export default AddLand;
