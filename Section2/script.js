'use strict';

const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

const graph = {
  charting() {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{ data: Array(4).fill(1), backgroundColor: 'green', label: ['Winter', 'Spring', 'Summer', 'Autumn'] }],
      },
    });
  },
};

graph.charting();
