import './App.css';
import Logout from './modules/auth/components/Logout';
import LoginPage from './modules/auth/pages/LoginPage';
import RegisterPage from './modules/auth/pages/RegisterPage';
import MyMaterials from './modules/users/pages/MyMaterials';
import ProfilePage from './modules/users/pages/ProfilePage';

function App() {
    return (
        <>
            {/* <RegisterPage></RegisterPage> */}
            {/* <LoginPage></LoginPage> */}
            {/* <Logout></Logout> */}
            {/* <ProfilePage></ProfilePage> */}
            <MyMaterials></MyMaterials>
        </>
    );
}

export default App;
