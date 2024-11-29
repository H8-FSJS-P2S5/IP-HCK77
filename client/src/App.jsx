import "./App.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import Layout from "./pages/Layout";
// import LoginPage from "./pages/LoginPage";
// import HomePage from "./pages/HomePage";
// import GenresPage from "./pages/GenresPage";
// import ProfilePage from "./pages/ProfilePage";
// import MyCauldronPage from "./pages/MyCauldronPage";
import HomePage from "./pages/New_HomePage";
import GenresPage from "./pages/New_GenresPage";
import MyCauldronPage from "./pages/New_MyCauldronPage";
import ProfilePage from "./pages/New_Profile_Page";
import LoginPage from "./pages/New_LoginPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "genres",
        element: <GenresPage />,
      },
    ],
  },
  {
    path: "/user",
    element: <Layout />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return redirect("/login/google");
      }
    },
    children: [
      {
        path: "my-cauldron",
        element: <MyCauldronPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login/google",
    element: <LoginPage />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        return redirect("/");
      }
    },
  },
  {
    path: "/logout",
    loader: () => {
      localStorage.clear();
      return redirect("/login/google");
    },
  },
]);
function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
