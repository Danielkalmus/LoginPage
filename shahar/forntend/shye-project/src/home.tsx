import { useLocation } from 'react-router-dom';

const Home: React.FC = () => {
    const location = useLocation();
    const { email } = (location.state as any) || {};

    return (
        <div>
            <h1>Welcome</h1>
            {email && <p>Your email: {email}</p>}
            {/* Other content for Home page */}
        </div>
    );
};

export default Home;