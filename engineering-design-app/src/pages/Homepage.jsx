import React from "react";
import { useState } from "react";
import useLongPress from "../components/useLongPress";
import { useEffect } from "react";
import Axios from "axios";
import ClimbingBoxLoader  from "react-spinners/ClimbingBoxLoader";

//TODO : Set state of on-offtoggle-state-ON/OFF

// const lightStates = new Array(3).fill(false);

const Homepage = () => {
  const [toggle_status, setToggle] = useState(false);
  const [toggle_dropdown, setDropdown] = useState(false);

  const onLongPress = () => {
    window.location.href="/Lamp";
    console.log('longpress is triggered');
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  //TODO : Fix status
  const handleClick = () => {
    setToggle(!toggle_status);
    // if (lightStates.every((element) => element === true)) {
    // }
  };

  const addLight = () => {
  };

  const removeLight = () => {
  };

  const changeRoom = () => {
  };
  
  const longPressEvent = useLongPress(onLongPress, handleClick, defaultOptions);

  const showDropdown = () => {
    setDropdown(!toggle_dropdown);
  };
  
  const [powerSaved, setPowerSaved] = useState("");
  const [loading, setLoading] = React.useState(true);

      //Create loading animation and wait for loading animation to end to show chart
      useEffect(() => {
        Axios.get('http://192.168.0.140:3001/api/powerSaving').then((response) => {
            setPowerSaved(response.data);
            console.log("Data Fetched")
            setTimeout(() => {
                setLoading(false);
            }, 20);

            console.log(response.data)
        }).catch((err) => {
              setTimeout(() => {
                setLoading(false);
            }, 20);
            const randomValue = Math.floor(Math.random() * 100);
            setPowerSaved(randomValue + "w");
            console.log(err);
        });
      }, []);


  return (
    <div classname="App">
      <div class="container mx-auto align-center w-screen">
        <div class="flex flex-col rounded-md pt-4">
          <div
            id="information-widget"
            class="flex flex-col h-38 items-center pt-2 pb-8"
          >
            <div class="pt-3 font-light w-full text-xl text-left pl-1 pr-1">
              <div class="flex justify-between">
                <div class="w-44">Statistics Summary</div>
                <button
                  class="text-widget-blue text-xs place-text-center w-10 align-end focus:none"
                >
                  <a href="/Statistics">Details</a>
                </button>
              </div>
            </div>
            <div class="grid grid-cols-3 items-center gap-4 h-28">
              <div class="w-28 h-28 outline outline-offset-0 bg-white outline-1 outline-gray-200 p-2 rounded-lg drop-shadow-md">
                <div
                  classname="Symbol-widget-1"
                  class="flex flex-auto justify-center items-center h-10"
                >
                  <div class="text-center font-medium text-widget-blue text-xl pt-2">
                    {loading ? <ClimbingBoxLoader 
                    color="#2057ff"
                    size={7}
                    />: powerSaved}
                  </div>
                </div>
                <div class="text-xs text-center pt-3">
                  Today's Power Savings
                </div>
              </div>
              <div class="w-28 h-28 outline bg-white outline-1 outline-gray-200 p-2 rounded-lg drop-shadow-md">
                <div
                  classname="Symbol-widget-2"
                  class="flex flex-auto justify-center items-center pt-2 h-10"
                >
                  {/* On off SVG's */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="27"
                    fill="none"
                    viewBox="0 0 48 27"
                    classname="on-offtoggle-state-ON"
                    style={{ display: toggle_status ? "none" : "block" }}
                  >
                    <path
                      fill="#2057FF"
                      d="M11.299 26.288c-2.28 0-4.248-.528-5.904-1.584-1.656-1.056-2.94-2.556-3.852-4.5C.655 18.26.21 15.956.21 13.292c0-2.016.252-3.816.756-5.4.504-1.608 1.236-2.964 2.196-4.068a9.575 9.575 0 0 1 3.492-2.592c1.368-.6 2.916-.9 4.644-.9 2.304 0 4.284.528 5.94 1.584 1.68 1.032 2.964 2.52 3.852 4.464.888 1.92 1.332 4.212 1.332 6.876 0 2.016-.264 3.828-.792 5.436-.504 1.608-1.236 2.976-2.196 4.104a9.575 9.575 0 0 1-3.492 2.592c-1.368.6-2.916.9-4.644.9Zm0-1.476c2.016 0 3.732-.444 5.148-1.332 1.416-.912 2.496-2.22 3.24-3.924.744-1.728 1.116-3.816 1.116-6.264 0-3.648-.828-6.468-2.484-8.46-1.632-2.016-3.972-3.024-7.02-3.024-1.992 0-3.696.456-5.112 1.368C4.77 4.064 3.69 5.372 2.947 7.1c-.744 1.704-1.116 3.768-1.116 6.192 0 3.624.828 6.456 2.484 8.496 1.656 2.016 3.984 3.024 6.984 3.024Zm17.711 1.404a.733.733 0 0 1-.54-.216c-.12-.144-.18-.336-.18-.576V1.232c0-.264.06-.468.18-.612a.58.58 0 0 1 .468-.216c.216 0 .372.036.468.108.12.072.24.204.36.396l17.352 23.58h-.792V1.196c0-.264.06-.456.18-.576a.733.733 0 0 1 .54-.216c.216 0 .384.072.504.216.12.12.18.312.18.576v24.192c0 .264-.06.468-.18.612a.485.485 0 0 1-.432.216.827.827 0 0 1-.468-.144 1.273 1.273 0 0 1-.36-.36L28.938 2.132h.756v23.292c0 .24-.06.432-.18.576-.12.144-.288.216-.504.216Z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="63"
                    height="27"
                    fill="none"
                    viewBox="0 0 63 27"
                    classname="on-offtoggle-state-OFF"
                    style={{ display: toggle_status ? "block" : "none" }}
                  >
                    <path
                      fill="#2057FF"
                      d="M11.182 26.288c-2.28 0-4.248-.528-5.904-1.584-1.656-1.056-2.94-2.556-3.852-4.5C.538 18.26.094 15.956.094 13.292c0-2.016.252-3.816.756-5.4.504-1.608 1.236-2.964 2.196-4.068a9.575 9.575 0 0 1 3.492-2.592c1.368-.6 2.916-.9 4.644-.9 2.304 0 4.284.528 5.94 1.584 1.68 1.032 2.964 2.52 3.852 4.464.888 1.92 1.332 4.212 1.332 6.876 0 2.016-.264 3.828-.792 5.436-.504 1.608-1.236 2.976-2.196 4.104a9.575 9.575 0 0 1-3.492 2.592c-1.368.6-2.916.9-4.644.9Zm0-1.476c2.016 0 3.732-.444 5.148-1.332 1.416-.912 2.496-2.22 3.24-3.924.744-1.728 1.116-3.816 1.116-6.264 0-3.648-.828-6.468-2.484-8.46-1.632-2.016-3.972-3.024-7.02-3.024-1.992 0-3.696.456-5.112 1.368-1.416.888-2.496 2.196-3.24 3.924-.744 1.704-1.116 3.768-1.116 6.192 0 3.624.828 6.456 2.484 8.496 1.656 2.016 3.984 3.024 6.984 3.024Zm17.89 1.404c-.287 0-.515-.072-.683-.216-.144-.168-.216-.396-.216-.684V1.52c0-.288.072-.504.216-.648.168-.168.396-.252.684-.252h13.464c.24 0 .42.06.54.18.144.12.216.288.216.504 0 .24-.072.42-.216.54-.12.12-.3.18-.54.18H29.685v10.404h12.132c.24 0 .42.06.54.18.144.12.216.288.216.504 0 .24-.072.42-.216.54-.12.12-.3.18-.54.18H29.685v11.484c0 .6-.204.9-.612.9Zm19.302 0c-.288 0-.516-.072-.684-.216-.144-.168-.216-.396-.216-.684V1.52c0-.288.072-.504.216-.648.168-.168.396-.252.684-.252h13.464c.24 0 .42.06.54.18.144.12.216.288.216.504 0 .24-.072.42-.216.54-.12.12-.3.18-.54.18H48.986v10.404h12.132c.24 0 .42.06.54.18.144.12.216.288.216.504 0 .24-.072.42-.216.54-.12.12-.3.18-.54.18H48.986v11.484c0 .6-.204.9-.612.9Z"
                    />
                  </svg>
                </div>

                <div class="text-xs pt-5 h-14 text-center">Light status</div>
              </div>
              <div class="w-28 h-28 outline bg-white outline-1 outline-gray-200 p-2 rounded-lg drop-shadow-md">
                <div
                  classname="Symbol-widget-3"
                  class="flex flex-auto justify-center items-center h-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="41"
                    fill="none"
                    viewBox="0 0 26 41"
                  >
                    <path
                      fill="#2057FF"
                      d="M16.082 3.417 1.95 22.835h11.7L8 37.583l16.05-18.165h-13l5.032-16.001Zm0-1.163c.181 0 .364.033.539.1.6.234.914.817.74 1.371l-4.57 14.53H24.05c.506 0 .968.253 1.191.651.223.398.168.873-.142 1.224L9.05 38.295c-.258.293-.65.45-1.05.45-.212 0-.427-.044-.625-.137-.57-.267-.838-.857-.632-1.394l5.063-13.217H1.95c-.484 0-.93-.231-1.163-.603A1.04 1.04 0 0 1 .83 22.21L14.963 2.792c.25-.344.678-.538 1.12-.538Z"
                    />
                  </svg>
                </div>
                <div class="text-xs text-center font-bold">132w</div>
                <div class="text-xs text-center">Total Energy Saved</div>
              </div>
            </div>
          </div>
          <div
            id="controls-widget"
            class="flex flex-col h-48 items-center pb-2 bg-slate-200/50 rounded-2xl"
          >
            <div class="font-light w-full text-xl text-left pl-4 p-2 rounded-t-2xl bg-slate-300/50">
              <div class="flex justify-between">
                <div class="w-24">Lights</div>
                <button class="w-6 align-end font-thin" onClick={showDropdown}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <div classname="dropdown-content" class="absolute right-8 z-10 mt-6 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" style={{ display: toggle_dropdown ? "block" : "none" }}>
                  <div class="py-1" role="none">
                    <a href="/AddLight" onClick={addLight} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Add Light</a>
                    <a href="/" onClick={removeLight} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Remove Light</a>
                    <a href="/" onClick={changeRoom} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Change room</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 items-center gap-4 h-28 pt-6">
              <button
                classname="button-light-1"
                class="w-24 h-24 outline outline-offset-0 outline-1 outline-gray-200 p-2 pb-1 pt-1 rounded-lg"
                onClick={handleClick}
                {...longPressEvent}
              >
                <div
                  classname="Light-widget-1"
                  class="flex flex-auto justify-center items-center h-14"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="49"
                    fill="none"
                    viewBox="0 0 35 49"
                  >
                    <path
                      fill="#2057FF"
                      d="m22.947 47.272-11.375-2.625a.875.875 0 0 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706Zm0-3.5-11.375-2.625a.875.875 0 1 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706Zm0-3.5-11.375-2.625a.875.875 0 1 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706ZM17.5 0C7.85 0 0 7.85 0 17.5c0 6.492 3.68 12.531 9.42 15.526l.173 2.439a.868.868 0 0 0 .936.81.875.875 0 0 0 .81-.935l-.21-2.934a.874.874 0 0 0-.49-.725C5.238 29.064 1.75 23.497 1.75 17.5c0-8.684 7.065-15.75 15.75-15.75 8.684 0 15.75 7.066 15.75 15.75a15.71 15.71 0 0 1-9.745 14.566.875.875 0 0 0-.538.746l-.381 5.327a.875.875 0 0 0 1.746.124l.342-4.796A17.451 17.451 0 0 0 35 17.5C35 7.85 27.15 0 17.5 0Z"
                    />
                  </svg>
                </div>
                <div class="text-xs text-center pt-1">Bedroom Light 1</div>
              </button>
              <button
                classname="button-light-2"
                class="w-24 h-24 outline outline-offset-0 outline-1 outline-gray-200 p-2 pb-1 pt-1 rounded-lg"
                onClick={handleClick}
              >
                <div
                  classname="Light-widget-2"
                  class="flex flex-auto justify-center items-center h-14"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="49"
                    fill="none"
                    viewBox="0 0 35 49"
                  >
                    <path
                      fill="#2057FF"
                      d="m22.947 47.272-11.375-2.625a.875.875 0 0 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706Zm0-3.5-11.375-2.625a.875.875 0 1 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706Zm0-3.5-11.375-2.625a.875.875 0 1 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706ZM17.5 0C7.85 0 0 7.85 0 17.5c0 6.492 3.68 12.531 9.42 15.526l.173 2.439a.868.868 0 0 0 .936.81.875.875 0 0 0 .81-.935l-.21-2.934a.874.874 0 0 0-.49-.725C5.238 29.064 1.75 23.497 1.75 17.5c0-8.684 7.065-15.75 15.75-15.75 8.684 0 15.75 7.066 15.75 15.75a15.71 15.71 0 0 1-9.745 14.566.875.875 0 0 0-.538.746l-.381 5.327a.875.875 0 0 0 1.746.124l.342-4.796A17.451 17.451 0 0 0 35 17.5C35 7.85 27.15 0 17.5 0Z"
                    />
                  </svg>
                </div>

                <div class="text-xs text-center pt-1">Bedroom Light 2</div>
              </button>
              <button
                classname="button-light-3"
                class="w-24 h-24 outline outline-offset-2 outline-1 outline-gray-200 p-2 pb-1 pt-1 rounded-lg"
                onClick={handleClick}
              >
                <div
                  classname="Light-widget-3"
                  class="flex flex-auto justify-center items-center h-14"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="49"
                    fill="none"
                    viewBox="0 0 35 49"
                  >
                    <path
                      fill="#2057FF"
                      d="m22.947 47.272-11.375-2.625a.875.875 0 0 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706Zm0-3.5-11.375-2.625a.875.875 0 1 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706Zm0-3.5-11.375-2.625a.875.875 0 1 0-.394 1.706l11.375 2.625a.875.875 0 0 0 .394-1.706ZM17.5 0C7.85 0 0 7.85 0 17.5c0 6.492 3.68 12.531 9.42 15.526l.173 2.439a.868.868 0 0 0 .936.81.875.875 0 0 0 .81-.935l-.21-2.934a.874.874 0 0 0-.49-.725C5.238 29.064 1.75 23.497 1.75 17.5c0-8.684 7.065-15.75 15.75-15.75 8.684 0 15.75 7.066 15.75 15.75a15.71 15.71 0 0 1-9.745 14.566.875.875 0 0 0-.538.746l-.381 5.327a.875.875 0 0 0 1.746.124l.342-4.796A17.451 17.451 0 0 0 35 17.5C35 7.85 27.15 0 17.5 0Z"
                    />
                  </svg>
                </div>
                <div class="text-xs text-center pt-1">Bedroom Light 3</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
