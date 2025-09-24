import "../App.css";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TaskUi from "./TodoUI";
import { useContext, useEffect, useState, useMemo } from "react";
import DialogContentText from "@mui/material/DialogContentText";

// dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../Context/ToastContext";
import { useReduce } from "../Context/toDoContext";

//starting main function
export default function TodoList() {
  const { tasksArray, dispatch } = useReduce();
  const { showHideToast } = useContext(ToastContext);
  const [showBtn, setShowBtn] = useState("all");
  const [input, setInput] = useState("");
  const [inputDesc, setInputDesc] = useState("");

  // dialog delete
  const [taskDialog, setTaskDialog] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // dialog update
  const [updateTask, setUpdateTask] = useState({ title: "", details: "" });

  useEffect(() => {
    if (taskDialog) {
      setUpdateTask({
        title: taskDialog.title,
        details: taskDialog.details,
      });
    }
  }, [taskDialog]);

  const [showUpdate, setShowUpdate] = useState(false);

  function handelchoiceTasks(e) {
    setShowBtn(e.target.value);
  }

  function handelInput(event) {
    setInput(event.target.value);
  }
  function handelInputDesc(event) {
    setInputDesc(event.target.value);
  }
  useEffect(() => {
    dispatch({ type: "getFromStorage" });
  }, []);

  // adding tasks fun
  function addingNewTaskFun() {
    dispatch({ type: "added", payload: { input, inputDesc } });
    setInput("");
    setInputDesc("");
    showHideToast("Task added successfully");
  }

  const completed = useMemo(() => {
    return tasksArray.filter((ele) => {
      return ele.isCompleted;
    });
  }, [tasksArray]);

  const notCompleted = useMemo(() => {
    return tasksArray.filter((ele) => {
      return !ele.isCompleted;
    });
  }, [tasksArray]);

  let renderTasks = tasksArray;

  if (showBtn === "completed") {
    renderTasks = completed;
  } else if (showBtn === "not-completed") {
    renderTasks = notCompleted;
  }

  // dialog fun --update
  function handelUpdate() {
    dispatch({ type: "update", payload: { taskDialog, updateTask } });

    setShowUpdate(false);
  }
  function openUpdatAlert(task) {
    setTaskDialog(task);
    setShowUpdate(true);
  }

  // dialog fun --delete
  function handelDeleteItem() {
    dispatch({ type: "deteted", payload: { taskDialog } });
    setShowAlert(false);
  }
  function openAlertFun(task) {
    setTaskDialog(task);
    setShowAlert(true);
  }

  const todosJsx = renderTasks.map((element) => {
    return (
      <TaskUi
        key={element.id}
        task={element}
        openAlertFun={openAlertFun}
        openUpdatAlert={openUpdatAlert}
      />
    );
  });

  return (
    <>
      {/* update dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showUpdate}
        onClose={() => {
          setShowUpdate(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ textAlign: "center", margin: "20px 0 0 0" }}
        >
          {"تعديل المهمة"}
        </DialogTitle>
        <DialogContent>
          <TextField
            value={updateTask.title}
            onChange={(event) => {
              setUpdateTask({ ...updateTask, title: event.target.value });
            }}
            autoFocus
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
          />
          <TextField
            value={updateTask.details}
            onChange={(event) => {
              setUpdateTask({ ...updateTask, details: event.target.value });
            }}
            autoFocus
            margin="dense"
            id="name"
            label=" التفاصيل"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowUpdate(false);
            }}
          >
            تراجع
          </Button>
          <Button
            onClick={() => {
              handelUpdate();
              showHideToast(`Item Updated Successfully  `);
            }}
            autoFocus
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* delete dialog */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showAlert}
        onClose={() => {
          setShowAlert(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متاكد من عمله الحذف؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع عن عمليه الحذف بعد اتمامها !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowAlert(false);
            }}
          >
            تراجع
          </Button>
          <Button
            onClick={() => {
              handelDeleteItem();
              showHideToast(` Item Deleted Successfully  `);
            }}
            autoFocus
          >
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="sm" style={{ marginTop: "50px" }}>
        <Card sx={{ minWidth: 300 }}>
          <CardContent>
            <Typography
              variant="h3"
              style={{ paddingBottom: "25px", color: "skyblue" }}
            >
              المهام اليومية
            </Typography>
            <Divider />

            {/* FILTER BUTTONS */}
            <ToggleButtonGroup
              value={showBtn}
              onChange={handelchoiceTasks}
              style={{
                direction: "ltr",
                marginTop: "30px",
                marginBottom: "20px",
              }}
              exclusive
              aria-label="text alignment"
            >
              <ToggleButton value="not-completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>

            {/* ALL TODOS */}
            <div className="scroll-container">{todosJsx}</div>

            {/* INPUT + ADD BUTTON */}
            <Grid container style={{ marginTop: "20px" }} spacing={2}>
              <Grid
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="عنوان المهمة"
                  variant="outlined"
                  value={input}
                  onChange={handelInput}
                />
              </Grid>

              <Grid
                size={4}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <Button
                  style={{
                    width: "100%",
                    height: "100%",
                    marginBottom: "-50%",
                  }}
                  variant="contained"
                  onClick={() => {
                    addingNewTaskFun();
                  }}
                  disabled={input.length === 0 || inputDesc.length === 0}
                >
                  إضافة
                </Button>
              </Grid>
              <Grid
                size={8}
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="تفاصيل المهمة"
                  variant="outlined"
                  value={inputDesc}
                  onChange={handelInputDesc}
                />
              </Grid>

              <Grid
                size={4}
                style={{ display: "flex", alignItems: "center" }}
                justifyContent="space-around"
                alignItems="center"
              ></Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
