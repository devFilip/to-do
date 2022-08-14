import React, { useState } from "react";
import DropDownList from "./common/DropDownList";

const ToDosSort = ({ label, sort, onSort }) => {
  const raiseSort = (path) => {
    const sortCopy = { ...sort };
    if (sortCopy.path === path) {
      sortCopy.order = sortCopy.order === "asc" ? "desc" : "asc";
    }
    onSort(sortCopy);
  };
  const options = [
    {
      path: "dateOfCreation",
      label: "Oldest to Newest",
    },
    {
      path: "dateOfCreation",
      label: "Newest to Oldest",
    },
  ];
  return (
    <>
      <label className="mx-1" htmlFor={label}>
        {label}
      </label>
      <DropDownList
        options={options}
        valueProperty="path"
        labelProperty="label"
        onChange={raiseSort}
      />
    </>
  );
};

export default ToDosSort;
