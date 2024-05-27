import React, { useEffect, useState } from "react";
// import "./App.css";

const PieChart = ({ completed, pending }) => {
  const [completedAngle, setCompletedAngle] = useState(0);
  const total = completed + pending;
  const gap = 10; // Gap in degrees

  const completedPercentage = (completed / total) * 100;
  const pendingPercentage = (pending / total) * 100;

  const completedAngleWithoutGap = (completedPercentage / 100) * 360;
  const pendingAngleWithoutGap = (pendingPercentage / 100) * 360;

  const actualCompletedAngle = completedAngleWithoutGap - gap / 2;
  const actualPendingAngle = pendingAngleWithoutGap - gap / 2;

  useEffect(() => {
    setCompletedAngle(actualCompletedAngle);
  }, [actualCompletedAngle]);

  return (
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <circle
        className="text-gray-200"
        strokeWidth="3.8"
        fill="none"
        r="15.91549431"
        cx="18"
        cy="18"
      />
      <path
        className="text-orange-500"
        stroke="#BD8800"
        strokeWidth="3.8"
        fill="none"
        d={describeArc(
          18,
          18,
          15.91549431,
          actualCompletedAngle + gap / 2,
          actualCompletedAngle + gap / 2 + actualPendingAngle
        )}
      />
      <path
        className="text-green-500"
        stroke="#4AB541"
        strokeWidth="3.8"
        fill="none"
        d={describeArc(18, 18, 15.91549431, 0, actualCompletedAngle)}
      />
    </svg>
  );
};

// Function to describe an arc path
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
  return d;
}

// Function to convert polar coordinates to Cartesian coordinates
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 250) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
export default PieChart;