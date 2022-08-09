import _ from "lodash";
import React, { useEffect, useState } from "react";
import { getToDos, saveToDo } from "../services/fakeToDoService";
import ToDoAdd from "./ToDoAdd";
import ToDosTable from "./ToDosTable";
import ToDosSort from "./ToDosSort";
import ToDosSearchQuery from "./ToDosSearchQuery";

const ToDos = () => {
  const [toDoList, setToDoList] = useState([]);
  const [input, setInput] = useState({
    add: "",
    edit: "",
    search: "",
  });
  const [errors, setErrors] = useState({});
  const [sort, setSort] = useState({
    path: "dateOfCreation",
    order: "asc",
  });
  useEffect(() => {
    const toDosList = getToDos();
    setToDoList(toDosList);
  }, []);
  const handleDelete = (todo) => {
    const newList = toDoList.filter((td) => td.id !== todo.id);
    setToDoList(newList);
  };
  const handleChange = (e) => {
    const errorsCopy = { ...errors };
    const inputCopy = { ...input };
    const errorsMessage = validateProperty(e);
    errorsCopy[e.target.name] = errorsMessage;
    setErrors(errorsCopy);

    inputCopy[e.target.name] = e.target.value;
    setInput(inputCopy);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const toDoListCopy = [...toDoList];
    const errors = validate();
    setErrors({ ...errors });
    if (errors) return;

    const toDo = { description: input.add };
    const saved = saveToDo(toDo);
    toDoListCopy.push(saved);
    setToDoList(toDoListCopy);
    setInput({ ...input, add: "" });
  };
  const handleCheck = (item) => {
    const toDoListCopy = [...toDoList];
    const index = toDoList.indexOf(item);
    toDoListCopy[index].completed = !toDoListCopy[index].completed;
    setToDoList(toDoListCopy);
  };
  const handleClearChecked = () => {
    const filtered = toDoList.filter((todo) => !todo.completed);
    setToDoList(filtered);
  };
  const handleEdit = (todo) => {
    const toDoListCopy = [...toDoList];
    const index = toDoList.indexOf(todo);
    toDoListCopy[index].isEditing = !toDoListCopy[index].isEditing;
    setToDoList(toDoListCopy);
    setInput({ ...input, edit: todo.description });
  };
  const handleSave = (todo) => {
    const toDoListCopy = [...toDoList];
    const toDo = { ...todo };
    toDo.description = input.edit;
    toDo.isEditing = false;
    if (toDo.description === "" || toDo.description.length < 5) return;
    saveToDo(toDo);

    setToDoList(toDoListCopy);
  };
  const handleSort = (obj) => {
    setInput({ ...input, search: "" });
    setSort(obj);
  };
  const validate = () => {
    const errors = {};
    if (input.add === "" || input.add.length < 5)
      errors.add = "This field needs to have atleast 5 letters!";
    else delete errors.add;

    return Object.keys(errors).length === 0 ? null : errors;
  };
  const validateProperty = (e) => {
    if (e.target.name === "add") {
      if (e.target.value === "" || e.target.value.length < 5)
        return "This field needs to have atleast 5 letters!";
    }
  };
  const orderBy = _.orderBy(toDoList, [sort.path], [sort.order]);
  const filter = orderBy.filter((todo) =>
    todo.description.toLowerCase().includes(input.search.toLowerCase())
  );
  return (
    <>
      <div className="row">
        <h1>What do I need to do today?</h1>
        <div className="col">
          <ToDosSearchQuery
            label="Search:"
            name="search"
            value={input.search}
            onChange={handleChange}
          />
          <ToDosSort label="Order by:" sort={sort} onSort={handleSort} />
        </div>
        <span>Items I Need To Do</span>
        <div className="col">
          {toDoList.length === 0 ? (
            <div className="row mb-5 mt-5">
              <h1>There are no ToDos! Add some :)</h1>
            </div>
          ) : (
            <ToDosTable
              items={filter}
              value={input.edit}
              onCheck={handleCheck}
              onChange={handleChange}
              onDelete={handleDelete}
              onSave={handleSave}
              onEdit={handleEdit}
            />
          )}
          <button className="btn btn-success" onClick={handleClearChecked}>
            Clear checked items
          </button>
        </div>
      </div>
      <ToDoAdd
        name="add"
        errors={errors}
        label="New Task"
        value={input.add}
        onChange={handleChange}
        onAdd={handleAdd}
      />
    </>
  );
};

export default ToDos;
