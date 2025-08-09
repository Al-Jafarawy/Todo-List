import { v4 as uuidv4 } from "uuid";

export default function reudcer(currentState, action) {
  switch (action.type) {
    case "added": {
      const newTask = {
        id: uuidv4(),
        title: action.payload.input,
        details: action.payload.inputDesc,
        isCompleted: false,
      };
      const updatedToDos = [...currentState, newTask];
      localStorage.setItem("toDoLocal", JSON.stringify(updatedToDos));
      return updatedToDos;
    }
    case "update": {
      const updatedToDos = currentState.map((ele) => {
        if (ele.id === action.payload.taskDialog.id) {
          return {
            ...ele,
            title: action.payload.updateTask.title,
            details: action.payload.updateTask.details,
          };
        } else {
          return ele;
        }
      });
      localStorage.setItem("toDoLocal", JSON.stringify(updatedToDos));
      return updatedToDos;
    }
    case "deteted": {
      const updatedToDos = currentState.filter((element) => {
        return element.id !== action.payload.taskDialog.id;
      });
      localStorage.setItem("toDoLocal", JSON.stringify(updatedToDos));
      return updatedToDos;
    }
    case "checked": {
      const updatedToDos = currentState.map((element) => {
        if (element.id === action.payload.task.id) {
          const newElement = { ...element, isCompleted: !element.isCompleted };
          return newElement;
        }
        console.log(element);
        return element;
      });
      localStorage.setItem("toDoLocal", JSON.stringify(updatedToDos));
      return updatedToDos;
    }
    case "getFromStorage": {
      const storedTasks = JSON.parse(localStorage.getItem("toDoLocal")) || [];
      return storedTasks;
    }
    default: {
      throw new Error("Unknown action type: " + action.type);
    }
  }
}
