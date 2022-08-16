import React, { useState, useEffect } from "react";
import { Stack, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import TelegramIcon from "@mui/icons-material/Telegram";
//components
import "./createblogpost.scss";
import AlertMessage from "../AlertMessage/AlertMessage";
import BlogPostEng from "./BlogPostEng";
import BlogPostKh from "./BlogPostKh";
import { CREATE_BLOGPOST } from "../../Schema/blogpost";

export default function CreateBlogPost() {
  
  let navigate = useNavigate();

  const [loading,setLoading] = React.useState(false);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [image, setImage] = useState();

  //check page
  const [checkPage, setCheckPage] = useState(true);
  //set data
  const [engData, setEngData] = useState();
  const [articleEng, setArticleEng] = useState();
  const [khData, setKhData] = useState();
  const [articleKh, setArticleKh] = useState();

  //all data
  const [allEngData, setAllEngData] = useState({});
  const [allKhData, setAllKhData] = useState({});

  useEffect(() => {
    setAllEngData({
      ...engData,
      ...articleEng,
    });
  }, [engData, articleEng]);

  useEffect(() => {
    setAllKhData({
      ...khData,
      ...articleKh,
    });
  }, [khData, articleKh]);

  const hanndleEngPage = () => {
    setCheckPage(true);
  };
  const hanndleKhPage = () => {
    setCheckPage(false);
  };

  // console.log("allEngData::", allEngData);
  // console.log("allKhData::", allKhData);

  const [createBlog, { data, error }] = useMutation(CREATE_BLOGPOST, {
    onCompleted: ({ createBlog }) => {
      // console.log("createBlog::", createBlog);
      if (createBlog?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(createBlog?.message);
        setTimeout(() => {
          navigate("/blogpost");
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
        setOpenError(true);
        setErrorMessage(createBlog?.message);
      }
    },
    onError: (error) => {
      setLoading(false);
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  // console.log("tsetes::", allEngData, allKhData);
  const handleCreateBlog = () => {
    setLoading(true);
    // console.log("image::", image);
    if (allEngData?.title === "") {
      setLoading(false);
      setOpenError(true);
      setErrorMessage("please input field title and description!");
    } else if (allEngData?.discription === "") {
      setLoading(false);
      setOpenError(true);
      setErrorMessage("please input field title and description!");
    } else if (allKhData?.titleKH === "") {
      setLoading(false);
      setOpenError(true);
      setErrorMessage("សូមបញ្ចូលចំណងជើង និងការពិពណ៌នា!");
    } else {
      createBlog({
        variables: {
          newInput: {
            image: image,
            ...allEngData,
            ...allKhData,
            remack: "",
          },
        },
      });
    }
  };

  return (
    <div className="create-blogpost">
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Stack direction="column" justifyContent="center">
          <Box className="slash" />
        </Stack>
        <Stack direction="column" justifyContent="center">
          <Typography>
            <span className="page-title" onClick={() => navigate("/blogpost")}>
              Blog post
            </span>
            <span className="slash-button">/</span>
            <span
              className="page-title"
              onClick={() => navigate("/blogpost/createblogpost")}
            >
              Create blog post
            </span>
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <Box className="box-tabs">
          <Box className="box-check">
            <Button onClick={hanndleEngPage} className="btn-check">
              English Page
            </Button>
            <Button onClick={hanndleKhPage} className="btn-check">
              khmer Page
            </Button>
          </Box>
          <Box className="box-post">
            {
              loading ?
                <Button className="btn-post">
                    Loading...
                </Button>
            :
                <Button className="btn-post" onClick={handleCreateBlog}>
                    Post
                    <TelegramIcon sx={{ marginLeft: "4px" }} />
                </Button>
            }
            
          </Box>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Box sx={{ display: checkPage === true ? "block" : "none" }}>
            <BlogPostEng
              image={image}
              setImage={setImage}
              checkPage={checkPage}
              setEngData={setEngData}
              setArticleEng={setArticleEng}
              allEngData={allEngData}
            />
          </Box>
          <Box sx={{ display: checkPage === true ? "none" : "block" }}>
            <BlogPostKh
              image={image}
              setKhData={setKhData}
              setArticleKh={setArticleKh}
              checkPage={checkPage}
              allKhData={allKhData}
            />
          </Box>
        </Box>
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
