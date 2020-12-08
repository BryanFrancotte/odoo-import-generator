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
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      const binaryStr = reader.result;
      // @ts-ignore
      const base64Result = btoa(binaryStr.toString());
      console.log(base64Result);
    }
    // @ts-ignore: Object is possibly 'null'.
    let i = parsedData.findIndex(d => d.id === productId);
    switch(imgName) {
      case 'MAIN':
        console.log(img)
        reader.readAsBinaryString(img);
        //@ts-ignore
        console.log('Product\'s name' + parsedData[i].name);
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
