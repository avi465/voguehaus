import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/auth'
import Loader from '../components/common/Loader'

const Login = props => {
    const { login, isLoading, error } = useLogin();
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        rememberMe: ''
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        // Check if the input is a checkbox
        if (type === 'checkbox') {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: checked, // Update the checkbox value based on its checked state
            }));
        } else {
            setCredentials((prevCredentials) => ({
                ...prevCredentials,
                [name]: value, // For other input types, update the value as usual
            }));
        }
    };

    const handleLogin = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        login(credentials, props.role);
    };

    return (
        <section className="polka-pattern bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={credentials.username}
                                    onChange={handleInputChange}
                                    id="email"
                                    placeholder="Enter your email"
                                    required=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-neutral-600 focus:border-neutral-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <p class="hidden mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Some error message.</p>
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    id="password"
                                    placeholder="Enter your password"
                                    required=""
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-neutral-600 focus:border-neutral-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <p class="hidden mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snapp!</span> Some error message.</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={credentials.rememberMe}
                                            onChange={handleInputChange}
                                            id="remember"
                                            aria-describedby="remember"
                                            required=""
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-neutral-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-neutral-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-neutral-600 hover:underline dark:text-neutral-500">Forgot password?</a>
                            </div>
                            <button
                                type="submit"
                                onClick={handleLogin}
                                disabled={isLoading}
                                className="w-full text-white bg-neutral-600 border-2 border-neutral-300 disabled:opacity-50 disabled:pointer-events-none hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">{isLoading ? <Loader /> : 'Sign in'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">Don't have an account yet?
                                <Link to="/auth/register" className="font-medium text-neutral-600 hover:underline dark:text-neutral-500">Register</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

Login.propTypes = {
    "role": PropTypes.string.isRequired
}

export default Login