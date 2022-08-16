import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Avatar,
  Grid,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import TelegramIcon from "@mui/icons-material/Telegram";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useMutation, useQuery } from "@apollo/client";
//components
import "./createcosmetics.scss";
import AlertMessage from "../AlertMessage/AlertMessage";
import ListAdventage from "./ListAdventage";
import ListDescription from "./ListDescription";
import { CREATE_PRODUCTS } from "../../Schema/products";
import { SelectCategrory } from "../Dynamic/Function";
import ListImage from "../Dynamic/ListImage";

export default function CreateCosmetics() {
  let navigate = useNavigate();
  const location = useLocation();
  const setRefetch = location.state;

  const [loading,setLoading] = React.useState(false);

  // console.log("setRefetch::", setRefetch);
  const [categoryVal, setCategoryVal] = useState();
  //Image
  const [checkImage, setCheckImage] = useState("");
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => {
    setOpenUpload(true);
  };
  const handleCloseUpload = () => {
    setOpenUpload(false);
  };
  const [imageLeft, setImageLeft] = useState(null);
  const [imageSlide, setImageSlide] = useState(null);
  const [imageRight, setImageRight] = useState(null);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  // add benefits
  const [benefitsItem, setBenefitsItem] = useState([]);
  const [currentBenefitsItem, setCurrentBenefitsItem] = useState({
    imageBenefits: "",
    subTitleBenefits: "",
    subTitleBenefitsKH: "",
    key: "",
  });
  // add description
  const [descriptionItem, setDescriptionItem] = useState([]);
  const [currentDescriptionItem, setCurrentDescriptionItem] = useState({
    benefitsList: "",
    key: "",
  });

  const handleAddBenefits = () => {
    setCurrentBenefitsItem({
      imageBenefits: "Image",
      subTitleBenefits: "",
      subTitleBenefitsKH: "",
      key: Date.now(),
    });
  };
  // add description
  const handleAddDescription = () => {
    setCurrentDescriptionItem({
      benefitsList: "benefitslist",
      benefitsListKH: "benefitsListKH",
      key: Date.now(),
    });
  };

  const addBenefitsItem = () => {
    const newBenefitsItem = currentBenefitsItem;
    if (newBenefitsItem?.imageBenefits !== "") {
      const items = [...benefitsItem, newBenefitsItem];
      setBenefitsItem([...items]);
      setCurrentBenefitsItem({
        imageBenefits: "",
        subTitleBenefits: "",
        subTitleBenefitsKH: "",
        key: "",
      });
    }
  };
  // add description
  const addDescriptionItem = () => {
    const newDescriptionItem = currentDescriptionItem;
    if (newDescriptionItem?.benefitsList !== "") {
      const items = [...descriptionItem, newDescriptionItem];
      setDescriptionItem([...items]);
      setCurrentDescriptionItem({
        benefitsList: "",
        benefitsListKH: "",
        key: "",
      });
    }
  };

  React.useMemo(async () => {
    await handleAddBenefits();
    await addBenefitsItem();
  }, []);
  // add description
  React.useMemo(async () => {
    await handleAddDescription();
    await addDescriptionItem();
  }, []);

  React.useEffect(() => {
    if (currentBenefitsItem?.imageBenefits !== "") {
      addBenefitsItem();
    }
  }, [currentBenefitsItem]);
  // add description
  React.useEffect(() => {
    if (currentDescriptionItem?.benefitsList !== "") {
      addDescriptionItem();
    }
  }, [currentDescriptionItem]);

  const deleteBenefitsItem = (key) => {
    const filteredItems = benefitsItem?.filter((t) => t.key !== key);
    setBenefitsItem(filteredItems);
  };
  // add description
  const deleteDescriptionItem = (key) => {
    const filteredItems = descriptionItem?.filter((t) => t.key !== key);
    setDescriptionItem(filteredItems);
  };

  const setUpdateImageBenefits = (imageBenefits, key) => {
    const items = benefitsItem;
    items.map((i) => {
      if (i.key === key) {
        i.imageBenefits = imageBenefits;
      }
    });
    setBenefitsItem([...benefitsItem]);
  };

  const setUpdateSubTitleBenefits = (subTitleBenefits, key) => {
    const items = benefitsItem;
    items.map((i) => {
      if (i.key === key) {
        i.subTitleBenefits = subTitleBenefits;
      }
    });
    setBenefitsItem([...benefitsItem]);
  };

  const setUpdateSubTitleBenefitsKH = (subTitleBenefitsKH, key) => {
    const items = benefitsItem;
    items.map((i) => {
      if (i.key === key) {
        i.subTitleBenefitsKH = subTitleBenefitsKH;
      }
    });
    setBenefitsItem([...benefitsItem]);
  };
  // add description
  const setUpdateBenefitsList = (benefitsList, key) => {
    const items = descriptionItem;
    items.map((i) => {
      if (i.key === key) {
        i.benefitsList = benefitsList;
      }
    });
    setDescriptionItem([...descriptionItem]);
  };

  const setUpdateBenefitsListKH = (benefitsListKH, key) => {
    const items = descriptionItem;
    items.map((i) => {
      if (i.key === key) {
        i.benefitsListKH = benefitsListKH;
      }
    });
    setDescriptionItem([...descriptionItem]);
  };

  const [createProduct, { data, error }] = useMutation(
    CREATE_PRODUCTS,
    {
      onCompleted: ({ createProduct }) => {
        // console.log("createProduct::", createProduct);
        if (createProduct?.success === true) {
          setOpenSuccess(true);
          setSuccesstMessage(createProduct?.message);
          setTimeout(() => {
            navigate("/cosmetics");
            resetForm();
            setLoading(false);
          }, 2000);
        } else {
          setLoading(false);
          setOpenError(true);
          setErrorMessage(createProduct?.message);
        }
      },
      onError: (error) => {
        setLoading(false);
        setOpenError(true);
        setErrorMessage(error.message);
      },
    }
  );

  //formik
  const CreateProducts = Yup.object().shape({
    title: Yup.string().required(),
    titleKH: Yup.string().required(),
    discription: Yup.string().required(),
    discriptionKH: Yup.string().required(),
    // newProduct
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      titleKH: "",
      discription: "",
      discriptionKH: "",
    },

    validationSchema: CreateProducts,
    onSubmit: (values) => {
      setLoading(true);
      createProduct({
        variables: {
          newProduct: {
            ...values,
            imageSlideLeft: imageLeft ? imageLeft : "",
            imageSlideCenter: imageSlide ? imageSlide : "",
            imageSlideRight: imageRight ? imageRight : "",
            categoryId: categoryVal?.id,
            benefits: benefitsItem,
            discriptionBenefitsList: descriptionItem,
          },
        },
      });
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
    resetForm
  } = formik;

  return (
    <div className="create-products">
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Stack direction="column" justifyContent="center">
          <Box className="slash" />
        </Stack>
        <Stack direction="column" justifyContent="center">
          <Typography>
            <span className="page-title" onClick={() => navigate("/cosmetics")}>
              Cosmetics
            </span>
            <span className="slash-button">/</span>
            <span
              className="page-title"
              onClick={() => navigate("/cosmetics/createcosmetics")}
            >
              Create cosmetics
            </span>
          </Typography>
        </Stack>
      </Stack>

      <Box className="header-container">
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid item container spacing={4}>
              <Grid item xs={12} md={12} lg={4} xl={4}>
                <Box className="header-page">
                  <Typography className="header-page-title">
                    Page header
                  </Typography>
                  <Stack direction="column" spacing={2}>
                    <Box className="btn-text-field">
                      <Typography className="title-textfield">
                        English title
                      </Typography>
                      <TextField
                        className="text-field"
                        fullWidth
                        placeholder="english title"
                        size="small"
                        {...getFieldProps("title")}
                        error={Boolean(touched.title && errors.title)}
                        helperText={touched.title && errors.title}
                      />
                    </Box>
                    <Box className="btn-text-field">
                      <Typography className="title-textfield">
                        Khmer title
                      </Typography>
                      <TextField
                        className="text-field"
                        fullWidth
                        placeholder="khmer title"
                        size="small"
                        {...getFieldProps("titleKH")}
                        error={Boolean(touched.titleKH && errors.titleKH)}
                        helperText={touched.titleKH && errors.titleKH}
                      />
                    </Box>
                    <Box className="btn-text-field">
                      <Typography className="title-textfield">
                        English description
                      </Typography>
                      <TextField
                        className="text-field"
                        fullWidth
                        placeholder="english description"
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
                        Khmer description
                      </Typography>
                      <TextField
                        className="text-field"
                        fullWidth
                        placeholder="khmer description"
                        size="small"
                        rows={3}
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
                      <SelectCategrory
                        selectVal={categoryVal}
                        setSelectVal={setCategoryVal}
                        typeProduct="Cosmetics"
                      />
                    </Box>
                    <Box className="btn-text-field">
                      {/* <Typography className="title-textfield">Image left</Typography> */}
                      <Grid item container spacing={2}>
                        {/* <Typography className="title-textfield">Image left</Typography> */}
                        <Grid item xs={4}>
                          <Typography className="title-textfield">
                            Image Left
                          </Typography>
                          <img
                            className="upload-image-cosmetic"
                            src={imageLeft}
                            style={{ display: imageLeft ? "block" : "none" }}
                            onClick={() => {
                              setCheckImage("imageLeft");
                              handleOpenUpload();
                            }}
                          />
                          <Button
                            className="upload-image"
                            onClick={() => {
                              setCheckImage("imageLeft");
                              handleOpenUpload();
                            }}
                            sx={{ display: imageLeft ? "none" : "flex" }}
                          >
                            Image left
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography className="title-textfield">
                            Image Slide
                          </Typography>
                          <img
                            className="upload-image-cosmetic"
                            src={imageSlide}
                            style={{ display: imageSlide ? "block" : "none" }}
                            onClick={() => {
                              setCheckImage("imageSlide");
                              handleOpenUpload();
                            }}
                          />
                          <Button
                            className="upload-image"
                            onClick={() => {
                              setCheckImage("imageSlide");
                              handleOpenUpload();
                            }}
                            sx={{ display: imageSlide ? "none" : "flex" }}
                          >
                            Image Slide
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography className="title-textfield">
                            Image Right
                          </Typography>
                          <img
                            className="upload-image-cosmetic"
                            src={imageRight}
                            style={{ display: imageRight ? "block" : "none" }}
                            onClick={() => {
                              setCheckImage("imageRight");
                              handleOpenUpload();
                            }}
                          />
                          <Button
                            className="upload-image"
                            onClick={() => {
                              setCheckImage("imageRight");
                              handleOpenUpload();
                            }}
                            sx={{ display: imageRight ? "none" : "flex" }}
                          >
                            Image right
                          </Button>
                        </Grid>
                      </Grid>
                      <Modal
                        open={openUpload}
                        onClose={handleCloseUpload}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <ListImage
                          open={openUpload}
                          checkImage={checkImage}
                          setImageLeft={setImageLeft}
                          setImageSlide={setImageSlide}
                          setImageRight={setImageRight}
                          handleClose={handleCloseUpload}
                          imageType={"ProductsHighlight"}
                        />
                      </Modal>
                    </Box>
                    <Typography className="title">Benefits</Typography>
                    <ListAdventage
                      items={benefitsItem}
                      deleteItem={deleteBenefitsItem}
                      setUpdateImageBenefits={setUpdateImageBenefits}
                      setUpdateSubTitleBenefits={setUpdateSubTitleBenefits}
                      setUpdateSubTitleBenefitsKH={setUpdateSubTitleBenefitsKH}
                    />
                    <Button className="btn-add" onClick={handleAddBenefits}>
                      <AddIcon />
                      Add Benefits
                    </Button>
                    <Typography className="title">Description</Typography>
                    <ListDescription
                      items={descriptionItem}
                      deleteItem={deleteDescriptionItem}
                      setUpdateBenefitsList={setUpdateBenefitsList}
                      setUpdateBenefitsListKH={setUpdateBenefitsListKH}
                    />
                    <Button className="btn-add" onClick={handleAddDescription}>
                      <AddIcon />
                      Add Description BenefitsList
                    </Button>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={12} md={12} lg={8} xl={8}>
                <Box className="box-post">
                  {
                    loading ? 
                      <Button className="btn-post">
                        Loading...
                      </Button>
                  :
                      <Button className="btn-post" type="submit">
                        Post
                        <TelegramIcon sx={{ marginLeft: "4px" }} />
                      </Button>
                  }
                </Box>

                <Typography className="preview-title">
                  Privew before post
                </Typography>
                <Box className="priview-page">
                  <Box className="top-container">
                    <Grid item container spacing={1}>
                      <Grid item xs={4}>
                        <Box className="image-left-container">
                          <img
                            alt="User"
                            className="image-left"
                            src={
                              imageLeft
                                ? imageLeft
                                : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                            }
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box className="products-title">
                          {values?.title ? values?.title : "Title"}
                        </Box>
                        <Box className="products-subtitle">
                          {values?.discription
                            ? values?.discription
                            : "Description"}
                        </Box>
                        <Box className="divider-bottom" />
                      </Grid>
                      <Grid item xs={4}>
                        <Box className="image-left-container">
                          <img
                            alt="User"
                            className="image-left"
                            src={
                              imageRight
                                ? imageRight
                                : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                            }
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box className="bottom-container">
                    <Typography className="bottom-title">Benefits</Typography>
                    <Box className="box-grid">
                      <Grid item container className="grid-container">
                        {benefitsItem?.map((d) => (
                          <Grid item xs={2.4}>
                            <div className="div-map">
                              <Box className="image-container">
                                <Avatar
                                  alt="Image"
                                  className="adventage-image"
                                  src={
                                    d?.imageBenefits &&
                                    d?.imageBenefits !== "Image"
                                      ? d?.imageBenefits
                                      : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                                  }
                                />
                                <Typography>{d?.subTitleBenefits}</Typography>
                              </Box>
                            </div>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                    <Box className="bottom-divider">
                      <Box className="divider-top" />
                      {descriptionItem?.map((d) => (
                        <Stack direction="row" className="stack-adventage">
                          <CheckBoxIcon className="icon-adventage" />
                          <Typography className="des-adventage">
                            {d?.benefitsList}
                          </Typography>
                        </Stack>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Box>
      <AlertMessage
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        openSuccess={openSuccess}
        openError={openError}
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
    </div>
  );
}
