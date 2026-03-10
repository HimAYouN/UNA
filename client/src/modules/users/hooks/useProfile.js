import { useEffect, useState } from 'react';
import { profile } from '../api/userApi';

export const useProfile = () => {
    const [loader, setLoader] = useState(true);
    const [response, setResponse] = useState({ AYO: 'ayo' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoader(true);
        const res = await profile();
        setResponse(res);
        setLoader(false);
    };

    return { loader, setLoader, response };
};
