import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface IUserDetails {
    username: string;
    firstName: string;
    lastName: string;
    Balance: number;
}

export default function NavbarDashboard() {
    const [firstName, setFirstName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchUserDetails = async () => {
            const jwtToken = localStorage.getItem("token");
            if (!jwtToken) {
                alert("Login Required or Token not found");
                navigate("/signin");
                return;
            }

            try {
                const response = await axios.get(`${apiUrl}/api/v1/account/balance`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                const data = response.data as any;
                const userDetails = data.UserDetails as IUserDetails;

                setFirstName(userDetails.firstName);
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

        fetchUserDetails();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };
    if (error) {
        return (
            <nav className="bg-white shadow-sm px-6 py-4 w-full flex items-center justify-between">
                <div>
                    <Link to="/dashboard" className="cursor-pointer flex items-center gap-2">
                        <h1 className="text-xl font-semibold">PayTM App</h1>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-red-600 text-sm">{error}</div>
                </div>
            </nav>
        );
    }



    return (
        <nav className="bg-white shadow-sm px-6 py-4 w-full flex items-center justify-between">
            <div>
                <Link to={"/dashboard"} className="cursor-pointer flex items-center gap-2">
                    <h1 className="text-xl font-semibold">PayTM App</h1>
                </Link>
            </div>
            <div className="flex items-center gap-4">

                <h1 className="text-muted-foreground">{firstName}</h1>
                <Avatar >
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{firstName ? firstName.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                <button
                    onClick={handleLogout}
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
