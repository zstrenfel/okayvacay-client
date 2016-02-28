import React from 'react'
import { render } from 'react-dom'
import classNames from 'classNames'
import emoji from 'node-emoji'



export default React.createClass({
  render() {
    return (
       <div className='no-trips'>
          <span className="spin moon"> {emoji.get("egg")} </span>
          <aside className="in-in-out"> Cooking up your options... </aside>
        </div>
    )
  }
})