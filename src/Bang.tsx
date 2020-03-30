import React from "react";

interface BangProps {
  boom: number;
}

export const Bang = (props: BangProps) => {
  const { boom } = props;
  return <div>Hello there, Shane, {boom}</div>;
};
