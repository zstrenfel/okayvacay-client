import React from 'react'
import { render } from 'react-dom'
import classNames from 'classNames'
import emoji from 'node-emoji'



export default React.createClass({
  render() {
    return (
       <div className='no-trips'>
          <span className="spin moon"> {emoji.get("new_moon_with_face")} </span>
          <aside> You haven't searched for anything, yet. </aside>
        </div>
    )
  }
})