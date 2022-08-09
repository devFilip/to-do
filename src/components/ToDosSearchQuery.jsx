import React from "react";
import Input from "./common/Input";

const ToDosSearchQuery = ({ label, value, name, onChange }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <Input
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        className="mx-2"
      />
    </>
  );
};

export default ToDosSearchQuery;
