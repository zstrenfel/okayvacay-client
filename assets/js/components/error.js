import React from 'react'
import { render } from 'react-dom'
import classNames from 'classNames'
import emoji from 'node-emoji'



export default React.createClass({
  render() {
    return (
       <div className='no-trips error'>
          <span className="spin moon"> {emoji.get("hankey")} </span>
          <aside> Something went wrong and we couldn't find any results :( <br />Try changing your options and searching again. </aside>
        </div>
    )
  }
})