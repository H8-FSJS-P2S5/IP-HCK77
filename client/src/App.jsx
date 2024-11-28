import "./App.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import GenresPage from "./pages/GenresPage";
import UserLayout from "./pages/UserLayout";
import ProfilePage from "./pages/ProfilePage";
import MyCauldronPage from "./pages/MyCauldronPage";
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
    element: <UserLayout />,
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
