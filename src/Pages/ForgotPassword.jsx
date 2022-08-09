import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
  TextField,
  Avatar,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
//src
import app from "../../src/firebase";
import "./forgotpassword.scss";
import logiImage from "../Assets/CCI_LOGO.svg";
import AlertMessage from "../Component/AlertMessage/AlertMessage";

export default function Login() {
  const navigate = useNavigate();

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const auth = getAuth(app);
  // console.log("auth::", auth)

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          // Password reset email sent!
          setOpenSuccess(true);
          setSuccesstMessage("Login successfull!");
        })
        .catch((error) => {
          setOpenError(true);
          setErrorMessage("Invalid Email/Passwork!");
          // const errorMessage = error.message;
        });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box className="login-page">
            <Box className="container">
              <Box className="box-logo">
                <img src={logiImage} />
              </Box>
              <Box className="box-text" sx={{ mt: 1 }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  spacing={1}
                  sx={{ width: "15%" }}
                >
                  <Typography className="title" variant="h6" align="center">
                    Welcome to CMS CCI WEBSITE
                  </Typography>
                  {/* <Typography className="sub-title" variant="body2" align="center">
                  ចូលគណនីប្រើប្រាស់
                </Typography> */}
                </Stack>
              </Box>

              <Box className="box-login">
                <Stack
                  direction="column"
                  justifyContent="center"
                  spacing={2}
                  className="stack-text-field"
                >
                  <TextField
                    className="text-field"
                    size="small"
                    placeholder="email"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon className="icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    className="btn-sign-in"
                    type="submit"
                    sx={{ ":hover": { backgroundColor: "#fff" } }}
                  >
                    Send
                  </Button>
                </Stack>
              </Box>
            </Box>
            <Typography
              variant="body2"
              align="center"
              color="#fff"
              sx={{ mb: 3, letterSpacing: "2px" }}
            >
              @Copyright 2022, CCI website
            </Typography>
          </Box>
        </Form>
      </FormikProvider>
      <AlertMessage
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        openSuccess={openSuccess}
        openError={openError}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </>
  );
}
