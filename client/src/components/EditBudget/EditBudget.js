import React, { Component } from 'react';
import { Col, Row } from "../Grid";
import BudgetAPI from '../../utils/API-budget';
import "./style.css";

class EditBudget extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            newBudgetTotal: this.props.total,
            newMarketingBudget: this.props.marketing,
            newHRBudget: this.props.hr,
            newDesignBudget: this.props.design,
            newEngBudget: this.props.engineering,
            newSalesBudget: this.props.sales,
            newFinanceBudget: this.props.finance, 
            newSecurityBudget: this.props.security
        };
    };

    componentDidMount() {
        BudgetAPI.getBudget(this.props.projectID).then(res => {
            let budgetTotal = (res.data.Design + res.data.Engineering + res.data.Finance + res.data.HR + res.data.Marketing + res.data.Sales + res.data.Security)

            this.setState({
                id: res.data.id,
                newBudgetTotal: budgetTotal,
                newMarketingBudget: res.data.Marketing,
                newHRBudget: res.data.HR,
                newDesignBudget: res.data.Design,
                newEngBudget: res.data.Engineering,
                newSalesBudget: res.data.Sales,
                newFinanceBudget: res.data.Finance, 
                newSecurityBudget: res.data.Security,
            });

        });
    };

    componentDidUpdate(prevProps) {
        if (this.props.total !== prevProps.total || this.props.budgetChange !== prevProps.budgetChange) {

            BudgetAPI.getBudget(this.props.projectID).then(res => {

                let budgetTotal = (res.data.Design + res.data.Engineering + res.data.Finance + res.data.HR + res.data.Marketing + res.data.Sales + res.data.Security)

                this.setState({
                    id: res.data.id,
                    newBudgetTotal: budgetTotal,
                    newMarketingBudget: res.data.Marketing,
                    newHRBudget: res.data.HR,
                    newDesignBudget: res.data.Design,
                    newEngBudget: res.data.Engineering,
                    newSalesBudget: res.data.Sales,
                    newFinanceBudget: res.data.Finance, 
                    newSecurityBudget: res.data.Security,
                });
            })
                .catch(err => console.log(err.message));
        };
    };

    handleInputChange = event => {

        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    updateBudget = event => {
        event.preventDefault();

        const body = {
            total: parseInt(this.state.newBudgetTotal),
            Marketing: parseInt(this.state.newMarketingBudget),
            HR: parseInt(this.state.newHRBudget),
            Design: parseInt(this.state.newDesignBudget),
            Engineering: parseInt(this.state.newEngBudget),
            Sales: parseInt(this.state.newSalesBudget),
            Finance: parseInt(this.state.newFinanceBudget),
            Security: parseInt(this.state.newSecurityBudget),
            ProjectId: this.props.projectID
        }
        const id = this.state.id

        BudgetAPI.updateBudget(id, body).then(res => {
        })
        .catch(err => console.log(err.message));

        BudgetAPI.getBudget(this.props.projectID).then(res => {
            let budgetTotal = (res.data.Design + res.data.Engineering + res.data.Finance + res.data.HR + res.data.Marketing + res.data.Sales + res.data.Security)
            this.setState({
                id: res.data.id,
                newBudgetTotal: budgetTotal,
                newMarketingBudget: res.data.Marketing,
                newHRBudget: res.data.HR,
                newDesignBudget: res.data.Design,
                newEngBudget: res.data.Engineering,
                newSalesBudget: res.data.Sales,
                newFinanceBudget: res.data.Finance, 
                newSecurityBudget: res.data.Security,
            });
        })
            .catch(err => console.log(err.message));

        this.componentDidMount()
    }

    render(){
        return (
            <div>
                <Row id='editBudget'>
                    <Col className="xl12">
                        <h1 id="nameStyling">Edit Budget</h1>
                        <hr width="80%"/>
                    </Col>
                </Row>
                <Row>
                    <Col id = 'editBudgetFormCol' className="xl12">
                        <p className='editBudgetLabel'>Design</p>
                        <input
                            type="number"
                            value={this.state.newDesignBudget}
                            placeholder="Design"
                            onChange={this.handleInputChange}
                            className="editBudgetLabel"
                            name="newDesignBudget"
                        /><br/>
                        <p className='editBudgetLabel'>Engineering</p>
                        <input
                            type="number"
                            value={this.state.newEngBudget}
                            placeholder="Engineering"
                            onChange={this.handleInputChange}
                            className="editBudgetLabel"
                            name="newEngBudget"
                        /><br/>
                        <p className='editBudgetLabel'>Finance</p>
                        <input
                            type="number"
                            value={this.state.newFinanceBudget}
                            placeholder="Finance"
                            onChange={this.handleInputChange}
                            className="editBudgetLabel"
                            name="newFinanceBudget"
                        /><br/>
                        <p className='editBudgetLabel'>HR</p>
                        <input
                            type="number"
                            value={this.state.newHRBudget}
                            placeholder="HR"
                            onChange={this.handleInputChange}
                            className="editBudgetLabel"
                            name="newHRBudget"
                        /><br/>
                        <p className='editBudgetLabel'>Marketing</p>
                        <input
                            type="number"
                            value={this.state.newMarketingBudget}
                            placeholder="Marketing"
                            onChange={this.handleInputChange}
                            className="editBudgetLabel"
                            name="newMarketingBudget"
                        /><br/> 
                        <p className='editBudgetLabel'>Sales</p> 
                        <input
                            type="number"
                            value={this.state.newSalesBudget}
                            placeholder="Sales"
                            onChange={this.handleInputChange}
                            className="editBudgetLabel"
                            name="newSalesBudget"
                        /><br/>
                        <p className='editBudgetLabel'>Security</p>
                        <input
                            type="number"
                            value={this.state.newSecurityBudget}
                            placeholder="Security"
                            onChange={this.handleInputChange}
                            className="editBudgetLabel"
                            name="newSecurityBudget"
                        />   
                        <button id="submitBtn" onClick={(event) => {this.updateBudget(event); this.props.updateBudget(event)}}> Submit </button>
                    </Col>
                </Row>
            </div>
        );
    };
}

export default EditBudget;