import { useParams } from "react-router-dom";
import { fetchMap } from "../constants/fetch";
import { useEffect } from "react";

export const Offers = () => {
    const { filter } = useParams();
    useEffect(() => {
        fetchMap[filter + ""]?.()?.then((res) => console.log(res));
    }, []);
    return <h1>filter: {filter}</h1>;
};
