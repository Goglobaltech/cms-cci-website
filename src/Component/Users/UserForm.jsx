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
import "./userform.scss";
import { CREATE_USERS } from "../../Schema/user";

// UPDATE_USER
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ListImage from "../../Component/Dynamic/ListImage";
import { SelectRole } from "../Dynamic/Function";
import { InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function UserForm({
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
  const [checked, setChecked] = useState(true);
  const [roleVal, setRoleVal] = useState({ id: "", label: "" });

  const [loading,setLoading] = React.useState(false);

  // hide password hook
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //upload image
  const [imageFile, setImageFile] = useState();
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => {
    setOpenUpload(true);
  };
  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  // Create User
  const [createUser, { data, error }] = useMutation(CREATE_USERS, {
    onCompleted: ({ createUser }) => {
      // console.log("createUser::", createUser);
      if (createUser?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(createUser?.message);
        setRefetch();
        handleClose();
        setLoading(false);
      } else {
        setLoading(false);
        setOpenError(true);
        setErrorMessage(createUser?.message);
      }
    },
    onError: (error) => {
      setLoading(false);
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  //formik
  const AddUser = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    userName: Yup.string(),
    email: Yup.string().required(),
    phone: Yup.string(),
    password: Yup.string().required(),
    address: Yup.string(),
    role: Yup.string(),
    dob: Yup.date(),
    active: Yup.string(),
  });

  // Use formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      role: "",
      dob: new Date(),
      active: "",
    },

    validationSchema: AddUser,
    onSubmit: (values) => {
      // console.log("values::", values);
      setLoading(true);
      createUser({
        variables: {
          newUser: {
            ...values,
            active: checked,
            profileImage: imageFile,
            role: roleVal?.id,
          },
        },
      });
    },
  });
  const [value, setValue] = React.useState(null);

  // Role

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

  // console.log("values::", values);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
      className="users-dialog"
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
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box className="box-form">
                <Grid item xs={12}>
                  <Box className="box-text-field">
                    <TextField
                      type="file"
                      id="image"
                      sx={{ display: "none" }}
                    />
                    <Button onClick={() => handleOpenUpload()}>
                      <Avatar
                        alt="Image"
                        className="import-image"
                        src={
                          imageFile
                            ? imageFile
                            : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                        }
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
                      placeholder="first name"
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
                      placeholder="last name"
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
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} size="small" />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography className="field-title">Role</Typography>
                    <SelectRole
                      selectVal={roleVal}
                      setSelectVal={setRoleVal}
                      typeProduct="CleaningMaterial"
                    />
                  </Grid>
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

                  <Grid item xs={6} className="sub-title">
                    <Typography className="field-title">Email</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="example@gmail.com"
                      {...getFieldProps("email")}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography className="field-title">phone</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="phone number"
                      {...getFieldProps("phone")}
                    />
                  </Grid>

                  <Grid item xs={6} className="sub-title">
                    <Typography className="field-title">Password</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      type={show ? "text" : "password"}
                      autoComplete="current-password"
                      fullWidth
                      placeholder="password"
                      {...getFieldProps("password")}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment
                            position="start"
                            onClick={handleClick}
                          >
                            {show ? (
                              <VisibilityIcon sx={{ cursor: "pointer" }} />
                            ) : (
                              <VisibilityOffIcon sx={{ cursor: "pointer" }} />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} className="sub-title">
                    <Typography className="field-title">Address</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      multiline
                      fullWidth
                      placeholder="your adress"
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
              {
                loading ?
                  <Button className="btn-create" >
                    Loading...
                  </Button>
              :
                  <Button className="btn-create" onClick={handleSubmit}>
                    {editData ? "Edit" : "Create"}
                  </Button>
              }
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
