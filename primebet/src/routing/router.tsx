import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Links } from "../constants/links";
import { Homepage } from "../pages/Homepage";
import { LoginPage } from "../pages/LoginPage";
const Placeholder = () => <h1>PlaceHolder</h1>;
const MyBets = Placeholder;
const Offers = Placeholder;

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
    element: <LoginPage />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />
