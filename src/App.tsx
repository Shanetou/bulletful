import React from "react";

import Container from "@material-ui/core/Container";
import {
  Bullets,
  // bulletFactory
} from "./Bullets";
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
  console.log("bullets:", bullets);
  console.log("bulletNodes:", bulletsMap);

  const formattedBulletTree = bulletTree(bulletsMap);

  console.log(
    "formattedBulletTree:",
    JSON.stringify(formattedBulletTree, null, 2)
  );

  return (
    <Container maxWidth="md">
      <div style={{ height: "100vh" }}>
        <header>
          <div style={{ marginBottom: "32px" }}>
            <button onClick={() => getCollection()}>Get Collection</button>
            {/* <button onClick={() => deleteHalfOfAllBullets(bullets)}>
              Delete half of bullets
            </button> */}
          </div>
          {/* <div style={{ marginBottom: "32px" }}>
            <button onClick={() => getCollection()}>Get Nested Collection</button>
          </div> */}
        </header>
        <Bullets bullets={formattedBulletTree} indentation={0} />
        {/* <div style={{ marginBottom: "32px" }}>
          <NestedBullets />
        </div> */}
      </div>
    </Container>
  );
}

export default App;
