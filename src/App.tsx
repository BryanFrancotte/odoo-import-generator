import { Button, ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import SearchAppBar from './components/AppBar';
import Body from './components/Body';
import { theme } from './theme/Theme';

function App() {
  const [parsedData, setParsedData] = useState(null);
  const [changeCounter, setChangeCounter] = useState(0);

  function handleChange() {
    // TODO: code that handles the changes
    // insert base 64 converted upload in parsedData
    setChangeCounter(changeCounter + 1);
  }

  function processImage(img: File, imgName: string, productId: string) {
    if (img === undefined) { return; }
     // @ts-ignore: Object is possibly 'null'.
    let i = parsedData.findIndex(d => d.id === productId);
    switch(imgName) {
      case 'MAIN':
        // @ts-ignore: Object is possibly 'null'.
        // parsedData[i].image_1920 =
        console.log(parsedData[i].name);
        setChangeCounter(changeCounter + 1);
      break;
      case 'DESCRIPTION':
        console.log('description');
        setChangeCounter(changeCounter + 1);
      break;
      case 'ORIGIN':
        console.log('origin');
        setChangeCounter(changeCounter + 1);
      break;
    }
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SearchAppBar changeCounter={changeCounter}/>
        <Body handleCsv={(data) => setParsedData(data)} 
          handleChange={() => handleChange()} parsedData={parsedData}
          handlePictureChange={(img, imgName, productId) => {processImage(img, imgName, productId)}}/>
        <Button onClick={() => {handleChange()}}>Test changes</Button>
      </ThemeProvider>
    </div>
  );
}

export default App;
