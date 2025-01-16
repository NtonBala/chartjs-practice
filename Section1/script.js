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
};

new Chart(ctx, config);
