import NavigationPage from '../navigation/NavigationPage';
import './HomePage.css';

const HomePage = () => {

    return (
        <div className="container-fluid">
            <NavigationPage></NavigationPage>
            <div className="dashboard-head d-flex row">
                <p className="col-1 mt-1">Dashboard</p>
            </div>
            <div className="dashboard-container">
                <p>Welcome Admin Panel</p>
            </div>
        </div>
    );
}

export default HomePage;