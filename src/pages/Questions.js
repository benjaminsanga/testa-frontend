import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Question from '../components/question';
import '../css/questions.css';

class Questions extends React.Component {
  render(){
    return (
      <div>
        <Header showSubtitle={false} />
        <Question />
        <Footer />
      </div>
    );
  };
}

export default Questions;
