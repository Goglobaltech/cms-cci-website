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
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import moment from "moment";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
//components
import "./mediaform.scss";
import { CREATE_MEDIA, UPDATE_MEDIA } from "../../Schema/media";

export default function MediaForm({
  modalTitle,
  editData,
  handleClose,
  open,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  let navigate = useNavigate();

  // console.log("editData::", editData);

  // upload Image
  const [imageFile, setImageFile] = useState(null);

  const newDate = moment(new Date()).format("MMdYYYY");
  const uploadImage = async (file, values) => {
    // console.log("files::", file);

    if (!file) return;
    const formData = new FormData();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    let newName = `${uuidv4()}${newDate}${file.name.split(".").pop()}`;
    var newFile = new File([compressedFile], `${newName}.png`, {
      type: "image/png",
    });
    // console.log("newFile::", newFile);
    formData.append("image", newFile);

    await axios
      .post(
        `${process.env.REACT_APP_UPLOAD_URL}/api/cci/upload/`,
        formData,
        config
      )
      .then(async function (response) {
        // console.log(response?.data);
        if (editData) {
          updateMedia({
            variables: {
              mediaId: editData?._id,
              input: {
                ...values,
                imageUrl: `${process.env.REACT_APP_UPLOAD_URL}/api${response?.data}`,
              },
            },
          });
        } else {
          createMedia({
            variables: {
              input: {
                ...values,
                imageUrl: `${process.env.REACT_APP_UPLOAD_URL}/api${response?.data}`,
              },
            },
          });
        }
      });
  };

  const [createMedia, { data, loading, error }] = useMutation(CREATE_MEDIA, {
    onCompleted: ({ createMedia }) => {
      // console.log("createMedia::", createMedia);
      if (createMedia?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(createMedia?.message);
        setTimeout(() => {
          navigate(0);
        }, 1800);
        handleClose();
      } else {
        setOpenError(true);
        setErrorMessage(createMedia?.message);
      }
    },

    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  const [updateMedia] = useMutation(UPDATE_MEDIA, {
    onCompleted: ({ updateMedia }) => {
      // console.log("updateMedia::", updateMedia);
      if (updateMedia?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(updateMedia?.message);
        setTimeout(() => {
          navigate(0);
        }, 1800);
        handleClose();
      } else {
        setOpenError(true);
        setErrorMessage(updateMedia?.message);
      }
    },

    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  //formik
  const AddMedia = Yup.object().shape({
    title: Yup.string().required(),
    imageType: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      title: editData ? editData?.title : "",
      imageType: editData ? editData?.imageType : "",
    },

    validationSchema: AddMedia,
    onSubmit: (values) => {
      // console.log("imageFile::", imageFile);
      if (imageFile) {
        uploadImage(imageFile, values);
      } else {
        if (editData) {
          updateMedia({
            variables: {
              mediaId: editData?._id,
              input: {
                ...values,
                imageUrl: editData ? editData?.imageUrl : "",
              },
            },
          });
        } else {
          createMedia({
            variables: {
              input: {
                ...values,
                imageUrl: "",
              },
            },
          });
        }
      }
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = formik;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
      className="media-dialog"
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
                <Grid item container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ display: "none" }}
                      size="small"
                      fullWidth
                      type="file"
                      id="image"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                    <Box className="add-image">
                      {imageFile || editData ? (
                        <Stack sx={{ alignItems: "center" }}>
                          <label htmlFor="image">
                            <img
                              src={
                                imageFile
                                  ? URL.createObjectURL(imageFile)
                                  : editData?.imageUrl
                              }
                              className="media-image"
                              alt="preview"
                            />
                          </label>
                        </Stack>
                      ) : (
                        <Stack sx={{ alignItems: "center" }}>
                          <label htmlFor="image">
                            <FileDownloadOutlinedIcon className="upload-icon" />
                          </label>
                          <Typography
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            Add Profile Image
                          </Typography>
                        </Stack>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className="field-title">Image name</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="Title"
                      {...getFieldProps("title")}
                      error={Boolean(touched.title && errors.title)}
                      helperText={touched.title && errors.title}
                    />
                  </Grid>

                  <Grid item xs={6} className="sub-title">
                    <Typography className="field-title">Image type</Typography>
                    <FormControl
                      sx={{ width: "100%" }}
                      className="text-field"
                      size="small"
                      placeholder="select type"
                    >
                      <Select
                        {...getFieldProps("imageType")}
                        error={Boolean(touched.imageType && errors.imageType)}
                        helperText={touched.imageType && errors.imageType}
                      >
                        <MenuItem value="ProductsHighlight">
                          ProductsHighlight
                        </MenuItem>
                        <MenuItem value="ProductsBenefits">
                          ProductsBenefits
                        </MenuItem>
                        <MenuItem value="Profile">Profile</MenuItem>
                        <MenuItem value="BlogPost">BlogPost</MenuItem>
                      </Select>
                    </FormControl>
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
