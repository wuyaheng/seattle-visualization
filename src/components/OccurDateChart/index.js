import React from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-labels';
import moment from 'moment';
import 'chartjs-plugin-annotation';

function OccurDateChart(props) {

  const LineChart = ({ type }) => {
    const obj = {};

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
        text: '911 Calls Occurred Date', 
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

    props.results.forEach((ele) => {
      const key = ele[type];
      if (key)
        if (obj[key]) {
          obj[key] += 1;
        } else {
          obj[key] = 1;
        }
    });


    let entries =
      Object.entries(obj).sort((a, b) => (a[0] > b[0] ? 1 : -1)) || [];
     return (
        <Line
          data={{
            labels: entries.map((x) => moment(x[0]).format("l")),
            datasets: [
              {
                data: entries.map((x) => x[1]), 
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
          <LineChart type="datetime"/> 
        </div>
  );
}

export default OccurDateChart;