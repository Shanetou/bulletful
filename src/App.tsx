import React from "react";
import "./App.css";

import { Bullets, bulletFactory } from "./Bullets";
import {
  useRealtimeCollection,
  addDocToCollection,
  Collection,
  useGetCollection,
  deleteHalfOfAllBullets,
} from "./firebase/service";

const bulletsFromFactory = bulletFactory(10);
console.log("bulletsFromFactory:", bulletsFromFactory);

function App() {
  // const bullets = useRealtimeCollection(Collection.bullets);
  // const bullets = useRealtimeCollection(Collection.bullets);
  const [bullets, getCollection] = useGetCollection(Collection.bullets);
  console.log("bullets:", bullets);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => getCollection()}>Get Collection</button>
        <button onClick={() => deleteHalfOfAllBullets(bullets)}>
          Delete half of bullets
        </button>
        <Bullets bullets={bullets} />
      </header>
    </div>
  );
}

export default App;
