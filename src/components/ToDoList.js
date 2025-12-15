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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../Context/ToastContext";
import { useReduce } from "../Context/toDoContext";

export default function TodoList() {
  const { tasksArray, dispatch } = useReduce();
  const { showHideToast } = useContext(ToastContext);
  const [showBtn, setShowBtn] = useState("all");
  const [input, setInput] = useState("");
  const [inputDesc, setInputDesc] = useState("");
  const [taskDialog, setTaskDialog] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [updateTask, setUpdateTask] = useState({ title: "", details: "" });
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (taskDialog) {
      setUpdateTask({
        title: taskDialog.title,
        details: taskDialog.details,
      });
    }
  }, [taskDialog]);

  useEffect(() => {
    dispatch({ type: "getFromStorage" });
  }, []);

  function addingNewTaskFun() {
    dispatch({ type: "added", payload: { input, inputDesc } });
    setInput("");
    setInputDesc("");
    showHideToast("Task added successfully");
  }

  const completed = useMemo(
    () => tasksArray.filter((ele) => ele.isCompleted),
    [tasksArray]
  );

  const notCompleted = useMemo(
    () => tasksArray.filter((ele) => !ele.isCompleted),
    [tasksArray]
  );

  let renderTasks = tasksArray;
  if (showBtn === "completed") renderTasks = completed;
  else if (showBtn === "not-completed") renderTasks = notCompleted;

  function handelUpdate() {
    dispatch({ type: "update", payload: { taskDialog, updateTask } });
    setShowUpdate(false);
  }

  function handelDeleteItem() {
    dispatch({ type: "deteted", payload: { taskDialog } });
    setShowAlert(false);
  }

  const todosJsx = renderTasks.map((element) => (
    <TaskUi
      key={element.id}
      task={element}
      openAlertFun={(task) => {
        setTaskDialog(task);
        setShowAlert(true);
      }}
      openUpdatAlert={(task) => {
        setTaskDialog(task);
        setShowUpdate(true);
      }}
    />
  ));

  return (
    <>
      {/* update dialog */}
      <Dialog open={showUpdate} onClose={() => setShowUpdate(false)} sx={{ direction: "rtl" }}>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          تعديل المهمة
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="standard"
            label="عنوان المهمة"
            value={updateTask.title}
            onChange={(e) =>
              setUpdateTask({ ...updateTask, title: e.target.value })
            }
          />
          <TextField
            fullWidth
            variant="standard"
            label="تفاصيل المهمة"
            value={updateTask.details}
            onChange={(e) =>
              setUpdateTask({ ...updateTask, details: e.target.value })
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowUpdate(false)}>تراجع</Button>
          <Button onClick={handelUpdate}>تعديل</Button>
        </DialogActions>
      </Dialog>

      {/* delete dialog */}
      <Dialog open={showAlert} onClose={() => setShowAlert(false)} sx={{ direction: "rtl" }}>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          هل انت متأكد من الحذف؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            لا يمكن التراجع عن عملية الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAlert(false)}>تراجع</Button>
          <Button onClick={handelDeleteItem}>نعم</Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", color: "#1976d2", mb: 3 }}
            >
              المهام اليومية
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <ToggleButtonGroup
              exclusive
              value={showBtn}
              onChange={(e) => setShowBtn(e.target.value)}
              sx={{ display: "flex", justifyContent: "center", mb: 3 }}
            >
              <ToggleButton value="not-completed">غير المنجز</ToggleButton>
              <ToggleButton value="completed">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>

            <div className="scroll-container">{todosJsx}</div>

            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid size={8}>
                <TextField
                  fullWidth
                  label="عنوان المهمة"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ height: "100%" }}
                  onClick={addingNewTaskFun}
                  disabled={!input || !inputDesc}
                >
                  إضافة
                </Button>
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="تفاصيل المهمة"
                  value={inputDesc}
                  onChange={(e) => setInputDesc(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
