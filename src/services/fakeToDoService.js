import { v4 as uuid } from "uuid";
const toDos = [
  {
    id: "5b21ca3eeb7f6fbccd471815",
    description: "Go to the gym",
    dateOfCreation: 1659803080751,
    completed: true,
    isEditing: false,
  },
  {
    id: "5b21ca3eeb7f6fbccd471819",
    description: "Take shower",
    dateOfCreation: 1659803080752,
    completed: false,
    isEditing: false,
  },
  {
    id: "5b21ca3eeb7f6fbccd471822",
    description: "Study",
    dateOfCreation: 1659803080753,
    completed: false,
    isEditing: false,
  },
];

export function getToDos() {
  return toDos;
}

export function getToDo(id) {
  return toDos.find((td) => td.id === id);
}

export function saveToDo(todo) {
  let toDoInDb = toDos.find((td) => td.id === todo.id) || {};
  toDoInDb.description = todo.description;
  toDoInDb.dateOfCreation = Date.now();
  toDoInDb.completed = false;
  toDoInDb.isEditing = false;

  if (!toDoInDb.id) {
    toDoInDb.id = uuid();
    toDos.push(toDoInDb);
  }

  return toDoInDb;
}

export function deleteToDo(id) {
  let toDoInDb = toDos.find((todo) => todo.id === id);
  toDos.splice(toDos.indexOf(toDoInDb), 1);
  return toDoInDb;
}
