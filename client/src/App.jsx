import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button } from "flowbite-react";
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
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
