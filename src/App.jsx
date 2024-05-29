import React from 'react';
import DialogueGenerator from './marvel';

function App() {
  return (
    <div className="marvel">
      <header className="marvel-body">
        <h1>Marvel Dialogue </h1>
        <DialogueGenerator />
      </header>
    </div>
  );
}

export default App;
