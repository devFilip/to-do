import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ columns, items }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody columns={columns} items={items} />
    </table>
  );
};

export default Table;
