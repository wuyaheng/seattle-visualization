import React from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-labels';
import moment from 'moment';
import 'chartjs-plugin-annotation';

function TotalPerDayChart(props) {

  const LineChart = () => {

    let options = {
      legend: {
        display: false,
        reverse: true
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        labels: {
          render: 'value',
          precision: 0,
          showZero: true,
          fontSize: 13,
          fontColor: '#fff',
          arc: false,
          showActualPercentages: true,
          outsidePadding: 4,
          textMargin: 4
        }
      },
      title: {
        display: true,
        text: 'Total 911 Calls Per Day', 
        fontSize: 15
     },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
            },
            ticks: {
              display: true
            }
          }
        ],
        yAxes: [{
          ticks: {
            display: true,
            stepSize: 1,
            beginAtZero: true
          },
          gridLines: {
            display: true
          }
      }]
      }
    };


     return (
        <Line
          data={{
            labels: props.results.map((x) => moment(x.datetime).format("l")),
            datasets: [
              {
                data: props.results.map((x) => x.incident_number), 
                backgroundColor: "#9eb3c2"
              },
            ],
          }}
          options={options} 
          height={300}
        />
      );

  };



  return (
        <div>
          <LineChart /> 
        </div>
  );
}

export default TotalPerDayChart;