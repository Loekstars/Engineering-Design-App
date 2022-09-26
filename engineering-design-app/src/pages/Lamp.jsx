import React from 'react'
import { CirclePicker } from 'react-color'
import LampSettings from '../components/LampSettings'

const Lamp = () => {
  return (
    <div className="App">
    <div class="flex flex-col items-center">
      <div id='Information' class="flex flex-col w-3/4 items-center">
        <div id='Information-Title' class="pt-16 pb-8 tex">
            <p class="font-nunito">Bedroom Light</p>
        </div>
        <div id='Information-Content' class="pb-16">
            <CirclePicker />
        </div>
      </div>
      <div id='Settings-Lamp' class="w-3/4">
        <div id='Lamp-Settings-brightness'>
          <div>
            Brightness
          </div>
          <LampSettings />
        </div>
        <div>
            Sensor Sensitivity
          </div>
          <LampSettings />
      </div>
    </div>
  </div>
  )
}

export default Lamp