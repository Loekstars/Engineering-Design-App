import React from 'react';
import Chart from '../components/Chart';
import { useEffect } from 'react';
import Axios from 'axios';
import HashLoader from "react-spinners/HashLoader";

//On this page we show the data that has been collected by the lampsensor.

const Statistics = () => {
    
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    //Create loading animation and wait for loading animation to end to show chart
    useEffect(() => {
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setData(response.data);
            console.log("Data Fetched")
            setTimeout(() => {
                setLoading(false);
            }, 1000);

            console.log(response.data)
        }).catch((err) => {
            console.log(err);
        });

        setData([{timestamp: '1995-12-17T03:24:00', sensor_measurement: 80}]);
      }, []);

  return (
    <div className='App'>
        <div class="container mx-auto align-center">
            <div class='flex flex-col items-center pt-8 h-screen'>
                <div id='Information' class='flex flex-col w-3/4 md:w-2/5 items-center'>
                    <div class="pt-3 font-light w-full text-xl text-left pl-1 pr-1">
                        <div class="w-24">
                            Statistics
                        </div>
                    </div>
                </div>
                <div class='flex flex-col h-full w-full items-center mt-16'>
                    {loading ? <HashLoader
                        color="#2057ff"
                        size={75}	
                        />: <Chart data={data}/>}
                </div>
            </div>
        </div>
    </div>
  )
}
export default Statistics