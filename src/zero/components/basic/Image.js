import React from "react";

export default (props) => {
  const { src, size, className, children, ...restProps } = props;

  return (
    <img
      src={src}
      className={className}
      style={{ width: `${size}px`, height: `${size}px` }}
      {...restProps}
    />
  );
};
