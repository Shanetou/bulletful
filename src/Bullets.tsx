import React from "react";
import { Bullet, BulletType } from "./Bullet";

// interface ServerBullet {
//   // id: string;
//   parentId: number | null;
//   children: string[];
//   indentation: number;
//   text: string;
//   // createdAt: string;
//   // updatedAt: string;
//   // collapsed: bool;
// }

interface BulletsProps {
  bullets: BulletType[];
  indentation: number;
}

export const Bullets = (props: BulletsProps) => {
  let { bullets, indentation } = props;

  return (
    <div>
      {bullets.map((bullet) => {
        if (bullet.children.length === 0) {
          return (
            <Bullet
              key={bullet.id}
              indentation={indentation}
              // key={bullet.id}
              bullet={bullet}
            />
          );
        } else {
          return (
            <React.Fragment key={bullet.id}>
              <Bullet
                indentation={indentation}
                key={bullet.id}
                bullet={bullet}
              />
              <Bullets
                indentation={indentation + 1}
                bullets={bullet.children}
              />
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};
