import { createContext, useReducer, useContext } from "react";
import TodoListReducer from "../reducers/todoReduce";

export const ToDoContext = createContext([]);

const ReducerProvider = ({ children }) => {
  const [tasksArray, dispatch] = useReducer(TodoListReducer, []);

  return (
    <>
      <ToDoContext.Provider value={{ tasksArray, dispatch }}>
        {children}
      </ToDoContext.Provider>
    </>
  );
};

export default ReducerProvider;
export const useReduce = () => {
  return useContext(ToDoContext);
};
