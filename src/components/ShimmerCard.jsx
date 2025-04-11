import React from "react";
import "./ShimmerCard.scss";

const ShimmerCard = () => {
  return (
    <div className="shimmer-card">
      <div className="shimmer-cover shimmer"></div>
      <div className="shimmer-text">
        <div className="shimmer-title shimmer"></div>
        <div className="shimmer-artist shimmer"></div>
      </div>
      <div className="shimmer-duration shimmer"></div>
    </div>
  );
};

export default ShimmerCard;
