import React from "react";
import { Bullet, BulletType } from "./Bullet";

type BulletsProps = {
  bullets: BulletType[];
  parent: null | BulletType;
  indentation: number;
};

export const Bullets = (props: BulletsProps) => {
  let { bullets, parent, indentation } = props;
  console.log("parent in bullets:", parent);

  return (
    <div>
      {bullets.map((bullet) => {
        if (bullet.children.length === 0) {
          return (
            <Bullet
              key={bullet.id}
              indentation={indentation}
              bullet={bullet}
              parent={parent}
            />
          );
        } else {
          return (
            <React.Fragment key={bullet.id}>
              <Bullet
                indentation={indentation}
                key={bullet.id}
                bullet={bullet}
                parent={parent}
              />
              <Bullets
                indentation={indentation + 1}
                bullets={bullet.children}
                parent={bullet}
              />
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};
