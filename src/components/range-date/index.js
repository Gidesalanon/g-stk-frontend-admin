import React, { Component } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

class PeriodRange extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: props.defaultValue,
    }
  }

  onChange = value => {
      let value_db = value.map(v=>datetoDbFormat(v))
    this.setState({ value },()=>{
        this.props.setValue(value_db)
    })
  }

  render() {
    const { value } = this.state;

    return (
      <DateRangePicker
        calendarAriaLabel="Toggle calendar"
        clearAriaLabel="Effacer"
        dayAriaLabel="Jour"
        className="form-control"
        monthAriaLabel="Mois"
        nativeInputAriaLabel="Date"
        onChange={this.onChange}
        value={value}
        yearAriaLabel="Année"
      />
    )
  }

}

const datetoDbFormat = date => {
  var dd = (date.getDate() < 10 ? '0' : '')+ date.getDate();
  var MM = ((date.getMonth() + 1) < 10 ? '0' : '')+ (date.getMonth() + 1);
  return `${date.getFullYear()}-${MM}-${dd}`
}
export default PeriodRange;
