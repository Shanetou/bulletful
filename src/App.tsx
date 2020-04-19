import React from "react";

import Container from "@material-ui/core/Container";
import {
  Bullets,
  // bulletFactory
} from "./Bullets";
import {
  useRealtimeCollection,
  addDocToCollection,
  Collection,
  useGetCollection,
  deleteHalfOfAllBullets,
} from "./firebase/service";
import { NestedBullets } from "./NestedBullets";

function App() {
  // const bullets = useRealtimeCollection(Collection.bullets);
  const [bullets, getCollection] = useGetCollection(Collection.bullets);
  console.log("bullets:", bullets);

  const bulletsForChildren = (
    originalBullets: any[],
    childrenBulletIds: string[]
  ): any[] => {
    return childrenBulletIds.map((bulletId: string) => {
      const bulletForId = originalBullets.find(
        (bullet) => bullet.id === bulletId
      );

      if (bulletForId) {
        if (bulletForId.children.length === 0) {
          return bulletForId;
        } else {
          return {
            ...bulletForId,
            children: bulletsForChildren(originalBullets, bulletForId.children),
          };
        }
      } else {
        throw new Error("No bullet for ID!");
      }
    });
  };

  const bulletTree = (rootBullets: any[], allBullets: any[]) => {
    return rootBullets.map((bullet) => {
      console.log("bullet in first map", bullet);
      if (bullet.children.length === 0) {
        return bullet;
      } else {
        return {
          ...bullet,
          children: bulletsForChildren(bullets, bullet.children),
        };
      }
    });
  };

  const rootBullets = bullets.filter((bullet) => {
    return !bullet.parentId;
  });

  const formattedBulletTree = bulletTree(rootBullets, bullets);
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
            <button onClick={() => deleteHalfOfAllBullets(bullets)}>
              Delete half of bullets
            </button>
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
