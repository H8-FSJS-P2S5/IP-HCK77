import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button } from "flowbite-react";
import LoginPage from "./pages/LoginPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1 className="font-bold underline text-center">Hello world!</h1>
        <div className="flex justify-center mt-2">
          <Button>Click me</Button>
        </div>
      </div>
    ),
  },
  {
    path: "/login/google",
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
