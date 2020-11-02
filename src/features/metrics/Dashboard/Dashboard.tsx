import React from "react";
import DropZone from "../DropZone/DropZone";
import LinePlot from "../LinePlot/LinePlot";

const Dashboard: React.FC = () => {
  return (
    <div>
      <DropZone />
      <LinePlot />
    </div>
  );
};

export default Dashboard;
