'use strict';

const ctx = document.getElementById('canvas').getContext('2d');

const config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [1, 4, 1, 5, 9],
      },
    ],
  },
  options: {
    elements: {
      point: {
        pointStyle: 'rect',
        radius: 7,
        borderWidth: 3,
        borderColor: 'red',
        backgroundColor: 'yellow',
      },
      line: {
        borderWidth: 5,
        borderColor: 'blue',
      },
    },
    scales: {},
    plugins: {},
    layout: {},
    animations: false,
  },
};

new Chart(ctx, config);
