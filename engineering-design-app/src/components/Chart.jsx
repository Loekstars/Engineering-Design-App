import React from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryAxis,
  VictoryBrushContainer } from "victory";

// ZoomContainer is the top graph
// BrushContainer is the bottom graph

// This is the data that will be displayed on the graph
// For now, it is just a random numbers
const randvalue0 = Math.floor(Math.random() * 90) + 10;
const randvalue1 = Math.floor(Math.random() * 90) + 10;
const randvalue2 = Math.floor(Math.random() * 90) + 10;
const randvalue3 = Math.floor(Math.random() * 90) + 10;
const randvalue4 = Math.floor(Math.random() * 90) + 10;
const randvalue5 = Math.floor(Math.random() * 90) + 10;
const randvalue6 = Math.floor(Math.random() * 90) + 10;
const randvalue7 = Math.floor(Math.random() * 90) + 10;

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // Triggered by onZoomDomainChange and
  // alters VictoryBrushContainer brushDomain prop
  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  // Triggered by onBrushDomainChange and
  // alters VictoryZoomContainer zoomDomain prop
  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    return (
      <div class="flex flex-col md:max-h-32 md:max-w-lg items-center">
        <VictoryChart
          width={400}
          height={350}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              responsive={true}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              allowZoom={false}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "#2057ff" },
            }}
            data={[
                { x: new Date(2022, 1, 11), y: randvalue0 },
                { x: new Date(2022, 2, 31), y: randvalue1 },
                { x: new Date(2022, 3, 31), y: randvalue2 },
                { x: new Date(2022, 4,  3), y: randvalue3 },
                { x: new Date(2022, 6, 14), y: randvalue4 },
                { x: new Date(2022, 7, 22), y: randvalue5 },
                { x: new Date(2022, 9, 12), y: randvalue6 },
                { x: new Date(2022, 11, 4), y: randvalue7 },
            ]}
            interpolation="catmullRom"
            domain={{y: [-1, 101]}}
          />
        </VictoryChart>

        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={400}
          height={100}
          scale={{ x: "time" }}
          containerComponent={
            <VictoryBrushContainer
              responsive={true}
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush.bind(this)}
            />
          }
        >
            <VictoryAxis
                tickFormat={(x) => new Date(x).getFullYear()}
                style={{
                    tickLabels: { fill : "transparant" }}}
            />
          <VictoryLine
            style={{
              data: { stroke: "#2057ff" }
            }}
            data={[
                { x: new Date(2022, 1, 11), y: randvalue0 },
                { x: new Date(2022, 2, 31), y: randvalue1 },
                { x: new Date(2022, 3, 31), y: randvalue2 },
                { x: new Date(2022, 4,  3), y: randvalue3 },
                { x: new Date(2022, 6, 14), y: randvalue4 },
                { x: new Date(2022, 7, 22), y: randvalue5 },
                { x: new Date(2022, 9, 12), y: randvalue6 },
                { x: new Date(2022, 11, 4), y: randvalue7 },

            ]}
            interpolation="catmullRom"
            
          />
        </VictoryChart>
      </div>
    );
  }
}

export default Chart;
