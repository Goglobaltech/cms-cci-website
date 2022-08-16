import React, { useState, useEffect } from "react";
import { Stack, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useMutation, useQuery } from "@apollo/client";
//components
import "./createblogpost.scss";
import AlertMessage from "../AlertMessage/AlertMessage";
import { UPDATE_BLOGPOST } from "../../Schema/blogpost";
import UpdateBlogPostEng from "./UpdateBlogPostEng";
import UpdateBlogPostKh from "./UpdateBlogPostKh";

export default function UpdateBlogPost() {
  let navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.row;
  // console.log("editData::", editData);

  const [loading,setLoading] = React.useState(false);

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [image, setImage] = useState();

  //check page
  const [checkPage, setCheckPage] = useState(true);

  //all data
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

  const [updateBlog, { data, error }] = useMutation(UPDATE_BLOGPOST, {
    onCompleted: ({ updateBlog }) => {
      // console.log("updateBlog::", updateBlog);
      if (updateBlog?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(updateBlog?.message);
        // setRefetch();
        setTimeout(() => {
          navigate("/blogpost");
          setLoading(false)
        }, 1000);
      } else {
        setLoading(false)
        setOpenError(true);
        setErrorMessage(updateBlog?.message);
      }
    },
    onError: (error) => {
      setLoading(false);
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  const handleCreateBlog = () => {
    // console.log("blogData::", allEngData, allKhData);
    setLoading(true);
    updateBlog({
      variables: {
        newInput: {
          image: image ? image : editData?.image,
          ...allEngData,
          ...allKhData,
          remack: "",
        },
        blogId: editData?._id,
      },
    });
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
              onClick={() => navigate("/blogpost/updateblogpost")}
            >
              Update blog post
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
            <UpdateBlogPostEng
              image={image}
              setImage={setImage}
              checkPage={checkPage}
              setEngData={setEngData}
              setArticleEng={setArticleEng}
              allEngData={allEngData}
              editData={editData}
            />
          </Box>
          <Box sx={{ display: checkPage === true ? "none" : "block" }}>
            <UpdateBlogPostKh
              image={image}
              setKhData={setKhData}
              setArticleKh={setArticleKh}
              checkPage={checkPage}
              allKhData={allKhData}
              editData={editData}
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
