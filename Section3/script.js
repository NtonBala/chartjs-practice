'use strict';

const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

ctx.canvas.parentNode.style.height = '92%';
ctx.canvas.parentNode.style.width = '100%';

const graph = {
  piChart: null,
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
      },
    });
  },
};

window.addEventListener('load', function () {
  graph.charting();
});
