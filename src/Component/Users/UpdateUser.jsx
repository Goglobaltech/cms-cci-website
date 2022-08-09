import React, { useEffect, useState } from "react";
import {
  Stack,
  Grid,
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Switch,
  FormControlLabel,
  Modal,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutation } from "@apollo/client";
import { styled } from "@mui/material/styles";
import ListImage from "../Dynamic/ListImage";
// UPDATE_USER
import "./userform.scss";
import { UPDATE_USER } from "../../Schema/user";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SelectRole } from "../Dynamic/Function";

export default function UpdateUsers({
  modalTitle,
  editData,
  handleClose,
  setRefetch,
  open,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  // console.log("editData::", editData);
  const [imageFile, setImageFile] = useState(null);
  const [checked, setChecked] = useState(true);
  const [roleVal, setRoleVal] = useState({});

  //upload image
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => {
    setOpenUpload(true);
  };
  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  useEffect(() => {
    if (editData) {
      setRoleVal({
        id: editData?.role?._id,
        label: editData?.role?.roleName,
      });
      setChecked(editData?.active);
    }
  }, [editData]);

  // Update User send to backEnd
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) => {
      // console.log("updateUser::", updateUser);
      if (updateUser?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(updateUser?.message);
        setRefetch();
        handleClose();
      } else {
        setOpenError(true);
        setErrorMessage(updateUser?.message);
      }
    },

    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  //formik
  const UpdateUser = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    userName: Yup.string(),
    phone: Yup.string(),
    address: Yup.string(),
    dob: Yup.string(),
  });
  // console.log("profileImage::: ", editData?.profileImage);
  // console.log("editData:::", editData);
  // editdata we got from props
  const formik = useFormik({
    initialValues: {
      firstName: editData?.firstName,
      lastName: editData?.lastName,
      userName: editData?.userName,
      phone: editData?.phone,
      address: editData?.address,
      dob: editData?.dob,
    },

    // Update User
    validationSchema: UpdateUser,
    onSubmit: (values) => {
      // console.log("values::", values);
      updateUser({
        variables: {
          newUser: {
            ...values,
            active: checked ? checked : editData?.active,
            profileImage: imageFile ? imageFile : editData?.profileImage,
            role: roleVal?.id ? roleVal?.id : editData?.role?._id,
          },
          userId: editData?._id,
        },
      });
    },
  });

  const [value, setValue] = React.useState(null);
  const [role, setRole] = React.useState("");

  // Role
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  // Swtitch Active
  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#7cdba8" : "#7cdba8",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#7cdba8",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#fc7e7f" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = formik;

  // for catch value to show in field Edit values
  useEffect(() => {
    if (editData) {
      setFieldValue("firstName", editData?.firstName);
      setFieldValue("lastName", editData?.lastName);
      setFieldValue("userName", editData?.userName);
      setFieldValue("phone", editData?.phone);
      setFieldValue("address", editData?.address);
    }
  }, [editData]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      // onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className="users-dialog"
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title">{modalTitle}</Stack>
          <Box sx={{ flexGrow: 1 }} />
          <ClearIcon onClick={handleClose} className="close-icon" />
        </Stack>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box className="box-form">
                <Grid item xs={12}>
                  <Box className="box-text-field">
                    <Button onClick={() => handleOpenUpload()}>
                      <Avatar
                        alt="Image"
                        className="import-image"
                        src={imageFile ? imageFile : editData?.profileImage}
                      />
                    </Button>
                    <Modal
                      open={openUpload}
                      onClose={handleCloseUpload}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <ListImage
                        open={openUpload}
                        setImageFile={setImageFile}
                        handleClose={handleCloseUpload}
                        imageType="Profile"
                      />
                    </Modal>
                  </Box>
                  <Typography className="field-title-image">
                    Profile Image
                  </Typography>
                </Grid>
                <Grid item container spacing={3}>
                  <Grid item xs={6}>
                    <Typography className="field-title">First Name</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="your name"
                      {...getFieldProps("firstName")}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="field-title">Last Name</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="your name"
                      {...getFieldProps("lastName")}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>

                  <Grid item xs={6} className="sub-title">
                    <Typography className="field-title">Username</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="username"
                      {...getFieldProps("userName")}
                    />
                  </Grid>

                  <Grid item xs={6} className="sub-title">
                    <Typography className="field-title">
                      Date Of Birth
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={values?.dob}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack direction="row" className="container-stack">
                      <Grid item xs={9}>
                        <Typography className="field-title">Role</Typography>
                        <SelectRole
                          selectVal={roleVal}
                          setSelectVal={setRoleVal}
                          typeProduct="CleaningMaterial"
                        />
                      </Grid>
                      <Box sx={{ flexGrow: 1 }}></Box>
                      <Grid item xs={2}>
                        <Typography className="field-title">Active</Typography>
                        <FormControlLabel
                          control={
                            <IOSSwitch
                              sx={{ m: 1 }}
                              defaultChecked={checked}
                              onChange={(e) => setChecked(e.target.checked)}
                            />
                          }
                        />
                      </Grid>
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography className="field-title">phone</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="phone"
                      {...getFieldProps("phone")}
                    />
                  </Grid>

                  <Grid item xs={12} className="sub-title">
                    <Typography className="field-title">Address</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      multiline
                      fullWidth
                      placeholder="adress"
                      {...getFieldProps("address")}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </FormikProvider>
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
              <Button className="btn-create" onClick={handleSubmit}>
                {editData ? "Edit" : "Create"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
