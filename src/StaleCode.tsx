import React from "react";

export const bulletFactory = (quantity: number) => {
  const bullets = [...Array(quantity)].map((_item, idx) => {
    const parentId = idx > 0 ? idx : null;

    return {
      // id: idx + 1,
      // parentId: parentId,
      parentId: null,
      children: [],
      indentation: 0,
      text: `bullet number: ${idx + 1}`,
    };
  });

  return bullets;
};
