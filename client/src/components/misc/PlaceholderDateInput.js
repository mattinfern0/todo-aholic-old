import React from 'react';

// This input component starts as type text, 
//changes to type date when focused on

/* Props:
    class
    placeholder
    initalValue
    onChange
    
*/ 
class PlaceholderDateInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: "text",
        };
    }

    render(){
        return (
            <input 
                className={this.props.class}
                type={this.state.type} 
                value={this.props.value} 
                onChange={this.props.onChange}
                onFocus={() => this.setState({type: "date"})}
                onBlur={() => this.setState({type: "text"})}
                placeholder={this.props.placeholder}
            >
            </input>
        )
    }

    reset(){
        this.setState({value: ""});
    }
}

export default PlaceholderDateInput;