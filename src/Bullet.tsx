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
  parent: null | BulletType;
};

const isParent = (bullet: BulletType): boolean => bullet.children.length > 0;
const isRootNode = (bullet: BulletType): boolean => bullet.parentId === null;

const addBulletAsChild = (bullet: BulletType) => {
  const newBullet = {
    parentId: bullet.id,
    children: [],
    indentation: bullet.indentation + 1,
    text: "",
  };

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
};

const addBulletAsSibling = (bullet: BulletType, parent: BulletType) => {
  const newBullet = {
    parentId: parent.id,
    children: [],
    indentation: bullet.indentation,
    text: "",
  };

  addDocToCollection(Collection.bullets, newBullet).then((docRef) => {
    if (docRef && docRef.id) {
      let parentChildrenIds = parent.childrenIds;
      let indexOfEnterBullet = parentChildrenIds.indexOf(bullet.id);
      let elmsToInsertAfter = parentChildrenIds.slice(
        0,
        indexOfEnterBullet + 1
      );
      let elmsToInsertBefore = parentChildrenIds.slice(indexOfEnterBullet + 1);
      let newParentChildrenIds = [
        ...elmsToInsertAfter,
        docRef.id,
        ...elmsToInsertBefore,
      ];

      updateDocInCollection(Collection.bullets, parent.id, {
        children: newParentChildrenIds,
      });
    } else {
      throw new Error();
    }
  });
};

const addBulletBelow = (bullet: BulletType, parent: BulletType) => {
  const shouldAddBulletAsChild = isParent(bullet);

  // if we press enter on parent, add the new bullet as a child
  // if we press enter on sibling, add the new bullet as a sibling
  // what about root level enters?

  if (shouldAddBulletAsChild) {
    addBulletAsChild(bullet);
  } else {
    addBulletAsSibling(bullet, parent);
  }
};

export const Bullet = (props: BulletProps) => {
  const { bullet, indentation, parent } = props;
  console.log("bullet text:", bullet.text);
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
          if (parent && parent.text) {
            console.log("In Bullet, bullet text: ", parent.text);
          }
        }}
        onKeyDown={(event) => {
          console.log("event key: ", event.key);
          if (event.key === KeyCode.Enter) {
            event.preventDefault();

            // deal with this check elsewhere?
            if (parent) {
              addBulletBelow(bullet, parent);
            }
            // alert("Enter... (KeyPress, use charCode)");
          }
        }}
      />
    </div>
  );
};
