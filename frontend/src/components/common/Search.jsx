import React from 'react'
import PropTypes from 'prop-types'

const Search = props => {
    return (
        <form>
            <label for="default-search" class="mb-2 text-sm font-medium text-neutral-900 sr-only dark:text-white">Search</label>
            <div class="relative mx-2 my-2">
                <input type="search" id="default-search" class="block w-full px-4 py-2 pr-8 text-sm font-medium border-0 placeholder-stone-600 bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white" placeholder="Search for products, brands and more" />
                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 focus:outline-none font-medium text-md px-4 py-2">
                    <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-neutral-500 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </button>
            </div>
        </form>
    )
}

Search.propTypes = {}

export default Search