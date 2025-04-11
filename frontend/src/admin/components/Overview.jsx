import React from "react";
import "./Overview.css"; // Make sure this file exists in the same folder

const stats = [
  {
    name: "Profit",
    title: "Profit",
    value: "$8650.50",
    change: "+12.8%",
    subtext: "+25% than last month",
    positive: true,
  },
  {
    name: "Spendings",
    title: "Spendings",
    value: "$1590",
    change: "-3.3%",
    subtext: "-5% than last month",
    positive: false,
  },
  {
    name: "Revenue",
    title: "Revenue",
    value: "$12400.75",
    change: "+15.1%",
    subtext: "+15.2% than last month",
    positive: true,
  },
  {
    name: "New Users",
    title: "New Users",
    value: "450",
    change: "+3.8%",
    subtext: "+9.8% than last month",
    positive: true,
  },
];

export default function Overview() {
  return (
    <div className="overview-container">
      <h1 className="overview-title">Overview</h1>
      <div className="overview-grid">
        {stats.map((stat, index) => (
          <div key={index} className="overview-card">
            <div className="overview-title-sm">{stat.title}</div>
            <div className="overview-value">{stat.value}</div>
            <div
              className={`overview-change ${
                stat.positive ? "positive" : "negative"
              }`}
            >
              {stat.positive ? "▲" : "▼"} {stat.change}
            </div>
            <div className={`overview-subtext ${stat.positive ? "positive" : "negative"}`}>
              {stat.subtext}
            </div>
            <div className="overview-footer">
              <strong>Name:</strong> {stat.name} <br />
              <strong>Value:</strong> {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
