import React from 'react'
import Axios from 'axios';
import { useEffect } from 'react';

// Code for the debug page
const Debug = () => {
    const [data, setData] = React.useState([]);
    // fetches the data from the api and sets the data to the data variable
    // then it returns the data
    useEffect(() => {
        console.log("oops")
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setData(response.data);
        });
    }, []);

  return (
    // returns the data in a table to the page
    <div>{data.map((val)=> {
        return <div>{val.timestamp} {val.sensor_measurement} {val.light_intensity_lamp}</div>
    })}
    </div>
)
}

export default Debug