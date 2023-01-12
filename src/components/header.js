import React from 'react'
import { Disclosure } from '@headlessui/react'

const Header = () => {
  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <a href="#" className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                        MovieLists
                      </a>
                      <a
                        href="/add"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Add Movie
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default Header