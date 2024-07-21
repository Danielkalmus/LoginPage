import { useLocation, useNavigate } from "react-router-dom";
import "./Welcome.css"

function Welcome() {
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = (location.state) || {};
    const { name } = (location.state) || {};
    const handleEditOrDeleteAccount = () => {
        navigate("/EditOrDeleteAccount", { state: { email } });
    };

    return (
        <div>
            <div>
                <h1>Welcome {name} to my site!</h1>
                <p>You've successfully connected</p>
            </div>
            <div className="edit-or-delete-account">
                <button onClick={handleEditOrDeleteAccount}>Edit or delete Account</button>
            </div>
        </div>
    );
};

export default Welcome;