import React, { useEffect, useState } from "react";
import { deleteToDo, getToDos, saveToDo } from "../services/fakeToDoService";
import { validate, validateProperty } from "../utills/validation";
import ToDoAdd from "./ToDoAdd";
import ToDosTable from "./ToDosTable";
import ToDosSort from "./ToDosSort";
import ToDosSearchQuery from "./ToDosSearchQuery";
import _ from "lodash";

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
    deleteToDo(todo.id);
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
    const errors = validate(input.add);
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
    const condition = toDoListCopy.filter((todo) => todo.isEditing);
    if (condition.length !== 0) return;
    toDoListCopy[index].isEditing = true;

    setToDoList(toDoListCopy);
    setInput({ ...input, edit: todo.description });
  };

  const handleSave = (todo) => {
    const toDoListCopy = [...toDoList];
    const index = toDoListCopy.indexOf(todo);
    const toDo = { ...todo };
    toDo.description = input.edit;
    toDo.isEditing = false;
    toDoListCopy.splice(index, 1, toDo);
    if (toDo.description.trim() === "" || toDo.description.trim().length < 5)
      return;
    setToDoList(toDoListCopy);
    saveToDo(toDo);
  };

  const handleSort = (obj) => {
    setInput({ ...input, search: "" });
    setSort(obj);
  };

  const filtered = orderAndFilter(toDoList, sort, input);
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
              items={filtered}
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
function orderAndFilter(toDoList, sort, input) {
  const orderBy = _.orderBy(toDoList, [sort.path], [sort.order]);
  const filtered = orderBy.filter((todo) =>
    todo.description.toLowerCase().includes(input.search.trim().toLowerCase())
  );
  return filtered;
}
