import React, { useState, useEffect } from "react";
import { Button, TableCell, TableRow, Menu, MenuItem } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useMutation } from "@apollo/client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import TaskAltOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { useNavigate } from "react-router-dom";
//components
import "./cleaningmaterailsrow.scss";
import DeleteForm from "../DeleteForm/DeleteForm";
import { UPDATE_PRODUCTS, DELETE_PRODUCTS } from "../../Schema/products";

export default function CleaningMaterailsRow({
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
    navigate("/cleaningmaterails/updatecleaningmaterails", {
      state: { row },
    });
  };
  const [productsId, setProductsId] = useState("");
  const [checkButton, setCheckButton] = useState("");
  //menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // const theme = createTheme({
  //   status: {
  //     danger: orange[500],
  //     warning: yellow[500],
  //   },
  // });

  //Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (e) => {
    setOpenDelete(true);
    setProductsId(e);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const [updateProduct] = useMutation(UPDATE_PRODUCTS, {
    onCompleted: ({ updateProduct }) => {
      // console.log("updateProduct::", updateProduct);
      if (updateProduct?.success === true) {
        setOpenSuccess(true);
        setSuccesstMessage(updateProduct?.message);
        setRefetch();
        handleCloseMenu();
      } else {
        setOpenError(true);
        setErrorMessage(updateProduct?.message);
      }
    },

    onError: (error) => {
      setOpenError(true);
      setErrorMessage(error.message);
    },
  });

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
    const newVales = {
      categoryId: row?.categoryId?._id,
      title: row?.title,
      titleKH: row?.titleKH,
      discription: row?.discription,
      discriptionKH: row?.discriptionKH,
      imageSlideCenter: row?.imageSlideCenter ? row?.imageSlideCenter : "",
      imageSlideLeft: row?.imageSlideLeft ? row?.imageSlideLeft : "",
      imageSlideRight: row?.imageSlideRight ? row?.imageSlideRight : "",
      benefits: row?.benefits,
      discriptionBenefitsList: row?.discriptionBenefitsList,
    };
    // console.log("newVales::", newVales);
    updateProduct({
      variables: {
        productEdit: {
          ...newVales,
          mainProduct: checkButton === "New" ? true : row?.mainProduct,
          newProduct: checkButton === "Main" ? true : row?.newProduct,
        },
        id: row?._id,
      },
    });
  };

  // console.log("checkButton::", checkButton);

  const handleDelete = () => {
    deleteProduct({
      variables: {
        id: productsId,
      },
    });
    handleCloseDelete();
  };

  // console.log("row::", row);

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
          <CircleSharpIcon className="new-icon" />
        ) : (
          <CircleSharpIcon className="old-icon" />
        )}
      </TableCell>
      <TableCell className="body-title" width="10%">
        {row?.newProduct === true ? (
          <CircleSharpIcon className="new-icon" />
        ) : (
          <CircleSharpIcon className="old-icon" />
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
            setCheckButton("New");
            handleMainProduct();
          }}
        >
          <DataSaverOnIcon sx={{ fontSize: "20px", color: "#7cdba8", mr: 1 }} />
          New
        </MenuItem>
        <MenuItem
          onClick={() => {
            setCheckButton("Main");
            handleMainProduct();
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
            sx={{ fontSize: "20px", color: "#FF5959", mr: 1 }}
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
