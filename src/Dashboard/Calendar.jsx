import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
class Calender extends React.Component {
  state = {
    date: "",
  };

  onDateClick = (date) => {
    this.setState(
      (prevstate) => {
        return { ...prevstate, date: date };
      },
      () => {
        console.log(this.state.date);
      }
    );
  };

  render() {
    return (
      <div>
        <Calendar
          onChange={this.onDateClick}
          value={this.state.date.length ? this.state.date : null}
          showFixedNumberOfWeeks={false}
        />
      </div>
    );
  }
}

export default Calender;
