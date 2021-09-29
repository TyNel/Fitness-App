import React, { useCallback, useContext, useEffect, useState } from "react";
import RCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Context } from "../Store";
import { getExercisesByDate } from "../Services/UserServices";

function Calendar(props) {
  const [state, dispatch] = useContext(Context);
  const [date, setDate] = useState(new Date());
  const userId = props.userId;

  const onGetExerciseSuccess = useCallback(
    (response) => {
      let data = response.data;
      dispatch({ type: "SET_EXERCISES", payload: data });
    },
    [dispatch]
  );

  const onGetExerciseError = (response) => {
    console.log(response.error);
  };

  useEffect(() => {
    getExercisesByDate(userId, date.toISOString().substring(0, 10))
      .then(onGetExerciseSuccess)
      .catch(onGetExerciseError);
  }, [date, userId, onGetExerciseSuccess]);

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div>
      <RCalendar
        onChange={onDateChange}
        value={date}
        showNeighboringMonth={false}
      />
    </div>
  );
}

export default Calendar;
