import React from 'react'
import { Link } from 'react-router-dom'
import Account from './Account'
import Search from './common/Search'

import logo from '../assets/images/logo.svg'

const Header = () => {
    return (
        <>
            <div className='sticky top-0 z-50 shadow-sm'>
                <nav className="bg-white dark:bg-neutral-900">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6">
                        <div className="flex flex-wrap justify-start items-center">
                            <Link to="/">
                                <img src={logo} className="h-3" alt="logo" />
                            </Link>
                            <div className="max-w-screen-xl px-2 md:px-4">
                                <div className="flex items-center justify-start">
                                    <ul className="flex flex-row text-sm capitalize font-bold overflow-x-auto">
                                        <li className="px-3 py-2 hover:border-b-2 hover:border-green-600">
                                            <a href="#" className="text-neutral-600 dark:text-white hover:text-green-900">MEN</a>
                                        </li>
                                        <li className="px-3 py-2 hover:border-b-2 hover:border-green-600">
                                            <a href="#" className="text-neutral-600 dark:text-white hover:text-green-900">WOMEN</a>
                                        </li>
                                        <li className="px-3 py-2 hover:border-b-2 hover:border-green-600">
                                            <a href="#" className="text-neutral-600 dark:text-white hover:text-green-900">KIDS</a>
                                        </li>
                                        <li className="px-3 py-2 hover:border-b-2 hover:border-green-600">
                                            <a href="#" className="text-neutral-600 dark:text-white hover:text-green-900">HOME & LIVING</a>
                                        </li>
                                        <li className="px-3 py-2 hover:border-b-2 hover:border-green-600">
                                            <a href="#" className="text-neutral-600 dark:text-white hover:text-green-900">BEAUTY</a>
                                        </li>
                                        <li className="px-3 py-2 hover:border-b-2 hover:border-green-600">
                                            <a href="#" className="text-neutral-600 dark:text-white hover:text-green-900">DEALS</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Search />
                            <Account />
                            <Link to="/cart" className="flex relative space-x-4 ml-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6 text-neutral-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">0</div>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Header