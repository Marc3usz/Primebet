import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Links } from "../constants/links";
import { Homepage } from "../pages/Homepage";
const Placeholder = () => <h1>PlaceHolder</h1>;
const MyBets = Placeholder;
const Offers = Placeholder;
const Login = Placeholder;

const router = createBrowserRouter([
  {
    path: Links.HOMEPAGE,
    element: <Homepage />,
    children: [
      {
        path: Links.BETS,
        element: <MyBets />,
      },
      {
        path: Links.OFFERS,
        element: <Offers />,
      },
    ],
  },
  {
    path: Links.LOGIN,
    element: <Login />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />
