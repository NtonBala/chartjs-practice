'use strict';

const ctx = document.getElementById('canvas').getContext('2d');

const config = {
  type: 'pie',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        data: [1, 4, 1, 5, 9],
      },
    ],
  },
};

const chartObj = new Chart(ctx, config);

// console.log(chartObj);

// window.addEventListener('click', (e) => {
//   chartObj.config.type = 'bar';
//   chartObj.update();
// });
