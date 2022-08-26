import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FlipMove from "react-flip-move";
import { TextField, Modal, Button, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import { Input, Stack, CardHeader, CardContent, Box } from "@mui/material";
import ListImage from "../Dynamic/ListImage";
//components
import "./listtool.scss";

export default function ListTool(props) {
  const items = props.items;
  //upload image
  const [keys, setKeys] = useState("");
  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = (e) => {
    setOpenUpload(true);
    setKeys(e);
  };
  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  const listItems = items?.map((item) => {
    console.log("item::", item);
    if (item?.Fieldtype === "input") {
      return (
        <Box sx={{ marginTop: "20px" }}>
          <Card className="list-tool" key={item?.key}>
            <CardHeader title={`${item?.check}`} />
            <CardContent>
              <Stack direction="row">
                <Input
                  multiline
                  sx={{ width: "90%", fontFamily: "Khmer Os Siemreap" }}
                  type="text"
                  id={item?.key}
                  value={item?.text}
                  onChange={(e) => {
                    props.setUpdate(e.target.value, item?.key);
                  }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <IconButton onClick={() => props.deleteItem(item?.key) }>
                  <DeleteOutlineIcon   className="delete-icon" />
                </IconButton>                
              </Stack>
            </CardContent>
          </Card>
        </Box>
      );
    }
    if (item?.check === "ImageOneLayout") {
      return (
        <Box sx={{ marginTop: "20px" }}>
          <Card className="list-tool" key={item?.key}>
            <CardHeader title="Image one layout" />
            <CardContent>
              <Stack direction="row">
                <img
                  onClick={() => handleOpenUpload(item?.key)}
                  src={
                    item?.img
                      ? item?.img
                      : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                  }
                  alt="preview"
                  className="image-one"
                />

                <Modal
                  open={openUpload}
                  onClose={handleCloseUpload}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <ListImage
                    open={openUpload}
                    setImageFile={props.setUpdateImage}
                    keys={keys}
                    handleClose={handleCloseUpload}
                    imageType="BlogPost"
                  />
                </Modal>

                <Box sx={{ flexGrow: 1 }} />

                <Box className="box-delete">
                  <IconButton onClick={() => props.deleteItem(item?.key) }>
                    <DeleteOutlineIcon   className="delete-icon" />
                  </IconButton>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      );
    }
    if (item?.check === "ImageTwoLayout") {
      return (
        <Box sx={{ marginTop: "20px" }}>
          <Card className="list-tool" key={item?.key}>
            <CardHeader className="tool-title" title="Image two layout" />
            <CardContent>
              <Stack direction="row">
                <img
                  onClick={() => handleOpenUpload(item?.key)}
                  src={
                    item?.img
                      ? item?.img
                      : "https://rus-traktor.ru/upload/iblock/6e3/6e3f5afeaf9b58a1cfd954f0aeb24d0a.jpg"
                  }
                  alt="preview"
                  className="image-one"
                />

                <Modal
                  open={openUpload}
                  onClose={handleCloseUpload}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <ListImage
                    open={openUpload}
                    setImageFile={props.setUpdateImage}
                    keys={keys}
                    handleClose={handleCloseUpload}
                    imageType="BlogPost"
                  />
                </Modal>

                <Box sx={{ flexGrow: 1 }} />

                <Box className="box-delete">
                  <IconButton onClick={() => props.deleteItem(item?.key) }>
                    <DeleteOutlineIcon   className="delete-icon" />
                  </IconButton>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      );
    }
  });
  return (
    <>
      <FlipMove duration={300} easing="ease-in-out">
        {listItems}
      </FlipMove>
    </>
  );
}
