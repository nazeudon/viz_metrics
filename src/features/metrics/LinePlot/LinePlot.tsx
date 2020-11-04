import React from "react";
import { Scatter } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  selectClassID,
  selectPrecisions,
  selectRecalls,
} from "../metricsSlice";

const LinePlot = () => {
  const classID = useSelector(selectClassID);
  const precisions = useSelector(selectPrecisions);
  const recalls = useSelector(selectRecalls);

  const data = {
    datasets: [
      {
        label: `Class ID: ${classID}`,
        data: precisions.map((pre, idx) =>
          idx % 1 === 0 ? { x: pre, y: recalls[idx] } : null
        ),
        borderColor: "rgba(30, 144, 255, 0.6)",
        backgroundColor: "rgba(30, 144, 255, 0.3)", //skyblue,
        fill: true,
        pointRadius: 2,
      },
      {
        label: `Confidence: ${classID}`,
        data: [
          {
            x: 0.6,
            y: 0.6,
          },
        ],
        borderColor: "rgba(30, 144, 255, 1.0)",
        backgroundColor: "rgba(30, 144, 255, 1.0)",
        pointBackgroundColor: "rgba(30, 144, 255, 1.0)",
        pointRadius: 5,
      },
    ],
  };
  const options = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Precision",
          },
          ticks: {
            min: 0,
            max: 1,
            stepSize: 0.1,
          },
          type: "linear",
          position: "left",
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Recall",
          },
          ticks: {
            min: 0,
            max: 1,
            stepSize: 0.1,
          },
          type: "linear",
          position: "bottom",
        },
      ],
    },
    animation: {
      duration: 10,
    },
  };

  return (
    <div>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default LinePlot;
