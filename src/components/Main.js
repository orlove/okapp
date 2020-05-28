import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Quiz from '../pages/Quiz';

const Main = ({ setTitle }) => {
	return (
    <Switch>
      <Route exact path='/' render={props => {setTitle("Index Page"); return (<Home {...props} />)}} />
      <Route exact path='/quiz' render={props => {setTitle("Quiz Page"); return (<Quiz {...props} />)}} />
    </Switch>
	);
}

export default Main;
