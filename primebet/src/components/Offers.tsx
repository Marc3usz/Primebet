import { useParams } from "react-router-dom"
import { fetchMap } from "../constants/fetch";

export const Offers = () => {
    const {filter} = useParams();
    fetchMap[filter + ""]?.().then(res => console.log(res));
    return <h1>filter: {filter}</h1>
}