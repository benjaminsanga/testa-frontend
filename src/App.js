import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Start from './pages/Start';
import Intro from './pages/Intro';
import Questions from './pages/Questions';
import Final from './pages/FinalScore';

class App extends React.Component {
    render(){
        // return directories for navigating app major pages
        return (
            <BrowserRouter>
                <React.Fragment>
                    <Switch>
                        <Route path="/" component={Start} exact />
                        <Route path="/intro" component={Intro} />
                        <Route path="/questions" component={Questions} />
                        <Route path="/final" component={Final} />
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
