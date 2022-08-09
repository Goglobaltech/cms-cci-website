import React, { useState, useEffect } from "react";
import { Stack, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useMutation, useQuery } from "@apollo/client";
//components
import "./createportfolio.scss";
import AlertMessage from "../AlertMessage/AlertMessage";
import { UPDATE_PORTFOLIO } from "../../Schema/portfolio";
import UpdatePortfolioEng from "./UpdatePortfolioEng";
import UpdatePortfolioKh from "./UpdatePortfolioKh";

export default function UpdatePortfolio() {
  let navigate = useNavigate();
  const location = useLocation();
  const editData = location?.state?.row;
  // console.log("editData::", editData);

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

  const [updatePortfolio, { data, loading, error }] = useMutation(
    UPDATE_PORTFOLIO,
    {
      onCompleted: ({ updatePortfolio }) => {
        // console.log("updatePortfolio::", updatePortfolio);
        if (updatePortfolio?.success === true) {
          setOpenSuccess(true);
          setSuccesstMessage(updatePortfolio?.message);
          setTimeout(() => {
            navigate("/portfolio");
          }, 2000);
        } else {
          setOpenError(true);
          setErrorMessage(updatePortfolio?.message);
        }
      },

      onError: (error) => {
        setOpenError(true);
        setErrorMessage(error.message);
      },
    }
  );

  // console.log("editData::", editData);

  const handleCreateBlog = () => {
    updatePortfolio({
      variables: {
        newInput: {
          image: image ? image : editData?.image,
          ...allEngData,
          ...allKhData,
          remack: "",
        },
        portfolioId: editData?._id,
      },
    });
  };

  return (
    <div className="create-portfolio">
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Stack direction="column" justifyContent="center">
          <Box className="slash" />
        </Stack>
        <Stack direction="column" justifyContent="center">
          <Typography>
            <span className="page-title" onClick={() => navigate("/portfolio")}>
              Portfolio
            </span>
            <span className="slash-button">/</span>
            <span
              className="page-title"
              onClick={() => navigate("/portfolio/updateportfolio")}
            >
              Update portfolio
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
            <Button className="btn-post" onClick={handleCreateBlog}>
              Post
              <TelegramIcon sx={{ marginLeft: "4px" }} />
            </Button>
          </Box>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Box sx={{ display: checkPage === true ? "block" : "none" }}>
            <UpdatePortfolioEng
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
            <UpdatePortfolioKh
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
