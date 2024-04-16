import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Intro from './introText';

class StartForm extends Component {
    constructor(props){
        super(props);

        // initialize states
        this.state = {
            name: "",
            email: "",
            isRegistered: ""
        }

        // bind functions
        this.hanldeNameChange = this.hanldeNameChange.bind(this);
        this.hanldeEmailChange = this.hanldeEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hanldeNameChange = (e) => {
        // update state to name field
        this.setState({
            name: e.target.value,
        });
    };

    hanldeEmailChange = (e) => {
        // update state to email field
        this.setState({
            email: e.target.value,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        // set borders to greenish if not valid
        if (this.state.name !== "") { 
            document.getElementById('name').style.borderBottom = "3px solid forestgreen";
        }
        if (this.validateEmail(this.state.email)) {
            document.getElementById('email').style.borderBottom = "3px solid forestgreen";
        }

        // set borders to redish if invalid
        if (this.state.name === "") { 
            document.getElementById('name').style.borderBottom = "3px solid chocolate";
        }
        if (!this.validateEmail(this.state.email)) {
            document.getElementById('email').style.borderBottom = "3px solid chocolate";
        }
        
        // init validation to false
        let valid = false;

        if(this.state.name !== "" && this.validateEmail(this.state.email) ) {
            // if validation is true
            valid = true;
        }
        
        // change state to go to the next page
        this.setState({
            isRegistered: valid
        });
    }

    validateEmail = (email) => {
        // text email against regex
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    render() {
        // return intro if registered
        if (this.state.isRegistered){
            return <Intro name={this.state.name} email={this.state.email} />
        } else {
            return (
                <div>
                    <h5><i>For online test.</i></h5>
                    <p>Fill in to proceed</p>
                    <form>
                        <input type="text" id="name" placeholder="Name" autoComplete="off" 
                                value={this.state.name} 
                                onChange={this.hanldeNameChange} />
                        <input type="email" id="email" placeholder="Email" autoComplete="off"
                                value={this.state.email} 
                                onChange={this.hanldeEmailChange}/>
                        <button onClick={this.handleSubmit}>Proceed</button>
                    </form>
                </div>
            );
        }
    }
}

export default StartForm;