import React from 'react'
import Axios from 'axios';
import { useEffect } from 'react';

const Debug = () => {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        console.log("oops")
        Axios.get('http://localhost:3001/api/get').then((response) => {
            setData(response.data);
        });
    }, []);

  return (
    <div>{data.map((val)=> {
        return <div>{val.timestamp} {val.sensor_measurement} {val.light_intensity_lamp}</div>
    })}
    </div>
)
}

export default Debug