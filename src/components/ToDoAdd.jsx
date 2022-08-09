import React from "react";
import Input from "./common/Input";

const ToDoAdd = ({ name, label, value, errors, onAdd, onChange }) => {
  return (
    <div className="mt-3">
      <label htmlFor={name} style={{ fontWeight: "bold", fontSize: "20px" }}>
        {label}
      </label>
      <form className="" onSubmit={(e) => onAdd(e)}>
        <div className="input-group mb-3">
          <Input
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e)}
            className="form-control"
            placeholder="What are you going to do next?"
          />
          <button className="btn btn-primary">+ Add</button>
        </div>
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </form>
    </div>
  );
};

export default ToDoAdd;
