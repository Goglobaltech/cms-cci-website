import React, { useState } from "react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  Box,
  Grid,
  TextField,
  Avatar,
  Modal,
  Button,
  Typography,
  Stack,
} from "@mui/material";
//compoents
import "./listadventage.scss";
import ListImage from "../../Component/Dynamic/ListImage";

export default function UpdateListAdventage(props) {
  const items = props.items;
  //upload image
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => {
    setOpenUpload(true);
  };
  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  const listItems = items?.map((item) => {
    // console.log("item?.benefitsList::", item);
    return (
      <Box className="list-adventage">
        <Grid item container spacing={2}>
          <Grid item xs={3}>
            <Button onClick={() => handleOpenUpload()}>
              <Avatar
                alt="Image"
                className="import-image"
                src={
                  item?.imageBenefits
                    ? item?.imageBenefits
                    : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                }
              />
            </Button>
            <Modal
              open={openUpload}
              onClose={handleCloseUpload}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <ListImage
                open={openUpload}
                setImageFile={props.setUpdateImageBenefits}
                keys={item.key}
                handleClose={handleCloseUpload}
                imageType="ProductsBenefits"
              />
            </Modal>
          </Grid>
          <Grid item xs={8}>
            <Stack direction="column" spacing={2}>
              <TextField
                value={item?.subTitleBenefits}
                onChange={(e) =>
                  props.setUpdateSubTitleBenefits(e.target.value, item?.key)
                }
                className="text-field"
                fullWidth
                placeholder="english description"
                size="small"
              />
              <TextField
                value={item?.subTitleBenefitsKH}
                onChange={(e) =>
                  props.setUpdateSubTitleBenefitsKH(e.target.value, item?.key)
                }
                className="text-field"
                fullWidth
                placeholder="khmer description"
                size="small"
              />
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <DeleteRoundedIcon
              onClick={() => {
                props.deleteItem(item.key);
              }}
              className="delete-icon"
            />
          </Grid>
        </Grid>
      </Box>
    );
  });
  return listItems;
}
