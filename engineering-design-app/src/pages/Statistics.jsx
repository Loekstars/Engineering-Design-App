import React from "react";
import { Line } from "react-chartjs-2";
import { useEffect } from 'react';
import Axios from 'axios';
import HashLoader from "react-spinners/HashLoader";
import { Chart, registerables} from 'chart.js';
Chart.register(...registerables);

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
  // const [dataLoaded, setDataLoaded] = React.useState(false);

  //grab data from the database if succesfol set the data and labels
  // if not succesfol set the data to a default value
  useEffect(() => {
      Axios.get('http://localhost:3001/api/getChartData').then((response) => {
        // calculate the power saving percentage
        var powerSavingPercentage = response.data.map((item) => {
          var powerSaving = 100 - (Math.round((item.luminance / 10000) * 25)*4);
          return powerSaving;
        });

        // take the average of every 10 datapoints and calculate the average
        // then add that to a new array
        var averagePowerSavingPercentage = [];
        var sum = 0;
        for (var i = 0; i < powerSavingPercentage.length; i++) {
          sum += powerSavingPercentage[i];
          if (i % 10 === 0 && i !== 0) {
            averagePowerSavingPercentage.push(Math.round(sum / 10));
            sum = 0;
          }
        }
        console.log(averagePowerSavingPercentage);
        setData(averagePowerSavingPercentage);


        //map the data to a new array
        const chartData = response.data.map((chartData) => {
          return {
            timestamp: new Date(chartData.timestamp),
            y: chartData.data,
          };
        });
        console.log("Chartdata: ", chartData);

        //get labels from the database to map them in the graph
        const labelValues = chartData.map((chartData) => {
          // get the hours and minutes from the timestamp
          var hours = chartData.timestamp.getHours();
          var minutes = chartData.timestamp.getMinutes();
          // add a 0 in front of the minutes if the minutes are less than 10
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          // return the hours and minutes
          return hours + ":" + minutes;
        });

        // create the labels for the chart
        var labels = [];
        for (var j = 0; j < labelValues.length; j++) {
          if (j % 10 === 0) {
            labels.push(labelValues[j]);
          }
        }
        console.log(labels);
        setLabelValues(labels);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
      
      }).catch((err) => {
          setData([404]);
          setLabelValues(['ERROR'])
          console.log(err);
      
      });
    }, []);

    // set the data for the chart
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