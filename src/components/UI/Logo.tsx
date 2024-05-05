import { Link } from "react-router-dom";
import { PATH_HOME } from "../../lib/paths";

export const Logo = () => {
    return (
        <p className="text-center text-2xl font-semibold">
            <Link to={PATH_HOME}>meetU</Link>
        </p>
    );
};
