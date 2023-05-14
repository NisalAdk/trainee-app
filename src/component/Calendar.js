import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function MyCalendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchTrainings(), []);

  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then(response => response.json())
      .then(data => setTrainings(data));
  };

  const events = trainings.map(training => {
    return {
      title: training.activity,
      start: moment(training.date).toISOString(),
      end: moment(training.date).add(training.duration, 'minutes').toISOString()
    }
  });

  return (
    <div className="container mt-3" style={{ height: "80vh" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}

export default MyCalendar;
