import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import GenresPage from "./pages/GenresPage";
import UserLayout from "./pages/UserLayout";
import ProfilePage from "./pages/ProfilePage";
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
    children: [
      {
        path: "my-cauldron",
        element: <h1>My Cauldron</h1>,
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
