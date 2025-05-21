import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


interface IUserDetails {
    username: string;
    firstName: string;
    lastName: string;
    Balance: number;
}

interface Idata {
    message: string;
    UserDetails: IUserDetails;
}

const Balance = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchUserDetails = async () => {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) {
            alert("Login Required or Token not found");
            navigate('/signin');
            return;
        }

        try {
            const response = await axios.get(`${apiUrl}/api/v1/account/balance`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            const data = response.data as Idata;
            setBalance(data.UserDetails.Balance);
        } catch (e: any) {
            if (e.response?.data?.message) {
                setError(e.response.data.message);
            } else if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("Unexpected Error has occurred");
            }
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [navigate]);

    return (
        <div>
            {balance !== null && (
                <div className="text-lg text-green-600 font-bold">
                    Balance: ₹{balance.toFixed(4)}
                </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Balance;
