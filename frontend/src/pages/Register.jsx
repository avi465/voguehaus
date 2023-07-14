import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useRegister } from '../hooks/auth'

import Loader from '../components/common/Loader'

const Register = props => {

    const { register, isLoading } = useRegister();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        terms: ''
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        // Check if the input is a checkbox
        if (type === 'checkbox') {
            setUserData((prevUserData) => ({
                ...prevUserData,
                [name]: checked, // Update the checkbox value based on its checked state
            }));
        } else {
            setUserData((prevUserData) => ({
                ...prevUserData,
                [name]: value, // For other input types, update the value as usual
            }));
        }
    };

    const handleRegister = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (userData.password === userData.confirmPassword) {
            if (userData.terms) {
                register(userData, props.role);
            } else {
                console.log("Please accept terms");
            }
        } else {
            console.log("Password didn't matched with confirm password");
        }
    };

    return (
        <section class="polka-pattern bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div class="w-full bg-white shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.username}
                                    onChange={handleInputChange}
                                    id="email"
                                    placeholder="name@company.com"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-neutral-600 focus:border-neutral-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    id="password"
                                    placeholder="Enter your password"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-neutral-600 focus:border-neutral-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                />
                            </div>
                            <div>
                                <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={userData.confirmPassword}
                                    onChange={handleInputChange}
                                    id="confirm-password"
                                    placeholder="Confirm your password"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-neutral-600 focus:border-neutral-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                                />
                            </div>
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input
                                        type="checkbox"
                                        name="terms"
                                        checked={userData.terms}
                                        onChange={handleInputChange}
                                        id="terms"
                                        aria-describedby="terms"
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-neutral-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-neutral-600 dark:ring-offset-gray-800" required="true"
                                    />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-neutral-600 hover:underline dark:text-neutral-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                onClick={handleRegister}
                                disabled={isLoading}
                                class="w-full text-white bg-neutral-600 border-2 border-neutral-300 disabled:opacity-50 disabled:pointer-events-none hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800">{isLoading ? <Loader /> : 'Create an account'}
                            </button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account?
                                <Link to="/auth/login" class="font-medium text-neutral-600 hover:underline dark:text-neutral-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

Register.propTypes = {
    "role": PropTypes.string.isRequired,
}

export default Register