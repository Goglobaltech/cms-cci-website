import React, { useState, useEffect } from "react";
import { Button, Grid, Box } from "@mui/material";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import ImageIcon from "@mui/icons-material/Image";
import TitleIcon from "@mui/icons-material/Title";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import LinkIcon from "@mui/icons-material/Link";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
//components
import "./createtool.scss";
import ListTool from "./ListTool";

library.add(faTrash);

const MiniBox = styled(Button)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "fff" : theme.palette.grey[100],
  ...theme.typography.body1,
  padding: theme.spacing(1),
  width: "100%",
  textAlign: "center",
  flexDirection: "column",
  color: theme.palette.grey[700],
}));

const sizeIcon = {
  fontSize: 40,
};

export default function CreateToolKh({ setItemsBlog, allKhData, checkPage }) {
  const [currentItem, setCurrentItem] = useState({
    text: "",
    check: "",
    key: "",
    img: null,
  });
  const [item, setItem] = useState([]);

  const addItem = () => {
    const newItem = currentItem;
    if (newItem.text !== "") {
      const items = [...item, newItem];
      setItem([...items]);
      setCurrentItem({
        text: "",
        check: "",
        key: "",
        img: null,
      });
      setItemsBlog([...items]);
    }
  };

  const handleAddTitle = () => {
    setCurrentItem({
      text: "SubTitle",
      check: "SubTitle",
      Fieldtype: "input",
      key: Date.now(),
    });
  };

  const handleAddLinkResource = () => {
    setCurrentItem({
      text: "LinkResource",
      check: "LinkResource",
      Fieldtype: "input",
      key: Date.now(),
    });
  };

  const handleAddTextCenter = () => {
    setCurrentItem({
      text: "TextCenter",
      check: "TextCenter",
      Fieldtype: "input",
      key: Date.now(),
    });
  };

  const handleAddSubTitle = () => {
    setCurrentItem({
      text: "Bold",
      check: "FontBold",
      Fieldtype: "input",
      key: Date.now(),
    });
  };

  const handleAddContent = () => {
    setCurrentItem({
      text: "Description",
      check: "Description",
      Fieldtype: "input",
      key: Date.now(),
    });
  };

  const handleAddList = () => {
    setCurrentItem({
      text: "List",
      check: "List",
      Fieldtype: "input",
      key: Date.now(),
    });
  };

  const handleAddImageOneLayout = () => {
    setCurrentItem({
      text: "AddImage",
      check: "ImageOneLayout",
      Fieldtype: "inputImage",
      key: Date.now(),
    });
  };

  const handleAddImageTwoLayout = () => {
    setCurrentItem({
      text: "AddImage",
      check: "ImageTwoLayout",
      Fieldtype: "inputImage",
      key: Date.now(),
    });
  };

  const deleteItem = (key) => {
    const filteredItems = item?.filter((t) => t.key !== key);
    setItem(filteredItems);
  };

  useEffect(() => {
    setItemsBlog([...item]);
  }, [item]);

  const setUpdate = (text, key) => {
    const items = item;
    items?.map((i) => {
      if (i.key === key) {
        i.text = text;
      }
    });
    setItem([...items]);
    setItemsBlog([...items]);
  };

  const setUpdateImage = (imgs, key) => {
    const items = item;
    items?.map((i) => {
      if (i.key === key) {
        i.img = imgs;
      }
    });
    setItem([...items]);
    setItemsBlog([...items]);
  };

  React.useEffect(() => {
    if (currentItem?.text !== "") {
      addItem();
    }
  }, [currentItem]);

  return (
    <div className="create-tool">
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MiniBox onClick={handleAddTitle}>
                <TitleIcon sx={sizeIcon} />
                Subtitle
              </MiniBox>
            </Grid>
            <Grid item xs={6}>
              <MiniBox onClick={handleAddSubTitle}>
                <FormatBoldIcon sx={sizeIcon} />
                Font Bold
              </MiniBox>
            </Grid>
            <Grid item xs={6}>
              <MiniBox onClick={handleAddContent}>
                <FormatAlignLeftIcon sx={sizeIcon} />
                Description
              </MiniBox>
            </Grid>
            <Grid item xs={6}>
              <MiniBox onClick={handleAddList}>
                <FormatListNumberedIcon sx={sizeIcon} />
                List
              </MiniBox>
            </Grid>

            <Grid item xs={6}>
              <MiniBox onClick={handleAddLinkResource}>
                <LinkIcon sx={sizeIcon} />
                Link Resource
              </MiniBox>
            </Grid>

            <Grid item xs={6}>
              <MiniBox onClick={handleAddTextCenter}>
                <FormatAlignCenterIcon sx={sizeIcon} />
                Text Center
              </MiniBox>
            </Grid>

            <Grid item xs={6}>
              <MiniBox onClick={handleAddImageOneLayout}>
                <ImageIcon sx={sizeIcon} />
                Choose Image
              </MiniBox>
            </Grid>

            <Grid item xs={6}>
              <MiniBox onClick={handleAddImageTwoLayout}>
                <ImageIcon sx={sizeIcon} />
                Choose Two Image
              </MiniBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ListTool
            items={item}
            deleteItem={deleteItem}
            setUpdate={setUpdate}
            setUpdateImage={setUpdateImage}
          />
        </Grid>
      </Grid>
    </div>
  );
}
