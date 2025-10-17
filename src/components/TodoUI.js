import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useContext } from "react";
import { useReduce } from "../Context/toDoContext";
import { ToastContext } from "../Context/ToastContext";

export default function TaskUi({ task, openAlertFun, openUpdatAlert }) {
  const { dispatch } = useReduce();
  const { showHideToast } = useContext(ToastContext);

  function handelCheck() {
    dispatch({ type: "checked", payload: { task } });
  }
  return (
    <Card
      className="todoCard"
      sx={{
        minWidth: 275,
        background: "#dadadaff",
        color: "white",
        marginTop: 3,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "right",
                color: "black",
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
            >
              {task.title}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: "right",
                color: "gray",
                textDecoration: task.isCompleted ? "line-through" : "none",
              }}
            >
              {task.details}
            </Typography>
          </Grid>

          {/* ACTION BUTTONS */}
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            {/* check btn */}
            <IconButton
              onClick={() => {
                handelCheck();
                showHideToast(` Item Checked Successfully  `);
              }}
              className="iconButton"
              aria-label="delete"
              style={{
                color: task.isCompleted ? "white" : "#8bc34a",
                background: task.isCompleted ? "#8bc34a" : "white",
                border: "solid #8bc34a 3px",
              }}
            >
              <CheckIcon />
            </IconButton>

            {/* update btn */}
            <IconButton
              onClick={() => {
                openUpdatAlert(task);
              }}
              className="iconButton"
              aria-label="delete"
              style={{
                color: "#1769aa",
                background: "white",
                border: "solid #1769aa 3px",
              }}
            >
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
            {/* deltete btn */}
            <IconButton
              onClick={() => {
                openAlertFun(task);
              }}
              className="iconButton"
              aria-label="delete"
              style={{
                color: "#b23c17",
                background: "white",
                border: "solid #b23c17 3px",
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
