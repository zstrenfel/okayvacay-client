//import all files here for configuration through gulp
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './app.js'
import Blank from './components/blank'
import Home from './components/home'



render (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/user/dashboard' component={Home} />
      <Route path='/sign-in' component={Blank}/>
      <Route path='/user/settings' component={Blank}/>
    </Route>
  </Router>,
  document.getElementById('container')
)