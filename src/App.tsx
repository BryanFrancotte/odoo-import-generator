import React from 'react';
import logo from './logo.svg';
import './App.css';
import CSVReader from 'react-csv-reader';
import { ipcRenderer } from 'electron';

const parsingOptions ={
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true
}

function handleExport(exportedData: any) {
  const ipc = ipcRenderer;
  let reply = ipc.sendSync('getEncoded', '/Users/bryanfrancotte/Documents/Clients/Chambord/assets-picture/william-krause-0zERrbey8XM-unsplash.png"');
  console.log(reply);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CSVReader parserOptions={parsingOptions} onFileLoaded={(data, fileInfo) => {handleExport(data)}} />
      </header>
    </div>
  );
}

export default App;
