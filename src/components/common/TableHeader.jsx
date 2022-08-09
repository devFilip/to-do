import React from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((col) => (
          <td key={col.key}>{col.desc ? col.desc : ""}</td>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
