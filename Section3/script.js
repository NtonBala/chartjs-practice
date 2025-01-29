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

        console.log(graph.tenDigits);
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
