import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import StartForm from '../components/startForm';
import '../css/Start.css';

class Start extends React.Component {
  render(){
    return (
      <div className="App">
        <Header showSubtitle={false} />
        <StartForm />
        <Footer />
      </div>
    );
  };
}

export default Start;
