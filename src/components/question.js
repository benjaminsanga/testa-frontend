import React, { Component } from 'react';
import Final from '../pages/FinalScore';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class Question extends Component {

    constructor(props){
        super(props);
        
        // define state
        this.state = {
            // set name and email from Intro page
            name: props.name,
            email: props.email,

            // initialize state variables
            timer: 180000,
            questions: [],
            questionNumber: 0, // question numbers start from zero for array indexing purpose
            options: [],
            questionOptions: [],
            answers: Array(10).fill(null),
            isSubmitted: false,
            score: 0,
            show: false
        };

        

        // bind functions
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectOption = this.handleSelectOption.bind(this);
    }

    // Prompt() {
    //     // const [show, setShow] = useState(false);
        
      
    //     return (
          
    //     );
    //   }

    // initial call to fetch questions
    getQuestions() {
        // fetch from backend endpoint
        fetch('https://testa-webapp.herokuapp.com/getQuestions', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {

            // set initial options to empty array
            let opts = [];
            
            // questions and options are in the same dataset, we populate the datasets seperately
            // populate questions from dataset
            let quests = data.map((item, index) => { 
                opts.push(item.options); // populate options from dataset
                return item.question;
            });
            
            // set state to fetched questions and options, form local variables
            this.setState({ 
                questions: quests,
                options: opts,
                questionOptions: opts[0]
            });

        })
        .catch(err => console.log(err));
    }

    // set initial values and timer interval when component mounts
    componentDidMount = () => {
        // get questions from node
        this.getQuestions();
        
        // set timer countdown
        setInterval(async () => {

            // clear interval if timer is zero
            if (this.state.timer <= 0) {
                // stop timer
                clearInterval(this.state.timer);

                let answers = this.state.answers;        
                
                // submit answers to backend endpoint
                
                let score = await fetch(`https://testa-webapp.herokuapp.com/submit`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(answers)
                }).then(res => res.json())
                .then(data => {
                    // return score from endpoint
                    return data.score;
                })
                .catch(err => console.log(err));

                // set submission and score states
                this.setState({
                    isSubmitted: true,
                    score: score
                });

                return;
            } 
            
            // change value of state by -1 second
            this.setState({
                timer: this.state.timer - 1000,
            });
        }, 1000);
    }

    // clear interval if component is unmounting
    componentWillUnmount = () => {
        clearInterval(this.state.timer);
    }

    time_formatting(milli_sec) {

        if (milli_sec <= 60000) {
            document.getElementById('timer').style.color = "#ffa436";
        }

        // calculate minutes and seconds from timer milli seconds
        let minutes = Math.floor(milli_sec / 60000);
        let seconds = (milli_sec - (minutes * 60000)) / 1000;
        minutes = minutes < 10 ? "0"+minutes : minutes;
        seconds = seconds < 10 ? "0"+seconds : seconds;

        // return timer in minutes and seconds format
        return minutes+":"+seconds;
    }

    // handle the previous question selection button
    handlePrevious = () => {
        
        // return if on question one
        if (this.state.questionNumber === 0) return
        
        if (this.state.answers[this.state.questionNumber - 1] === null) {
            // clear radio button options selection
            this.deselectOptions();
        } else if (this.state.answers[this.state.questionNumber - 1] !== null) {
            // set the previously selected option for this question
            this.selectOption(`option_${parseInt(this.state.answers[this.state.questionNumber - 1]) + 1}`);
        }

        // decrease question number
        // set selected option for this question
        this.setState({
            questionNumber: this.state.questionNumber - 1,
            questionOptions: this.state.options[this.state.questionNumber - 1]
        });
    }

    handleNext = () => {

        // return if on question 10
        if (this.state.questionNumber === 9) return
        
        if (this.state.answers[this.state.questionNumber + 1] === null) {
            // clear radio button options selection
            this.deselectOptions();
        } else if (this.state.answers[this.state.questionNumber + 1] !== null) {
            // set the previously selected option for this question
            this.selectOption(`option_${parseInt(this.state.answers[this.state.questionNumber + 1]) + 1}`);
        }

        // decrease question number
        // set selected option for this question
        this.setState({
            questionNumber: this.state.questionNumber + 1,
            questionOptions: this.state.options[this.state.questionNumber + 1]
        });
    }

    // handle submission
    handleSubmit = async () => {
        let answers = this.state.answers;
        
        // stop timer
        clearInterval(this.state.timer);
        
        // submit answers to backend endpoint
        let score = await fetch(`https://testa-webapp.herokuapp.com/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answers)
        }).then(res => res.json())
        .then(data => {
            // return score from endpoint
            return data.score;
        })
        .catch(err => console.log(err));

        // set submission and score states
        this.setState({
            isSubmitted: true,
            score: score
        });

    }

    // set selected option
    handleSelectOption = (e) => {

        // return if the values doesn't contain an option number
        if (! /\d/.test(e.target.value)) return

        // make a copy of answers
        let answers = this.state.answers.slice();

        // and selected answer to state answers
        answers[this.state.questionNumber] = parseInt(e.target.value);

        // change answers state
        this.setState({
            answers: answers
        });
    }

    // for removing all options selection
    deselectOptions = () => {
        document.querySelector('#option_1').checked = false;
        document.querySelector('#option_2').checked = false;
        document.querySelector('#option_3').checked = false;
        document.querySelector('#option_4').checked = false;
    }

    // set a previously selected and saved option to it's state
    selectOption = (option) => {
        let patt = /\d/g;
        if (!patt.test(option)) return
        document.querySelector(`#${option}`).checked = true;
    }
    
    render(){
        const customStyle = {
            textColor: { color: '#000' },
            submitButtonColor: { backgroundColor: '#0d213d', color: '#fff', borderColor: '#fff'},
            button: {
            padding: "1rem 0.525rem",
            margin: "0.25rem",
            fontSize: "calc(10px + 2vmin)",
            width: "100%",
            backgroundColor: "#657dff",
            color: "#ffffff",
            border: "#657dff",
            borderRadius: "3px",
            cursor: "pointer",
            }
        }
      
        const handleClose = () => this.setState({show: false});
        const handleShow = () => this.setState({show: true});

        // show final score if submitted
        if(this.state.isSubmitted){
            return <Final 
                        name={this.state.name} 
                        email={this.state.email} 
                        score={this.state.score} />
        } else {
            // show questions if not submitted
            return (
                <div className="main">
                    <div className="name-time">
                        <span>Goodluck, {this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)}!</span>
                        <span id="timer">{ this.time_formatting(this.state.timer) }</span>
                    </div>
                    <h3 className="question_no">Question: {`${this.state.questionNumber+1} of ${this.state.questions.length}`}</h3>
                    <p className="question-text">
                        { this.state.questions[this.state.questionNumber] }
                    </p>
                    <div className="options">
                        <div className="group-one">
                            <div className="option">
                                <input type="radio" id="option_1" name="selectedOption"
                                        value={0} 
                                        onChange={this.handleSelectOption} />
                                <label htmlFor="option_1">{this.state.questionOptions[0]}</label>
                            </div>
                            <div className="option">
                                <input type="radio" id="option_2" name="selectedOption"
                                        value={1}
                                        onChange={this.handleSelectOption} />
                                <label htmlFor="option_2">{this.state.questionOptions[1]}</label>
                            </div>
                        </div>
                        <div className="group-two">
                            <div className="option">
                                <input type="radio" id="option_3" name="selectedOption"
                                        value={2}
                                        onChange={this.handleSelectOption}  />
                                <label htmlFor="option_1">{this.state.questionOptions[2]}</label>
                            </div>
                            <div className="option">
                                <input type="radio" id="option_4" name="selectedOption"
                                        value={3}
                                        onChange={this.handleSelectOption} />
                                <label htmlFor="option_1">{this.state.questionOptions[3]}</label>
                            </div>
                        </div>
                    </div>
                    <div className="action-buttons">
                        <button onClick={this.handlePrevious}> Previous </button>
                        <button onClick={this.handleNext}> Next </button>
                        <>
                            <Button onClick={handleShow} style={customStyle.button}>
                            Submit
                            </Button>
                    
                            <Modal
                            show={this.state.show}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                            >
                            <Modal.Header closeButton>
                                <Modal.Title style={customStyle.textColor}>Confirm Submit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={customStyle.textColor}>
                                Please click on the Confirm button to submit. Or Cancel button if this was 
                                a mistake.
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                Cancel
                                </Button>
                                <Button style={customStyle.submitButtonColor} onClick={this.handleSubmit}>Confirm</Button>
                            </Modal.Footer>
                            </Modal>
                        </>
                        {/* <button onClick={this.handleSubmit}> Submit </button> */}
                    </div>

                    
                </div>
            );
        }
    }
}

export default Question;
