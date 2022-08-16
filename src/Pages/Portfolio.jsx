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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchIcon from "@mui/icons-material/Search";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
//components
import "./portfolio.scss";
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import { GET_PORTFOLIO_WITH_PAGINATION } from "../Schema/portfolio";
import PortfolioRow from "../Component/Portfolio/PortfolioRow";

export default function Portfolio() {
  let navigate = useNavigate();
  const toCreate = () => {
    navigate("/portfolio/createportfolio");
  };
  // Alert Message
  const [successMessage, setSuccesstMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  // it store values
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [showPage, setShowPage] = useState(null);

  const { error, data, refetch } = useQuery(GET_PORTFOLIO_WITH_PAGINATION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: true,
    },
    onCompleted: ({ getPortforlioPagination }) => {
      setTableData(getPortforlioPagination);
      // console.log("getPortforlioPagination::", getPortforlioPagination);
    },
  });

  useEffect(() => {
    setShowPage(page);
  }, [page, keyword]);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="portfolio-page">
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Stack direction="column" justifyContent="center">
          <Box className="slash" />
        </Stack>
        <Stack direction="column" justifyContent="center">
          <Typography className="page-title">Portfolio</Typography>
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
            onClick={toCreate}
            endIcon={<QueueOutlinedIcon className="icon-add" />}
            className="btn-add"
          >
            <Typography className="btn-text">Create</Typography>
          </Button>
        </Grid>
      </Grid>
      <Box className="container-cosmetic">
        <TableContainer>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow className="header-row">
                <TableCell className="header-title">N&deg;</TableCell>
                <TableCell className="header-title">Title</TableCell>
                <TableCell className="header-title">Description</TableCell>
                <TableCell className="header-title" align="center"></TableCell>
              </TableRow>
            </TableHead>

            {tableData?.portfolios?.map((row, index) => {
              return (
                <TableBody key={row?.title}>
                  <PortfolioRow
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
