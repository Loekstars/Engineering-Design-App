import React from "react";
import { Line } from "react-chartjs-2";
import { useEffect } from 'react';
import Axios from 'axios';
import HashLoader from "react-spinners/HashLoader";
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

// const data1 = {
//   labels: labels,
//   datasets: [
//     {
//       label: "Power saving percentage",
//       backgroundColor: "rgb(255, 99, 132)",
//       borderColor: "rgb(255, 99, 132)",
//       data: getDataArray(),
//     },
//   ],
// };

const options = {
  animation: {
    duration: 150,
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 0,
      max: 100,
    },
  },
};


const LineChart = () => {
  const [data, setData] = React.useState([]);
  const [labelValues, setLabelValues] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  //grab data from the database if succesfol set the data and labels
  // if not succesfol set the data to a default value
  useEffect(() => {
      Axios.get('http://localhost:3001/api/get').then((response) => {
        setData(response.data);
        // console.log("Data Fetched", response.data)
        // console.log(data.data)

        //map the data to a new array
        const chartData = response.data.map((chartData) => {
          return {
            timestamp: new Date(chartData.timestamp),
            y: chartData.data,
          };
        });

        //get y values from the data to map them in the graph
        const yValues = chartData.map((chartData) => {
          return chartData.y/30000*100;
        });

        //get labels from the database to map them in the graph
        const labelValues = chartData.map((chartData) => {
          return chartData.timestamp.toLocaleString(
            'default', {weekday: 'long'}
          );
        });
        // console.log(labelValues);
        //set the data to the corresponding states
        setData(yValues);
        setLabelValues(labelValues);

        // console.log("data: ", data);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
      }).catch((err) => {
          setData([404]);
          setLabelValues(['ERROR'])
          console.log(err);
      });
    }, );

    const dataChart = {
      labels: labelValues,
      datasets: [
        {
          label: "Power saving percentage",
          backgroundColor: 'rgb(32, 87, 255)',
          borderColor: "rgb(32, 87, 255)",
          data: data,
        },
      ],
    };

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
                <div class='flex flex-col h-full w-full items-center mt-12 pl-2 pr-2'>
                {loading ? <HashLoader
                  color="#2057ff"
                  size={50}
                  class="pt-24"
                  />: <Line data={dataChart} height={300} options={options}/>}
                </div>
            </div>
        </div>
    </div>
  );
};

export default LineChart;