'use strict';

Chart.register(ChartDataLabels);

const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

ctx.canvas.parentNode.style.height = '92%';
ctx.canvas.parentNode.style.width = '100%';

const graph = {
  piChart: null,
  // * Array of numbers each showing how often (%) a digit from 0 to 9 occur in the number of Pi.
  // * Digit from 0 to 9 are represented by array indexes.
  myData: [0, 20, 10, 10, 10, 30, 10, 0, 0, 10],
  myLabels: [...Array(10).keys()],

  charting() {
    graph.piChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        datasets: [{ data: graph.myData }],
        labels: graph.myLabels,
      },
      options: {
        maintainAspectRatio: false,
        animation: false,
        offset: 40,
        plugins: {
          title: {
            display: true,
            text: 'Distribution of digits in the mathematical constant Pi',
            color: 'white',
            font: {
              size: 20,
              weight: 'bold',
            },
          },
          legend: false,
          datalabels: {
            formatter: (value, context) => `${context.dataIndex}: ${value.toFixed(1)}%`,
            color: 'white',
            font: {
              weight: 'bold',
            },
          },
        },
      },
    });
  },
};

window.addEventListener('load', function () {
  graph.charting();
});
