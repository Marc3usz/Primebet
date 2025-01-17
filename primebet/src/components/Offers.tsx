import { useParams, } from "react-router-dom";
import { fetchMap } from "../constants/fetch";
import { useEffect, useState } from "react";

export const Offers = () => {
    const { filter } = useParams();
    const [queryResults, setQueryResults] = useState({});
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    useEffect(() => {
        fetchMap[filter + ""]?.()?.then((res) => setQueryResults(res)).catch(() => setErrorMessage("Error: Bets couldn't load"));
    }, []);


    return <h1>{errorMessage ?? filter}</h1>;
};
