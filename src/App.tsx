import React from "react";

import Container from "@material-ui/core/Container";

import { Bullets, bulletFactory } from "./Bullets";
import {
  useRealtimeCollection,
  addDocToCollection,
  Collection,
  useGetCollection,
  deleteHalfOfAllBullets,
} from "./firebase/service";
import { ThemeProvider } from "@material-ui/core";

const bulletsFromFactory = bulletFactory(10);
// console.log("bulletsFromFactory:", bulletsFromFactory);

function App() {
  // const bullets = useRealtimeCollection(Collection.bullets);
  // const bullets = useRealtimeCollection(Collection.bullets);
  const [bullets, getCollection] = useGetCollection(Collection.bullets);
  console.log("bullets:", bullets);

  // const bulletsForChildren = (bullets, childrenBulletIds) => {
  //   childrenBulletIds.map((bulletId) => {
  //     const bulletForId = bullets.find((bullet) => bullet.id === bulletId);
  //     console.log("bulletForId:", bulletForId);

  //     if (bulletForId) {
  //       return bulletForId;
  //     } else {
  //       throw new Error("No bullet for ID!");
  //     }
  //   });
  // };

  // const bulletsForChildren = (bullets, childrenBulletIds) => {

  //       return childrenBulletIds.map((bulletId: string) => {
  //         console.log("bulletId", bulletId);
  //         const bulletForId = bullets.find((bullet) => bullet.id === bulletId);
  //         console.log("bulletForId:", bulletForId);

  //         if (bulletForId) {
  //           return bulletForId;
  //           // if (bullet.children.length === 0) {
  //           //   return bulletForId;
  //           // } else {
  //           //   return bulletTree(bullet.children);
  //           // }
  //         } else {
  //           console.log("got to error");
  //           throw new Error("No bullet for ID!");
  //         }
  //       });
  // }

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
  console.log("formattedBulletTree:", JSON.stringify(formattedBulletTree));

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
        </header>
        <Bullets bullets={formattedBulletTree} indentation={0} />
      </div>
    </Container>
  );
}

export default App;
