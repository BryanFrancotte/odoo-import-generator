import { Button, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import SearchAppBar from './components/AppBar';
import Body from './components/Body';
import { theme } from './theme/Theme';

function App() {
  const [parsedData, setParsedData] = useState(null);
  const [changeCounter, setChangeCounter] = useState(0);

  function handleCSV(data: any) {
    setParsedData(data);
  }

  function handleChange() {
    // TODO: code that handles the changes
    // insert base 64 converted upload in parsedData
    setChangeCounter(changeCounter + 1);
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SearchAppBar changeCounter={changeCounter}/>
        <Body handleCsv={(data) => handleCSV(data)} 
          handleChange={() => handleChange()} parsedData={parsedData}/>
        <Button onClick={() => {handleChange()}}>Test changes</Button>
      </ThemeProvider>
    </div>
  );
}

export default App;
