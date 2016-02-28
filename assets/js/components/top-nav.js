import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute, Link, IndexLink } from 'react-router'



export default React.createClass({

  render() {
    var links;
    if (this.props.user === "") {
      links = <li><Link to="/sign-in">Sign In</Link></li>
    } else {
      links = <li><Link to="/user/settings">Log Out</Link></li>
    }
    return (
      <div className = 'top-nav'>
        <div className="half">
          <img className="ball" src={'../../imgs/ball.png'} />
        </div>
        <div className="half">
          <ul>
            {links}
          </ul>
        </div>
      </div>
    )
  }
})