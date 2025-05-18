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
import { Link } from 'react-router-dom'
import Navbar from '../components/ui/NavBar'

const Signin = () => {
    return (
        <>
            <Navbar />

            <div className="flex justify-center items-center min-h-screen bg-slate-200 px-4">
                <Card className="w-full max-w-md shadow-md rounded-2xl bg-white">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
                        <CardDescription className="text-sm text-gray-500">Create your account below</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">


                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Enter your email" type="email" />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" placeholder="Enter your password" type="password" />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button variant="outline">Log In</Button>
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link to="/signup" className="text-blue-600 hover:underline">Sign In</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default Signin
