import { Bubbles } from "lucide-react";
import React from "react";

const ChartLoadingBox = () => {
  return (
    <div
      className={
        "chart-container flex flex-col items-center justify-center h-64 gap-2 text-primary-500 animate-pulse"
      }
    >
      <Bubbles className={"animate-bounce"} />
      <p>차트를 만들고 있어요.</p>
    </div>
  );
};

export default ChartLoadingBox;
