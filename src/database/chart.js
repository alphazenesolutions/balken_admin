const barData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

class App extends React.Component {
  render() {
    const chartHeight = 350;
    const chartWidth = 650;
    const chartOptions = { maintainAspectRatio: false, responsive: false };
    return h(
      React.Fragment,
      null,
      h("h1", null, "React Chart.js Demo"),
      h(
        "p",
        null,
        h("i", null, "Original Demo using JSX:"),
        h("br", null),
        h(
          "a",
          {
            href: "https://awesome-web-react.js.org/examples/charts-and-maps/react-chartjs-2.htm",
            target: "_blank",
            rel: "noopener",
          },
          "https://awesome-web-react.js.org/examples/charts-and-maps/react-chartjs-2.htm"
        )
      ),
      h(
        "p",
        null,
        h(
          "a",
          {
            href: "https://www.chartjs.org/",
            target: "_blank",
            rel: "noopener",
          },
          "https://www.chartjs.org/"
        )
      ),
      h(
        "p",
        null,
        h(
          "a",
          {
            href: "https://github.com/jerairrest/react-chartjs-2",
            target: "_blank",
            rel: "noopener",
          },
          "https://github.com/jerairrest/react-chartjs-2"
        )
      ),
      h(
        "section",
        null,
        h("h2", null, "Pie Chart"),
        h(Pie, {
          data: pieData,
          height: chartHeight,
          width: chartWidth,
          options: chartOptions,
        })
      ),
      h(
        "section",
        null,
        h("h2", null, "Bar Chart"),
        h(Bar, {
          data: barData,
          height: chartHeight,
          width: chartWidth,
          options: chartOptions,
        })
      ),
      h(
        "section",
        null,
        h("h2", null, "Line Chart"),
        h(Line, {
          data: lineData,
          height: chartHeight,
          width: chartWidth,
          options: chartOptions,
        })
      ),
      h(
        "section",
        null,
        h("h2", null, "Radar Chart"),
        h(Radar, {
          data: radarData,
          height: chartHeight,
          width: chartWidth,
          options: chartOptions,
        })
      )
    );
  }
}
