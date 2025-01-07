import {createBrowserRouter} from "react-router-dom"
import {Links} from "../constants/links"

export const AppRouter = createBrowserRouter([
    {
        path: "*",
        element: <h1>error</h1>
    }
])