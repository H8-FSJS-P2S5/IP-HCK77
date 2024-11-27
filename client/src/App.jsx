import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
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
        path: "my-cauldron",
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/login/google",
    element: <LoginPage />,
  },
  {
    path: "/genres",
    element: <LoginPage />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
