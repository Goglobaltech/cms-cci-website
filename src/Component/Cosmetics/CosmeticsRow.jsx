import React, { useState, useEffect } from "react";
import { Button, TableCell, TableRow, Menu, MenuItem } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useMutation } from "@apollo/client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import InfoIcon from "@mui/icons-material/Info";

//components
import "./cosmeticsrow.scss";
import DeleteForm from "../DeleteForm/DeleteForm";
import { UPDATE_PRODUCTS, DELETE_PRODUCTS } from "../../Schema/products";

export default function CosmeticsRow({
  index,
  row,
  setRefetch,
  setOpenSuccess,
  setOpenError,
  setSuccesstMessage,
  setErrorMessage,
}) {
  let navigate = useNavigate();
  const toUpdate = () => {
    navigate("/cosmetics/updatecosmetics", {
      state: { row },
    });
  };
  const [productsId, setProductsId] = useState("");
  //menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  //Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (e) => {
    setOpenDelete(true);
    setProductsId(e);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [updateProduct, { data: d, loading, error }] = useMutation(
    UPDATE_PRODUCTS,
    {
      onCompleted: ({ updateProduct }) => {
        // console.log("updateProduct::", updateProduct);
        if (updateProduct?.success === true) {
          setOpenSuccess(true);
          setSuccesstMessage(updateProduct?.message);
          // setRefetch();
          setTimeout(() => {
            navigate("/cleaningmaterails");
          }, 2000);
        } else {
          setOpenError(true);
          setErrorMessage(updateProduct?.message);
        }
      },

      onError: (error) => {
        setOpenError(true);
        setErrorMessage(error.message);
      },
    }
  );

  const [deleteProduct] = useMutation(DELETE_PRODUCTS, {
    onCompleted: ({ deleteProduct }) => {
      if (deleteProduct?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(deleteProduct?.message);
        setRefetch();
        handleCloseDelete();
      } else {
        setOpenError(true);
        setErrorMessage(deleteProduct?.message);
      }
    },

    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

  const handleMainProduct = () => {
    updateProduct({
      variables: {
        productEdit: {
          ...row,
          mainProduct: true,
        },
        id: row?._id,
      },
    });
  };

  const handleDelete = () => {
    deleteProduct({
      variables: {
        id: productsId,
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
        {row.title}
      </TableCell>
      <TableCell className="body-title" width="50%">
        {row?.discription}
      </TableCell>
      <TableCell className="body-title" width="10%">
        {row?.mainProduct === true ? (
          <InfoIcon sx={{ fontSize: "20px", color: "#7cdba8", mr: 1 }} />
        ) : (
          <InfoIcon sx={{ fontSize: "20px", color: "#fc7e7f", mr: 1 }} />
        )}
      </TableCell>
      <TableCell className="body-title" width="10%">
        {row?.newProduct === true ? (
          <InfoIcon sx={{ fontSize: "20px", color: "#7cdba8", mr: 1 }} />
        ) : (
          <InfoIcon sx={{ fontSize: "20px", color: "#fc7e7f", mr: 1 }} />
        )}
      </TableCell>
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
            toUpdate();
            handleCloseMenu();
          }}
        >
          <DataSaverOnIcon sx={{ fontSize: "20px", color: "#7cdba8", mr: 1 }} />
          New
        </MenuItem>
        <MenuItem
          onClick={() => {
            toUpdate();
            handleCloseMenu();
          }}
        >
          <AutoFixHighIcon sx={{ fontSize: "20px", color: "#7cdba8", mr: 1 }} />
          Main product
        </MenuItem>
        <MenuItem
          onClick={() => {
            toUpdate();
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
      <DeleteForm
        handleDelete={handleDelete}
        open={openDelete}
        handleClose={handleCloseDelete}
        modalTitle={"Delete products"}
      />
    </TableRow>
  );
}
