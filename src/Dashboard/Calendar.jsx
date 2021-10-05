import React, { useCallback, useContext, useEffect, useState } from "react";
import RCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Context } from "../Store";
import { getExercisesByDate } from "../Services/UserServices";
import { useParams } from "react-router-dom";

function Calendar(props) {
  const [state, dispatch] = useContext(Context);
  const [date, setDate] = useState(new Date());
  const { id } = useParams();

  const onGetExerciseSuccess = useCallback(
    (response) => {
      let data = response.data;
      dispatch({ type: "SET_EXERCISES", payload: data });
    },
    [dispatch]
  );

  useEffect(() => {
    getExercisesByDate(id, date.toISOString().substring(0, 10))
      .then(onGetExerciseSuccess)
      .catch(onGetExerciseError);
  }, [date, id, onGetExerciseSuccess]);

  const onDateChange = (newDate) => {
    setDate(newDate);
    dispatch({
      type: "SET_DATE",
      payload: date.toISOString().substring(0, 10),
    });
  };

  const onGetExerciseError = (response) => {
    console.log(response.error);
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
