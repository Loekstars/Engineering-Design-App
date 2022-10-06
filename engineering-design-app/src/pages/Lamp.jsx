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
        <div classname="back-button">
          <button
            class="text-widget-blue w-14 align-end font-thin focus:none pt-2 absolute left-2"
            >
            <a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="59" height="29" fill="none" viewBox="0 0 59 29">
              <g clip-path="url(#a)">
                <path stroke="#2057FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.45 24 8 15.257 18 6"/>
                <path fill="#2057FF" d="M17.914 18.458V9.731h3.051c.608 0 1.11.105 1.504.315.395.208.69.488.882.84.194.35.29.737.29 1.163 0 .375-.067.685-.2.93-.13.244-.304.437-.52.579a2.367 2.367 0 0 1-.695.315v.085c.268.017.536.111.806.282.27.17.496.414.677.732.182.319.273.708.273 1.168 0 .438-.1.831-.298 1.18-.199.35-.513.627-.942.831-.429.205-.987.307-1.675.307h-3.153Zm1.057-.937h2.096c.69 0 1.18-.134 1.47-.4.293-.27.44-.597.44-.98 0-.296-.076-.569-.226-.819a1.634 1.634 0 0 0-.644-.605c-.278-.154-.608-.23-.988-.23H18.97v3.034Zm0-3.955h1.96c.318 0 .605-.062.86-.187a1.49 1.49 0 0 0 .614-.529 1.39 1.39 0 0 0 .23-.8c0-.384-.133-.71-.4-.977-.267-.27-.69-.404-1.27-.404h-1.994v2.897Zm8.537 5.046a2.66 2.66 0 0 1-1.129-.235 1.939 1.939 0 0 1-.805-.686c-.2-.3-.299-.665-.299-1.09 0-.376.074-.68.222-.913.148-.235.345-.42.592-.554.248-.133.52-.232.819-.298.3-.068.603-.122.907-.162.398-.05.72-.09.967-.115.25-.028.432-.075.546-.14.117-.066.175-.18.175-.341v-.034c0-.42-.115-.748-.346-.98-.227-.233-.572-.35-1.035-.35-.48 0-.857.105-1.13.315-.272.21-.464.435-.575.674l-.954-.341c.17-.398.398-.708.682-.93.287-.224.6-.38.937-.468.341-.09.676-.136 1.006-.136.21 0 .452.025.724.076.276.049.542.15.797.303.259.153.473.385.644.694.17.31.255.725.255 1.245v4.312h-1.005v-.886h-.051a1.77 1.77 0 0 1-.341.456c-.16.162-.371.3-.635.413-.264.114-.587.17-.968.17Zm.154-.904c.398 0 .733-.078 1.006-.234a1.595 1.595 0 0 0 .835-1.385v-.92c-.043.05-.137.098-.282.14a4.73 4.73 0 0 1-.494.107 22.366 22.366 0 0 1-.963.128 3.815 3.815 0 0 0-.733.166 1.263 1.263 0 0 0-.545.336c-.137.148-.205.35-.205.605 0 .35.13.614.388.793.261.176.592.264.993.264Zm7.341.887c-.614 0-1.142-.145-1.585-.435a2.833 2.833 0 0 1-1.023-1.197c-.239-.509-.358-1.09-.358-1.743 0-.665.122-1.252.367-1.76a2.9 2.9 0 0 1 1.03-1.198c.444-.29.961-.434 1.552-.434.46 0 .875.085 1.244.255.37.17.672.41.908.716.236.307.382.665.439 1.074H36.57a1.56 1.56 0 0 0-.511-.792c-.262-.233-.614-.35-1.057-.35-.392 0-.736.102-1.031.307a1.999 1.999 0 0 0-.686.856c-.162.367-.243.797-.243 1.292 0 .505.08.946.239 1.32.161.376.389.667.681.874a1.76 1.76 0 0 0 1.04.311c.261 0 .499-.045.712-.136a1.464 1.464 0 0 0 .856-1.006h1.006a2.33 2.33 0 0 1-.422 1.044 2.358 2.358 0 0 1-.882.733c-.364.18-.787.269-1.27.269Zm4.982-2.523-.017-1.244h.204l2.864-2.915h1.244l-3.051 3.085h-.085l-1.16 1.074Zm-.938 2.386V9.731h1.006v8.727h-1.006Zm4.16 0-2.558-3.238.716-.7 3.12 3.938h-1.279Z"/>
              </g>
            </svg>
            </a>
          </button>
        </div>
        <div id="Information" class="flex flex-col w-3/4 items-center">
          <div id="Information-Title" class="pt-12 pb-8">
            <p class="font-nunito font-bold text-lg">Bedroom Light</p>
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
