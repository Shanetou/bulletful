import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { KeyCode } from "./utils/constants";
interface Bullet {
  id: string;
  parentId: number | null;
  children: Bullet[];
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
  indentation: number;
  key: string;
}

const Bullet = (props: BulletProps) => {
  const { bullet, indentation } = props;
  const [text, setText] = useState(bullet.text);

  const onChange = (event: any) => {
    console.log("event.target.value:", event.target.value);
    setText(event.target.value);
  };

  return (
    <div style={{ marginLeft: `${indentation * 24}px` }}>
      <TextField
        key={bullet.id}
        value={text}
        onChange={onChange}
        onFocus={(_) => {
          console.log("Focused!");
        }}
        onKeyDown={(event) => {
          event.preventDefault();
          console.log("event inside onKeyPress: ", event);
          console.log("event key: ", event.key);
          if (event.key == KeyCode.Enter) {
            alert("Enter... (KeyPress, use charCode)");
          }
        }}
      />
    </div>
  );
};

interface BulletsProps {
  bullets: Bullet[];
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

// [
//   {
//     id: "root",
//     parentId: null,
//     children: [],
//   },
//   {}
// ]
