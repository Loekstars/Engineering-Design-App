import React from "react";
import { NavLink } from "react-router-dom";

// Component for the navbar at the bottom of the screen.

const BottomNav = () => {

  const [homepage, setHomepage] = React.useState(false);
  const [statistics, setStatistics] = React.useState(false);
  const [aboutus, setAboutus] = React.useState(false);

  function setActive(page){
    if(page === "homepage"){
      setHomepage(true);
      setStatistics(false);
      setAboutus(false);
    } else if(page === "statistics"){
      setHomepage(false);
      setStatistics(true);
      setAboutus(false);
    } else if(page === "aboutus"){
      setHomepage(false);
      setStatistics(false);
      setAboutus(true);
    }
  }

  return (
    <React.Fragment>
      <section class="flex justify-center fixed bottom-0 inset-x-0 z-50 shadow-lg dark:text-gray-800 dark:bg-gray-200 backdrop-blur-lg bg-opacity-30 dark:bg-opacity-30 border-t-2 border-royal/20">
      <div class="md:hidden sticky z-50 bottom-2">
        <div id="tabs" class="flex justify-between w-full">
        <div class="pt-2 w-24 flex justify-center">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? setActive("homepage") : "")}
            class="focus:text-royal hover:text-royal justify-center text-center"
          >
            <div class="w-9 h-9 inline-block mb-2 pt-2">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                style={{ display: homepage ? "none" : "inline-block" }}
              >
                  <path
                    stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  style={{ display: homepage ? "inline-block" : "none" }}
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </div>
            <span class="tab block text-xs font-bold">Home</span>
          </NavLink>
          </div>
          <div class="pt-2 w-24 flex justify-center">
          <NavLink
            to="/statistics"
            className={({ isActive }) => (isActive ? setActive("statistics") : "")}
            class="focus:text-royal hover:text-royal justify-center text-center"
          >
          <div class="flex justify-center mb-2 pt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" style={{ display: statistics ? "none" : "inline-block" }}>
              <path stroke="#1F2937" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 17.5A1.5 1.5 0 0 1 5.5 16h3a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 8.5 28h-3A1.5 1.5 0 0 1 4 26.5v-9Zm9-6a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-15Zm9-6A1.5 1.5 0 0 1 23.5 4h3A1.5 1.5 0 0 1 28 5.5v21a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-21Z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32" style={{ display: statistics ? "inline-block" : "none" }}>
              <path fill="#1F2937" d="M24.5 3A2.5 2.5 0 0 0 22 5.5v21a2.5 2.5 0 0 0 2.5 2.5h1a2.5 2.5 0 0 0 2.5-2.5v-21A2.5 2.5 0 0 0 25.5 3h-1ZM13 11.5A2.5 2.5 0 0 1 15.5 9h1a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5v-15Zm-9 6A2.5 2.5 0 0 1 6.5 15h1a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 7.5 29h-1A2.5 2.5 0 0 1 4 26.5v-9Z"/>
            </svg>

          </div>
            <span class="tab block text-xs text-center font-bold">Statistics</span>
          </NavLink>
          </div>
          <div class="pt-2 w-24 flex justify-center">
          <NavLink
            to="/aboutus"
            className={({ isActive }) => (isActive ? setActive("aboutus") : "")}
            class="focus:text-royal hover:text-royal justify-center text-center"
          >
          <div class="flex justify-center mb-2 pt-2">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              width="32" height="32"
              // class="w-10 h-10 inline-block mb-1 pt-2 pl-2"
              style={{ display: aboutus ? "none" : "inline-block" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              width="32" height="32"
              // class="w-10 h-10 inline-block mb-1 pt-2 pl-2"
              style={{ display: aboutus ? "inline-block" : "none" }}
            >
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
            </svg>
          </div>
            <span class="tab block text-xs text-center font-bold">About Us</span>
          </NavLink>
          </div>
          </div>
          </div>
      </section>
    </React.Fragment>
  );
};

export default BottomNav;
