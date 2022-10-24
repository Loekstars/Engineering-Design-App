import React from "react";

const Navbar = () => {
  return (
    <>
      <nav
        id="navbar"
        class="sticky top-0 z-50 bg-navbar-light px-2 sm:px-4 py-2.5 rounded-b-lg dark:bg-navbar-dark"
      >
        <div class="container flex flex-wrap justify-center md:justify-between items-center mx-auto">
          <a href="/" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" fill="none" viewBox="0 0 35 49" class="dark:hidden">
            <path fill="#000" d="m22.947 47.272-11.375-2.625a.875.875 0 0 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706Zm0-3.5-11.375-2.625a.875.875 0 1 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706Zm0-3.5-11.375-2.625a.875.875 0 1 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706ZM17.5 0C7.85 0 0 7.85 0 17.5c0 6.492 3.68 12.531 9.42 15.526l.173 2.439a.868.868 0 0 0 .936.81.875.875 0 0 0 .81-.935l-.21-2.934a.874.874 0 0 0-.49-.725C5.238 29.064 1.75 23.497 1.75 17.5c0-8.684 7.065-15.75 15.75-15.75 8.684 0 15.75 7.066 15.75 15.75a15.71 15.71 0 0 1-9.745 14.566.875.875 0 0 0-.538.746l-.381 5.327a.875.875 0 0 0 1.746.124l.342-4.796A17.451 17.451 0 0 0 35 17.5C35 7.85 27.15 0 17.5 0Z"/>
          </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="40" fill="none" viewBox="0 0 35 49" class="hidden dark:block">
              <path fill="#fff" d="m22.947 47.272-11.375-2.625a.875.875 0 0 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706Zm0-3.5-11.375-2.625a.875.875 0 1 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706Zm0-3.5-11.375-2.625a.875.875 0 1 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706ZM17.5 0C7.85 0 0 7.85 0 17.5c0 6.492 3.68 12.531 9.42 15.526l.173 2.439a.868.868 0 0 0 .936.81.875.875 0 0 0 .81-.935l-.21-2.934a.874.874 0 0 0-.49-.725C5.238 29.064 1.75 23.497 1.75 17.5c0-8.684 7.065-15.75 15.75-15.75 8.684 0 15.75 7.066 15.75 15.75a15.71 15.71 0 0 1-9.745 14.566.875.875 0 0 0-.538.746l-.381 5.327a.875.875 0 0 0 1.746.124l.342-4.796A17.451 17.451 0 0 0 35 17.5C35 7.85 27.15 0 17.5 0Z"/>
            </svg>
            <span class="self-center text-xl font-thin whitespace-nowrap text-white pl-2">
              Light<span class="dark:text-widget-blue">Flow</span>
            </span>
          </a>
          <div id="navbar-default" class="hidden md:block w-full md:w-auto">
            <ul
              id="list"
              class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            >
              <li>
                <a
                  href="/"
                  class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/Statistics"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Statistics
                </a>
              </li>
              <li>
                <a
                  href="/Aboutus"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
