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
    // @ts-ignore
    let i = parsedData.findIndex(d => d.id === productId);
    
    switch(imgName) {
      case 'MAIN':
        reader.onload = () => {
          const binaryStr = reader.result;
          // @ts-ignore
          parsedData[i].image_1920 = btoa(binaryStr.toString());
        }
      break;
      case 'DESCRIPTION':
        reader.onload = () => {
          const binaryStr = reader.result;
          // @ts-ignore
          parsedData[i].x_studio_product_description_image = btoa(binaryStr.toString());
        }
      break;
      case 'ORIGIN':
        reader.onload = () => {
          const binaryStr = reader.result;
          // @ts-ignore
          parsedData[i].x_studio_product_origin_image = btoa(binaryStr.toString());
        }
      break;
      default:
        return;
    }
    reader.readAsBinaryString(img);
    setChangeCounter(changeCounter + 1);
  }

  function removeImage() {}

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
