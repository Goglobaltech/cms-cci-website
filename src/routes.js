import { useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
// layouts
import Layout from "./Layout/Layout";
//Page
import Login from "./Pages/Login";
import CleaningMaterails from "./Pages/CleaningMaterails";
import Cosmetics from "./Pages/Cosmetics";
import Portfolio from "./Pages/Portfolio";
import Users from "./Pages/Users";
import Category from "./Pages/Category";
import BlogPost from "./Pages/BlogPost";
import Media from "./Pages/Media";
import ForgotPassword from "./Pages/ForgotPassword";
//components
import CreateCleaningMaterails from "./Component/CleaningMaterails/CreateCleaningMaterails";
import UpdateCleaningMaterails from "./Component/CleaningMaterails/UpdateCleaningMaterails";
import CreateCosmetics from "./Component/Cosmetics/CreateCosmetics";
import UpdateCosmetics from "./Component/Cosmetics/UpdateCosmetics";
import CreateBlogPost from "./Component/BlogPost/CreateBlogPost";
import UpdateBlogPost from "./Component/BlogPost/UpdateBlogPost";
import CreatePortfolio from "./Component/Portfolio/CreatePortfolio";
import UpdatePortfolio from "./Component/Portfolio/UpdatePortfolio";

export default function Router() {
  //Apollo
  const { state } = useContext(AuthContext);
  const { user } = state;
  console.log("user::", user);

  const LoginPage = useRoutes([
    { path: "", element: <Login /> },
    { path: "login", element: <Login /> },
    { path: "forgotpassword", element: <ForgotPassword /> },
    // { path: "*" , element: <Page404 /> },
  ]);

  const Content = useRoutes([
    {
      path: "/",
      element: <Layout to="/cleaningmaterails" />,
      children: [        
        { path: "/", element: <Navigate to="/category" /> },
        { path: "category", element: <Category /> },
        { path: "cleaningmaterails", element: <CleaningMaterails /> },
        {
          path: "cleaningmaterails/createcleaningmaterails",
          element: <CreateCleaningMaterails />,
        },
        {
          path: "cleaningmaterails/updatecleaningmaterails",
          element: <UpdateCleaningMaterails />,
        },
        { path: "cosmetics", element: <Cosmetics /> },
        { path: "cosmetics/createcosmetics", element: <CreateCosmetics /> },
        { path: "cosmetics/updatecosmetics", element: <UpdateCosmetics /> },
        { path: "blogpost", element: <BlogPost /> },
        { path: "blogpost/createblogpost", element: <CreateBlogPost /> },
        { path: "blogpost/updateblogpost", element: <UpdateBlogPost /> },
        { path: "portfolio", element: <Portfolio /> },
        { path: "portfolio/createportfolio", element: <CreatePortfolio /> },
        { path: "portfolio/updateportfolio", element: <UpdatePortfolio /> },
        { path: "media", element: <Media /> },
        { path: "users", element: <Users /> },
      ],
    },
    { path: "login", element: <Login /> },
  ]);

  // if (user) {
    return Content;
  // } else {
  //   return LoginPage;
  // }
}
