"use client"

import React, { useState } from "react"
import { useRouter } from 'next/navigation'

const initialValues = {
    email: "",
    password: "",
}

export default function Home() {
    const router = useRouter()
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    };

    const logIn = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)

        alert(data.msg)
        if (data.success == true) router.push('/dashboard')
    }

    return (
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl ">
            <div className="px-6 py-4">
                <div className="flex justify-center mx-auto">
                </div>
                <h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">
                    Welcome Back
                </h3>
                <p className="mt-1 text-center text-gray-500 ">
                    Log In
                </p>
                <form>
                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg    focus:border-blue-400  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            placeholder="Email Address"
                            aria-label="Email Address"
                        />
                    </div>
                    <div className="w-full mt-4">
                        <input
                            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            aria-label="Password"
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <button
                            className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                            onClick={logIn}>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex items-center justify-center py-4 text-center bg-gray-50 ">
                <span className="text-sm text-gray-600 ">
                    Don't have an account?{" "}
                </span>
                <a
                    href="#"
                    className="mx-2 text-sm font-bold text-blue-500  hover:underline"
                >
                    Register
                </a>
            </div>
        </div>
    )
}