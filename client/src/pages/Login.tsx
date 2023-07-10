import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { LoginFormValues } from '../types';
import { useForm, SubmitHandler} from "react-hook-form";




export default function Login() {
    const [loader , setLoader] = useState(false)


    const { register, formState: { errors }, handleSubmit } = useForm<LoginFormValues>({
        criteriaMode: "all"
    });

    const onSubmit: SubmitHandler<LoginFormValues> = async data => {
        setLoader(true)
        console.log(data)
    }


    return (
        <section className="bg-gray-50 dark:bg-gray-900  w-full h-screen ">
            <div className="flex flex-col items-center justify-center h-full px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to='' className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Chat App
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input {...register("email", { required: true })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                {errors.email && <span className='text-red-500 text-xs mt-2'>This field is required</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input {...register("password", { required: true })} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="*********" />
                                {errors.password && <span className='text-red-500 text-xs mt-2'>This field is required</span>}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link to='' className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500">Forgot password?</Link>
                            </div>
                            {
                                loader ? <button className=" w-full btn btn-primary text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center "> <span className="loading loading-spinner"></span> Verifying Credientials ! </button> : <button type="submit" className="w-full btn btn-primary text-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign In</button>
                            }
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/register-account" className="font-medium text-indigo-600 hover:underline dark:text-indigo-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}
