import React from "react";

const TableBody = ({ columns, items }) => {
  const renderCell = (column, item, i) => {
    if (column.key === "checkBox") return column.content(item, i);
    return column.content(item);
  };
  return (
    <tbody>
      {items.map((item, i) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td key={column.key}>{renderCell(column, item, i)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
