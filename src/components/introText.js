import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Question from './question';

class Intro extends Component {

    constructor(props) {
        super(props);
        
        let verified = false;
        // check if name and email are not present
        if (props.name !== null || props.email !== null || props.name !== '' || props.email !== '') {
            // set verified to false
            verified = true;
        }

        // set name, email states from props
        this.state = {
            name: props.name,
            email: props.email,
            isStarted: false,
            verified: verified
        };

        // bind functions
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.setState({ isStarted: true });
    };

    render() {
        
        // display question component with conditions
        if (this.state.isStarted && this.state.verified) {
            return <Question name={this.state.name} email={this.state.email} />
        }

        return (
            <div className="intro-div">
                <h4>Hello {this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)}</h4>
                <p className="text">
                    Welcome to Testa! Where you answer some questions as a simple test. 
                    It was created for practice, mine and yours. 
                    Hope you enjoy and share this piece of Open Source project :)
                </p>
                <button onClick={this.handleClick} className="start-btn">Start Test</button>
                <i style={{marginTop: "0.5rem", color: "#ffb825"}}>This will start the Questions and Timer!</i>
            </div>
        );
    }
}

export default Intro;
