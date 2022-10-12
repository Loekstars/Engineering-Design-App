import React from "react";
import { useState } from "react";
import CircleSlider from "react-circle-slider";

const Lamp = () => {
  //TODO : Get the latest slider data from the database

  const [sliderValue, setSliderValue] = useState(50);
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  return (
    <div className='App'>
        <div class="container mx-auto align-center">
            <div class='flex flex-col items-center pt-8'>
                <div id='Information' class='flex flex-col w-3/4 md:w-2/5 items-center'>
                    <div class="pt-3 font-light w-full text-xl text-left pl-1 pr-1">
                        <div class="w-48">
                            Bedroom Light
                        </div>
                    </div>
                </div>
                <div class='flex flex-col w-full items-center'>
                {/* //TODO : Add a slider to change the brightness of the lamp */}
                  {/* <CircleSlider
                    value={sliderValue}
                    size={150}
                    onchange={handleSliderChange}
                    showTooltip={true}
                    gradientColorFrom="#FEA346"
                    gradientColorTo="#F8616D"
                  /> */}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Lamp;
