import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

function Statistics() {
  const [trainings, setTrainings] = useState([]);
  const [activityData, setActivityData] = useState({});

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const activityMinutes = trainings.reduce((acc, training) => {
      const activity = training.activity;
      const duration = training.duration;
      if (activity in acc) {
        acc[activity] += duration;
      } else {
        acc[activity] = duration;
      }
      return acc;
    }, {});

    const labels = Object.keys(activityMinutes);
    const data = Object.values(activityMinutes);

    setActivityData({
      labels,
      datasets: [
        {
          label: "Minutes by activity",
          data,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [trainings]);

  return (
    <div className="container mt-3">
      <h1>Statistics</h1>
      <div style={{ height: "500px", width: "500px" }}>
        <Bar
          data={activityData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              title: {
                display: true,
                text: "Minutes by activity",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Statistics;
