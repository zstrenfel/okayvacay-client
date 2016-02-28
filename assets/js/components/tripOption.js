import React from 'react'
import { render } from 'react-dom'
import emoji from 'node-emoji'
import randomcolor from 'randomcolor'



export default React.createClass({
  generateTags(tags, loc) {
    var self = this;
    var counter = 0;
    var tag_elems = tags.map(function(word) {
      counter ++;
      return (<div className='keyword' key={loc + counter}>{word}</div>)
    });
    return tag_elems;
  },
  render() {
    var trip = this.props.trip;
    var dep = trip.departure,
        ret= trip.return,
        dest = trip.destination,
        hotel = trip.hotel;
    var tags = this.generateTags(dest.tags, dep.arrival_airport_leave);
    var hStyle = {
      color: randomcolor({hue: "blue"})
    }


    var flightCost = Math.floor(dep.depart_price + ret.return_price);
    var hotelCost = Math.floor(hotel.hotel_price);
    var finalCost = hotelCost + flightCost;
    var priceStyle;
     if (finalCost < this.props.price - 150) {
      priceStyle = {color: '#1E824C'};
     } else if (finalCost >= this.props.price -150 && finalCost <= this.props.price + 100) {
      priceStyle = {color: '#F2784B'};
    } else {
      priceStyle = {color: '#EF4836'}
    }

    return (
      <div className="trip-option">
        <div className="location">
          <h1> {dep.departure_airport_leave} - <span style={hStyle}>{dep.arrival_airport_leave}</span></h1>
          <sub className="subscript">Travel to <b> {dest.city} </b> and stay at <b> {hotel.hotel_name} </b></sub>
          <p className="description">
            {dest.description}
          </p>
          <div className="dest-keywords">
            {tags}
          </div>
        </div>
        <div className="price">
          <table className="price-breakdown">
            <tbody>
            <tr>
              <td className="label">Hotel</td>
              <td>{"+ $" + hotelCost.toString()}</td>
            </tr>
            <tr>
              <td className="label">Flight</td>
              <td>{"+ $" + flightCost.toString()}</td>
            </tr>
            </tbody>
          </table>
          <h1 style={priceStyle}> {"$" + finalCost.toString()} </h1>
        </div>
      </div>
    )
  }
})