import React from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const Navbar = () => {
  return (
    <>
      <nav
        id="navbar"
        class="sticky top-0 z-50 bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded-b-lg dark:bg-gray-900"
      >
        <div class="container flex flex-wrap justify-center md:justify-between items-center mx-auto">
          <a href="/" class="flex items-center">
            <LightbulbIcon style={{ color: "gray" }} />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
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
