import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import NavbarDashboard from "../components/NavbarDashBoard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SendMoney = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const query = useQuery();
    const navigate = useNavigate();
    const name = query.get("name");
    const id = query.get("id");
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSubmitMoney = async () => {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${apiUrl}/api/v1/account/transferMoney`, {
                amount,
                to: id
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            alert("Transfer successful!");
            navigate('/dashboard');
        } catch (e: any) {
            const errorMessage = e.response?.data?.message || "Transfer failed";
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <NavbarDashboard />
            <div className="flex justify-center items-center min-h-screen bg-slate-200 px-4">
                <Card className="w-full max-w-md shadow-md rounded-2xl bg-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Send Money</CardTitle>
                        <CardDescription>To: {name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <Input
                                type="number"
                                placeholder="Enter money to send...."
                                onChange={e => setAmount(parseInt(e.target.value))}
                                min="1"
                                disabled={loading}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            variant="outline"
                            className="bg-green-400 hover:bg-green-500 w-full"
                            onClick={handleSubmitMoney}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : "Send Money"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default SendMoney
