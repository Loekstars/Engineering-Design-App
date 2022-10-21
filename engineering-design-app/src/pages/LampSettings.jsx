import { Slider } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import Axios from 'axios';
import PropagateLoader from "react-spinners/PropagateLoader";

//This is a page where the user can change settings for the lamp (TBC)

function updateValue(){
  //TODO: Send data to the pico
}

const LampSettings = () => {
  // const [value, setValue] = React.useState(50);
  const [loading, setLoading] = React.useState(true);

      //Create loading animation and wait for loading animation to end to show chart
      useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
          // setValue(response.data);
            console.log("Data Fetched")
            setTimeout(() => {
                setLoading(false);
            }, 1000);

            console.log(response.data)
        }).catch((err) => {
            console.log(err);
        });
      }, []);

  return (
    <div className='App'>
        <div classname="back-button">
          <button
            class="text-widget-blue w-16 align-end font-thin focus:none pt-2 absolute left-2"
            >
              <a href="/lamp">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </button>
          </div>
        <div class="container mx-auto align-center">
            <div class='flex flex-col items-center pt-8 h-screen'>
                <div id='Information' class='flex flex-col w-3/4 md:w-2/5 items-center'>
                    <div class="pt-3 font-light w-full text-xl text-left pl-1 pr-1">
                        <div class="w-full">
                            Bedroom light settings
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-4/5 pt-16 text-left">
                    <div>
                      Sensitivity sensor
                    </div>
                  <div class="flex justify-center w-full">
                      {loading ? <PropagateLoader 
                      color="#2057ff" 
                      class="pt-4"
                      />:
                          <Slider
                                label="Brightness"
                                valueLabelDisplay="down"
                                onChange={updateValue()}
                                color="primary"
                              />}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LampSettings