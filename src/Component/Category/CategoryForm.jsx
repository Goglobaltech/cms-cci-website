import React, { useEffect } from "react";
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
import { useMutation } from "@apollo/client";
import { styled } from "@mui/material/styles";
import "./categoryform.scss";
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "../../Schema/category";

export default function MediaForm({
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

  const [createProductCategory, { data, loading, error }] = useMutation(
    CREATE_CATEGORY,
    {
      onCompleted: ({ createProductCategory }) => {
        if (createProductCategory?.success === true) {
          setOpenSuccess(true);
          setSuccesstMessage(createProductCategory?.message);
          setRefetch();
          handleClose();
        } else {
          setOpenError(true);
          setErrorMessage(createProductCategory?.message);
        }
      },

      onError: (error) => {
        setOpenError(true);
        setErrorMessage(error.message);
      },
    }
  );

  const [updateProductCategory] = useMutation(UPDATE_CATEGORY, {
    onCompleted: ({ updateProductCategory }) => {
      if (updateProductCategory?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(updateProductCategory?.message);
        setRefetch();
        handleClose();
      } else {
        setOpenError(true);
        setErrorMessage(updateProductCategory?.message);
      }
    },

    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  //formik
  const CreateCategory = Yup.object().shape({
    categoryName: Yup.string().required(),
    categoryNameKH: Yup.string().required(),
    typeCategory: Yup.string(),
    remark: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      categoryName: editData?.categoryName !== "" ? editData?.categoryName : "",
      categoryNameKH:
        editData?.categoryNameKH !== "" ? editData?.categoryNameKH : "",
      typeCategory: editData?.typeCategory !== "" ? editData?.typeCategory : "",
      remark: editData?.remark !== "" ? editData?.remark : "",
    },

    validationSchema: CreateCategory,
    onSubmit: (values) => {
      if (editData) {
        updateProductCategory({
          variables: {
            productCategoryEdit: {
              ...values,
            },
            id: editData?._id,
          },
        });
      } else {
        createProductCategory({
          variables: {
            newProductCategory: {
              ...values,
            },
          },
        });
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  useEffect(() => {
    if (editData) {
      setFieldValue("categoryName", editData?.categoryName);
      setFieldValue("categoryNameKH", editData?.categoryNameKH);
      setFieldValue("typeCategory", editData?.typeCategory);
      setFieldValue("remark", editData?.remark);
    }
  }, [editData]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      // onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className="category-dialog"
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
                <Grid item container spacing={2}>
                  <Grid item xs={12}>
                    <Typography className="field-title">
                      Category name
                    </Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="category"
                      {...getFieldProps("categoryName")}
                      error={Boolean(
                        touched.categoryName && errors.categoryName
                      )}
                      helperText={touched.categoryName && errors.categoryName}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography className="field-title">
                      Category name in khmer
                    </Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="category"
                      {...getFieldProps("categoryNameKH")}
                      error={Boolean(
                        touched.categoryNameKH && errors.categoryNameKH
                      )}
                      helperText={
                        touched.categoryNameKH && errors.categoryNameKH
                      }
                    />
                  </Grid>

                  <Grid item xs={12} className="sub-title">
                    <Typography className="field-title">
                      Type category
                    </Typography>
                    <FormControl
                      sx={{ width: "100%" }}
                      className="text-field"
                      size="small"
                      placeholder="select type"
                    >
                      <Select {...getFieldProps("typeCategory")}>
                        <MenuItem value="CleaningMaterails">
                          CleaningMaterails
                        </MenuItem>
                        <MenuItem value="Cosmetics">Cosmetics</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} className="sub-title">
                    <Typography className="field-title">Remark</Typography>
                    <TextField
                      className="text-field"
                      size="small"
                      fullWidth
                      placeholder="Discription"
                      {...getFieldProps("remark")}
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
