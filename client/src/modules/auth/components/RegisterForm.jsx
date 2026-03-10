import { useEffect, useState } from 'react';
import { useRegister } from '../hooks/useRegister';

const RegisterForm = () => {
    const { loader, setLoader, registerUser } = useRegister();


    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = () => {
        setLoader(true);
        registerUser(data)
        setLoader(false)
    };

    if (loader) return <h1>Loading...</h1>;
    return (
        <div>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                id="username"
                placeholder="Enter your username: "
                value={data.email}
                // onChange={(e) => setData((prev) =>  {{ ...prev, title: e.target.value }}
                // })}
                onChange= {( (e) => setData((prev)=> { return {...prev, email: e.target.value}}))}
            />
            <label htmlFor="password">Password: </label>

            <input
                type="text"
                id="password"
                placeholder="Enter your password: "
                value={data.password}
                onChange= {( (e) => setData((prev)=> { return {...prev, password: e.target.value}}))}
            />
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
};

export default RegisterForm;
