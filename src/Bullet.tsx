import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { KeyCode } from "./utils/constants";
import {
  addDocToCollection,
  Collection,
  updateDocInCollection,
} from "./firebase/service";

// really a BulletNode?
export type BulletType = {
  id: string;
  parentId: number | null;
  childrenIds: string[];
  children: BulletType[];
  indentation: number;
  text: string;
};

// Can this "inherit" from BulletType?
export type ServerBullet = {
  id: string;
  parentId: number | null;
  children: string[];
  indentation: number;
  text: string;
};

type BulletProps = {
  bullet: BulletType;
  indentation: number;
  key: string;
};

const isParent = (bullet: BulletType): boolean => bullet.children.length > 0;
const isRootNode = (bullet: BulletType): boolean => bullet.parentId === null;

const addBulletBelow = (bullet: BulletType) => {
  const shouldAddBulletAsChild = isParent(bullet);

  // if we press enter on parent, add the new bullet as a child
  // if we press enter on sibling, add the new bullet as a sibling
  // what about root level enters?

  if (shouldAddBulletAsChild) {
    const newBullet = {
      parentId: bullet.id,
      children: [],
      indentation: bullet.indentation + 1,
      text: "",
    };

    // add child
    addDocToCollection(Collection.bullets, newBullet).then((docRef) => {
      if (docRef && docRef.id) {
        let parentChildrenIds = bullet.childrenIds;
        let newParentChildrenIds = [docRef.id, ...parentChildrenIds];

        updateDocInCollection(Collection.bullets, bullet.id, {
          children: newParentChildrenIds,
        });
      } else {
        throw new Error();
      }
    });

    // update parent
  } else {
    const newBullet = {
      parentId: bullet.parentId,
      children: [],
      indentation: bullet.indentation + 1,
      text: "",
    };

    // add child
    addDocToCollection(Collection.bullets, newBullet).then((result) => {
      console.log("result:", result);
    });
  }
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
          console.log("event inside onKeyPress: ", event);
          console.log("event key: ", event.key);
          if (event.key === KeyCode.Enter) {
            event.preventDefault();
            addBulletBelow(bullet);
            // alert("Enter... (KeyPress, use charCode)");
          }
        }}
      />
    </div>
  );
};
