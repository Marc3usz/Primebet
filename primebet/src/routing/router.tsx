import {createBrowserRouter} from "react-router-dom"
import {Links} from "../constants/links"

export const AppRouter = createBrowserRouter([
    {
        path: Links.HOMEPAGE,
        element: <Homepage />,
        children: [
            {
                path: Links.BETS,
                element: <MyBets />
            },
            {
                path: Links.OFFERS,
                element: <Offers />
            }
        ]
    },
    {
        path: Links.LOGIN,
        element: <Login />,
    }
])