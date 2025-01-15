'use strict';

const ctx = document.getElementById('canvas').getContext('2d');

const config = {
  type: 'bubble',
  data: {
    datasets: [
      {
        data: [
          { x: 20, y: 30, r: 48 },
          { x: 45, y: 12, r: 22 },
          { x: 24, y: 33, r: 40 },
          { x: 15, y: 17, r: 16 },
          { x: 30, y: 24, r: 100 },
          { x: 37, y: 15, r: 80 },
        ],
        pointStyle: 'circle',
        pintRadius: 2,
      },
    ],
  },
};

new Chart(ctx, config);
