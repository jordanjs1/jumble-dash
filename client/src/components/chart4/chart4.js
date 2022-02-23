import React, { Component } from 'react';
var Chart = require("chart.js")

class Chart4 extends Component {

  constructor(props) {
    super(props);
    this.chart4Ref = React.createRef();
  }

  componentDidMount() {
    this.chart4 = new Chart(this.chart4Ref.current, {
      type: 'polarArea',
      data: {
        labels: this.props.depts,
        datasets: [{
          data: [this.props.marketing, this.props.hr, this.props.design, this.props.engineering, this.props.sales, this.props.finance, this.props.security],
          backgroundColor: ['#e47676', '#ffb01d', '#b0fff4', '#6ec56e', '#9e9e9e', '#47b4b4', '#ffff89']
        }]
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.total !== prevProps.total || this.props.budgetChange !== prevProps.budgetChange) {
      this.chart4.destroy();
      this.chart4 = new Chart(this.chart4Ref.current, {
        type: 'polarArea',
        data: {
          labels: this.props.depts,
          datasets: [{
            data: [this.props.marketing, this.props.hr, this.props.design, this.props.engineering, this.props.sales, this.props.finance, this.props.security],
            backgroundColor: ['#e47676', '#ffb01d', '#b0fff4', '#6ec56e', '#9e9e9e', '#47b4b4', '#ffff89']
          }]
        }
      });
    }
  }

  render() {
    return (
      <div>
        <canvas className='chart' ref={this.chart4Ref} />
      </div>
    )
  };

};

export default Chart4;