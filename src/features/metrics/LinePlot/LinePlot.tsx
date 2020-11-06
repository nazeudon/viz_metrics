import React from "react";
import { Scatter } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  selectClassID,
  // selectConfidence,
  selectPrecision,
  selectPrecisions,
  selectRecall,
  selectRecalls,
} from "../metricsSlice";

const LinePlot: React.FC = () => {
  const classID = useSelector(selectClassID);
  const precisions = useSelector(selectPrecisions);
  const recalls = useSelector(selectRecalls);

  // const confidence = useSelector(selectConfidence);
  const precision = useSelector(selectPrecision);
  const recall = useSelector(selectRecall);

  const data = {
    datasets: [
      {
        label: `Class ID: ${classID}`,
        data: recalls.map((pre, idx) =>
          idx % 1 === 0 ? { x: pre, y: precisions[idx] } : null
        ),
        borderColor: "rgba(30, 144, 255, 0.6)",
        backgroundColor: "rgba(30, 144, 255, 0.3)", //skyblue,
        fill: true,
        pointRadius: 0,
        showLine: true,
      },
      {
        label: `Confidence`,
        // label: `Confidence: ${confidence.toFixed(2)}`,
        data: [
          {
            x: recall,
            y: precision,
          },
        ],
        borderColor: "rgba(30, 144, 255, 1.0)",
        backgroundColor: "rgba(30, 144, 255, 1.0)",
        pointBackgroundColor: "rgba(30, 144, 255, 1.0)",
        pointRadius: 8,
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
          // type: "linear",
          // position: "left",
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
          // type: "linear",
          // position: "bottom",
        },
      ],
    },
    // animation: {
    //   duration: 10,
    // },
  };

  return (
    <div>
      <Scatter data={data} options={options} />
    </div>
  );
};

export default LinePlot;
