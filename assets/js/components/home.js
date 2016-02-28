import React from 'react'
import { render } from 'react-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Rcslider from 'rc-slider'
import randomcolor from 'randomcolor'
import classNames from 'classNames'
import TripContainer from './tripContainer'
import $ from "jquery"
import emoji from 'node-emoji'


export default React.createClass({
  getInitialState() {
    return {
      startDate: moment().add(1, 'days'),
      endDate: moment().add(2, 'days'),
      maxPrice: 1000,
      keywords: [],
      airport: "SFO",
      trip: null,
      url: "http://localhost:3000/plantrips.json",
      status: null
    }
  },
  handleChangeStart(date) {
    this.setState({startDate: date});
  },
  handleChangeEnd(date) {
    this.setState({endDate: date});
  },
  handleChangePrice(price) {
    this.setState({maxPrice: price});
  },
  handleClickButton(word) {
    var newWords = this.state.keywords.slice();
    if (this.state.keywords.indexOf(word) < 0) {
      newWords.push(word);
      this.setState({keywords: newWords});
    } else {
      var index = this.state.keywords.indexOf(word);
      newWords.splice(index, 1);
      this.setState({keywords: newWords});
    }
  },
  handleChangeAirport(airport) {
    this.setState({airport: airport});
  },
  submit(e) {
    var self, data;
    e.preventDefault();
    self = this;
    this.setState({status: "loading"});
    data = {
      date_start: self.state.startDate.format('YYYY-MM-DD'),
      date_end: self.state.endDate.format('YYYY-MM-DD'),
      max_price: self.state.maxPrice,
      tags: self.state.keywords,
      start_airport: self.state.airport
    };
    $.ajax({
      type:'POST',
      url: self.state.url,
      data: data
    })
    .done((data) => {
      console.log(emoji.get('fire'));
      this.setState({trip: data, status:"loaded"});
    })
    .fail((err) => {
      console.log(err);
      console.log('something went wrong');
      this.setState({status:"error"});
    })
  },
  generateTags() {
    var keywords = ['outdoors', 'city', 'countryside', 'nightlife', 'beach', 'mountains', 'sightseeing', 'relaxing',
                    'fresh-air', 'shopping', 'museum'];
    var self = this,
        counter = 0;
    var tag_elems = keywords.map(function(word) {
      var selected = {},
          classes;
      selected.selected = self.state.keywords.indexOf(word) > -1 ? true : false;
      classes = classNames('keyword', selected);
      counter += 1;
      return (<div className={classes} data-name={word} onClick={self.handleClickButton.bind(null, word)} key={'b' + counter}>{word}</div>)
    });
    return tag_elems;
  },
 render() {
    var tags = this.generateTags();
    console.log(this.state.trip);
    return (
      <div className="home">
          <form onSubmit={this.submit} className="trip-params">
          <div className='third'>
            <label htmlFor="airport"> Departing Airport (e.g. SFO) </label>
            <input
                value={this.state.airport}
                onChange={this.handleChangeAirport}/>
          </div>
          <div className='third'>
            <label htmlFor="startDate"> Starting Avaliability </label>
            <DatePicker
                excludeDates={[moment()]}
                selected={this.state.startDate}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeStart}
                popoverAttachment='top center'
                placeholderText="Click to select a start date" />
          </div>
          <div className='third'>
          <label htmlFor="endDate"> Ending Avaliability </label>
            <DatePicker
                selected={this.state.endDate}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onChange={this.handleChangeEnd}
                popoverAttachment='top center'
                placeholderText="Click to select an end date"/>
            </div>
            <div className='third last'>
              <label htmlFor="price"> Set Your Max Price </label>
              <h3 className="price"> ${this.state.maxPrice} </h3>
              <Rcslider name="price" onChange={this.handleChangePrice} value={this.state.maxPrice} max={2000}/>
            </div>
            <div className="full">
            <label htmlFor="tags"> Select Your Interests </label>
            <div className="tags">
              {tags}
            </div>
          </div>
          <button className={classNames('third', 'search')} type="submit"> Search </button>
        </form>
        <TripContainer data={this.state.trip} price={this.state.maxPrice} status={this.state.status}/>
      </div>
    )
  }
})