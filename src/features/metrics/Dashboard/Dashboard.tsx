import React from "react";
import DropZone from "../DropZone/DropZone";
import LinePlot from "../LinePlot/LinePlot";
import MetricsTable from "../MetricsTable/MetricsTable";
import SlideNumber from "../SlideNumber/SlideNumber";
import SwitchClass from "../SwitchClass/SwitchClass";

const Dashboard: React.FC = () => {
  return (
    <div>
      <DropZone />
      <LinePlot />
      <SwitchClass />
      <MetricsTable />
      <SlideNumber />
    </div>
  );
};

export default Dashboard;
