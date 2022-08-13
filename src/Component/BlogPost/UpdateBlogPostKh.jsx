import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Markup } from "interweave";
//components
import "./createblogpost.scss";
import UpdateToolKh from "./UpdateToolKh";

export default function BlogPostKh({
  image,
  editData,
  checkPage,
  allKhData,
  setKhData,
  setArticleKh,
}) {
  // Items blog
  const [itemsBlog, setItemsBlog] = useState([]);
  const [rows, setRows] = useState([]);
  // console.log("editData::", editData);

  // set articleForCMSkh data
  useEffect(() => {
    let rows = [];
    editData?.articleForCMSKH?.map((e) => {
      const allRow = {
        Fieldtype: e?.Fieldtype,
        check: e?.check,
        text: e?.text,
        img: e?.img,
        key: e?.key,
      };
      rows.push(allRow);
    });
    setItemsBlog(rows);
  }, [editData?.articleForCMSKH]);

  //formik
  const CreateProducts = Yup.object().shape({
    titleKH: Yup.string().required(),
    discriptionKH: Yup.string().required(),
  });
  // "image": null,
  const formik = useFormik({
    initialValues: {
      titleKH: editData?.titleKH.replace(
        /<\/?(?!a)(?!p)(?!img)\w*\b[^>]*>/gi,
        ""
      ),
      discriptionKH: editData?.discriptionKH.replace(
        /<\/?(?!a)(?!p)(?!img)\w*\b[^>]*>/gi,
        ""
      ),
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
    let articleKH = "";

    if (itemsBlog) {
      // console.log(itemsBlog , "After itemsBlog");
      let i = 0;
      let rows = [];
      itemsBlog?.forEach((element) => {
        let allRows = "";
        if (element.check === "SubTitle") {
          allRows +=
            `<div class="khmer-Subtitle" ><h4>` + element.text + "</h4></div>";
        }
        if (element.check === "FontBold") {
          allRows += `<span class="khmer-Subtitle">` + element.text + "</span>";
        }
        if (element.check === "Description") {
          allRows +=
            `<span class="khmer-description">` + element.text + "</span>";
        }
        if (element.check === "List") {
          allRows +=
            `<div class="khmer-ListStyle" ><ul class="listkh-element">` +
            element.text
              .split("\n")
              .map((t) => `<li class="likh-element">${t}</li>`)
              .join("") +
            "</ul></div>";
        }
        if (element.check === "ImageOneLayout") {
          allRows +=
            `<div class="khmer-ImageView"><img class="khmer-ImageStyle" src="` +
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
              `<div class="khmer-ImageViewTwo"><img class="khmer-ImageStyleTwo" src="` +
              element?.img +
              `" alt="preview" />`;
            i = i + 1;
          } else {
            allRows +=
              `<img class="khmer-ImageStyleTwo"  src="` +
              element?.img +
              `" alt="preview" /></div>`;
            i = i + 1;
          }
        }

        rows.push(allRows);
        setRows([...rows]);
      });

      articleKH += rows.join("");
    }

    setKhData({
      articleKH: `<div class="khmer-main-article">` + articleKH + `</div>`,
      articleForCMSKH: itemsBlog,
    });
  }, [itemsBlog]);

  useEffect(() => {
    setArticleKh({
      titleKH: values?.titleKH,
      discriptionKH: values?.discriptionKH,
    });
  }, [values]);

  return (
    <div className="create-blogpost">
      <Box className="header-container">
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid item container spacing={4}>
              <Grid item xs={12} md={5} lg={4}>
                <Box className="header-page">
                  <Box>
                    <Typography className="header-page-title">
                      ក្បាលទំព័រ
                    </Typography>
                    <Stack direction="column" spacing={2}>
                      <Box className="btn-text-field">
                        <Typography className="title-textfield">
                          ចំណងជើង
                        </Typography>
                        <TextField
                          className="text-field"
                          fullWidth
                          placeholder="ចំណងជើង"
                          size="small"
                          {...getFieldProps("titleKH")}
                          error={Boolean(touched.titleKH && errors.titleKH)}
                          helperText={touched.titleKH && errors.titleKH}
                        />
                      </Box>

                      <Box className="btn-text-field">
                        <Typography className="title-textfield">
                          ការពិពណ៌នា
                        </Typography>
                        <TextField
                          className="text-field"
                          fullWidth
                          placeholder="ការពិពណ៌នា"
                          size="small"
                          rows={4}
                          multiline={true}
                          {...getFieldProps("discriptionKH")}
                          error={Boolean(
                            touched.discriptionKH && errors.discriptionKH
                          )}
                          helperText={
                            touched.discriptionKH && errors.discriptionKH
                          }
                        />
                      </Box>
                      <Box className="btn-text-field">
                        <UpdateToolKh
                          setItemsBlog={setItemsBlog}
                          editData={editData}
                          checkPage={checkPage}
                        />
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                <Typography className="preview-title">
                  ត្រួតពិនិត្យមុនផុស
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
                              : editData?.image
                              ? editData?.image
                              : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                          }`}
                          alt={values?.titleKH}
                          loading="lazy"
                        />
                        <ImageListItemBar
                          title={values?.titleKH ? values?.titleKH : "Title"}
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
                                i.img
                                  ? `${i.img}`
                                  : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                              }
                              style={{
                                width: "100%",
                                height: "auto",
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
