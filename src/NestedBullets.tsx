import React from "react";
import {
  useGetCollection,
  useGetCollectionGroup,
  Collection,
} from "./firebase/service";

export const NestedBullets = () => {
  const [bullets, getCollection] = useGetCollection(Collection.nestedBullets);
  const [groupBullets, getCollectionGroup] = useGetCollectionGroup(
    Collection.children
  );
  console.log("groupBullets:", groupBullets);
  console.log("nested bullets:", bullets);

  return (
    <div>
      <button onClick={getCollection}>Get Nested Collection</button>
      <button onClick={getCollectionGroup}>Get Nested Collection Group</button>
    </div>
  );
};
