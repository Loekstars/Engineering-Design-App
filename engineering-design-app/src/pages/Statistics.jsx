import React from 'react';
import Chart from '../components/Chart';

const Statistics = () => {

  return (
    <div className='App'>
        <div class="container mx-auto align-center">
            <div class='flex flex-col items-center pt-8'>
                <div id='Information' class='flex flex-col w-3/4 md:w-2/5 items-center'>
                    <div class="pt-3 font-light w-full text-xl text-left pl-1 pr-1">
                        <div class="w-24">
                            Statistics
                        </div>
                    </div>
                </div>
                <div class='flex flex-col w-full items-center'>
                    <Chart/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Statistics