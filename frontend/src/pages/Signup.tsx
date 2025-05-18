import React from 'react'
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

const Signup = () => {
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
            <div className='flex flex-col justify-center gap-2'>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="Enter your first name" type="text" />
            </div>

            <div className='flex flex-col justify-center gap-2'>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Enter your last name" type="text" />
            </div>

            <div className='flex flex-col justify-center gap-2'>
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>

            <div className='flex flex-col justify-center gap-2'>
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Enter your password" type="password" />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button variant="outline" className='hover:bg-slate-100 cursor-pointer'>Create Account</Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/signin" className="text-blue-600 hover:underline">Sign In</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default Signup
