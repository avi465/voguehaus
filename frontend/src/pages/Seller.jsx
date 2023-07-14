import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import toCamelCase from '../utils/toCamelCase'
import { Link, Outlet, useLocation } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { useLogout } from '../hooks/auth'

import logo from '../assets/images/logo.svg'

const Seller = props => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const location = useLocation();
    const { logout, isLoading, error } = useLogout();

    const handleLogout = () => {
        logout("seller")
    }

    const isActive = (path) => {
        return location.pathname === path;
    };

    const pathSegments = location.pathname.split('/');
    const lastRoute = pathSegments[pathSegments.length - 1];

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const toggleProfileMenu = () => {
        setProfileMenuOpen(!isProfileMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);

        // Check initial window size on component mount
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className="flex">
                <aside className={`${window.innerWidth < 768 ? 'fixed' : 'sticky'} top-0 left-0 z-40 w-64 h-screen bg-white border-r border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 transition-transform ${isSidebarOpen ? window.innerWidth < 768 ? 'translate-x-0' : 'block' : window.innerWidth < 768 ? '-translate-x-full' : 'hidden'}`} aria-label="Sidebar">
                    <div className="py-2.5 h-12 flex items-center justify-between bg-white shadow-sm">
                        <div class="flex items-center px-5 bg-white text-neutral-700 dark:text-white">
                            <Link to="/">
                                <img src={logo} className="h-3" alt="logo" />
                            </Link>
                        </div>
                        <div onClick={toggleSidebar} className="pr-2 relative flex items-center text-neutral-700 dark:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0 w-5 h-5 text-neutral-400 transition duration-75 dark:text-neutral-400 ">
                                <path fill-rule="evenodd" d="M13.28 3.97a.75.75 0 010 1.06L6.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0zm6 0a.75.75 0 010 1.06L12.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <div class="h-full px-3 pb-4 py-2.5 overflow-y-auto">
                        <ul class="font-semibold">
                            <li className={`${isActive('/seller/dashboard') ? "bg-neutral-600 text-neutral-100" : "text-neutral-600"}`}>
                                <Link to="/seller/dashboard" class="flex items-center p-2 rounded-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0 w-5 h-5 transition duration-75">
                                        <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
                                        <path fill-rule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="flex-1 ml-3">Dashboard</span>
                                </Link>
                            </li>
                            <li className={`${isActive('/seller/orders') ? "bg-neutral-600 text-neutral-100" : "text-neutral-600"}`}>
                                <Link to="/seller/orders" class="flex items-center p-2 rounded-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0 w-5 h-5 transition duration-75">
                                        <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                                        <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                                        <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                    </svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Orders</span>
                                </Link>
                            </li>
                            <li className={`${isActive('/seller/products') ? "bg-neutral-600 text-neutral-100" : "text-neutral-600"}`}>
                                <Link to="/seller/products" class="flex items-center p-2 rounded-sm">
                                    <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 transition duration-75 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd"></path></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Products</span>
                                </Link>
                            </li>
                            <li className={`${isActive('/seller/add-product') ? "bg-neutral-600 text-neutral-100" : "text-neutral-600"}`}>
                                <Link to="/seller/add-product" class="flex items-center p-2 rounded-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0 w-5 h-5 transition duration-75">
                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Add Product</span>
                                </Link>
                            </li>
                            <li className={`${isActive('/seller/payments') ? "bg-neutral-600 text-neutral-100" : "text-neutral-600"}`}>
                                <Link to="/seller/payments" class="flex items-center p-2 rounded-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0 w-5 h-5 transition duration-75">
                                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 7.5A.75.75 0 009 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 009 12h3.622a2.251 2.251 0 01-2.122 1.5H9a.75.75 0 00-.53 1.28l3 3a.75.75 0 101.06-1.06L10.8 14.988A3.752 3.752 0 0014.175 12H15a.75.75 0 000-1.5h-.825A3.733 3.733 0 0013.5 9H15a.75.75 0 000-1.5H9z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Payments</span>
                                </Link>
                            </li>
                            <li className={`${isActive('/seller/invoice') ? "bg-neutral-600 text-neutral-100" : "text-neutral-600"}`}>
                                <Link to="/seller/invoice" class="flex items-center p-2 rounded-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0 w-5 h-5 transition duration-75">
                                        <path fill-rule="evenodd" d="M12 1.5c-1.921 0-3.816.111-5.68.327-1.497.174-2.57 1.46-2.57 2.93V21.75a.75.75 0 001.029.696l3.471-1.388 3.472 1.388a.75.75 0 00.556 0l3.472-1.388 3.471 1.388a.75.75 0 001.029-.696V4.757c0-1.47-1.073-2.756-2.57-2.93A49.255 49.255 0 0012 1.5zm3.53 7.28a.75.75 0 00-1.06-1.06l-6 6a.75.75 0 101.06 1.06l6-6zM8.625 9a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm5.625 3.375a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Invoice</span>
                                </Link>
                            </li>
                            <li className={`${isActive('/seller/reports') ? "bg-neutral-600 text-neutral-100" : "text-neutral-600"}`}>
                                <Link to="/seller/reports" class="flex items-center p-2 rounded-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0 w-5 h-5 transition duration-75 ">
                                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                                    </svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Reports</span>
                                </Link>
                            </li>
                            <li className={`${isActive('/seller/help') ? "bg-neutral-600 text-neutral-100" : "text-neutral-600"}`}>
                                <Link to="/seller/help" class="flex items-center p-2 rounded-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="flex-shrink-0 w-5 h-5 transition duration-75">
                                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                                    </svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Help</span>
                                </Link>
                            </li>
                            <li className={`${isActive('/seller/logout') ? "bg-neutral-600 text-neutral-100" : "text-neutral-600"}`}>
                                <Link to="" class="flex items-center p-2 rounded-sm text-red-500 hover:bg-neutral-100">
                                    <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-red-500 transition duration-75 dark:text-neutral-400 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
                                    <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>

                <div className='flex-grow flex flex-col'>
                    <nav className="sticky top-0 flex items-center justify-between bg-white shadow-sm border-neutral-200 h-12 py-2.5 px-5">
                        <button
                            onClick={toggleSidebar}
                            className={`mr-4 ${isSidebarOpen ? 'hidden' : 'inline-block'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                            </svg>
                        </button>
                        <ol class="inline-flex items-center space-x-1">
                            <li class="inline-flex items-center">
                                <Link to="/seller/dashboard" class="inline-flex items-center text-sm font-medium text-neutral-700 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-white">
                                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div class="flex items-center">
                                    <svg aria-hidden="true" class="w-6 h-6 text-neutral-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <span class="ml-1 text-sm font-medium text-neutral-500 md:ml-2 dark:text-neutral-400">{toCamelCase(lastRoute)}</span>
                                </div>
                            </li>
                        </ol>
                        <div onClick={toggleProfileMenu} className='relative group'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-neutral-900">
                                <path d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 01-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 016.126 3.537zM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 010 .75l-1.732 3.001c-.229.396-.76.498-1.067.16A5.231 5.231 0 016.75 12c0-1.362.519-2.603 1.37-3.536zM10.878 17.13c-.447-.097-.623-.608-.394-1.003l1.733-3.003a.75.75 0 01.65-.375h3.465c.457 0 .81.408.672.843a5.252 5.252 0 01-6.126 3.538z" />
                                <path fill-rule="evenodd" d="M21 12.75a.75.75 0 000-1.5h-.783a8.22 8.22 0 00-.237-1.357l.734-.267a.75.75 0 10-.513-1.41l-.735.268a8.24 8.24 0 00-.689-1.191l.6-.504a.75.75 0 10-.964-1.149l-.6.504a8.3 8.3 0 00-1.054-.885l.391-.678a.75.75 0 10-1.299-.75l-.39.677a8.188 8.188 0 00-1.295-.471l.136-.77a.75.75 0 00-1.477-.26l-.136.77a8.364 8.364 0 00-1.377 0l-.136-.77a.75.75 0 10-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 00-1.3.75l.392.678a8.29 8.29 0 00-1.054.885l-.6-.504a.75.75 0 00-.965 1.149l.6.503a8.243 8.243 0 00-.689 1.192L3.8 8.217a.75.75 0 10-.513 1.41l.735.267a8.222 8.222 0 00-.238 1.355h-.783a.75.75 0 000 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 10.513 1.41l.735-.268c.197.417.428.816.69 1.192l-.6.504a.75.75 0 10.963 1.149l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 101.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.771a.75.75 0 101.477.26l.137-.772a8.376 8.376 0 001.376 0l.136.773a.75.75 0 101.477-.26l-.136-.772a8.19 8.19 0 001.294-.47l.391.677a.75.75 0 101.3-.75l-.393-.679a8.282 8.282 0 001.054-.885l.601.504a.75.75 0 10.964-1.15l-.6-.503a8.24 8.24 0 00.69-1.191l.735.268a.75.75 0 10.512-1.41l-.734-.268c.115-.438.195-.892.237-1.356h.784zm-2.657-3.06a6.744 6.744 0 00-1.19-2.053 6.784 6.784 0 00-1.82-1.51A6.704 6.704 0 0012 5.25a6.801 6.801 0 00-1.225.111 6.7 6.7 0 00-2.15.792 6.784 6.784 0 00-2.952 3.489.758.758 0 01-.036.099A6.74 6.74 0 005.251 12a6.739 6.739 0 003.355 5.835l.01.006.01.005a6.706 6.706 0 002.203.802c.007 0 .014.002.021.004a6.792 6.792 0 002.301 0l.022-.004a6.707 6.707 0 002.228-.816 6.781 6.781 0 001.762-1.483l.009-.01.009-.012a6.744 6.744 0 001.18-2.064c.253-.708.39-1.47.39-2.264a6.74 6.74 0 00-.408-2.308z" clip-rule="evenodd" />
                            </svg>
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
                    </nav>
                    <section className='flex-grow p-5'>
                        <Outlet />
                    </section>

                </div>

            </div>
        </>
    )
};

Seller.propTypes = {}

export default Seller