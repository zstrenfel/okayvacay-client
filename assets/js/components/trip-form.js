import React from 'react'
import { render } from 'react-dom'


export default React.createClass({
  render() {
    return(
      <div className="trip-params">
        <DatePicker
            selected={this.state.startDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            placeholderText="Click to select a start date" />
        <DatePicker
            selected={this.state.endDate}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
            placeholderText="Click to select a end date"/>
          <label htmlFor="price"> Set Your Max Price </label>
          <Rcslider name="price" onChange={this.handleChangePrice} value={this.state.max_price} max={3000}/>
          <label htmlFor="tags"> Select Your Interests </label>
          <div className="tags">
            {tags}
          </div>
        </div>
    )
  }
})