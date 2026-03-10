import { useEffect, useState } from 'react';
import { register } from '../api/authApi';

const useRegister = () => {
    // console.log('UseRegister k yaha pounch agaya ');

    const [loader, setLoader] = useState(true);

    const registerUser = (data) => {
        console.log(data)
        register(data)
    }

    // useEffect(()=>{
    //     // setLoader(false)
    // }, [])

    setTimeout(()=>{
        setLoader(false)
    }, 1000)

    return { loader, setLoader, registerUser };
};

export { useRegister };

// export { useRegister };
