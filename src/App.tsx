import React from "react";
import "./App.css";

import { Bullets, bulletFactory } from "./Bullets";
import {
  useRealtimeCollection,
  addDocToCollection,
  Collection,
} from "./firebase/service";

const bulletsFromFactory = bulletFactory(10);
console.log("bulletsFromFactory:", bulletsFromFactory);

bulletsFromFactory.forEach((bullet) => {
  addDocToCollection(Collection.bullets, bullet);
});

function App() {
  const bullets = useRealtimeCollection(Collection.bullets);
  console.log("bullets:", bullets);

  return (
    <div className="App">
      <header className="App-header">
        {/* <Bullets bullets={bulletFactory(12)} /> */}
      </header>
    </div>
  );
}

export default App;
