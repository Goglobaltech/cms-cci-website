import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./alertmessage.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMessage({
  setOpenSuccess,
  setOpenError,
  openSuccess,
  openError,
  errorMessage,
  successMessage,
}) {
  const handleCloseAlert = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <div className="alert-message">
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="snackbar-alert"
      >
        <Alert onClose={handleCloseAlert} className="alert-success">
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        className="snackbar-alert"
      >
        <Alert onClose={handleCloseAlert} className="alert-error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
