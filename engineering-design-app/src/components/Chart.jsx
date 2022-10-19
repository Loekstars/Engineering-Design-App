import React from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryAxis,
  VictoryBrushContainer,
  VictoryTooltip } from "victory";

// ZoomContainer is the top graph
// BrushContainer is the bottom graph


//const randvalue0 = Math.floor(Math.random() * 90) + 10;
class Chart extends React.Component {
  //chart data is passed in as a prop
  //show data whenever the component is loaded
  componentDidMount() { 
    console.log("1", this.props.data);
  }

  constructor(props) {
    super(props);
    //Set the data that is passed in as a prop
    //and map it to the correct victory chart format
    const chartData = this.props.data.map((chartData) => {
      return {
        x: new Date(chartData.timestamp),
        y: chartData.sensor_measurement,
        label: chartData.sensor_measurement,
      };
    });

    this.state = {
      data: chartData,
    }
    console.log("2", this.state.data)
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
              allowZoom={true}
              // onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "#2057ff" },
            }}
            interpolation="catmullRom"
            domain={{y: [-1, 101]}}
            data={this.state.data}
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
            labelComponent={<VictoryTooltip type={false} />}
            data={this.state.data}
            interpolation="catmullRom"
          />
        </VictoryChart>
      </div>
    );
  }
}

export default Chart;