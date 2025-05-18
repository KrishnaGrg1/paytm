import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/ui/NavBar'
import { useState } from 'react'
import axios from 'axios'
const Signin = () => {

    interface SignInResponse {
        message: string,
        data: string,
        token: string,
        sucess: boolean
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string>('')
    const navigate=useNavigate()
    const handleSignIn = async () => {
        if (!email || !password) {
            setError("Fill up all the fields")
            return
        }
        try {
            const response = await axios.post(`http://localhost:8001/api/v1/user/signin`, {
                username:email,
                password
            })
            const data = response.data as SignInResponse;
            const jwtToken=data.token
            if(response.status==200 || data.sucess){
                localStorage.setItem("token",jwtToken)
                alert("Sign In Successfully")
                navigate('/dashboard')

            }

        } catch (e: any) {
            if (e.response?.data?.message) {
                setError(e.response.data.message)
            } else if (e instanceof Error) {
                setError(e.message)
            } else {
                setError("Unexpected error has occured")
            }
        }
    }

    return (
        <>
            <Navbar />

            <div className="flex justify-center items-center min-h-screen bg-slate-200 px-4">
                <Card className="w-full max-w-md shadow-md rounded-2xl bg-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
                        <CardDescription className="text-sm text-gray-500">Create your account below</CardDescription>
                        {error && (
                            <div className="text-red-600 text-sm mt-2">{error}</div>
                        )}
                    </CardHeader>

                    <CardContent className="space-y-4">


                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Enter your email" onChange={e => {
                                setEmail(e.target.value)
                            }} type="email" />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="Enter your password" type="password" onChange={e => {
                                setPassword(e.target.value)
                            }} />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button variant="outline" onClick={handleSignIn}>Log In</Button>
                        <p className="text-sm text-muted-foreground font-semibold">
                            Already have an account?{' '}
                            <Link to="/signup" className="text-blue-600 hover:underline ">Sign In</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Signin
