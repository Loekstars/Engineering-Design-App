import React from "react";
import { CirclePicker } from "react-color";
import ColorChangerGrid from "../components/ColorChangerGrid";
import { useState } from "react";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const Lamp = () => {
  const [CirclePickerColor, setCirclePickerColor] = useState("#37d67a");

  return (
    <div className="App">
      <div class="flex flex-col h-screen items-center">
        <div id="Information" class="flex flex-col w-3/4 items-center">
          <div id="Information-Title" class="pt-16 pb-8">
            <p class="font-nunito">Bedroom Light</p>
            <div className="Color-Preview" />
              <button>
                <LightbulbIcon style={{ fontSize: 40, color: `${CirclePickerColor}` }} />
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
            <ColorChangerGrid />
          </div>
          <div>Sensor Sensitivity</div>
          <ColorChangerGrid />
        </div>
      </div>
    </div>
  );
};

export default Lamp;
