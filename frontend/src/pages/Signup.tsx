import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '../components/ui/card'
import axios from 'axios'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/ui/NavBar'

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all the fields.")
      return
    }

    try {
      const response = await axios.post(`http://localhost:8001/api/v1/user/signup`, {
        firstName,
        lastName,
        username: email,
        password
      })
      const data = response.data as { success?: boolean;[key: string]: any };

      if (response.status === 201 || data.success) {
        alert("Signup successful!");
        navigate('/signin');
      } else {
        setError("Signup failed. Please try again.");
      }

    } catch (e: any) {
      if (e.response?.data?.message) {
        setError(e.response.data.message)
      } else if (e instanceof Error) {
        setError(e.message)
      } else {
        setError("Unexpected error occurred.")
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
            <CardDescription className="text-sm text-gray-500">
              Create your account below
            </CardDescription>
            {error && (
              <div className="text-red-600 text-sm mt-2">{error}</div>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            <div className='flex flex-col gap-2'>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" type="text" placeholder="Enter your first name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)} />
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" type="text" placeholder="Enter your last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)} />
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button variant="outline" onClick={handleSignup}>
              Create Account
            </Button>
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
