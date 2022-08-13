import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  InputAdornment,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import { useQuery } from "@apollo/client";
//components
import "./category.scss";
import CategoryForm from "../Component/Category/CategoryForm";
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import { GET_CATEGORY_WITH_PAGINATION } from "../Schema/category";
import CategoryRow from "../Component/Category/CategoryRow";

export default function MaterailsCategory() {
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpen = () => {
    setOpenAdd(true);
  };
  const handleClose = () => {
    setOpenAdd(false);
  };

  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [showPage, setShowPage] = useState(null);

  const { error, data, refetch } = useQuery(GET_CATEGORY_WITH_PAGINATION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: true,
    },
    onCompleted: ({ getProductCategoryPagination }) => {
      setTableData(getProductCategoryPagination);
    },
  });

  useEffect(() => {
    setShowPage(page);
  }, [page, keyword]);

  return (
    <div className="category-page">
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Stack direction="column" justifyContent="center">
          <Box className="slash" />
        </Stack>
        <Stack direction="column" justifyContent="center">
          <Typography className="page-title">Category</Typography>
        </Stack>
      </Stack>
      <Grid item container spacing={3}>
        <Grid item xs={12} sm={6} md={4} className="btn-search">
          <Box className="btn-text-field">
            <TextField
              onChange={(e) => setKeyword(e.target.value)}
              className="text-field"
              fullWidth
              id="input-with-sx"
              placeholder="Search"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={8} className="grid-btn">
          <Button
            onClick={handleOpen}
            endIcon={<QueueOutlinedIcon className="icon-add" />}
            className="btn-add"
          >
            <Typography className="btn-text">Create</Typography>
          </Button>
          <CategoryForm
            modalTitle={"Create category"}
            setRefetch={refetch}
            open={openAdd}
            handleClose={handleClose}
            setOpenSuccess={setOpenSuccess}
            setOpenError={setOpenError}
            setSuccesstMessage={setSuccesstMessage}
            setErrorMessage={setErrorMessage}
          />
        </Grid>
      </Grid>
      <Box className="container-cosmetic">
        <TableContainer>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow className="header-row">
                <TableCell className="header-title">N°</TableCell>
                <TableCell className="header-title">Category name</TableCell>
                <TableCell className="header-title">Type category</TableCell>
                <TableCell className="header-title">Remark</TableCell>
                <TableCell className="header-title" align="center"></TableCell>
              </TableRow>
            </TableHead>

            {tableData?.ProductCategory?.map((row, index) => {
              return (
                <TableBody key={row?.categoryName}>
                  <CategoryRow
                    index={index}
                    row={row}
                    setRefetch={refetch}
                    setOpenSuccess={setOpenSuccess}
                    setOpenError={setOpenError}
                    setSuccesstMessage={setSuccesstMessage}
                    setErrorMessage={setErrorMessage}
                  />
                </TableBody>
              );
            })}
          </Table>
        </TableContainer>
      </Box>
      <Stack direction="row" justifyContent="right" spacing={1} sx={{ mt: 1 }}>
        <IconButton
          disabled={tableData?.paginator?.prev === null ? true : false}
          onClick={() => setPage(tableData?.paginator?.prev)}
        >
          <ArrowBackIosIcon className="next-btn" />
        </IconButton>

        <Pagination
          page={showPage}
          hideNextButton={true}
          hidePrevButton={true}
          count={tableData?.paginator?.totalPages}
          onChange={(event) => setPage(parseInt(event?.target?.textContent))}
        />

        <IconButton
          disabled={tableData?.paginator?.next === null ? true : false}
          onClick={() => setPage(tableData?.paginator?.next)}
        >
          <ArrowForwardIosIcon className="next-btn" />
        </IconButton>
      </Stack>
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
