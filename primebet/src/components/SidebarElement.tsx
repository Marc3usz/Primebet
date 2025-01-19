import { useNavigate } from "react-router-dom";

export const SidebarElement = ({
    label,
    targetPath,
}: {
    label: string;
    targetPath: string;
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(targetPath); // Redirect do podanej sciezki
    };

    return (
        <button
            onClick={handleClick}
            className="w-full sm:w-auto mt-4 bg-slate-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
        >
            {label}
        </button>
    );
};
