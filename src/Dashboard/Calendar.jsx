import React, { useCallback, useContext, useEffect, useState } from "react";
import RCalendar from "react-calendar";
import { Context } from "../Store";
import { getExercisesByDate } from "../Services/UserServices";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";

function Calendar() {
  const [state, dispatch] = useContext(Context);
  const [date, setDate] = useState(new Date());
  const { id } = useParams();

  const onGetExerciseSuccess = useCallback(
    (response) => {
      console.log(response);
      let data = response.data;
      dispatch({ type: "SET_EXERCISES", payload: data });
    },
    [dispatch]
  );

  useEffect(() => {
    getExercisesByDate(
      id,
      date
        .toLocaleString("en-us", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2")
    )
      .then(onGetExerciseSuccess)
      .catch(onGetExerciseError);
  }, [date, id, onGetExerciseSuccess]);

  useEffect(() => {
    let dateConvert = date
      .toLocaleString("en-us", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");

    dispatch({
      type: "SET_DATE",
      payload: dateConvert,
    });
  }, [date, dispatch]);

  const onDateChange = (newDate) => {
    setDate(newDate);
  };

  const onGetExerciseError = (error) => {
    console.log(error);
  };

  return (
    <Box>
      <RCalendar
        onChange={onDateChange}
        value={date}
        showNeighboringMonth={false}
      />
    </Box>
  );
}

export default Calendar;
