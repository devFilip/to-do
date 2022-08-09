import React from "react";
import CheckBox from "./common/CheckBox";
import Input from "./common/Input";
import Table from "./common/Table";

const ToDosTable = ({
  items,
  value,
  onCheck,
  onChange,
  onDelete,
  onSave,
  onEdit,
}) => {
  const columns = [
    {
      key: "checkBox",
      desc: "Check off items once you have completed them",
      content: (todo, i) => {
        return (
          <>
            <CheckBox checked={todo.completed} onCheck={() => onCheck(todo)} />
            {todo.isEditing ? (
              <Input value={value} onChange={(e) => onChange(e)} name="edit" />
            ) : (
              `${i + 1}.${todo.description}`
            )}
          </>
        );
      },
    },
    {
      key: "edit",
      content: (todo) => {
        return todo.isEditing ? (
          <button className="btn btn-primary" onClick={() => onSave(todo)}>
            Save
          </button>
        ) : (
          <button className="btn btn-warning" onClick={() => onEdit(todo)}>
            Edit
          </button>
        );
      },
    },
    {
      key: "delete",
      content: (todo) => (
        <button onClick={() => onDelete(todo)} className="btn btn-danger">
          Delete
        </button>
      ),
    },
  ];
  return <Table columns={columns} items={items} />;
};

export default ToDosTable;
