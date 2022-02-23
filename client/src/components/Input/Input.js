import React from "react";
import "./style.css";

class Input extends React.Component {
	
	render(){
		const inputStyles = {
			backgroundSize: `16px`
		}
		return(
			<input 
			id={this.props.elementID} 
			name={this.props.name} 
			className="input" 
			type={this.props.inputType} 
			placeholder={this.props.placeholder} 
			style={inputStyles} 
			required={this.props.required} 
			minLength={this.props.size} 
			size={this.props.size}
			onChange={(e)=>this.props.handleChange(e)}/>
		);
	}
}

export default Input;



