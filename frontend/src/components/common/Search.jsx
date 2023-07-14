import React from 'react'
import PropTypes from 'prop-types'

const Search = props => {
    return (
        <form>
            <label for="default-search" class="mb-2 text-sm font-medium text-neutral-900 sr-only dark:text-white">Search</label>
            <div class="relative mx-3 my-2">
                <input
                    type="search"
                    id="default-search"
                    placeholder="Search"
                    disabled="true"
                    class="block w-fit px-4 py-2 text-sm border-1 border-gray-200 focus:border-transparent focus:ring-0 font-medium outline-none placeholder:font-semibold placeholder-stone-500 bg-gray-50 "
                />
                <div class="text-white absolute right-2.5 bottom-2.5 focus:outline-none font-medium text-md px-4 py-2">
                    <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>
            </div>
        </form>
    )
}

Search.propTypes = {}

export default Search