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
import AlertMessage from "../Component/AlertMessage/AlertMessage";
//components
import UserForm from "../Component/Users/UserForm";
import { GET_USER_WITH_PAGINATION } from "../Schema/user";
import UserRow from "../Component/Users/UserRow";
import "./users.scss";

export default function Users() {
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

  // it store values
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState("");
  const [showPage, setShowPage] = useState(null);

  const { error, data, refetch } = useQuery(GET_USER_WITH_PAGINATION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: false,
    },
    onCompleted: ({ getUserPagination }) => {
      setTableData(getUserPagination);
      // console.log("getUserPagination::", getUserPagination);
    },
  });

  useEffect(() => {
    setShowPage(page);
  }, [page, keyword]);

  return (
    <div className="users-page">
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Stack direction="column" justifyContent="center">
          <Box className="slash" />
        </Stack>
        <Stack direction="column" justifyContent="center">
          <Typography className="page-title">Users</Typography>
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
          <UserForm
            modalTitle={"Create User"}
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

      <Box className="container">
        <TableContainer>
          <Table className="table" aria-label="simple table">
            <TableHead>
              <TableRow className="header-row">
                <TableCell className="header-title">N&deg;</TableCell>
                <TableCell className="header-title">Full Name</TableCell>
                <TableCell className="header-title">Phone Number</TableCell>
                <TableCell className="header-title">Email</TableCell>
                <TableCell className="header-title">Adress</TableCell>
                <TableCell className="header-title">Date Of Birth</TableCell>
              </TableRow>
            </TableHead>

            {tableData?.users?.map((row, index) => {
              return (
                <TableBody key={row?.userName}>
                  <UserRow
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
