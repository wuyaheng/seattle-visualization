import React from "react";
import { Bar } from "react-chartjs-2";
import 'chartjs-plugin-labels';

function CallTypeChart(props) {

  const BarChart = ({ type }) => {
    const obj = {};
    const colorArray = [
        "#9eb3c2",
        "#cdd7d6",
        "#cc8b86",
        "#afcad0",
        "#b392ac",
        "#7f7f7f"
      ];

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
        text: '911 Calls By Type', 
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
            display: true
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
      Object.entries(obj).filter((x) => x[1] <=10 ).sort((a, b) => (a[1] > b[1] ? -1 : 1)) || [];

     return (
        <Bar
          data={{
            labels: entries.map((x) => x?.[0]),
            datasets: [
              {
                data: entries.map((x) => x?.[1]), 
                backgroundColor: colorArray
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
          <BarChart type="type" />
        </div>
  );
}

export default CallTypeChart;