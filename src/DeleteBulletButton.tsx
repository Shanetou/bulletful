import React from "react";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";

type DeleteBulletButtonProps = {
  handleClick: () => void;
};

export const DeleteBulletButton = (props: DeleteBulletButtonProps) => {
  const { handleClick } = props;
  return <HighlightOffIcon onClick={(_event) => handleClick()} />;
};
