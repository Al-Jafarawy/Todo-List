import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function TosatBarFun({ open, content, onClose }) {
  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar open={open} autoHideDuration={1000} onClose={onClose}>
          <Alert
            onClose={onClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {content}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
