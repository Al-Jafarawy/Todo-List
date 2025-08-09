import "./App.css";
import ToDoList from "./components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastProvider } from "./Context/ToastContext";
import ReducerProvider from "./Context/toDoContext";

const theme = createTheme({
  typography: {
    fontFamily: ["Abel"],
  },
});

function App() {
  return (
    <ToastProvider>
      <ReducerProvider>
        <ThemeProvider theme={theme}>
          <div
            className="App"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#e7e7e7ff",
              direction: "rtl",
            }}
          >
            <ToDoList />
          </div>
        </ThemeProvider>
      </ReducerProvider>
    </ToastProvider>
  );
}

export default App;
