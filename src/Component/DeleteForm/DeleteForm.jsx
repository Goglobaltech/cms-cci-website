import React, { useState } from "react";
import "./deleteform.scss";
import { TextField, Box, Grid, Typography, Button, Stack } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";

export default function DeleteForm({
  loading,
  handleDelete,
  modalTitle,
  handleClose,
  open,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className="deleteform-dialog"
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title">{modalTitle}</Stack>
          <Box sx={{ flexGrow: 1 }}></Box>
          <ClearIcon onClick={handleClose} className="close-icon" />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box className="box-form">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                Are you sure you want to delete this record?
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box className="action-button">
          <Grid item container spacing={4}>
            <Grid item xs={6}>
              <Button autoFocus onClick={handleClose} className="btn-cencel">
                Cencel
              </Button>
            </Grid>
            <Grid item xs={6}>
            {
              loading ?
                <Button className="btn-delete">
                  Loading...
                </Button>
            :
                <Button className="btn-delete" onClick={handleDelete}>
                  Delete
                </Button>     
            }
              
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
