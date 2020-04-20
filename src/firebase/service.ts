import React from "react";
import { db } from "./firebase.js";
import { Bullet, BulletType } from "../Bullet";

export enum Collection {
  bullets = "bullets",
  nestedBullets = "nestedBullets",
  children = "children",
}

type Entity = {
  id: string;
};

const dataFromSnapshot = <T extends Entity>(
  snapshot: firebase.firestore.DocumentSnapshot
): T | undefined => {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data() as any;

  return {
    ...data,
    id: snapshot.id,
  };
};

// Add loading finite state machine
export function useRealtimeCollection(collection: Collection) {
  const [bullets, setBullets] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = db.collection(collection).onSnapshot((snapshot) => {
      // @ts-ignore
      const bullets = [];

      snapshot.forEach(
        (doc) => {
          bullets.push(dataFromSnapshot(doc));
        },
        // @ts-ignore
        (error) => {
          console.log("error:", error);
        }
      );

      // @ts-ignore
      setBullets(bullets);
    });

    return unsubscribe;
  }, [collection]);

  return bullets;
}

// Add loading finite state machine
export function useGetCollection(collection: Collection): [any[], () => void] {
  const [bullets, setBullets] = React.useState([]);

  const getCollection = () => {
    db.collection(collection).onSnapshot((snapshot) => {
      // @ts-ignore
      const bullets = [];

      snapshot.forEach(
        (doc) => {
          console.log("doc:", doc);

          bullets.push(dataFromSnapshot(doc));
        },
        // @ts-ignore
        (error) => {
          console.log("error:", error);
        }
      );

      // @ts-ignore
      setBullets(bullets);
    });
  };

  return [bullets, getCollection];
}

export function useGetCollectionGroup(
  collection: Collection
): [any[], () => void] {
  const [bullets, setBullets] = React.useState([]);

  const getCollection = () => {
    db.collectionGroup(collection).onSnapshot((snapshot) => {
      // @ts-ignore
      const bullets = [];

      snapshot.forEach(
        (doc) => {
          bullets.push(dataFromSnapshot(doc));
        },
        // @ts-ignore
        (error) => {
          console.log("error:", error);
        }
      );

      // @ts-ignore
      setBullets(bullets);
    });
  };

  return [bullets, getCollection];
}

// @ts-ignore
export function addDocToCollection(collection: Collection, doc) {
  return db
    .collection(collection)
    .add(doc)
    .then((docRef) => {
      console.log(`Document ${docRef.id} written to ${collection}`, docRef.id);
      return docRef;
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export function deleteDocFromCollection(collection: string, docId: string) {
  db.collection(collection)
    .doc(docId)
    .delete()
    .then(() => {
      console.log(`Document ${docId} deleted from ${collection}!`);
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

export function deleteHalfOfAllBullets<T extends Entity>(bullets: T[]): void {
  let count = bullets.length;
  let countToDelete = Math.floor(count / 2);
  let docsToDelete = bullets.slice(countToDelete, count);

  docsToDelete.forEach((doc) => {
    deleteDocFromCollection(Collection.bullets, doc.id);
  });
}
