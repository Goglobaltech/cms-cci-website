import React, { useState, useEffect } from "react";
import {
  Button,
  TableCell,
  TableRow,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useMutation } from "@apollo/client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
//components
import MediaForm from "./MediaForm";
import "./mediarow.scss";
import DeleteForm from "../DeleteForm/DeleteForm";
import { DELETE_MEDIA } from "../../Schema/media";

export default function MediaRow({
  index,
  row,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [mediaId, setMediaId] = useState();
  // console.log("row::", row);
  //menu
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
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  //Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (e) => {
    setOpenDelete(true);
    setMediaId(e);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [deleteMedia, { data, loading, error }] = useMutation(DELETE_MEDIA, {
    onCompleted: ({ deleteMedia }) => {
      if (deleteMedia?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteMedia?.message);
        setRefetch();
        handleCloseDelete();
      } else {
        setOpenError(true);
        setErrorMessage(deleteMedia?.message);
      }
    },

    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  const handleDelete = () => {
    deleteMedia({
      variables: {
        mediaId: mediaId,
      },
    });
    handleCloseDelete();
  };
  // console.log("row::", row);

  return (
    <TableRow className={index % 2 === 0 ? "body-row" : "body-row-gray"}>
      <TableCell className="body-title-start" width="10%">
        {index + 1}
      </TableCell>
      <TableCell className="body-title" width="30%">
        <Box className="container-image">
          <img src={`${row?.imageUrl}`} alt="Image" className="image" />
        </Box>
      </TableCell>
      <TableCell className="body-title" width="30%">
        {row?.title}
      </TableCell>
      <TableCell className="body-title" width="26%">
        {row?.imageType}
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

      <MediaForm
        modalTitle={"Edit media"}
        setRefetch={setRefetch}
        editData={row}
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
        modalTitle={"Delete category"}
      />
    </TableRow>
  );
}
