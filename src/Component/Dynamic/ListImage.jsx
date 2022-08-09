import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Button,
  Grid,
  Stack,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Checkbox from "@mui/material/Checkbox";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useQuery } from "@apollo/client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
//components
import "./listimage.scss";
import { GET_MEDIA_WITH_PAGINATION } from "../../Schema/media";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
    backgroundColor: "#f5f5f5",
    borderRadius: 7,
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

export default function ListImage({
  open,
  handleClose,
  setImageLeft,
  setImageSlide,
  setImageRight,
  checkImage,
  setImageFile,
  imageType,
  keys,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [url, setURL] = useState("");

  const handleCheck = (e, url) => {
    if (e === true) {
      setURL(url);
    }
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);
  const [keyword, setKeyword] = useState("");
  const [tableData, setTableData] = useState([]);

  const { error, data, refetch } = useQuery(GET_MEDIA_WITH_PAGINATION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: false,
      imageType: imageType,
    },
    onCompleted: ({ getMediaWithPagination }) => {
      setTableData(getMediaWithPagination);
      // console.log("getMediaWithPagination::", getMediaWithPagination);
    },
  });

  console.log("keys::", keys);

  const handleAddUrl = () => {
    handleClose();
    if (checkImage === "imageLeft") {
      setImageLeft(url);
    } else if (checkImage === "imageSlide") {
      setImageSlide(url);
    } else if (checkImage === "imageRight") {
      setImageRight(url);
    } else {
      setImageFile(url, keys);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
      className="listimage-dialog"
    >
      <DialogTitle id="responsive-dialog-title">
        <Stack direction="row">
          <Stack className="title">
            <Search
              sx={{
                borderRadius: 7,
                justifyContent: "left",
                display: "flex",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "grey.400" }} />
              </SearchIconWrapper>
              <StyledInputBase
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>
          <Box sx={{ flexGrow: 1 }}></Box>
          <ClearIcon onClick={handleClose} className="close-icon" />
        </Stack>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <Box className="box-form">
            <ImageList cols={5} rowHeight={300}>
              {tableData?.Medias?.map((item, index) => (
                <ImageListItem key={item?.imageUrl}>
                  <img
                    src={`${item.imageUrl}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.imageUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item?.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item?.title}
                    actionIcon={
                      <IconButton
                        sx={{
                          color: "rgba(255, 255, 255, 0.54)",
                          height: "40px",
                        }}
                        aria-label={`info about ${item?.title}`}
                      >
                        <Checkbox
                          sx={{ color: "#fff" }}
                          onChange={(e) => {
                            handleCheck(e.target.checked, item?.imageUrl);
                          }}
                        />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              ))}
            </ImageList>
            {/* <Grid item container>
              {tableData?.Medias?.map((item, index) => (
                <Grid item xs={2}>
                  <ImageListItem key={item?.title} sx={{ width: 100 }}>
                   
                    
                  </ImageListItem>
                </Grid>
              ))}
            </Grid> */}
          </Box>
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
              <Button className="btn-create" onClick={handleAddUrl}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
