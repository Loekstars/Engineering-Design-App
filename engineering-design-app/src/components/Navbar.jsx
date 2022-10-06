import React from "react";

const Navbar = () => {
  return (
    <>
      <nav
        id="navbar"
        class="sticky top-0 z-50 bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded-b-lg dark:bg-gray-900"
      >
        <div class="container flex flex-wrap justify-center md:justify-between items-center mx-auto">
          <a href="/" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="23" fill="none" viewBox="0 0 17 23">
  <path fill="#535353" d="m10.77 22.189-5.338-1.232a.41.41 0 0 0-.185.8l5.34 1.232a.41.41 0 0 0 .185-.8Zm0-1.643-5.338-1.232a.412.412 0 0 0-.185.8l5.34 1.233a.41.41 0 0 0 .185-.8Zm0-1.643-5.338-1.232a.412.412 0 0 0-.185.8l5.34 1.233a.41.41 0 0 0 .185-.8Z"/>
  <circle cx="8.214" cy="8.214" r="7.745" fill="#EEFF29"/>
  <path fill="#535353" d="M8.214 0C3.685 0 0 3.685 0 8.214a8.27 8.27 0 0 0 4.421 7.288l.082 1.145a.41.41 0 0 0 .82-.059l-.099-1.377a.41.41 0 0 0-.23-.34A7.44 7.44 0 0 1 .82 8.214C.821 4.138 4.138.821 8.214.821c4.077 0 7.393 3.317 7.393 7.393a7.374 7.374 0 0 1-4.574 6.837.41.41 0 0 0-.253.35l-.178 2.5a.41.41 0 0 0 .819.06l.16-2.252a8.192 8.192 0 0 0 4.848-7.495C16.429 3.684 12.744 0 8.214 0Z"/>
</svg>

            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white pl-2">
              Engineering Design
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
              <li>
                <a
                  href="/Settings"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Settings
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
