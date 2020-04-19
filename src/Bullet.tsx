import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { KeyCode } from "./utils/constants";
import { addDocToCollection, Collection } from "./firebase/service";

export type BulletType = {
  id: string;
  parentId: number | null;
  children: BulletType[];
  indentation: number;
  text: string;
  // createdAt: string;
  // updatedAt: string;
  // collapsed: bool;
};

// Can this "inherit" from BulletType?
export type ServerBullet = {
  id: string;
  parentId: number | null;
  children: string[];
  indentation: number;
  text: string;
  // createdAt: string;
  // updatedAt: string;
  // collapsed: bool;
};

type BulletProps = {
  bullet: BulletType;
  indentation: number;
  key: string;
};

const addBulletBelow = (bulletAbove: BulletType) => {
  // const isBulletAboveAParent = bulletAbove

  const newBullet = {
    parentId: bulletAbove.parentId,
    indentation: bulletAbove.indentation,
    text: "",
    // add children if this is a parent that has children
    children: [],
  };

  addDocToCollection(Collection.bullets, newBullet);
};

export const Bullet = (props: BulletProps) => {
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
          console.log("Focused bullet: ", bullet.id);
        }}
        onKeyDown={(event) => {
          event.preventDefault();
          console.log("event inside onKeyPress: ", event);
          console.log("event key: ", event.key);
          if (event.key === KeyCode.Enter) {
            addBulletBelow(bullet);
            // alert("Enter... (KeyPress, use charCode)");
          }
        }}
      />
    </div>
  );
};
