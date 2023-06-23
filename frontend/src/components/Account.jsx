import React from 'react'
import { Link } from 'react-router-dom'

const Account = () => {
    return (
        <>
            <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" class="flex mx-3 text-sm bg-gray-100 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                <span class="sr-only">Open user menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-neutral-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>

            <div id="dropdownAvatar" class="z-10 hidden bg-white border border-gray-300 dark:border-gray-600 rounded-lg shadow w-fit dark:bg-gray-700">
                <ul class="py-1 space-y-2 divide-y divide-gray-300 text-sm text-gray-700 dark:text-gray-200 dark:divide-gray-600" aria-labelledby="dropdownUserAvatarButton">
                    <li>
                        <Link to="/auth/login" href="#" class="block px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Login</Link>
                    </li>
                    <li>
                        <Link to="/auth/register" href="#" class="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Register</Link>
                    </li>
                </ul>
            </div >

        </>


    )
}

export default Account