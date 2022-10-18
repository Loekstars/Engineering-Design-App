import React from 'react';
import Chart from '../components/Chart';
import { useEffect } from 'react';
import Axios from 'axios';

const Statistics = () => {
    
    const [data, setData] = React.useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setData(response.data);
            console.log("Data Fetched")
            console.log(response.data)
        });
      }, []);

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
                    <Chart data={data}/>
                </div>
            </div>
        </div>
    </div>
  )
}
export default Statistics