import React, { useEffect } from "react";

import Container from "@material-ui/core/Container";
import { Bullets } from "./Bullets";
import {
  useRealtimeCollection,
  Collection,
  useGetCollection,
  deleteHalfOfAllBullets,
} from "./firebase/service";
import { NestedBullets } from "./NestedBullets";
import { bulletTree, serverBulletToBulletNode } from "./utils/helpers";
import { TitleField } from "./TitleField";

function App() {
  const realtimeBullets = useRealtimeCollection(Collection.bullets);
  console.log("realtimeBullets:", realtimeBullets);
  // const [bullets, getCollection] = useGetCollection(Collection.bullets);
  // const [emptyBullets, getEmptyCollection] = useGetCollection(
  //   Collection.emptyCollection
  // );
  // console.log("emptyBullets", emptyBullets);

  // useEffect(() => {
  //   getEmptyCollection();
  // }, []);

  const bulletsWithChildrenIds = realtimeBullets.map((bullet) => {
    return serverBulletToBulletNode(bullet);
  });
  const bulletsMap = new Map(
    bulletsWithChildrenIds.map((obj) => [obj.id, obj])
  );

  const formattedBulletTree = bulletTree(bulletsMap);

  console.log(
    "formattedBulletTree:",
    JSON.stringify(formattedBulletTree, null, 4)
  );

  return (
    <Container maxWidth="md">
      <div style={{ height: "100vh" }}>
        <header>
          <div style={{ marginBottom: "32px" }}>
            <TitleField />
          </div>
          {/* <div style={{ marginBottom: "32px" }}>
            <button onClick={() => getCollection()}>Get Collection</button>
          </div> */}
        </header>
        <Bullets bullets={formattedBulletTree} indentation={0} parent={null} />
      </div>
    </Container>
  );
}

export default App;
