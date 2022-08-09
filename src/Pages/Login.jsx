import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
//components
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../../src/firebase";
import "./login.scss";
import logiImage from "../Assets/CCI_LOGO.svg";

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
    email: Yup.string().email("Invalid email!").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be 6 characters!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log("userCredential", user);
          // console.log("login success");
          setOpenSuccess(true);
          setSuccesstMessage("Login successfull!");
          setTimeout(() => {
            navigate("/");
          }, 1200);
        })
        .catch((error) => {
          console.log("error::", error);
          setOpenError(true);
          setErrorMessage("Invalid Email/Passwork!");
        });

      //get User Date after login Success
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // const uid = user.uid;
          // console.log(user, "user");
        } else {
          // User is signed out
        }
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
                  <TextField
                    className="text-field"
                    type="password"
                    size="small"
                    placeholder="password"
                    {...getFieldProps("password")}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpsOutlinedIcon className="icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Link
                    to="/forgotpassword"
                    style={{ textDecorationColor: "#fff" }}
                  >
                    <Typography
                      variant="subtitle2"
                      align="right"
                      color="#fff"
                      fontWeight="bold"
                    >
                      Are you forgot password?
                    </Typography>
                  </Link>
                  <Button
                    className="btn-sign-in"
                    type="submit"
                    sx={{ ":hover": { backgroundColor: "#fff" } }}
                  >
                    Login
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
