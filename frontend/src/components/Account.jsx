import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/auth'
import Loader from '../components/common/Loader'

const Account = () => {
    const { logout, isLoading, error } = useLogout();
    const handleLogout = () => {
        logout("user")
    }

    return (
        <>
            <div className="relative group">
                <div class="flex px-3 rounded-full focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-600">
                    <span class="sr-only">Open user menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-neutral-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>

                <div class="group-hover:block absolute w-64 right-0 z-50 hidden text-base font-semibold list-none bg-white divide-y divide-gray-200 rounded-sm shadow dark:bg-neutral-700 dark:divide-neutral-600">
                    <div class="px-4 py-4">
                        <span class="hidden text-sm text-neutral-900 dark:text-white">Hello</span>
                        <Link to="/auth/login" class="text-red-500 py-2 px-4 border border-gray-200 hover:border-red-500">
                            LOGIN/SIGNUP
                        </Link>
                    </div>
                    <ul class="">
                        <li>
                            <Link to="wishlist" class="block px-4 py-1 text-sm text-neutral-500 hover:text-neutral-600">Wishlist</Link>
                        </li>
                        <li>
                            <Link to="/orders" class="block px-4 py-1 text-sm text-neutral-500 hover:text-neutral-600">Orders</Link>
                        </li>
                        <li>
                            <Link to="/seller" class="block px-4 py-1 text-sm text-neutral-500 hover:text-neutral-600">Seller</Link>
                        </li>
                        {/* logout */}
                        <li className='flex'>
                            <button
                                onClick={handleLogout}
                                disabled={isLoading}
                                class="flex-grow text-left block px-4 py-1 text-sm text-neutral-500 hover:text-red-500">
                                {isLoading ? <Loader color="#ef4444" text="Logging out..." /> : 'Logout'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Account