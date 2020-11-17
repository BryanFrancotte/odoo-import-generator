import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import CSVReader from 'react-csv-reader';
import './App.css';
import SearchAppBar from './components/AppBar';
import { theme } from './theme/Theme';


function App() {
  const parsingConfig = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }

  let parsedData = null;

  function handleCSV(data: any) {

  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SearchAppBar/>
        <CSVReader parserOptions={parsingConfig} 
          onFileLoaded={(data, file) => {handleCSV(data)}}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
