import React, { useEffect, useState } from "react";
import { CheckboxLabel, CheckboxWrapper, Checked } from "./StyledCheckbox";
import check_icon from "@Assets/images/check.png";
import uncheck_icon from "@Assets/images/uncheck.png";

const Checkbox = (props) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(props.check);
  }, []);
  return (
    <>
      <CheckboxWrapper>
        {checked ? (
          <Checked
            src={check_icon}
            onClick={() => {
              setChecked(false);
            }}
          />
        ) : (
          <Checked
            src={uncheck_icon}
            onClick={() => {
              setChecked(true);
            }}
          />
        )}

        <CheckboxLabel>{props.children}</CheckboxLabel>
      </CheckboxWrapper>
    </>
  );
};

export default Checkbox;
