import React, { Component } from 'react';
import "./style.css";
var Chart = require("chart.js")

class Chart3 extends Component {

    constructor(props) {
        super(props);
        this.chart3Ref = React.createRef();
    }

    componentDidMount() {
        this.chart3 = new Chart(this.chart3Ref.current, {
            type: 'bar',
            data: {
                labels: ['Total Tasks (in %)'],
                datasets: [{


                    label: 'Complete',
                    data: [(this.props.complete / (this.props.complete + this.props.incomplete)) * 100],
                    backgroundColor: ['#e47676']
                },
                {
                    label: 'Incomplete',
                    data: [(this.props.incomplete / (this.props.complete + this.props.incomplete)) * 100],
                    backgroundColor: ['#e47676']
                }
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            min: 0,
                            max: ((this.props.complete + this.props.incomplete) / (this.props.complete + this.props.incomplete)) * 100
                        }
                    }]
                }
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.counter !== prevProps.counter) {
            this.chart3.destroy();
            this.chart3 = new Chart(this.chart3Ref.current, {
                type: 'bar',
                data: {
                    labels: ['Total Tasks (in %)'],
                    datasets: [{

                        label: 'Complete',
                        data: [(this.props.complete / (this.props.complete + this.props.incomplete)) * 100],
                        backgroundColor: ['#6ec56e'],
                        hoverBackgroundColor: ['#6ec56e']

                    },
                    {
                        label: 'Incomplete',
                        data: [(this.props.incomplete / (this.props.complete + this.props.incomplete)) * 100],
                        backgroundColor: ['#e47676'],
                        hoverBackgroundColor: ['#e47676']
                    }
                    ]
                },
                options: {
                    scales: {
                        xAxes: [{
                            stacked: true
                        }],
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                min: 0,
                                max: 100
                            }
                        }]
                    }
                }
            });
        }
    }

    render() {
        return (
            <div>
                <h1 id="chart2title">Task Completion</h1>
                <hr width="80%"/>
                <canvas className='chart3' ref={this.chart3Ref} />
            </div>
        )
    };

};

export default Chart3;