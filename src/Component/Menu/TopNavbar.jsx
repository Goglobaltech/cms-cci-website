import * as React from "react";
import { Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "./Profile";

export default function TopNavbar({ handleDrawerOpen, open }) {
  const theme = useTheme();

  return (
    <>
      <Toolbar sx={{ bgcolor: "#fff" }}>
        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon sx={{ color: "#092453", fontSize: "30px" }} />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={1} justifyContent="right">
            <Profile />
          </Stack>
        </Stack>
      </Toolbar>
    </>
  );
}
