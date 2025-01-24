'use strict';

Chart.register(ChartDataLabels);

const canvas = document.getElementById('myChart');
const ctx = canvas.getContext('2d');

const graph = {
  monthColors: [
    '#12bfe7',
    '#56cedc',
    '#91cad3',
    '#90e5a4',
    '#64dc78',
    '#37cc54',
    '#f9ec07',
    '#f2e541',
    '#f2ff71',
    '#eec375',
    '#e8b25c',
    '#e2932a',
  ].map((color) => color + '80'),
  seasonColors: [],
  monthsLabels: [],
  monthsDays: [],
  seasonDays: [],

  dataGenerator() {
    graph.seasonColors = [1, 4, 7, 10].map((index) => graph.monthColors[index]);

    for (let month = -1; month < 11; month++) {
      graph.monthsLabels.push(moment().month(month).format('MMMM'));
      graph.monthsDays.push(moment().month(month).daysInMonth());
    }

    for (let i = 0; i < graph.monthsDays.length; i += 3) {
      graph.seasonDays.push(graph.monthsDays[i] + graph.monthsDays[i + 1] + graph.monthsDays[i + 2]);
    }
  },

  charting() {
    graph.dataGenerator();

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          { data: graph.seasonDays, backgroundColor: graph.seasonColors, label: ['Winter', 'Spring', 'Summer', 'Autumn'] },
          { data: graph.monthsDays, backgroundColor: graph.monthColors, label: graph.monthsLabels },
        ],
      },
      options: {
        maintainAspectRatio: false,
        animation: false,
        offset: 30,
        borderWidth: 1,
        borderRadius: 15,
        hoverBackgroundColor: 'rgba(255, 255, 255, 0.7)',
        hoverBorderColor: 'black',
        hoverBorderWidth: '2',
        hoverOffset: -50,
        circumference: 360,
        radius: window.innerHeight / 2 - 20,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label[context.dataIndex]} (days: ${context.dataset.data[context.dataIndex]})`,
            },
          },
          datalabels: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: 4,
            padding: 4,
            color: 'blue',
            font: {
              weight: 'bold',
            },
            formatter: (value, context) => context.dataset.label[context.dataIndex],
          },
        },
      },
    });
  },
};

graph.charting();
