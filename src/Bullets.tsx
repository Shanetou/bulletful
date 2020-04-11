import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

interface Bullet {
  id: string;
  parentId: number | null;
  children: string[];
  indentation: number;
  text: string;
  // createdAt: string;
  // updatedAt: string;
  // collapsed: bool;
}

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

interface BulletProps {
  bullet: Bullet;
}

const Bullet = (props: BulletProps) => {
  const { bullet } = props;
  return <TextField key={bullet.id} type="text" value={bullet.text} />;
};

interface BulletsProps {
  bullets: Bullet[];
}

export const Bullets = (props: BulletsProps) => {
  let { bullets } = props;

  return (
    <div>
      {bullets.map((bullet) => {
        return <Bullet key={bullet.id} bullet={bullet} />;
      })}
    </div>
  );
};

// [
//   {
//     id: "root",
//     parentId: null,
//     children: [],
//   },
//   {}
// ]
