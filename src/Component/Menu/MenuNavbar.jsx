import * as React from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import "./menunavbar.scss";
// Icons
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Users from "../../Assets/chat-1.svg";
import ProductsMenu from "../../Assets/price-tag.svg";
import Cosmetics from "../../Assets/shopping-bag.svg";
import Portfolio from "../../Assets/profile-user.svg";
import Products from "../../Assets/product.svg";
import category from "../../Assets/category.svg";
import blog from "../../Assets/blog.svg";
import addImage from "../../Assets/addImage.svg";
import logo from "../../Assets/CCI_LOGO.svg";
//components

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  height: "100%",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function MenuNavbar({ open, handleDrawerClose }) {
  let location = useLocation();
  const theme = useTheme();

  const [openMenu, setOpenMenu] = React.useState(true);

  const handleClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <Drawer variant="permanent" open={open} className="drawer-menu">
        <DrawerHeader className="drawer-image">
          <Button className="drawerheader" onClick={handleDrawerClose}>
            <img src={logo} alt="logo" width="100%" />
          </Button>
        </DrawerHeader>

        <List className="list-menu">
          <ListItem className="list-item" disablePadding>
            <ListItemButton className="list-item-button" onClick={handleClick}>
              <ListItemIcon className="list-item-icon">
                <img src={ProductsMenu} style={{ width: "26px" }} />
              </ListItemIcon>
              <Typography className="list-item-text">Product</Typography>
              <Box sx={{ flexGrow: 1 }}></Box>
              {openMenu ? (
                <ExpandLess sx={{ color: "#fff" }} />
              ) : (
                <ExpandMore sx={{ color: "#fff" }} />
              )}
            </ListItemButton>

            <Collapse in={openMenu} timeout="auto" unmountOnExit>
              <ListItem
                className={
                  location.pathname === "/category"
                    ? "list-item-active"
                    : "list-item"
                }
                disablePadding
              >
                <Link to="/category" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    className="list-item-button"
                    sx={{ pl: "30px" }}
                  >
                    <ListItemIcon className="list-item-icon">
                      <img src={category} style={{ width: "22px" }} />
                    </ListItemIcon>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontFamily: "Preahvihear",
                        fontSize: "20px",
                      }}
                    >
                      Category
                    </Typography>
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem
                className={
                  location.pathname === "/cleaningmaterails" ||
                  location.pathname ===
                    "/cleaningmaterails/createcleaningmaterails" ||
                  location.pathname ===
                    "/cleaningmaterails/updatecleaningmaterails"
                    ? "list-item-active"
                    : "list-item"
                }
                disablePadding
              >
                <Link
                  to="/cleaningmaterails"
                  style={{ textDecoration: "none" }}
                >
                  <ListItemButton
                    className="list-item-button"
                    sx={{ pl: "30px" }}
                  >
                    <ListItemIcon className="list-item-icon">
                      <img src={Products} style={{ width: "26px" }} />
                    </ListItemIcon>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontFamily: "Preahvihear",
                        fontSize: "20px",
                      }}
                    >
                      Cleaning materails
                    </Typography>
                  </ListItemButton>
                </Link>
              </ListItem>

              <ListItem
                className={
                  location.pathname === "/cosmetics" ||
                  location.pathname === "/cosmetics/createcosmetics" ||
                  location.pathname === "/cosmetics/updatecosmetics"
                    ? "list-item-active"
                    : "list-item"
                }
                disablePadding
              >
                <Link to="/cosmetics" style={{ textDecoration: "none" }}>
                  <ListItemButton
                    className="list-item-button"
                    sx={{ pl: "30px" }}
                  >
                    <ListItemIcon className="list-item-icon">
                      <img src={Cosmetics} style={{ width: "26px" }} />
                    </ListItemIcon>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontFamily: "Preahvihear",
                        fontSize: "20px",
                      }}
                    >
                      Cosmetics
                    </Typography>
                  </ListItemButton>
                </Link>
              </ListItem>
            </Collapse>
          </ListItem>

          <ListItem
            className={
              location.pathname === "/media" ? "list-item-active" : "list-item"
            }
            disablePadding
            onClick={() => setOpenMenu(false)}
          >
            <Link to="/media" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button">
                <ListItemIcon className="list-item-icon">
                  <img src={addImage} style={{ width: "32px" }} />
                </ListItemIcon>
                <Typography className="list-item-text">Media</Typography>
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem
            className={
              location.pathname === "/blogpost" ||
              location.pathname === "/blogpost/createblogpost" ||
              location.pathname === "/blogpost/updateblogpost"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            onClick={() => setOpenMenu(false)}
          >
            <Link to="/blogpost" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button">
                <ListItemIcon className="list-item-icon">
                  <img src={blog} style={{ width: "22px" }} />
                </ListItemIcon>
                <Typography className="list-item-text">Blog post</Typography>
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem
            className={
              location.pathname === "/portfolio" ||
              location.pathname === "/portfolio/createportfolio" ||
              location.pathname === "/portfolio/updateportfolio"
                ? "list-item-active"
                : "list-item"
            }
            disablePadding
            onClick={() => setOpenMenu(false)}
          >
            <Link to="/portfolio" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button">
                <ListItemIcon className="list-item-icon">
                  <img src={Portfolio} style={{ width: "26px" }} />
                </ListItemIcon>
                <Typography className="list-item-text">Portfolio</Typography>
              </ListItemButton>
            </Link>
          </ListItem>

          <ListItem
            className={
              location.pathname === "/users" ? "list-item-active" : "list-item"
            }
            disablePadding
            onClick={() => setOpenMenu(false)}
          >
            <Link to="/users" style={{ textDecoration: "none" }}>
              <ListItemButton className="list-item-button">
                <ListItemIcon className="list-item-icon">
                  <img src={Users} style={{ width: "26px" }} />
                </ListItemIcon>
                <Typography className="list-item-text">User</Typography>
              </ListItemButton>
            </Link>
          </ListItem>
        </List>

        <Box sx={{ flexGrow: 1 }}></Box>

        <List className="list-menu">
          <Typography
            sx={{ color: "#fff", textAlign: "center", fontSize: "14px" }}
          >
            &copy; Copy right by CCI @ 2022
          </Typography>
        </List>
      </Drawer>
    </>
  );
}
