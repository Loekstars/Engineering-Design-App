import React from "react";
import { CirclePicker } from "react-color";
import { useState } from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import Slider from "@mui/material/Slider";

const Lamp = () => {
  const [CirclePickerColor, setCirclePickerColor] = useState("#37d67a");
  const lightBrightness = 50;
  //TODO : Get the latest slider data from the database

  const [sliderValue, setSliderValue] = useState(50);
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <div className="App">
      <div class="flex flex-col h-screen items-center">
        <div id="Information" class="flex flex-col w-3/4 items-center">
          <div id="Information-Title" class="pt-24 pb-8">
            <p class="font-nunito">Bedroom Light</p>
            <div className="Color-Preview" />
            <button>
              <LightbulbIcon
                style={{ fontSize: 40, color: `${CirclePickerColor}` }}
              />
            </button>
          </div>
          <div id="Information-Content" class="pb-16">
            <CirclePicker
              color={CirclePickerColor}
              onChange={(color) => {
                setCirclePickerColor(color.hex);
              }}
            ></CirclePicker>
          </div>
        </div>
        <div id="Settings-Lamp" class="w-3/4 sm:w-64">
          <div id="Lamp-Settings-brightness">
            <div>Brightness</div>
            <Slider
              value={sliderValue}
              onChange={handleSliderChange}
              defaultValue={lightBrightness}
              aria-label="Default"
              color="secondary"
            />
          </div>
        </div>
        <div id="Settings-Color" class="w-3/4 sm:w-64">
          <a href="/LampSettings">
            <button class="rounded-full bg-blue-600/90 p-2 bottom-2 z-50">
              Change settings
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Lamp;
