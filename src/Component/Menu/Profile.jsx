import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
//compoents
import { auth } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { GET_USER_LOGIN } from "../../Schema/user";
import "./profile.scss";

export default function Profile() {
  const { data: dataUserLogin } = useQuery(GET_USER_LOGIN);

  // useEffect(() => {
  //   if (dataUserLogin) {
  //     console.log("test::", dataUserLogin);
  //   }
  // }, [dataUserLogin]);

  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <div className="top-profile">
      <IconButton>
        <Avatar
          alt="Travis Howard"
          src="https://1409791524.rsc.cdn77.org/data/images/full/570458/bts-v.jpg"
        />
      </IconButton>

      <Button onClick={handleClick} className="button-admin">
        <Typography className="admin-title">Administator</Typography>
        {open ? (
          <ExpandLess sx={{ color: "#092453" }} />
        ) : (
          <ExpandMore sx={{ color: "#092453" }} />
        )}
      </Button>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />{" "}
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />{" "}
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
