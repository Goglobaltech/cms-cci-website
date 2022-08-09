import React, { useState, useEffect } from "react";
import { Button, TableCell, TableRow, Menu, MenuItem } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useMutation } from "@apollo/client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CategoryForm from "./CategoryForm";
import "./categoryrow.scss";
import DeleteForm from "../../Component/DeleteForm/DeleteForm";
import { DETETE_CATEGORY } from "../../Schema/category";

// deleteProductCategory

export default function CategoryRow({
  index,
  row,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const [categoryId, setCategoryId] = useState("");
  const [editData, setEditData] = useState();
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
  const handleOpenEdit = (e) => {
    setOpenEdit(true);
    setEditData(e);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  //Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (e) => {
    setOpenDelete(true);
    setCategoryId(e);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [deleteProductCategory, { data, loading, error }] = useMutation(
    DETETE_CATEGORY,
    {
      onCompleted: ({ deleteProductCategory }) => {
        if (deleteProductCategory?.success === true) {
          setOpenSuccess(true);
          setSuccesstMessage(deleteProductCategory?.message);
          setRefetch();
          handleCloseDelete();
        } else {
          setOpenError(true);
          setErrorMessage(deleteProductCategory?.message);
        }
      },

      onError: (error) => {
        setOpenError(true);
        setErrorMessage(error.message);
      },
    }
  );

  const handleDelete = () => {
    deleteProductCategory({
      variables: {
        id: categoryId,
      },
    });
    handleCloseDelete();
  };

  return (
    <TableRow className={index % 2 === 0 ? "body-row" : "body-row-gray"}>
      <TableCell className="body-title-start" width="10%">
        {index + 1}
      </TableCell>
      <TableCell className="body-title" width="30%">
        {row.categoryName}
      </TableCell>
      <TableCell className="body-title" width="30%">
        {row?.typeCategory}
      </TableCell>
      <TableCell className="body-title" width="26%">
        {row?.remark}
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
      <CategoryForm
        modalTitle={"Edit category"}
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
        modalTitle={"Delete category"}
      />
    </TableRow>
  );
}
