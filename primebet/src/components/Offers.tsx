import { useParams } from "react-router-dom"

export const Offers = () => {
    const {filter} = useParams();
    return <h1>filter: {filter}</h1>
}