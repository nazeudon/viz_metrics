import React from "react";
import DropZone from "../DropZone/DropZone";
import LinePlot from "../LinePlot/LinePlot";
import SwitchClass from "../SwitchClass/SwitchClass";

const Dashboard: React.FC = () => {
  return (
    <div>
      <DropZone />
      <LinePlot />
      <SwitchClass />
    </div>
  );
};

export default Dashboard;
