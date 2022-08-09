import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Modal,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Markup } from "interweave";
//components
import "./createportfolio.scss";
import CreateTool from "./CreateTool";
import ListImage from "../Dynamic/ListImage";

export default function PortfolioEng({
  setEngData,
  setArticleEng,
  image,
  setImage,
  checkPage,
  allEngData,
}) {
  //Items blog
  const [itemsBlog, setItemsBlog] = useState([]);
  const [rows, setRows] = useState([]);

  //upload image
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => {
    setOpenUpload(true);
  };
  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  //formik
  const CreateProducts = Yup.object().shape({
    title: Yup.string().required(),
    discription: Yup.string().required(),
  });
  // "image": null,
  const formik = useFormik({
    initialValues: {
      title: "",
      discription: "",
    },

    validationSchema: CreateProducts,
    onSubmit: (values) => {},
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
  } = formik;

  useEffect(() => {
    let article = "";
    if (itemsBlog) {
      // console.log("itemsBlog::", itemsBlog);
      let i = 0;
      let rows = [];
      itemsBlog?.forEach((element) => {
        let allRows = "";
        if (element.check === "SubTitle") {
          allRows +=
            `<div class="Subtitle" ><h4>` + element.text + "</h4></div>";
        }
        if (element.check === "FontBold") {
          allRows += `<span class="Subtitle">` + element.text + "</span>";
        }
        if (element.check === "Description") {
          allRows += `<span class="description">` + element.text + "</span>";
        }
        if (element.check === "List") {
          allRows +=
            `<div class="ListStyle" ><ul class="list-element">` +
            element.text
              .split("\n")
              .map((t) => `<li class="li-element">${t}</li>`)
              .join("") +
            "</ul></div>";
        }
        if (element.check === "ImageOneLayout") {
          allRows +=
            `<div class="ImageView"><img class="ImageStyle" src="` +
            element?.text +
            `" alt="preview" /></div>`;
        }
        if (element.check === "LinkResource") {
          allRows +=
            `<a class="link-style" href="https://` +
            element.text +
            `" target="_blank">` +
            element?.text +
            `</a>`;
        }
        if (element.check === "TextCenter") {
          allRows +=
            `<div style="margin-top:4px;margin-bottom:8px;font-family:Khmer Os Siemreap"><h5 style="text-align: center;" class="text-center-style">` +
            element.text +
            `</h5></div>`;
        }
        if (element.check === "ImageTwoLayout") {
          if (i % 2 === 0) {
            allRows +=
              `<div class="ImageViewTwo"><img class="ImageStyleTwo" src="` +
              element?.img +
              `" alt="preview" />`;
            i = i + 1;
          } else {
            allRows +=
              `<img class="ImageStyleTwo"  src="` +
              element?.img +
              `" alt="preview" /></div>`;
            i = i + 1;
          }
        }

        rows.push(allRows);
        setRows([...rows]);
      });

      article += rows.join("");
    }
    setArticleEng({
      article: `<div class="main-article">` + article + `</div>`,
      articleForCMS: itemsBlog,
    });
  }, [itemsBlog]);

  useEffect(() => {
    setEngData({
      title: values?.title,
      discription: values?.discription,
    });
  }, [values]);

  return (
    <div className="create-portfolio">
      <Box className="header-container">
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid item container spacing={4}>
              <Grid item xs={12} md={12} lg={4} xl={4}>
                <Box className="header-page">
                  <Box>
                    <Typography className="header-page-title">
                      Page header
                    </Typography>
                    <Stack direction="column" spacing={2}>
                      <Box className="btn-text-field">
                        <Typography className="title-textfield">
                          Title
                        </Typography>
                        <TextField
                          className="text-field"
                          fullWidth
                          placeholder="title"
                          size="small"
                          {...getFieldProps("title")}
                          error={Boolean(touched.title && errors.title)}
                          helperText={touched.title && errors.title}
                        />
                      </Box>
                      <Box className="btn-text-field">
                        <Typography className="title-textfield">
                          Description
                        </Typography>
                        <TextField
                          className="text-field"
                          fullWidth
                          placeholder="description"
                          size="small"
                          rows={3}
                          multiline={true}
                          {...getFieldProps("discription")}
                          error={Boolean(
                            touched.discription && errors.discription
                          )}
                          helperText={touched.discription && errors.discription}
                        />
                      </Box>

                      <Box className="btn-text-field">
                        <Typography className="title-textfield">
                          Image Post
                        </Typography>
                        <Box className="box-container">
                          <img
                            className="upload-image-box"
                            src={image}
                            style={{ display: image ? "block" : "none" }}
                            onClick={() => {
                              handleOpenUpload();
                            }}
                          />
                          <Button
                            className="upload-image"
                            onClick={() => {
                              handleOpenUpload();
                            }}
                            sx={{
                              display: image ? "none" : "flex",
                            }}
                          >
                            Input Image
                          </Button>

                          <Modal
                            open={openUpload}
                            onClose={handleCloseUpload}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <ListImage
                              open={openUpload}
                              setImageFile={setImage}
                              handleClose={handleCloseUpload}
                              imageType="BlogPost"
                            />
                          </Modal>
                        </Box>
                      </Box>

                      <Box className="btn-text-field">
                        <CreateTool
                          setItemsBlog={setItemsBlog}
                          allEngData={allEngData}
                          checkPage={checkPage}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={8} xl={8}>
                <Typography className="preview-title">
                  Privew before post
                </Typography>
                <Box className="priview-page">
                  <Box className="top-container">
                    <ImageList sx={{ height: 500 }} cols={1}>
                      <ImageListItem>
                        <img
                          style={{ height: 500 }}
                          src={`${
                            image
                              ? image
                              : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                          }`}
                          alt={values?.title}
                          loading="lazy"
                        />
                        <ImageListItemBar
                          title={values?.title ? values?.title : "Title"}
                          className="products-title"
                        />
                      </ImageListItem>
                    </ImageList>
                  </Box>
                  <Box className="bottom-container">
                    {itemsBlog.map((i) => (
                      <span>
                        {i.check === "SubTitle" ? (
                          <Markup
                            content={`<div style="margin-top:10px;margin-bottom:10px;font-family:Khmer Os Siemreap " ><h4>${i.text}</h4></div>`}
                          />
                        ) : (
                          <></>
                        )}
                        {i.check === "FontBold" ? (
                          <Markup
                            content={`<span style="font-weight:bold;font-family:Khmer Os Siemreap">${i.text}</span>`}
                          />
                        ) : (
                          <></>
                        )}
                        {i.check === "Description" ? (
                          <Markup
                            content={`<span style="font-family:Khmer Os Siemreap">${i.text}</span>`}
                          />
                        ) : (
                          <></>
                        )}
                        {i.check === "List" ? (
                          <Markup
                            content={`<div style="margin: 25px;"><ul >  
                                                            ${i.text
                                                              .split("\n")
                                                              .map(
                                                                (t) =>
                                                                  `<li style="margin:6px;font-family:Khmer Os Siemreap">${t}</li>`
                                                              )
                                                              .join("")}
                                                            </ul></div>`}
                          />
                        ) : (
                          <></>
                        )}

                        {i.check === "ImageOneLayout" ? (
                          <>
                            <img
                              src={
                                i.text !== "AddImage"
                                  ? `${i.text}`
                                  : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                              }
                              style={{
                                width: "100%",
                                height: "500px",
                              }}
                              alt="preview"
                            />
                          </>
                        ) : (
                          <></>
                        )}

                        <span>
                          {i.check === "ImageTwoLayout" ? (
                            <>
                              <img
                                src={
                                  i.img
                                    ? `${i.img}`
                                    : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                                }
                                style={{ width: "50%", height: "auto" }}
                                alt="preview"
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </span>

                        {i.check === "LinkResource" ? (
                          <>
                            <a href={`${i.text}`} target="_blank">
                              {i.text}
                            </a>
                          </>
                        ) : (
                          <></>
                        )}

                        {i.check === "TextCenter" ? (
                          <Markup
                            content={`<div style="margin-top:10px;margin-bottom:10px;font-family:Khmer Os Siemreap"><h5 style="text-align: center;">${i.text}</h5></div>`}
                          />
                        ) : (
                          <></>
                        )}
                      </span>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Box>
    </div>
  );
}
