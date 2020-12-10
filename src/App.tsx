import { ThemeProvider } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import SearchAppBar from './components/AppBar';
import Body from './components/Body';
import { theme } from './theme/Theme';

function App() {
  const [parsedData, setParsedData] = useState([]);
  const [changeCounter, setChangeCounter] = useState(0);

  function processImage(img: File, imgName: string, productId: string) {
    if (img === undefined) { return; }
    const reader = new FileReader();
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    // @ts-ignore
    let i = parsedData.findIndex(d => d.id === productId);
    let updatedData = [...parsedData];
    
    switch(imgName) {
      case 'MAIN':
        reader.onload = () => {
          const binaryStr = reader.result;
          // @ts-ignore
          updatedData[i].image_1920 = btoa(binaryStr.toString());
          setParsedData(updatedData);
        }
      break;
      case 'DESCRIPTION':
        reader.onload = () => {
          const binaryStr = reader.result;
          // @ts-ignore
          updatedData[i].x_studio_product_description_image = btoa(binaryStr.toString());
          setParsedData(updatedData);
        }
      break;
      case 'ORIGIN':
        reader.onload = () => {
          const binaryStr = reader.result;
          // @ts-ignore
          updatedData[i].x_studio_product_origin_image = btoa(binaryStr.toString());
          setParsedData(updatedData);
        }
      break;
      default:
        console.log(imgName + ' is not a valid option')
        return;
    }
    reader.readAsBinaryString(img);
    setChangeCounter(changeCounter + 1);
  }

  function removeImage(imgName: string, productId: string) {
    // @ts-ignore
    let i = parsedData.findIndex(d => d.id === productId);
    switch(imgName) {
      case 'MAIN':
        // @ts-ignore
        parsedData[i].image_1920 = null;
        break;
      case 'DESCRIPTION':
        // @ts-ignore
        parsedData[i].x_studio_product_description_image = null;
        break;
      case 'ORIGIN':
        // @ts-ignore
        parsedData[i].x_studio_product_origin_image = null;
        break;
      default:
        console.log(imgName + ' is not a valid option')
        return;
    }
    setChangeCounter(changeCounter - 1);
  }

  function clearChanges() {
    setChangeCounter(0);
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <SearchAppBar changeCounter={changeCounter} parsedData={parsedData} saveClickHandle={() => clearChanges()}/>
        <Body handleCsv={(data) => setParsedData(data)} parsedData={parsedData}
          handlePictureChange={(img, imgName, productId) => {processImage(img, imgName, productId)}}
          handlePictureRemove={(imgName, productId) => removeImage(imgName, productId)}/>
      </ThemeProvider>
    </div>
  );
}

export default App;
