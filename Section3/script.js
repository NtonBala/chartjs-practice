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
  // * Collects groups of 10 digits.
  tenDigits: [],
  // * A fraction to display the limit digit to be analyzed.
  limit: 500 / 50,
  // * Frequency distribution - counts the number of occurrences of corresponding digits.
  distribution: Array(10).fill(0),
  // * Percentage of occurrences for each digit from 0 to 9 (section labels value).
  percent: Array(10).fill(0),
  // * Interval used to dynamically change the charts.
  timerId: null,
  // * Counts the number of new charts. One chart corresponds to ten decimal places analyzed.
  step: 0,
  // * Controls the time interval of the chart change in ms.
  speed: 1000,

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
          subtitle: {
            display: true,
            text: 'step: 0',
            color: 'yellow',
            font: { size: 44 },
          },
          legend: { display: false },
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

  updatePiChart(chart, info) {
    const { step, limit, timerId, piChart, percent, speed } = this;

    if (step <= limit) {
      graph.updateData();
      chart.data.datasets.splice(0, 1, { data: info });
      chart.options.plugins.subtitle.text = step;

      chart.update();
      // ! As we start below new timers with new arguments that leads to unpredictable results. To avoid this we clear interval first.
      clearInterval(timerId);
      this.timerId = setInterval(() => graph.updatePiChart(piChart, percent), speed);
    } else {
      clearInterval(this.timerId);
    }
  },

  // * Updates the data (percent array) to build a new chart.
  updateData() {
    const { tenDigits, distribution, percent, step } = this;

    for (let digit of tenDigits[step]) {
      distribution[digit]++;
    }

    const result = distribution.reduce((sum, elem) => sum + elem, 0);

    for (let i = 0; i < 10; i++) {
      percent[i] = (100 * distribution[i]) / result;
    }

    this.step++;
  },

  // * Reads data file (e.g. data.txt) and builds tenDigits array.
  handleFileSelect(e) {
    const file = e.target.files[0];

    if (file.type.includes('text')) {
      const reader = new FileReader();

      reader.readAsText(file);
      reader.onload = () => {
        // * Reads file lines and limits the number of strings to be processed by limit prop.
        const allData = reader.result.split('\r\n').slice(0, graph.limit);
        graph.tenDigits = allData.flatMap((data) => data.split(' ').slice(0, 5));

        graph.updatePiChart(graph.piChart, graph.percent);
      };
    } else {
      return alert(`${file.name} is not a valid text file`);
    }
  },
};

window.addEventListener('load', function () {
  graph.charting();
  this.document.getElementById('file').addEventListener('change', graph.handleFileSelect);
});
