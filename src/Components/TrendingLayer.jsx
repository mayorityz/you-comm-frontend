import React from "react";
import { TrendingUp } from "react-feather";
import TrendFeature from "./TrendFeature";

const TrendingLayer = () => {
  return (
    <div className="trendingLayer">
      <h4>
        <TrendingUp size={16} /> Trending Today
      </h4>
      <div className="trends">
        <TrendFeature />
        <TrendFeature />
        <TrendFeature />
        <TrendFeature />
        <TrendFeature />
      </div>
    </div>
  );
};

export default TrendingLayer;
