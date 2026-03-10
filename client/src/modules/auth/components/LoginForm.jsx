import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const LoginForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const {loader, setLoader, loginUser } = useLogin()

    const handleLogin = () => {
        loginUser(data)
        // console.log(data)
    };
    
    if(loader) return <h1>Loading...</h1>
    return (
        <div>
            <label htmlFor="email">Email: </label>
            <input
                type="text"
                id="email"
                placeholder="Enter your email: "
                value={data.email}
                onChange={(e) =>
                    setData((prev) => {
                        return { ...prev, email: e.target.value };
                    })
                }
            />
            <label htmlFor="password">Password: </label>
            <input
                type="text"
                id="password"
                placeholder="Enter Password: "
                value={data.password}
                onChange={(e) =>
                    setData((prev) => {
                        return { ...prev, password: e.target.value };
                    })
                }
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginForm;
