import React, { useState, useEffect } from "react";
import { Button, TableCell, TableRow, Menu, MenuItem } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useMutation } from "@apollo/client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Markup } from "interweave";
import { useNavigate } from "react-router-dom";
//components
import "./portfoliorow.scss";
import DeleteForm from "../DeleteForm/DeleteForm";
import { DELETE_PORTFOLIO } from "../../Schema/portfolio";

export default function PortfolioRow({
  index,
  row,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  const navigate = useNavigate();
  const toUpdateBlog = () => {
    navigate("/portfolio/updateportfolio", {
      state: { row },
    });
  };
  const [portfolioId, setPortfolioId] = useState("");
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
    setPortfolioId(e);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [deletePortfolio, { data, loading, error }] = useMutation(
    DELETE_PORTFOLIO,
    {
      onCompleted: ({ deletePortfolio }) => {
        if (deletePortfolio?.success === true) {
          setOpenSuccess(true);
          setSuccesstMessage(deletePortfolio?.message);
          setRefetch();
          handleCloseDelete();
        } else {
          setOpenError(true);
          setErrorMessage(deletePortfolio?.message);
        }
      },

      onError: (error) => {
        setOpenError(true);
        setErrorMessage(error.message);
      },
    }
  );

  const handleDelete = () => {
    deletePortfolio({
      variables: {
        portfolioId: portfolioId,
      },
    });
    handleCloseDelete();
  };

  return (
    <TableRow
      key={index}
      className={index % 2 === 0 ? "body-row" : "body-row-gray"}
    >
      <TableCell className="body-title-start" width="5%">
        {index + 1}
      </TableCell>
      <TableCell className="body-title" width="20%">
        {row?.title?.replace(/<\/?(?!a)(?!p)(?!img)\w*\b[^>]*>/gi, "")}
      </TableCell>
      <TableCell className="body-title" width="70%">
        {row?.discription?.replace(/<\/?(?!a)(?!p)(?!img)\w*\b[^>]*>/gi, "")}
      </TableCell>
      {/* <TableCell className="body-title" width="30%">
        <Markup content={row?.article} />
      </TableCell> */}
      <TableCell className="body-title-end" width="5%">
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
            toUpdateBlog();
            handleOpenEdit();
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
      <DeleteForm
        handleDelete={handleDelete}
        open={openDelete}
        handleClose={handleCloseDelete}
        modalTitle={"Delete blog post"}
      />
    </TableRow>
  );
}
