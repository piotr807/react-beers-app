import React from 'react';
import './App.css';

import Beers from './beers/Beers';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>BeerGuru</h1>
      </header>
      <Beers />
    </div>
  );
}

export default App;
