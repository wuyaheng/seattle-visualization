import React from "react";
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-labels';
import moment from 'moment';
import 'chartjs-plugin-annotation';

function TotalPerDayChart(props) {

  const LineChart = () => {

    let options = {
      elements: {
        point:{
            radius: 0.3
        }},
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
        text: 'Total 911 Calls Per Day in 2021', 
        fontSize: 15
     },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month'
            },
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
            beginAtZero: true,
          },
          gridLines: {
            display: true
          }
      }]
      }
    };

    window.props = props;

    let data_2021 = props.results.filter(x => x?.datetime?.includes("2021"))

    console.log(data_2021)
     return (

        <Line
          data={{
            labels: data_2021.map((x) => moment(x.datetime).format("l")),
            datasets: [
              {
                data: data_2021.map((x) => x.incident_number), 
                fill: false
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