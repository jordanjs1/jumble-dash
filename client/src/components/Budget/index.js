import React, { Component } from 'react';
import BudgetAPI from '../../utils/API-budget';
import { Col, Row } from "../Grid";
import Chart1 from '../chart1';
import Chart4 from '../chart4';
import EditBudget from '../EditBudget/EditBudget'
import "./style.css"

class Budget extends Component {
    constructor(props) {
        super(props)
        this.chart1Ref = React.createRef();
        this.state = {
            budgetTotal: "",
            budgetDesign: "",
            budgetEngineering: "",
            budgetFinance: "",
            budgetHR: "",
            budgetMarketing: "",
            budgetSales: "",
            budgetSecurity: "",
            newBudgetTotal: "",
            newBudgetDesign: "",
            newBudgetEngineering: "",
            newBudgetFinance: "",
            newBudgetHR: "",
            newBudgetMarketing: "",
            newBudgetSales: "",
            newBudgetSecurity: "",
            chartSwitch: false,
            counter: 0,
            budgetDept: ["Marketing", "HR", "Design", "Engineering", "Sales", "Finance", "Security"]
        }
    }

    componentDidMount() {
        BudgetAPI.getBudget(this.props.projectID).then(res => {
            console.log(res);
            let budgetTotal = (res.data.Design + res.data.Engineering + res.data.Finance + res.data.HR + res.data.Marketing + res.data.Sales + res.data.Security)
            this.setState({
                budgetTotal: budgetTotal, 
                budgetDesign: res.data.Design,
                budgetEngineering: res.data.Engineering,
                budgetFinance: res.data.Finance,
                budgetHR: res.data.HR,
                budgetMarketing: res.data.Marketing,
                budgetSales: res.data.Sales,
                budgetSecurity: res.data.Security,
                counter: this.state.counter + 1
            })
        })
            .catch(err => console.log(err.message));
    }

    componentDidUpdate(prevProps) {

        if (this.props.projectID !== prevProps.projectID || this.props.budgetChange !== prevProps.budgetChange) {
            BudgetAPI.getBudget(this.props.projectID).then(res => {
                var arr = Object.keys(res.data);
                var deptNames = [];
                for (var i = 2; i < arr.length; i++) {
                    deptNames.push(arr[i]);
                }

                let budgetTotal = (res.data.Design + res.data.Engineering + res.data.Finance + res.data.HR + res.data.Marketing + res.data.Sales + res.data.Security)
                this.setState({
                    budgetTotal: budgetTotal, 
                    budgetDesign: res.data.Design,
                    budgetEngineering: res.data.Engineering,
                    budgetFinance: res.data.Finance,
                    budgetHR: res.data.HR,
                    budgetMarketing: res.data.Marketing,
                    budgetSales: res.data.Sales,
                    budgetSecurity: res.data.Security,
                    newBudgetTotal: "",
                    newBudgetDesign: "",
                    newBudgetEngineering: "",
                    newBudgetFinance: "",
                    newBudgetHR: "",
                    newBudgetMarketing: "",
                    newBudgetSales: "",
                    newBudgetSecurity: "",
                    chartSwitch: false,
                    counter: this.state.counter + 1
                })
            })
                .catch(err => console.log(err.message));
        }
    }

     handleInputChange = event => {

        const { name, value } = event.target
        this.setState({
            [name]: value
        });
    }

    handleChartSwitch = event => {
        event.preventDefault();

        console.log("SWITCH NOW");
        if (this.state.chartSwitch === false) {
            this.setState({
                chartSwitch: true
            })
        }
        else {
            this.setState({
                chartSwitch: false
            })
        }
    }

    updateBudget = event => {

        event.preventDefault();

        const body = {
            total: this.state.newBudgetTotal,
            Marketing: this.state.newBudgetMarketing,
            HR: this.state.newBudgetHR,
            Design: this.state.newBudgetDesign,
            Engineering: this.state.newBudgetEngineering,
            Sales: this.state.newBudgetSales,
            Finance: this.state.newBudgetFinance,
            Security: this.state.newBudgetSecurity
        }

        BudgetAPI.updateBudget(this.props.projectID, body)
            .then(res => {
                console.log("NEW BUDGET EHRE", res)
                this.setState({
                    budgetTotal: this.state.newBudgetTotal,
                    budgetDesign: this.state.newBudgetDesign,
                    budgetEngineering: this.state.newBudgetEngineering,
                    budgetFinance: this.state.newBudgetFinance,
                    budgetHR: this.state.newBudgetHR,
                    budgetMarketing: this.state.newBudgetMarketing,
                    budgetSales: this.state.newBudgetSales,
                    budgetSecurity: this.state.newBudgetSecurity,
                    newBudgetTotal: "",
                    newBudgetDesign: "",
                    newBudgetEngineering: "",
                    newBudgetFinance: "",
                    newBudgetHR: "",
                    newBudgetMarketing: "",
                    newBudgetSales: "",
                    newBudgetSecurity: "",
                    chartSwitch: false,
                    counter: this.state.counter + 1
                })
            })
            .catch(err => console.log(err.message));
    }

    render() {
        return (
            <div>
                <h1 id="nameStyling"> Budget: ${this.state.budgetTotal}</h1>
                <hr width="80%"/>
                {!this.state.chartSwitch ?
                    <Chart1
                        budgetChange={this.props.budgetChange}
                        projectID={this.props.projectID}
                        total={this.state.budgetTotal}
                        depts={this.state.budgetDept}
                        marketing={this.state.budgetMarketing}
                        hr={this.state.budgetHR}
                        design={this.state.budgetDesign}
                        engineering={this.state.budgetEngineering}
                        sales={this.state.budgetSales}
                        finance={this.state.budgetFinance}
                        security={this.state.budgetSecurity}
                    /> :
                    <Chart4
                        budgetChange={this.props.budgetChange}
                        projectID={this.props.projectID}
                        total={this.state.budgetTotal}
                        depts={this.state.budgetDept}
                        marketing={this.state.budgetMarketing}
                        hr={this.state.budgetHR}
                        design={this.state.budgetDesign}
                        engineering={this.state.budgetEngineering}
                        sales={this.state.budgetSales}
                        finance={this.state.budgetFinance}
                        security={this.state.budgetSecurity}
                    />}
                <button id='switchDoughnut' onClick={this.handleChartSwitch}>Switch</button>
              
                <EditBudget
                    budgetChange={this.props.budgetChange}
                    updateBudget={this.props.updateBudget}
                    projectID={this.props.projectID}
                    total={this.state.budgetTotal}
                    marketing={this.state.budgetMarketing}
                    hr={this.state.budgetHR}
                    design={this.state.budgetDesign}
                    engineering={this.state.budgetEngineering}
                    sales={this.state.budgetSales}
                    finance={this.state.budgetFinance}
                    security={this.state.budgetSecurity}
                />
            </div>
        );
    }
}

export default Budget;