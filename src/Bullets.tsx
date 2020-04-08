import React, { useState } from "react";

interface Bullet {
  id: number;
  parentId: number | null;
  children: number[];
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
  return <li key={bullet.id}>{bullet.text}</li>;
};

interface BulletsProps {
  bullets: Bullet[];
}

export const Bullets = (props: BulletsProps) => {
  // const { bullets } = props;
  const [bullets] = useState(props.bullets);

  return (
    <ul>
      {bullets.map((bullet) => {
        return <Bullet key={bullet.id} bullet={bullet} />;
      })}
    </ul>
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
