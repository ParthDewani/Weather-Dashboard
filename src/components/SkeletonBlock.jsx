import React from "react";

export default function SkeletonBlock({ width, height, radius = 4, style = {} }) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius: radius,
        ...style,
      }}
    />
  );
}
