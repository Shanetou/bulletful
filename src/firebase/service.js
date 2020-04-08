import React from "react";
import { db } from "./firebase.js";

// Add loading finite state machine
export function useRealtimeCollection(collection) {
  const [bullets, setBullets] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = db.collection(collection).onSnapshot((snapshot) => {
      // @ts-ignore
      const bullets = [];

      snapshot.forEach(
        (doc) => {
          bullets.push(doc.data());
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
  }, []);

  return bullets;
}

export function addDocToCollection(collection, doc) {
  db.collection(collection)
    .add(doc)
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}
