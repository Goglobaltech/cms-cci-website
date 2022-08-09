import React, { useState, useEffect } from "react";
import {
  Button,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useMutation } from "@apollo/client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
//components
import UpdateUser from "./UpdateUser";
import "./userrow.scss";
import DeleteForm from "../DeleteForm/DeleteForm";
import { DELETE_USER } from "../../Schema/user";
import Avatar from "@mui/material/Avatar";

export default function UserRow({
  index,
  row,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [userId, setUserId] = useState("");
  const [editData, setEditData] = useState();

  //menu open edit delete
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  //Edit
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = (row) => {
    setOpenEdit(true);
    setEditData(row);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // handle Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (e) => {
    setOpenDelete(true);
    setUserId(e);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Delete user
  const [deleteUser] = useMutation(DELETE_USER, {
    onCompleted: ({ deleteUser }) => {
      if (deleteUser?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteUser?.message);
        setRefetch();
        handleCloseDelete();
      } else {
        setOpenError(true);
        setErrorMessage(deleteUser?.message);
      }
    },

    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  const handleDelete = () => {
    deleteUser({
      variables: {
        userId: userId,
      },
    });
    handleCloseDelete();
  };

  // console.log(row, "::row");

  return (
    <TableRow className={index % 2 === 0 ? "body-row" : "body-row-gray"}>
      <TableCell className="body-title-start" width="5%">
        {index + 1}
      </TableCell>
      <TableCell className="body-title" width="20%">
        <Stack direction="row" spacing={2}>
          <Avatar
            src={row?.profileImage}
            sx={{ width: "40px", height: "40px" }}
          />
          <Stack direction="column" justifyContent="center">
            {row?.firstName + " " + row?.lastName}
          </Stack>
        </Stack>
      </TableCell>
      <TableCell className="body-title" width="20%">
        {row?.phone}
      </TableCell>
      <TableCell className="body-title" width="20%">
        {row?.email}
      </TableCell>
      <TableCell className="body-title" width="15%">
        {row?.address}
      </TableCell>
      <TableCell className="body-title" width="30%">
        {moment(row?.dob).format("DD-MM-YYYY")}
      </TableCell>

      <TableCell className="body-title-end" width="4%">
        <Button onClick={handleOpenMenu} className="btn-icon">
          <MoreVertOutlinedIcon className="more-icon" />
        </Button>
      </TableCell>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            handleOpenEdit(row);
            handleCloseMenu();
          }}
        >
          <EditIcon sx={{ fontSize: "20px", color: "#7cdba8", mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOpenDelete(row?._id);
            handleCloseMenu();
          }}
        >
          <DeleteForeverIcon
            sx={{ fontSize: "20px", color: "#fc7e7f", mr: 1 }}
          />
          Delete
        </MenuItem>
      </Menu>
      <UpdateUser
        modalTitle={"Edit User"}
        setRefetch={setRefetch}
        editData={editData}
        open={openEdit}
        handleClose={handleCloseEdit}
        setOpenSuccess={setOpenSuccess}
        setOpenError={setOpenError}
        setSuccesstMessage={setSuccesstMessage}
        setErrorMessage={setErrorMessage}
      />
      <DeleteForm
        handleDelete={handleDelete}
        open={openDelete}
        handleClose={handleCloseDelete}
        modalTitle={"Delete User"}
      />
    </TableRow>
  );
}
