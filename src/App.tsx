import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        { index: true, element: <Home /> },
        {
          path: "auth",
          element: (
            <AuthLayout>
              <Outlet />
            </AuthLayout>
          ),
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "signup",
              element: <Signup />,
            },
          ],
        },
        {
          path: "chat",
          element: (
            <div>
              Chat Layout <Outlet />
            </div>
          ),
          children: [
            {
              path: "rooms",
              element: <div>Chat Rooms Page</div>,
            },
            {
              path: ":roomId",
              element: <div>Chat Room Page</div>,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
