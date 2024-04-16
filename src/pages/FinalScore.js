import React from 'react';
// import { Link } from 'react-router-dom';

class Final extends React.Component {
    render(){
        return (
            <div>
                <p>Hey {this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}!</p>
                <h2>
                    Thank you for using Testa. Hope you enjoyed it!
                </h2>
                <div>
                    <span>You scored</span>
                    <h2 style={{fontSize: "2rem", margin: "3.5rem"}}>{this.props.score}/10</h2>
                </div>
                <h3>
                    {this.props.score >= 8 && `High Score!!!` }
                    {this.props.score >= 5 && this.props.score < 8 && `Mid Score!!` }
                    {this.props.score < 5 && `You can do better!` }
                </h3>
                <span>Check {this.props.email} for your result.</span>
                <p>You can <a href="/" style={{fontWeight: "bolder"}}>Retake</a> the test. Or click on 'Testa' above.</p>
            </div>
        );
    }
}

export default Final;
