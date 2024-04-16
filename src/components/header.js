import React, { Component } from 'react';
// import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <h1><a href="/">Testa</a></h1>
                {this.props.showSubtitle && 
                <p>
                    Test your knowledge. This is created for online test.
                </p>}
            </header>
        );
    }
}

export default Header;
