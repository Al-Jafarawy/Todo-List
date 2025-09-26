import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function TosatBarFun({ open, content, onClose }) {
  const action = (
    <>
      <Button color="secondary" size="small">
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Snackbar
          open={open}
          autoHideDuration={1000}
          onClose={onClose}
          action={action}
        >
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
