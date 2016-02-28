import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'


export default React.createClass({
  getInitialState() {
    return {
      user: "",
      email: "",
      password: "",
      confirm_password: ""
    }
  },
  handleChange(name, e) {
    var change = {},
        path = "/user/dashboard";
    change[name] = e.target.value;
    this.setState(change)
    browserHistory.push(path)
  },
  submit(e) {
    e.preventDefault();
    this.props.handleSubmit(e.target[0].value);
  },
  render() {
    return (
      <div className='splash'>
        <div className="half splash-content">
          <img src={'../../imgs/logo.png'} />
          <p> When you can't afford to go to Hawaii, we have your back. </p>
          <form className="sign-up" onSubmit={this.submit}>
            <label htmlFor="email"> Email </label>
            <input type="text"
                   value={this.state.email}
                   onChange={this.handleChange.bind(this, 'email')}/>
            <label htmlFor="password"> Password </label>
            <input type="password"
                   value={this.state.password}
                   onChange={this.handleChange.bind(this, 'password')}/>
            <label htmlFor="confirm_password"> Confirm Password </label>
            <input type="password"
                   value={this.state.confirm_password}
                   onChange={this.handleChange.bind(this, 'confirm_password')}/>
             <button className='create-account' type="submit"> Sign Me Up </button>
          </form>

        </div>
         <div className="half hula">
          <img className="hula rise" src={'../../imgs/hula.png'} />
        </div>
      </div>
    )
  }

})
