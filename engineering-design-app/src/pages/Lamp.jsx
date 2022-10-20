import React from "react";
import CircularSlider from '@fseehawer/react-circular-slider';

//This is a page where the user can change the brightness of the lamp

const Lamp = () => {

  const [lampBrightness, setLampBrightness] = React.useState(0);

  function handleChange(value) {
    setLampBrightness(value);
    console.log(value);
  }

  return (
    <div className='App'>
      <div classname="back-button">
            <button
              class="text-widget-blue w-16 align-end font-thin focus:none pt-2 absolute left-2"
              >
              <a href="/">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a>
            </button>
          </div>
        <div class="container mx-auto align-center">
            <div class='flex flex-col items-center pt-8'>
                <div id='Information' class='flex flex-col w-3/4 md:w-2/5 items-center'>
                    <div class="pt-8 font-light w-full text-xl text-left pl-1 pr-1">
                        <div class="w-48 mb-6 max-w-3/5">
                            Bedroom Light
                        </div>
                    </div>
                </div>
                <div class='flex flex-col w-full items-center pt-16 bg-slate-200/50 rounded-lg'>
                {/* //TODO : Add a slider to change the brightness of the lamp */}
                    <CircularSlider
                        label="Brightness"
                        min={0}
                        max={100}
                        dataIndex={lampBrightness}
                        onChange={handleChange}
                        labelColor="#005a58"
                        labelBottom={true}
                        knobColor="#005a58"
                        knobSize={72}
                        progressColorFrom="#1B3A96"
                        progressColorTo="#3b82f6"
                        progressSize={24}
                        trackColor="#FFFFFF"
                        trackSize={24}
                    >
                    </CircularSlider>
                <div id="Settings-Color" class="w-3/4 sm:w-64 pt-8 m-6">
                  <a href="/LampSettings">
                    <button class="rounded-2xl bg-widget-blue/80 p-2 bottom-2 z-50 font-medium">
                      Change settings
                    </button>
                  </a>
                </div>
                </div>

            </div>
        </div>
    </div>
  );
};

export default Lamp;
