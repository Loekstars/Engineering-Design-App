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
            class="text-widget-blue w-16 align-end font-thin focus:none pt-2 absolute left-2"
            >
            <a href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="63" height="29" fill="none" viewBox="0 0 63 29">
                <g clip-path="url(#a)">
                  <path stroke="#2057FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.3" d="m19.878 23-7.065-7.286L20.288 8"/>
                  <path fill="#2057FF" d="M24.41 21V9.364h4.067c.81 0 1.48.14 2.006.42.526.277.918.65 1.176 1.12.258.465.386.982.386 1.55 0 .5-.089.913-.267 1.24a2.077 2.077 0 0 1-.693.772c-.284.19-.593.33-.926.42V15c.356.023.714.148 1.074.375.36.227.66.553.903.977.243.424.364.944.364 1.557 0 .583-.133 1.108-.398 1.574-.265.466-.683.835-1.255 1.108-.572.273-1.317.409-2.233.409h-4.205Zm1.408-1.25h2.796c.92 0 1.573-.178 1.96-.534.39-.36.585-.796.585-1.307 0-.394-.1-.758-.301-1.09A2.18 2.18 0 0 0 30 16.01c-.371-.204-.81-.306-1.318-.306h-2.864v4.045Zm0-5.273h2.614a2.58 2.58 0 0 0 1.148-.25c.344-.166.617-.401.818-.704a1.87 1.87 0 0 0 .306-1.069 1.77 1.77 0 0 0-.534-1.3c-.356-.36-.92-.54-1.693-.54h-2.659v3.863Zm11.384 6.727a3.546 3.546 0 0 1-1.506-.312 2.584 2.584 0 0 1-1.074-.915c-.265-.401-.398-.886-.398-1.454 0-.5.099-.906.296-1.216.197-.315.46-.56.79-.739a4.15 4.15 0 0 1 1.09-.398c.402-.09.806-.162 1.21-.216.531-.068.961-.119 1.29-.153.334-.038.576-.1.728-.187.155-.088.233-.239.233-.455v-.045c0-.561-.154-.997-.46-1.307-.304-.31-.764-.466-1.381-.466-.64 0-1.142.14-1.506.42-.363.28-.62.58-.767.898l-1.273-.455c.228-.53.53-.943.91-1.238.382-.3.799-.508 1.25-.625a5.19 5.19 0 0 1 1.34-.182c.28 0 .603.034.966.102a3.09 3.09 0 0 1 1.063.404c.344.204.63.513.858.926.227.413.34.966.34 1.659V21h-1.34v-1.182h-.068a2.36 2.36 0 0 1-.455.608c-.212.216-.494.4-.846.551-.353.152-.783.227-1.29.227ZM37.406 20c.53 0 .977-.104 1.341-.313a2.127 2.127 0 0 0 1.114-1.846v-1.227c-.057.068-.182.13-.375.187-.19.053-.41.1-.66.142a29.81 29.81 0 0 1-1.283.17c-.349.046-.675.12-.978.222a1.682 1.682 0 0 0-.727.45c-.182.196-.273.465-.273.806 0 .466.173.818.517 1.057.349.235.79.352 1.324.352Zm9.789 1.182c-.819 0-1.523-.193-2.114-.58a3.778 3.778 0 0 1-1.364-1.596c-.318-.678-.477-1.453-.477-2.324 0-.886.163-1.669.489-2.347.33-.682.788-1.214 1.375-1.596.59-.387 1.28-.58 2.068-.58.614 0 1.167.114 1.659.341.492.227.896.546 1.21.954.315.41.51.887.585 1.432h-1.34c-.103-.397-.33-.75-.682-1.056-.349-.311-.819-.466-1.41-.466-.522 0-.98.136-1.374.409-.39.269-.696.65-.915 1.142-.216.488-.324 1.062-.324 1.721 0 .675.106 1.262.318 1.762.216.5.52.888.91 1.165.393.276.855.414 1.386.414.348 0 .664-.06.949-.181.284-.122.524-.296.721-.523.197-.227.337-.5.42-.819h1.341a3.1 3.1 0 0 1-.562 1.393 3.15 3.15 0 0 1-1.176.977c-.485.238-1.05.358-1.693.358Zm6.642-3.364-.023-1.659h.273l3.818-3.886h1.659l-4.068 4.113h-.114l-1.545 1.432ZM52.587 21V9.364h1.34V21h-1.34Zm5.545 0-3.409-4.318.955-.932L59.837 21h-1.705Z"/>
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
