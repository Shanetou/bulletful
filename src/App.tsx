import React from "react";

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

function App() {
  // const bullets = useRealtimeCollection(Collection.bullets);
  const [bullets, getCollection] = useGetCollection(Collection.bullets);
  const bulletsWithChildrenIds = bullets.map((bullet) => {
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
            <button onClick={() => getCollection()}>Get Collection</button>}
          </div>
        </header>
        <Bullets bullets={formattedBulletTree} indentation={0} />}
      </div>
    </Container>
  );
}

export default App;
