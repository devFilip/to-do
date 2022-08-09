import React from "react";

const DropDownList = ({ options, valueProperty, labelProperty, onChange }) => {
  return (
    <select id={labelProperty} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option
          key={opt[valueProperty] + opt[labelProperty]}
          value={opt[valueProperty]}
        >
          {opt[labelProperty]}
        </option>
      ))}
    </select>
  );
};

export default DropDownList;
