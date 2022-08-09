import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

// input: checked={value}
// outPut: handleChecked

const CheckBox = ({ checked, onCheck }) => {
  if (checked)
    return <CheckBoxIcon style={{ cursor: "pointer" }} onClick={onCheck} />;
  return (
    <CheckBoxOutlineBlankIcon style={{ cursor: "pointer" }} onClick={onCheck} />
  );
};

export default CheckBox;
