'use strict';

const ctx = document.getElementById('canvas').getContext('2d');

const config = {
  type: 'scatter',
  data: {
    datasets: [
      {
        data: [
          { x: 20, y: 30 },
          { x: 45, y: 12 },
          { x: 24, y: 33 },
          { x: 15, y: 17 },
          { x: 30, y: 24 },
          { x: 37, y: 15 },
        ],
        pointStyle: 'circle',
        pintRadius: 2,
      },
    ],
  },
};

new Chart(ctx, config);
