import React from "react";
import DropZone from "../DropZone/DropZone";
import LinePlot from "../LinePlot/LinePlot";
import MetricsTable from "../MetricsTable/MetricsTable";
import SwitchClass from "../SwitchClass/SwitchClass";

const Dashboard: React.FC = () => {
  return (
    <div>
      <DropZone />
      <LinePlot />
      <SwitchClass />
      <MetricsTable />
    </div>
  );
};

export default Dashboard;
