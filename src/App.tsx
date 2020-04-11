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
console.log("bulletsFromFactory:", bulletsFromFactory);

function App() {
  // const bullets = useRealtimeCollection(Collection.bullets);
  // const bullets = useRealtimeCollection(Collection.bullets);
  const [bullets, getCollection] = useGetCollection(Collection.bullets);
  console.log("bullets:", bullets);

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
        <Bullets bullets={bullets} />
      </div>
    </Container>
  );
}

export default App;
